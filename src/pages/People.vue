<template>
    <h3 class="absolute-left" style="padding-left: 10%;">people.</h3>
    <q-page class="absolute-center flex flex-center" id="people-container">
        <!-- Main Content -->
        <div class="column" style="width: 100%; height: 80%;">

            <!-- Header -->
            <div class="col col-1 wide-flexbox row" style="width: 100%;">
                <!-- Left: Search bar -->
                <span style="display: flex; justify-content: flex-start; width: 50%;">
                    <q-input outlined v-model="search" label="Search" style="display: inline; height: 70%; width: 80%;"/>
                    <span style="margin: auto auto; color: grey;">*Sorted by last name</span>
                </span>

                <!-- Right: Buttons -->
                <span style="width: 30%; display: flex; flex-flow: row nowrap; justify-content: flex-end; align-content: baseline;">
                    <div class="col-2" style="width: 45%; margin-right: auto;"
                         v-if="selfSt.user.role.managePeople == true">
                        <q-btn color="primary" label="Manage Roles" class="people-manage-buttons"
                              @click="managePop = true"/>
                    </div>
                    <div class="col-2" style="width: 45%;"
                         v-if="selfSt.user.role.managePeople == true">
                        <q-btn color="primary" label="Invite Users" class="people-manage-buttons"
                              @click="invitePop = true"/>
                    </div>
                </span>
            </div>

            <!-- List -->
            <div class="col col-11" style="width: 100%;">

                <q-list class="list-container">
                    <q-item class="people-list-item">
                        <span class="list-id list-title">ID</span><q-separator vertical class="separator"/>
                        <span>Last Name</span>                    <q-separator vertical class="separator"/>
                        <span>First Name</span>                   <q-separator vertical class="separator"/>
                        <span>Role</span>
                        <q-separator vertical class="separator"/>

                        <span class="remove-column" v-if="selfSt.user.role.managePeople == true"></span>
                        <span class="remove-column" v-else></span>
                    </q-item>
                    <q-separator />
                    
                    <!-- Note: Used 'person in peopleSt.users' over 'user in peopleSt.users' to differentiate between 'user' and 'selfSt.user' -->
                    <q-item class="people-list-item"
                            v-for="person in peopleSt.users.filter((x) => searchFilter(x, search))">
                        <span class="list-id">{{ person.id }}</span><q-separator vertical class="separator"/>
                        <span>{{ person.last_name }}</span>         <q-separator vertical class="separator"/>
                        <span>{{ person.first_name }}</span>        <q-separator vertical class="separator"/>
                        <!-- Only show the change role select if the current user can managePeople,
                             they aren't changing their own role -->
                        <q-select v-model="person.role" :options="peopleSt.roles" option-label="name"
                                  v-if="selfSt.user.role.managePeople == true &&
                                        selfSt.user.first_name != person.first_name"/>
                        <span v-else>{{ person.role.name }}</span>
                        <q-separator vertical class="separator"/>

                        <q-btn color="red" label="Remove user" class="remove-column"
                              @click="removeUserPop = true;
                                      removeUserFirstName = person.first_name;
                                      removeUserLastName = person.last_name;"
                               v-if="selfSt.user.role.managePeople == true && selfSt.user.first_name != person.first_name"/>
                        <span v-else class="remove-column"></span>
                    </q-item>
                </q-list>
            </div>
        </div>

        <!-- Popups -->
        <InviteUsers url="https://apheleia-rewrite.pages.dev/1bh3tg" v-model="invitePop"/>
        <ManageRoles v-model="managePop" />
        <ConfirmRemoveUser v-model="removeUserPop" :firstName="removeUserFirstName" :lastName="removeUserLastName" />
    </q-page>
</template>
  
<script>
    import { defineComponent, ref } from 'vue'
    
    import { useSelf } from '../stores/useSelf'
    import { usePeople } from '../stores/usePeople'

    import CloseButton from '../components/CloseButton.vue'
    import InviteUsers from './users/InviteUsers.vue'
    import ManageRoles from './users/ManageRoles.vue'
    import ConfirmRemoveUser from './users/ConfirmRemoveUser.vue'

    const peopleSt = usePeople()
    const selfSt = useSelf()

    peopleSt.sortUsers()

    let removeUserFirstName = ''

    export default defineComponent({
        name: 'People',
        components: { CloseButton, InviteUsers, ManageRoles, ConfirmRemoveUser },
        setup () {
            return {
                selfSt,
                peopleSt,

                invitePop: ref(false),
                managePop: ref(false),
                removeUserPop: ref(false),

                removeUserFirstName: ref(''),
                removeUserLastName: ref(''),

                search: ref(""),

                searchFilter(item, param) {
                    // searches through all properties of the item, lowercasing and removing accents as well, might put this on other searches
                    return Object.values(item).filter((x) => x !== undefined).reduce((x, y) => x | y.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(param.toLowerCase()), false);
                },
            }
        }
    })
</script>

<style scoped>
    #people-container {
        width: 80%;
        height: 80%;
    }

    .wide-flexbox {
        display: flex;
        flex-flow: row nowrap;
        width: 100%;
        justify-content: space-between;
        align-content: baseline;
    }

    .list-container {
        margin: auto 7vw;
        margin-top: 20px;
    }

    .people-list-item {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center; padding: 0;
    }

    .people-list-item > * {
        width: 20%;
    }

    .separator {
        width: 1px;
    }

    .list-id {
        width: 10%;
        text-align: right;
    }

    .people-manage-buttons {
        height: 70%; width: 100%;
    }

    .remove-column {
        width: 10%;
    }
</style>