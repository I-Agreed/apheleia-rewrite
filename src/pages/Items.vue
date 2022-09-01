<template>
    <h3 class="absolute-left" style="padding-left: 10%;">items.</h3>
    <q-page class="absolute-center flex flex-center" id="items-container">
        <!-- Columns to seperate the search bar/buttons and the tavle -->
        <div class="column" style="width: 100%; height: 80%;">
            <!-- Contains search bar and buttons -->
            <div class="col col-1" style="width: 100%;">
                <div class="row" style="width: 100%; height: 100%;">
                    <!-- Search Bar -->
                    <div class="col-8">
                        <q-input outlined label="Search" style="height: 70%; width: 80%;" v-model="search"/>
                    </div>

                    <!-- Buttons -->
                    <div class="col-2">
                        <q-btn color="primary" label="Print Items" style="height: 70%; width: 80%; margin-left: 20%;" @click="create_pdf(inventorySt.schemes)"/>
                    </div>
                    <div class="col-2">
                        <q-btn color="primary" label="Manage Items" style="height: 70%; width: 80%; margin-left: 20%;" @click="manage = true"/>
                    </div>
                </div>
            </div>

            <!-- Contains the items tabs and tables -->
            <div class="col col-11" style="width: 100%;">
                <q-card style="height: 100%;">
                    <!-- Top Tabs -->
                    <q-tabs v-model="tab" active-color="primary" indicator-color="primary" align="justify">
                        <q-tab v-for="scheme in inventorySt.schemes" :name="scheme.name" :label="scheme.name" @click="itemsSt.tabbedSchemeName = scheme.name" />
                    </q-tabs>
                    <q-separator />
                    <!-- Panels containing tavles -->
                    <q-tab-panels v-model="tab" animated style="height: 95%;">
                        <q-tab-panel v-for="scheme in inventorySt.schemes" :name="scheme.name" >
                            <div>
                                <!-- The Tables themselves which hold the data -->
                                <q-table :rows="inventorySt.rows(scheme.name).filter((x) => searchFilter(x, search))" :columns="inventorySt.columns(scheme.name)" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell">
                                    <!-- Lend Item button -->
                                    <template v-slot:body-cell-lend="props">
                                        <q-td :props="props">
                                            <q-btn color="primary" label="Lend Item" @click="lend = true"/>
                                        </q-td>
                                    </template>
                                </q-table>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>
        </div>
    </q-page>

    <!-- popups -->

    <!-- lend item popup -->
    <q-dialog v-model="lend">
        <q-card style="width: 100%;">
            <div class="wide-flexbox">
                <q-card-section>
                    <h3 style="margin-top: 10px; margin-bottom: 20px;">Lend Item</h3>
                </q-card-section>
    
                <q-card-actions style="padding-bottom: 5%;" align="right">
                    <CloseButton/>
                </q-card-actions>

            </div>


            <q-card-section class="q-pt-none">
            Lend to:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-select
                    filled
                    :model-value="model"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="options"
                    @input-value="setModel"
                    style="width: 250px; padding-bottom: 32px"
                >     
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </q-card-section>

            <q-card-section class="q-pt-none">
            Lend until:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-input v-model="time" filled type="date" />
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <!-- manage item popup -->
    <q-dialog v-model="manage" full-width>
        <q-card style="height: 100%;">
            <!-- Splitter splits vertically between tabs and panels -->
            <q-splitter v-model="splitterModel" style="height: 100%">
                <!-- Tabs on the left -->
                <template v-slot:before>
                    <q-tabs v-model="tab2" vertical class="text-primary">
                        <q-tab name="archetype1" label="Archetype 1" />
                        <q-tab name="archetype2" label="Archetype 2" />
                        <q-tab name="archetype3" label="Archetype 3" />
                        <q-btn label="New Achetype" class="absolute-bottom" style="width: 100%;"/>
                    </q-tabs>
                </template>

                <!-- Panels on the right -->
                <template v-slot:after>
                    <q-tab-panels v-model="tab2" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel name="archetype1">
                            <div style="display: flex; align-content: space-between; justify-content: space-between;">
                                <span></span>
                                <CloseButton/>
                            </div>
                            <div class="q-pa-md">
                                <q-table :rows="tempRow" :columns="tempCol" row-key="name" style="height: 83vh;" separator="cell" :rows-per-page-options="[0]">
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td v-for="col in tempCol" :key="col.name" :props="props">
                                                {{ props.row[col.name] }}
                                                <q-popup-edit v-model="props.row[col.name]" :title="`Update ${col.label}`" buttons v-slot="scope">
                                                    <q-input v-model="scope.value" dense autofocus />
                                                </q-popup-edit>
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
    </q-dialog>

    <!-- edit archetype popup -->
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
    
    import { useInventory } from '../stores/useInventory.js'
    import { itemsLocal } from '../stores/itemsLocal'
    import CloseButton from '../components/CloseButton.vue'
    
    import { create_pdf } from 'src/scripts/pdf'

    const inventory = useInventory()
    const itemsPage = itemsLocal()

    
    // let columns = {}
    /*
    columns = {
        schemename: [
            {}, // field name
            {},
            {}
        ]
    }
    */
    // inventory.schemes.forEach(scheme => {
    //     let key = scheme.name
    //     columns.key = []
    //     scheme.fieldNames.forEach(fieldName => {
    //         columns.key.push({ name: fieldName, align: "center", label: fieldName, field: fieldName, sortable: true })
    //     })
    // })

    // console.log(columns)
    
    const archetypeColumns = [
        { name: 'property', align: "center", label: "Property", field: "property", sortable: true },
        { name: 'propertyType', align: "center", label: "Property Type", field: "propertyType", sortable: true },
        { name: 'defaultValue', align: "center", label: "Default Value", field: "defaultValue", sortable: true },
        { name: 'delete', field: "delete", headerStyle: 'width: 3%'}
    ]

    const lendOptions = [
        "abcd",
        "efgh",
        "ijkl",
        "mnop",
        "1234"
    ]

    export default defineComponent({
        name: 'Items',
        components: { CloseButton },
        setup () {
            const model = ref(null)
            const options = ref(lendOptions)

            return {
                tab: ref(inventory.schemes[0].name),
                tab2: ref("archetype1"),
                inventorySt: inventory,
                itemsSt: itemsPage,
                lend: ref(false),
                manage: ref(false),
                editArc: ref(false),
                model,
                options,
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

                setModel (val) {
                    model.value = val
                },

                create_pdf
            }
        }
    })
</script>
  
<style scoped>
    #items-container {
        width: 80%;
        height: 80%;
    }

    .manage-items-button {
        height: 70%; width: 46%; margin-top: 1vh;
    }

    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%;
    }
</style>