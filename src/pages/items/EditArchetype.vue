<template>
    <q-dialog v-model="editArc" full-width>
        <q-card style="height: 100%;">
            <div class="q-pa-md">
                <div class="wide-flexbox" style="padding-bottom: 1em;">
                    <span></span>
                    <CloseButton/>
                </div>
                <q-table :rows="inventorySt.archetypeRows('Foil')" :columns="archColumns" row-key="property" style="height: 83vh;" separator="cell" :rows-per-page-options="[0]" hide-bottom>
                    <template v-slot:body="props">
                        <q-tr :props="props">
                            <!-- Modifying the rows of the property column to make them editable -->
                            <q-td key="property" :props="props">
                                {{ props.row.property }}
                                <q-popup-edit v-model="props.row.property" :title="`Update Property`" buttons v-slot="scope">
                                    <q-input v-model="scope.value" dense autofocus />
                                </q-popup-edit>
                            </q-td>
                            
                            <!-- modifying the rows of the property type column to make them editable as a dropdown -->
                            <q-td key="propertyType" :props="props">
                                <q-select outlined v-model="props.row.propertyType" :options="['text', 'number', 'selection', 'date', 'checkbox']"/>
                            </q-td>

                            <!-- modifying the rows of the default value column to make them editable depending on the type -->
                            <q-td key="defaultValue" :props="props">
                                <!-- Plain text editing for text and number type -->
                                <div v-if="props.row.propertyType === 'text' || props.row.propertyType === 'number'">
                                    {{ props.row.defaultValue }}
                                    <q-popup-edit v-model="props.row.defaultValue" :title="`Update Property Default`" buttons v-slot="scope">
                                        <q-input v-model="scope.value" dense autofocus />
                                    </q-popup-edit>
                                </div>

                                <!-- A list of text input boxes for the selection type -->
                                <div v-if="props.row.propertyType === 'selection'">
                                    <div v-for="val in props.row.defaultValue" style="display: flex;">
                                        <q-input outlined v-model="val.value" style="margin-top: 10px; width: 95%;"/>
                                        <!-- Delete button for each input box -->
                                        <q-btn flat round color="red" icon="delete" style="margin-left: 0.6vw;"/>
                                    </div>
                                    <!-- + button to add more input boxes -->
                                    <q-btn color="primary" label="+" style="height: 70%; width: 10%; margin-top: 1vh;" />
                                </div>

                                <!-- Date input for the date type -->
                                <div v-if="props.row.propertyType === 'date'">
                                    <q-input v-model="props.row.defaultValue" filled type="date" />
                                </div>

                                <!-- Checkbox input for the checkbox type -->
                                <div v-if="props.row.propertyType === 'checkbox'">
                                    <q-select outlined v-model="props.row.defaultValue" :options="['true', 'false']"/>
                                </div>
                            </q-td>

                            <!-- Delete button on the right side of each property on table -->
                            <q-td key="delete" :props="props">
                                <q-btn flat round color="red" icon="delete" />
                            </q-td>
                        </q-tr>
                    </template>
                </q-table>
                <!-- New Property and Save buttons -->
                <q-btn color="primary" label="New Property" style="height: 70%; width: 10%; margin-top: 1vh;" />
                <q-btn color="primary" label="Save" style="height: 70%; width: 10%; margin-left: 1vw; margin-top: 1vh;" @click="editArc = true"/>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'
    
    import { useInventory } from '../../stores/useInventory.js'
    import { itemsLocal } from '../../stores/itemsLocal'
    import CloseButton from 'src/components/CloseButton.vue'
    
    import { create_pdf } from 'src/scripts/pdf'

    const inventory = useInventory()
    const itemsPage = itemsLocal()

    
    const archetypeColumns = [
        { name: 'property', align: "center", label: "Property", field: "property", sortable: true },
        { name: 'propertyType', align: "center", label: "Property Type", field: "propertyType", sortable: true },
        { name: 'defaultValue', align: "center", label: "Default Value", field: "defaultValue", sortable: true },
        { name: 'delete', field: "delete", headerStyle: 'width: 3%'}
    ]

    

    export default defineComponent({
        name: 'Items',
        components: { CloseButton },
        setup () {

            return {
                tab: ref(inventory.schemes[0].name),
                tab2: ref("archetype1"),
                inventorySt: inventory,
                itemsSt: itemsPage,
                lend: ref(false),
                manage: ref(false),
                editArc: ref(false),
                splitterModel: ref(10),
                search: ref(""),

                archColumns: archetypeColumns,

                searchFilter(item, param) {
                    // converts item name to lowercase, removes accents (for epée), and checks to see if it contains the search parameters.
                    return item.Name.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(param.toLowerCase());
                },

                filterFn (val, update, abort) {
                    update(() => {
                        const needle = val.toLocaleLowerCase()
                        options.value = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
                    })
                },

                create_pdf
            }
        }
    })
</script>