<template>
    <q-dialog full-width>
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
                                <!-- <q-table :rows="tempRow" :columns="tempCol" row-key="name" style="height: 83vh;" separator="cell" :rows-per-page-options="[0]">
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
                                </q-table> -->
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
</template>

<script>
    import { defineComponent } from 'vue'

    import CloseButton from 'src/components/CloseButton.vue'

    export default defineComponent({
        name: 'Manage Item',
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