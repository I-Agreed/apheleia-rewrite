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
                    <div class="wide-flexbox" style="padding: 2%;">
                        <h3>Manage Roles</h3>
                        <span>
                            <!-- TODO: Help button -->
                            <!-- <HelpButton /> -->
                            <CloseButton />
                        </span>
                    </div>

                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel v-for="role in currentRoles" :name="role.name" style="margin-left: 2vw; width: 94%;">
                            <div>
                                <h3>{{ role.name }}</h3>

                                <q-list>
                                    <q-item class="archetype-rows">
                                        <span class="archetype-permission"></span>
                                        <span class="roles-popup-titles">Can Loan</span>
                                        <span class="roles-popup-titles">Can Return</span>
                                        <span class="roles-popup-titles">Can Modify</span>
                                    </q-item>
                                    <q-separator />
                                    <!-- Rows -->
                                    <!-- Iterates through role.archetype instead of inventorySt.schemes because all schemes and their permissions are added to the role in the People Store -->
                                    <q-item v-for="scheme in role.archetypePermissions" class="archetype-rows">
                                        <span class="roles-popup-text archetype-permission">{{ scheme.arch }}</span>
                                        <span class="archetype-permission"><q-checkbox v-model="scheme.loan"/></span>
                                        <span class="archetype-permission"><q-checkbox v-model="scheme.handBack"/></span>
                                        <span class="archetype-permission"><q-checkbox v-model="scheme.edit"/></span>
                                    </q-item>
                                </q-list>

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
                        </q-tab-panel>
                    </q-tab-panels>
                    <div style="display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 95%;">
                        <span></span>
                        <div class="wide-flexbox" style="width: 20%;">
                            <q-btn color="red" label="Revert" class="manage-users-button"
                                @click="currentRoles = [];
                                        originalRoles.forEach(role => {currentRoles.push(role.copy())})"/>
                            <q-btn color="primary" label="Save and Exit" class="manage-users-button" v-close-popup
                                @click="peopleSt.setRoles(currentRoles);
                                        currentRoles.forEach(role => {originalRoles.push(role.copy())})
                                        peopleSt.updateRoles()"
                            />
                        </div>
                    </div>
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

    let tab = currentRoles[0].name

    export default defineComponent({
        name: 'Manage Users',
        components: { CloseButton },
        setup () {
            return {
                peopleSt,
                inventorySt,

                originalRoles: ref(originalRoles),
                currentRoles: ref(currentRoles),

                tab: ref(tab),
                splitterModel: ref(10)
            }
        }
    })

</script>

<style scoped>
    .checkbox-container {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: baseline;
        width: 80%;
    }

    .roles-popup-text {
        font-size: 14pt;
    }

    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: center; justify-content: space-between; width: 100%;
        padding: 0;
        margin: 0;
    }

    .wide-flexbox > * {
        margin: 20px;
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

    .roles-popup-titles {
        font-size: 18pt;
        width: 25%;
    }

    .archetype-permission {
        width: 25%;
    }

    .manage-users-button {
        height: 70%; width: 100%; margin-top: 1vh;
    }

    h3 {
        margin: 0;
    }

</style>