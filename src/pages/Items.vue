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
                        <q-tab v-for="scheme in inventorySt.schemes" :name="scheme.name" :label="scheme.name" @click="itemsSt.tabbedSchemeName = scheme.name" />
                    </q-tabs>
                    <q-separator />
                    <q-tab-panels v-model="tab" animated style="height: 95%;">
                        <q-tab-panel v-for="scheme in inventorySt.schemes" :name="scheme.name" >
                            <div>
                                <q-table :rows="inventorySt.rows(scheme.name)" :columns="inventorySt.columns(scheme.name)" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell">
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
    <q-dialog v-model="lend">
        <q-card style="width: 100%;">
        <q-card-section>
          <h3 style="margin-top: 10px; margin-bottom: 20px;">Lend Item</h3>
        </q-card-section>

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
            <q-input v-model="time" filled type="date" hint="Native time" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="OK" color="primary" v-close-popup />
        </q-card-actions>
    </q-card>
    </q-dialog>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'
    
    import { useInventory } from '../stores/useInventory.js'
    import { itemsLocal } from '../stores/itemsLocal'
    
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
    
    // const columns = [
    //     { name: 'name', align: "center", label: "Item Name", field: "name", sortable: true },
    //     { name: 'id', align: "center", label: "ID", field: "id", sortable: true },
    //     { name: 'property1', align: "center", label: "Property 1", field: "property1", sortable: true },
    //     { name: 'property2', align: "center", label: "Property 2", field: "property2", sortable: true },
    //     { name: 'property3', align: "center", label: "Property 3", field: "property3", sortable: true },
    //     { name: 'lend', headerStyle: 'width: 10%', align: "center", label: "", field: "lend", sortable: false }
    // ]

    // const rows = [
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    //     { id: "123456789", name: "Item", property1: "abcde", property2: "22/02/22", property3: "123" },
    // ]

    const lendOptions = [
        "abcd",
        "efgh",
        "ijkl",
        "mnop",
        "1234"
    ]

    export default defineComponent({
        name: 'Items',
        setup () {
            const model = ref(null)
            const options = ref(lendOptions)

            return {
                rows,
                tab: ref(inventory.schemes[0].name),
                inventorySt: inventory,
                itemsSt: itemsPage,
                lend: ref(false),
                model,
                options,

                filterFn (val, update, abort) {
                    update(() => {
                        const needle = val.toLocaleLowerCase()
                        options.value = stringOptions.filter(v => v.toLocaleLowerCase().indexOf(needle) > -1)
                    })
                },

                setModel (val) {
                    model.value = val
                }
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