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
                        <h3>Manage Users and Roles</h3>
                        <span>
                            <!-- TODO: Help button -->
                            <CloseButton />
                        </span>
                    </div>

                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel v-for="role in currentRoles.roles" :name="role.name" style="margin-left: 2vw;">
                            <div>
                                <h3>{{ role.name }}</h3>

                                <q-card>
                                    <q-card class="archetype-rows">
                                        <span></span>
                                        <span class="roles-popup-titles">Can Loan</span>
                                        <span class="roles-popup-titles">Can Return</span>
                                        <span class="roles-popup-titles">Can Modify</span>
                                    </q-card>
                                    <q-separator />
                                    <!-- Rows -->
                                    <!-- Iterates through role.archetype instead of inventorySt.schemes because all schemes and their permissions are added to the role in the People Store -->
                                    <q-card v-for="scheme in role.archetype_permissions" class="archetype-rows">
                                        <span class="roles-popup-text">{{ scheme.name }}</span>
                                        <q-checkbox v-model="scheme.loan"/>
                                        <q-checkbox v-model="scheme.handBack"/>
                                        <q-checkbox v-model="scheme.edit"/>
                                    </q-card>
                                </q-card>

                                <!-- 3 Columns -->
                                <!-- <div class="column" style="height: 70vh; display: flex; flex-flow: row nowrap; justify-content: space-between; width: 100%;">
                                    
                                    <div class="row col col-4">
                                        <div class="subheading col-2">
                                            <p class="roles-popup-titles">Can Loan</p>
                                        </div>

                                        <div class="col-10 checkbox-container">
                                            <q-checkbox left-label v-model="canLoan[scheme.name]" v-for="scheme in inventorySt.schemes" :label="scheme.name" class="roles-popup-text"/>
                                        </div>
                                    </div>

                                    <div class="row col col-4">
                                        <div class="subheading col-2">
                                            <p class="roles-popup-titles">Can Return</p>
                                        </div>

                                        <div class="col-10 checkbox-container">
                                            <q-checkbox left-label v-model="canReturn[scheme.name]" v-for="scheme in inventorySt.schemes" :label="scheme.name" class="roles-popup-text"/>
                                        </div>
                                    </div>

                                    <div class="row col col-4">
                                        <div class="subheading col-2">
                                            <p class="roles-popup-titles">Can Modify</p>
                                        </div>

                                        <div class="col-10 checkbox-container">
                                            <q-checkbox left-label v-model="canModify[scheme.name]" v-for="scheme in inventorySt.schemes" :label="scheme.name" class="roles-popup-text"/>
                                        </div>
                                    </div>
                                </div> -->
                            </div>
                            <div style="display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between;">
                                <span></span>
                                <div class="wide-flexbox" style="width: 5%;">
                                    <q-btn color="red" label="Revert" class="manage-users-button" @click="currentRoles = []; originalRoles.forEach(role => {currentRoles.push(role.copy())})"/>
                                    <q-btn color="primary" label="Save and Exit" class="manage-users-button" v-close-popup/>
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

    let originalRoles = []
    let currentRoles = []

    peopleSt.roles.forEach(role => {
        originalRoles.push(role.copy())
        currentRoles.push(role.copy())
    })

    export default defineComponent({
        name: 'Manage Users',
        components: { CloseButton },
        setup () {
            return {
                peopleSt,
                inventorySt,

                originalRoles,
                currentRoles,

                tab: ref(currentRoles[0].name),
                splitterModel: ref(10)
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

    .archetype-row {
        display: flex;
        width: 100%;
        flex-flow: row nowrap;
        justify-content: space-evenly;
        align-content: center;
    }

    
    .manage-users-button {
        height: 70%; width: 46%; margin-top: 1vh;
    }

</style>