<template>
    <q-dialog full-width>
        <q-card style="height: 100%;">
            <!-- Splitter which splits horizontally between the tabs and the panels -->
            <q-splitter v-model="splitterModel" style="height: 100%">

                <!-- Left side: Tabs -->
                <template v-slot:before>
                    <q-tabs v-model="tab" vertical class="text-primary">
                        <q-tab v-for="role in originalRoles" :name="role.identifier" :label="role.name" />
                        <!-- Not working ATM -->
                        <!-- <q-btn label="New Role" class="absolute-bottom" style="width: 100%;"
                              @click="peopleSt.newRole();
                                      currentRoles = []
                                      originalRoles = []
                                      peopleSt.roles.forEach(role => {
                                          originalRoles.push(role.copy())
                                          currentRoles.push(role.copy())
                                      })
                              "/> -->
                    </q-tabs>
                </template>

                <!-- Right side: Panels -->
                <template v-slot:after>
                    <!-- Heading -->
                    <div class="wide-flexbox" style="padding: 2%;">
                        <h3>Manage Roles</h3>
                        <span>
                            <CloseButton @click="currentRoles = [];
                                                 originalRoles.forEach(role => {currentRoles.push(role.copy())});"/>
                        </span>
                    </div>

                    <!-- Panel data -->
                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel v-for="role in currentRoles" :name="role.identifier" style="margin-left: 2vw; width: 94%;">
                            <div>
                                <q-card style="padding: 5px;">
                                    <!-- Input to change role name -->
                                    <q-input v-model="role.name" style="font-size: xx-large; width: 20%; margin: 40px;"
                                            :rules="[val => (val.length != 0) || 'Please enter a role name!']"/>
                                    
                                    <!-- List of archetype permissions -->
                                    <q-list style="margin: 20px;">
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
                                </q-card>
                            </div>
                        </q-tab-panel>
                    </q-tab-panels>
                    
                    <!-- Footer -->
                    <div style="display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 95%;">
                        <span></span>
                        <div class="wide-flexbox" style="width: 20%;">
                            <q-btn color="red" label="Revert" class="manage-users-button"
                                @click="currentRoles = [];
                                        originalRoles.forEach(role => {currentRoles.push(role.copy())});" />
                            <q-btn color="primary" label="Save" class="manage-users-button"
                                  @click="invalid = false;
                                          currentRoles.forEach(role => { invalid = (role.name.length == 0) ? true : invalid })
                                          if (invalid == false) {
                                              peopleSt.setRoles(currentRoles);
                                              currentRoles.forEach(role => {
                                                  role = role.copy() // Set role.identifier to role.name
                                                  originalRoles.push(role.copy())
                                              });
                                              peopleSt.updateRoles();
                                          }

                                          currentRoles = []
                                          originalRoles = []
                                          peopleSt.roles.forEach(role => {
                                              originalRoles.push(role.copy())
                                              currentRoles.push(role.copy())
                                          })
                                          tab = currentRoles[0].name"/>
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
                splitterModel: ref(10),

                invalid: ref(false)
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
        display: flex;
        flex-flow: row nowrap;
        align-content: center;
        justify-content: space-between;
        width: 100%;
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
        height: 70%;
        width: 100%;
        margin-top: 1vh;
    }

    h3 {
        margin: 0;
    }

</style>