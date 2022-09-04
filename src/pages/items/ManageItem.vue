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
                        <q-tab-panel v-for="scheme in inventorySt.schemes" :name="scheme.name">
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
                                                    <!-- Text and number input -->
                                                    <div v-if="scheme.fieldTypes[index] <= 1 ">
                                                        {{ props.row[col.name] }}
                                                        <q-popup-edit v-model="props.row[col.name]" :title="`Update ${col.label}`" buttons v-slot="scope">
                                                            <q-input v-model="scope.value" dense autofocus />
                                                        </q-popup-edit>
                                                    </div>

                                                    <!-- Selection input -->
                                                    <div v-if="scheme.fieldTypes[index] === 2 ">
                                                        <q-select outlined v-model="props.row[col.name]" :options="scheme.fieldDefault[index].map(i => i.value)"/>
                                                    </div>

                                                    <!-- Date input -->
                                                    <div v-if="scheme.fieldTypes[index] === 3 ">
                                                        <q-input v-model="props.row[col.name]" filled type="date" />
                                                    </div>

                                                    <!-- Checkbox input -->
                                                    <div v-if="scheme.fieldTypes[index] === 4 ">
                                                        <q-checkbox v-model="props.row[col.name]" />
                                                    </div>
                                                </div>

                                                <!-- Delete button -->
                                                <div v-if="col.name === 'lend'">
                                                    <q-btn color="red" label="Delete Item"/>
                                                </div>
                                            </q-td>
                                        </q-tr>
                                    </template>
                                </q-table>

                                <div style="display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between;">
                                    <div class="wide-flexbox" style="width: 30%;">
                                        <q-btn color="primary" label="New Item" class="manage-items-button"/>
                                        <q-btn color="primary" label="Edit Archetype" class="manage-items-button" @click="editArc = true"/>
                                    </div>
                                    <div class="wide-flexbox" style="width: 30%;">
                                        <q-btn color="primary" label="Cancel" class="manage-items-button" v-close-popup/>
                                        <q-btn color="primary" label="Save and Exit" class="manage-items-button" v-close-popup/>
                                    </div>
                                </div>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
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
            return {
                tab2: ref("archetype1"),
                inventorySt: inventory,
                itemsSt: itemsPage,
                itemsLocalSt: itemsLocal,
                editArc: ref(false),
                splitterModel: ref(10),
                search: ref(""),

                archColumns: archetypeColumns,
                create_pdf
            }
        }
    })
</script>