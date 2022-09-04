<template>
    <q-dialog full-width>
        <q-card style="height: 100%;">
            <!-- Splitter splits vertically between tabs and panels -->
            <q-splitter v-model="splitterModel" style="height: 100%">
                <!-- Tabs on the left -->
                <template v-slot:before>
                    <q-tabs v-model="tab2" vertical class="text-primary">
                        <q-tab v-for="scheme in inventorySt.schemes" :name="scheme.name" :label="scheme.name" />
                        <q-btn label="New Achetype" class="absolute-bottom" style="width: 100%;"/>
                    </q-tabs>
                </template>

                <!-- Panels on the right -->
                <template v-slot:after>
                    <q-tab-panels v-model="tab2" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <!-- Create a panel for each archetype -->
                        <q-tab-panel v-for="(scheme, archIndex) in inventorySt.schemes" :name="scheme.name">
                            <!-- Close Button -->
                            <div style="display: flex; align-content: space-between; justify-content: space-between;">
                                <span></span>
                                <CloseButton/>
                            </div>

                            <!-- Table -->
                            <div class="q-pa-md">
                                <q-table :rows="inventorySt.rows(scheme.name)" :columns="inventorySt.columns(scheme.name)" row-key="name" style="height: 83vh; margin-bottom: 1.5vh;" separator="cell" :rows-per-page-options="[0]">
                                    <!-- Allows for custom html in each table slot -->
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td v-for="(col, index) in inventorySt.columns(scheme.name)" :key="col.name" :props="props">
                                                <!-- Data Input -->
                                                <div v-if="col.name != 'lend'">
                                                    <!-- Text input -->
                                                    <div v-if="scheme.fieldTypes[index] === 0 ">
                                                        {{ props.row[col.name] }}
                                                        <q-popup-edit v-model="props.row[col.name]" :title="`Update ${col.label}`" buttons v-slot="scope" @save="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)">
                                                            <q-input v-model="scope.value" dense autofocus/>
                                                        </q-popup-edit>
                                                    </div>

                                                    <!-- Number input -->
                                                    <div v-if="scheme.fieldTypes[index] === 1 ">
                                                        {{ props.row[col.name] }}
                                                        <q-popup-edit v-model="props.row[col.name]" :title="`Update ${col.label}`" buttons v-slot="scope" :validate="validateNum" @hide="validateNum" @save="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)">
                                                            <q-input v-model="scope.value" dense autofocus error-message="Value must be a number!" :error="inputErr"/>
                                                        </q-popup-edit>
                                                    </div>

                                                    <!-- Selection input -->
                                                    <div v-if="scheme.fieldTypes[index] === 2 ">
                                                        <q-select outlined v-model="props.row[col.name]" :options="scheme.fieldDefault[index].map(i => i.value)" @update:model-value="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)"/>
                                                    </div>

                                                    <!-- Date input -->
                                                    <div v-if="scheme.fieldTypes[index] === 3 ">
                                                        <q-input v-model="props.row[col.name]" filled type="date" @update:model-value="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)"/>
                                                    </div>

                                                    <!-- Checkbox input -->
                                                    <div v-if="scheme.fieldTypes[index] === 4 ">
                                                        <q-checkbox v-model="props.row[col.name]" @update:model-value="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)"/>
                                                    </div>
                                                </div>

                                                <!-- Delete button -->
                                                <div v-if="col.name === 'lend'">
                                                    <q-btn color="red" label="Delete Item" @click="confirm = true; deleteSelected = [archIndex, props.rowIndex]"/>
                                                </div>
                                            </q-td>
                                        </q-tr>
                                    </template>
                                </q-table>

                                <div style="display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between;">
                                    <div class="wide-flexbox" style="width: 12%;">
                                        <q-btn color="primary" label="New Item" class="manage-items-button" @click="inventorySt.createDefaultItem(archIndex)"/>
                                        <q-btn color="primary" label="Edit Archetype" class="manage-items-button" @click="editArc = true"/>
                                    </div>
                                    <div class="wide-flexbox" style="width: 5%;">
                                        <q-btn color="primary" label="Save and Exit" class="manage-items-button" v-close-popup/>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>

        <!-- confirm delete item dialogue -->
        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">Are you sure you would like to delete this item? This cannot be undone.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="red" v-close-popup @click="inventorySt.deleteItem(deleteSelected[0], deleteSelected[1])"/>
                </q-card-actions>
            </q-card>
        </q-dialog>
        </q-card>

        <EditArchetype v-model="editArc"/>
    </q-dialog>
</template>

<script>
    import { ref } from 'vue'
    import { defineComponent } from 'vue'
    import { useInventory } from '/src/stores/useInventory'

    import CloseButton from '/src/components/CloseButton.vue'
    import EditArchetype from './EditArchetype.vue'
    import { itemsLocal } from '/src/stores/itemsLocal'
    import { create_pdf } from '/src/scripts/pdf'

    const inventory = useInventory()
    const itemsPage = itemsLocal()

    const archetypeColumns = [
        { name: 'property', align: "center", label: "Property", field: "property", sortable: true },
        { name: 'propertyType', align: "center", label: "Property Type", field: "propertyType", sortable: true },
        { name: 'defaultValue', align: "center", label: "Default Value", field: "defaultValue", sortable: true },
        { name: 'delete', field: "delete", headerStyle: 'width: 3%'}
    ]

    export default defineComponent({
        name: 'Manage Item',
        components: { CloseButton, EditArchetype },
        setup () {
            let inputErr = ref(false)
            
            return {
                tab2: ref(inventory.schemes[0].name),
                inventorySt: inventory,
                itemsSt: itemsPage,
                itemsLocalSt: itemsLocal,
                editArc: ref(false),
                splitterModel: ref(10),
                search: ref(""),
                inputErr,
                confirm: ref(false),
                deleteSelected: ref([]),

                archColumns: archetypeColumns,
                create_pdf,

                validateNum(val) {
                    if (isNaN(val)) {
                        inputErr.value = true;
                    } else { 
                        inputErr.value = false;
                    }

                    return !isNaN(val)
                }
            }
        }
    })
</script>