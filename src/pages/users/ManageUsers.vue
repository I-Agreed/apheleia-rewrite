<template>
    <q-dialog full-width>
        <q-card style="height: 100%;">
            <!-- Splitter which splits horizontally between the tabs and the panels -->
            <q-splitter v-model="splitterModel" style="height: 100%">
                <!-- Tabs -->
                <template v-slot:before>
                    <q-tabs v-model="tab" vertical class="text-primary">
                        <q-tab name="role1" label="Role 1" />
                        <q-tab name="role2" label="Role 2" />
                        <q-tab name="role3" label="Role 3" />
                    </q-tabs>
                </template>

                <!-- Panels -->
                <template v-slot:after>
                    <div class="wide-flexbox">
                        <span></span>
                        <!-- Close Button component doesn't work here -->
                        <q-btn flat label="" color="primary" v-close-popup>
                            <q-icon name="close" size="sm"/>
                        </q-btn>
                    </div>
                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel name="role1">
                            <div style="margin-left: 2vw;">
                                <!-- Role title -->
                                <h3>Role 1</h3>

                                <!-- splitting the page into 3 columns -->
                                <div class="column" style="height: 70vh;">
                                    <!-- First column, split into rows -->
                                    <div class= "row col col-4" style="width: 70vw;">
                                        <!-- subtitle -->
                                        <div class="col-2">
                                            <p class="roles-popup-titles">loanable archetypes:</p>
                                        </div>

                                        <!-- checkboxes -->
                                        <div class="col-10">
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 1:" class="roles-popup-text"/></div>
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 2:" class="roles-popup-text"/></div>
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 3:" class="roles-popup-text"/></div>
                                        </div>
                                    </div>

                                    <!-- Second column, split into rows -->
                                    <div class= "row col col-4" style="width: 70vw;">
                                        <!-- subtitle -->
                                        <div class="col-2">
                                            <p class="roles-popup-titles">returnable archetypes:</p>
                                        </div>

                                        <!-- checkboxes -->
                                        <div class="col-10">
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 1:" class="roles-popup-text"/></div>
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 2:" class="roles-popup-text"/></div>
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 3:" class="roles-popup-text"/></div>
                                        </div>
                                    </div>

                                    <!-- Third column, split into rows -->
                                    <div class= "row col col-4" style="width: 70vw;">
                                        <!-- subtitle -->
                                        <div class="col-2">
                                            <p class="roles-popup-titles">writable archetypes:</p>
                                        </div>

                                        <!-- checkboxes -->
                                        <div class="col-10">
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 1:" class="roles-popup-text"/></div>
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 2:" class="roles-popup-text"/></div>
                                            <div><q-checkbox left-label v-model="notifications" label="Archetype 3:" class="roles-popup-text"/></div>
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

    import CloseButton from '../../components/CloseButton.vue'

    const peopleSt = usePeople()

    export default defineComponent({
        name: 'Manage Users',
        components: { CloseButton },
        setup () {
            return {
                tab: ref('role1'),
                splitterModel: ref(10),
                peopleSt,
                search: ref("")
            }
        }
    })

</script>

<style scoped>
    .roles-popup-titles {
        font-size: 18pt;
    }

    .roles-popup-text {
        font-size: 14pt;
    }

    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%;
    }
</style>