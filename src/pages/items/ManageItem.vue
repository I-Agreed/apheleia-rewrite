<template>
    <q-dialog full-width>
        <q-card style="height: 100%;">
            <!-- Splitter splits vertically between tabs and panels -->
            <q-splitter v-model="splitterModel" style="height: 100%">
                <!-- Tabs on the left -->
                <template v-slot:before>
                    <q-tabs v-model="tab2" vertical class="text-primary">
                        <div v-for="scheme in inventorySt.schemes">
                            <q-tab :name="scheme.name" :label="scheme.name" v-if="selfSt.role.getArchetypePerms(scheme.name).edit"/>
                        </div>

                        <!-- New Archetype Button -->
                        <q-btn label="New Item Type" class="absolute-bottom" style="width: 100%;" @click="inventorySt.newArchetype()"/>
                    </q-tabs>
                </template>

                <!-- Panels on the right -->
                <template v-slot:after>
                    <q-tab-panels animated vertical transition-prev="jump-up" transition-next="jump-down" v-model="tab2">
                        <!-- Create a panel for each archetype -->
                        <q-tab-panel :name="scheme.name" v-for="(scheme, archIndex) in inventorySt.schemes">

                            <!-- Header -->
                            <div style="display: flex; align-content: space-between; justify-content: space-between;">
                                <h3 style="margin-top: 1vh; margin-bottom: 1vh;">Manage Items</h3>
                                <span></span>
                                <CloseButton/>
                            </div>

                            <!-- Table -->
                            <div class="q-pa-md">
                                <q-table row-key="name"
                                         style="height: 79vh; margin-bottom: 1.5vh;"
                                         separator="cell"
                                        :rows="inventorySt.rows(scheme.name)"
                                        :columns="inventorySt.columns(scheme.name)"
                                        :rows-per-page-options="[0]">

                                    <!-- Allows for custom html in each table slot -->
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td :key="col.name" :props="props" v-for="(col, index) in inventorySt.columns(scheme.name)">

                                                <!-- Data Input -->
                                                <div v-if="col.name != 'lend'">

                                                    <!-- Text input -->
                                                    <div v-if="scheme.fieldTypes[index] === 0 ">
                                                        {{ props.row[col.name] }}
                                                        <q-popup-edit buttons
                                                                      v-model="props.row[col.name]"
                                                                      v-slot="scope"
                                                                     :title="`Update ${col.label}`"
                                                                     @save="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)">
                                                            <q-input dense autofocus v-model="scope.value"/>
                                                        </q-popup-edit>
                                                    </div>

                                                    <!-- Number input -->
                                                    <div v-if="scheme.fieldTypes[index] === 1 ">
                                                        {{ props.row[col.name] }}
                                                        <q-popup-edit buttons
                                                                      v-model="props.row[col.name]"
                                                                      v-slot="scope"
                                                                     :validate="validateNum"
                                                                     :title="`Update ${col.label}`"
                                                                     @hide="validateNum"
                                                                     @save="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)">
                                                            <q-input dense autofocus v-model="scope.value" error-message="Value must be a number!" :error="inputErr"/>
                                                        </q-popup-edit>
                                                    </div>

                                                    <!-- Selection input -->
                                                    <div v-if="scheme.fieldTypes[index] === 2 ">
                                                        <q-select outlined
                                                                  v-model="props.row[col.name]"
                                                                 :options="scheme.fieldDefault[index].map(i => i.value)"
                                                                 @update:model-value="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)"/>
                                                    </div>

                                                    <!-- Date input -->
                                                    <div v-if="scheme.fieldTypes[index] === 3 ">
                                                        <q-input filled
                                                                 type="date"
                                                                 v-model="props.row[col.name]"
                                                                @update:model-value="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)"/>
                                                    </div>

                                                    <!-- Checkbox input -->
                                                    <div v-if="scheme.fieldTypes[index] === 4 ">
                                                        <q-checkbox v-model="props.row[col.name]"
                                                                   @update:model-value="(val) => inventorySt.setItemField(archIndex, props.rowIndex, index, val)"/>
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

                                <!-- Footer -->
                                <div style="display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between;">
                                    <div class="wide-flexbox" style="width: 40%;">
                                        <q-btn color="primary" label="New Item"         class="manage-items-button" @click="inventorySt.createDefaultItem(archIndex)"/>
                                        <q-btn color="primary" label="Edit Item Type"   class="manage-items-button" @click="editArc = true; itemsSt.focused_archetype = scheme.name"/>
                                        <q-btn color="red"     label="Delete Item Type" class="manage-items-button" @click="deleteSelected = [archIndex]; confirmArch = true"/>
                                    </div>

                                    <div class="wide-flexbox" style="width: 3%;">
                                        <q-btn color="primary" label="Exit" class="manage-items-button" v-close-popup/>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>

        <!-- Confirm delete item dialogue -->
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

        <!-- Confirm delete archetype dialogue -->
        <q-dialog v-model="confirmArch" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <q-avatar icon="delete" color="red" text-color="white" />
                    <span class="q-ml-sm">Are you sure you want to delete this item type? This cannot be undone.</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancel" color="primary" v-close-popup />
                    <q-btn flat label="Delete" color="red" v-close-popup @click="inventorySt.deleteArchetype(deleteSelected[0]); tab2 = inventorySt.schemes[0].name"/>
                </q-card-actions>
            </q-card>
        </q-dialog>

        <EditArchetype v-model="editArc"/>
    </q-dialog>
</template>

<script>
    import { ref } from 'vue'
    import { defineComponent } from 'vue'

    import { useInventory } from '/src/stores/useInventory'
    import { useSelf } from '../../stores/useSelf'
    import { itemsLocal } from '/src/stores/itemsLocal'
    import { create_pdf } from '/src/scripts/pdf'
    import CloseButton from '/src/components/CloseButton.vue'
    import EditArchetype from './EditArchetype.vue'

    const inventorySt = useInventory()
    const itemsLocalPage = itemsLocal()
    const selfSt = useSelf()

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
            return {
                inventorySt,
                itemsSt: itemsLocalPage,
                selfSt,

                tab2: ref(inventorySt.schemes[0].name),

                editArc: ref(false),
                confirm: ref(false),
                confirmArch: ref(false),

                splitterModel: ref(10),

                search: ref(""),

                inputErr: ref(false),
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

<style scoped>
    .manage-items-button {
        height: 70%; width: 46%; margin-top: 1vh;
    }

    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%;
    }

    .q-ml-sm {
        font-size: 24px;
    }
</style>
