<template>
    <h3 class="absolute-left" style="padding-left: 10%;">items.</h3>
    <q-page class="absolute-center flex flex-center" id="items-container">
        <div class="column" style="width: 100%; height: 80%;">
            <div class="col col-1" style="width: 100%;">
                <div class="row" style="width: 100%; height: 100%;">
                    <div class="col-8">
                        <q-input outlined label="Search" style="height: 70%; width: 80%;"/>
                    </div>
                    <div class="col-2">
                        <q-btn color="primary" label="Print Items" style="height: 70%; width: 80%; margin-left: 20%;"/>
                    </div>
                    <div class="col-2">
                        <q-btn color="primary" label="Manage Items" style="height: 70%; width: 80%; margin-left: 20%;"/>
                    </div>
                </div>
            </div>
            <div class="col col-11" style="width: 100%;">
                <q-card style="height: 100%;">
                    <q-tabs v-model="tab" active-color="primary" indicator-color="primary" align="justify">
                        <q-tab v-for="scheme in inventorySt.schemes" :name="scheme.name" :label="scheme.name" />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab" animated style="height: 95%;">
                        <q-tab-panel v-for="scheme in inventorySt.schemes" :name="scheme.name" >
                            <div>
                                <q-table :rows="rows" :columns="columns" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell">
                                    <template v-slot:body-cell-lend="props">
                                        <q-td :props="props">
                                            <q-btn color="primary" label="Lend Item"/>
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
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'
    
    import { useInventory } from '../stores/useInventory.js'
    import { itemsLocal } from '../stores/itemsLocal'
    
    const inventory = useInventory()
    const itemsPage = itemsLocal()
    
    let columns = []
    inventory.schemes.forEach()
    
    const columns = [
        { name: 'name', align: "center", label: "Item Name", field: "name", sortable: true },
        { name: 'id', align: "center", label: "ID", field: "id", sortable: true },
        { name: 'property1', align: "center", label: "Property 1", field: "property1", sortable: true },
        { name: 'property2', align: "center", label: "Property 2", field: "property2", sortable: true },
        { name: 'property3', align: "center", label: "Property 3", field: "property3", sortable: true },
        { name: 'lend', headerStyle: 'width: 10%', align: "center", label: "", field: "lend", sortable: false }
    ]

    const rows = [
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
        { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    ]

    export default defineComponent({
        name: 'Items',
        setup () {
            return {
                columns,
                rows,
                tab: ref('archetype1'),
                inventorySt: inventory,
                itemsSt: itemsPage
            }
        }
    })
</script>
  
<style scoped>
    #items-container {
        width: 80%;
        height: 80%;
    }
</style>