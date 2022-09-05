<template>
    <h3 class="absolute-left" style="padding-left: 10%;">items.</h3>
    <q-page class="absolute-center flex flex-center" id="items-container">
        <!-- Columns to seperate the search bar/buttons and the table -->
        <div class="column" style="width: 100%; height: 80%;">
            <!-- Contains search bar and buttons -->
            <div class="col col-1" style="width: 100%;">
                <div class="row" style="width: 100%; height: 100%;">
                    <!-- Search Bar -->
                    <div class="col-8">
                        <q-input outlined label="Search" style="height: 70%; width: 80%;" v-model="search"/>
                    </div>

                    <!-- Buttons -->
                    <div class="col-2" v-if="selfSt.role.getArchetypePerms(tab).edit">
                        <q-btn color="primary" label="Print Items" style="height: 70%; width: 80%; margin-left: 20%;" @click="create_pdf(inventorySt.schemes)"/>
                    </div>
                    <div class="col-2" v-if="selfSt.role.getArchetypePerms(tab).edit">
                    <!-- <div class="col-2" v-if="selfSt.role.permissions.canLend"> -->
                        <q-btn color="primary" label="Manage Items" style="height: 70%; width: 80%; margin-left: 20%;" @click="manage = true"/>
                    </div>
                </div>
            </div>

            <!-- Contains the items tabs and tables -->
            <div class="col col-11" style="width: 100%;">
                <q-card style="height: 100%;">
                    <!-- Tabs -->
                    <q-tabs v-model="tab" active-color="primary" indicator-color="primary" align="justify">
                        <q-tab v-for="scheme in inventorySt.schemes" :name="scheme.name" :label="scheme.name" @click="inventorySt.tabbedSchemeName = scheme.name" />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab" animated style="height: 95%;">
                        <!-- Panels containing tables -->
                        <q-tab-panel v-for="scheme in inventorySt.schemes" :name="scheme.name">
                            <q-table :rows="inventorySt.rows(scheme.name).filter((x) => searchFilter(x, search))" :columns="inventorySt.columns(scheme.name)" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell">
                                <!-- Lend Item button -->
                                <template v-slot:body-cell-lend="props">
                                    <q-td :props="props">
                                        <q-btn v-if="!inventorySt.history.checkIfLoaned(props.row.itemId) && selfSt.role.getArchetypePerms(tab).loan" color="primary" label="Lend Item" @click="lend = true; itemsLocalSt.focused_item = props.row.itemId"/>
                                        <q-btn v-if="inventorySt.history.checkIfLoaned(props.row.itemId) && selfSt.role.getArchetypePerms(tab).handBack" color="black" label="Edit Lend" @click="editLend = true; itemsLocalSt.focused_item = props.row.itemId"/>
                                    </q-td>
                                </template>
                            </q-table>
                        </q-tab-panel>
                    </q-tab-panels>
                </q-card>
            </div>
        </div>
    </q-page>

    <!-- Popups -->
    <LendItem      v-model="lend" />
    <ManageItem    v-model="manage" />
    <EditLend      v-model="editLend" />
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'
    
    import { useInventory } from '../stores/useInventory'
    import { useSelf } from '../stores/useSelf'
    import { itemsLocal } from '../stores/itemsLocal'
    import CloseButton from '../components/CloseButton.vue'
    import LendItem from './items/LendItem.vue'
    import EditLend from './items/EditLend.vue'
    import ManageItem from './items/ManageItem.vue'
    
    import { create_pdf } from 'src/scripts/pdf'
    import { stringify } from 'querystring'

    const inventorySt = useInventory()
    const itemsLocalSt = itemsLocal()
    const selfSt = useSelf()

    
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

    export default defineComponent({
        name: 'Items',
        components: { CloseButton, LendItem, ManageItem, EditLend },
        setup () {
            return {
                inventorySt,
                itemsLocalSt,
                selfSt,

                tab: ref(inventorySt.schemes[0].name),
                tab2: ref("archetype1"),

                lend: ref(false),
                editLend: ref(false),
                manage: ref(false),

                splitterModel: ref(10),
                search: ref(""),

                archColumns: archetypeColumns,

                searchFilter(item, param) {
                    // converts item name to lowercase, removes accents (for epée), and checks to see if it contains the search parameters.
                    return Object.values(item).reduce((x, y) => x || String(y).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(param.toLowerCase()), false);
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
