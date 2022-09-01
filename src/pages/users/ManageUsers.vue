<template>
    <q-dialog full-width>
        <q-card style="height: 100%;">
            <!-- Splitter which splits horizontally between the tabs and the panels -->
            <q-splitter v-model="splitterModel" style="height: 100%">
                <!-- Tabs -->
                <template v-slot:before>
                    <q-tabs v-model="tab" vertical class="text-primary">
                        <q-tab v-for="role in peopleSt.roles" :name="role.name" :label="role.name" />
                    </q-tabs>
                </template>

                <!-- Panels -->
                <template v-slot:after>
                    <div class="wide-flexbox">
                        <span></span>
                        <CloseButton />
                    </div>
                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel v-for="role in peopleSt.roles" :name="role.name">
                            <div style="margin-left: 2vw;">
                                <h3>{{ role.name }}</h3>

                                <!-- 3 Columns -->
                                <div class="column" style="height: 70vh; display: flex; flex-flow: row nowrap; justify-content: space-between; width: 100%;">
                                    <div class="row col col-4">
                                        <div class="subheading col-2">
                                            <p class="roles-popup-titles">Can Loan</p>
                                        </div>

                                        <div class="col-10 checkbox-container">
                                            <q-checkbox left-label v-model="notifications" v-for="scheme in inventorySt.schemes" :label="scheme.name" class="roles-popup-text"/>
                                        </div>
                                    </div>

                                    <div class="row col col-4">
                                        <div class="subheading col-2">
                                            <p class="roles-popup-titles">Can Return</p>
                                        </div>

                                        <div class="col-10 checkbox-container">
                                            <q-checkbox left-label v-model="notifications" v-for="scheme in inventorySt.schemes" :label="scheme.name" class="roles-popup-text"/>
                                        </div>
                                    </div>

                                    <div class="row col col-4">
                                        <div class="subheading col-2">
                                            <p class="roles-popup-titles">Can Modify</p>
                                        </div>

                                        <div class="col-10 checkbox-container">
                                            <q-checkbox left-label v-model="notifications" v-for="scheme in inventorySt.schemes" :label="scheme.name" class="roles-popup-text"/>
                                        </div>
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
    import { defineComponent, ref } from 'vue'
    
    import { usePeople } from '../../stores/usePeople'
    import { useInventory } from 'src/stores/useInventory'

    import CloseButton from '../../components/CloseButton.vue'

    const peopleSt = usePeople()
    const inventorySt = useInventory()

    export default defineComponent({
        name: 'Manage Users',
        components: { CloseButton },
        setup () {
            return {
                tab: ref('role1'),
                splitterModel: ref(10),
                peopleSt,
                inventorySt,
                search: ref("")
            }
        }
    })

</script>

<style scoped>
    .roles-popup-titles {
        font-size: 18pt;
        width: 100%;
    }

    .checkbox-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: baseline;
        width: 80%;
    }

    .roles-popup-text {
        font-size: 14pt;
        width: 100%;
    }

    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%;
    }

    .column * {
        border: 1px solid red;
    }

    .col {
        width: 30%;
    }

    .subheading {
        display: block;
        width: 100%;
        text-align: center;
    }
</style>