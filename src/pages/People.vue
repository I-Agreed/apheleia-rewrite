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
                              @click="manage = true"/>
                    </div>
                    <div class="col-2" style="width: 45%;"
                         v-if="selfSt.user.role.managePeople == true">
                        <q-btn color="primary" label="Invite Users" class="people-manage-buttons"
                              @click="invite = true"/>
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
                    </q-item>
                    <q-separator />
                    
                    <q-item class="people-list-item"
                            v-for="user in users">
                        <span class="list-id">{{ user.id }}</span><q-separator vertical class="separator"/>
                        <span>{{ user.last_name }}</span>         <q-separator vertical class="separator"/>
                        <span>{{ user.first_name }}</span>        <q-separator vertical class="separator"/>
                        <!-- @input-value Pass in the user's first and last name and their updated role (by name) to the People store to get updated -->
                        <q-select v-model="nameToRoles[user.first_name + user.last_name]" :options="roles"
                                 @click="peopleSt.updateUser(user.first_name, user.last_name, nameToRoles[user.first_name + user.last_name]);
                                         peopleSt.updateRoles()"
                                  v-if="selfSt.user.role.managePeople == true"/>
                        <span     v-else>{{ user.role.name }}</span>
                    </q-item>
                </q-list>
                <!-- <q-table :rows="peopleSt.users.filter((x) => searchFilter(x, search))" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]"> -->
                <!-- <q-table :rows="peopleSt.users" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]"> -->
                    <!-- Roles selection box -->
                    <!-- <template v-slot:body-cell-role="props">
                        <q-td :props="props">
                            <div>
                                <q-select filled v-model="roles" :options="roles"/>
                            </div>
                        </q-td> -->
                        <!-- Delete user -->
                        <!-- <q-td :props="props">
                            <q-btn color="red" label="Remove user" @click="peopleSt.removeUser()"/>
                        </q-td>
                    </template>
                </q-table> -->
            </div>
        </div>

        <!-- Popups -->
        <InviteUsers url="https://apheleia-rewrite.pages.dev/1bh3tg" v-model="invite"/>
        <ManageUsers v-model="manage" />
    </q-page>
</template>
  
<script>
    import { defineComponent, ref } from 'vue'
    
    import { useSelf } from '../stores/useSelf'
    import { usePeople } from '../stores/usePeople'

    import CloseButton from '../components/CloseButton.vue'
    import InviteUsers from './users/InviteUsers.vue'
    import ManageUsers from './users/ManageUsers.vue'

    const peopleSt = usePeople()
    const selfSt = useSelf()

    peopleSt.sortUsers()

    // const columns = [
    //     { name: 'id',         headerStyle: 'width: 12%', align: "center", label: "School ID",  field: "id",         sortable: true },
    //     { name: 'first_name', headerStyle: 'width: 30%', align: "center", label: "First Name", field: "first_name", sortable: true },
    //     { name: 'last_name',  headerStyle: 'width: 30%', align: "center", label: "Last Name",  field: "last_name",  sortable: true },
    //     { name: 'role',       headerStyle: 'width: 20%', align: "center", label: "Role",       field: "roles",      sortable: true }
    // ]

    // const rows = []

    let users = []
    let roles = []
    let nameToRoles = {} // Stores the user's name (e.g JohnSmith) as a key to their role's name (e.g Teacher)
    
    peopleSt.users.forEach(user => {users.push(user)})
    peopleSt.roles.forEach(role => {roles.push(role.name)})
    peopleSt.users.forEach(user => {nameToRoles[user.first_name + user.last_name] = user.role.name})

    export default defineComponent({
        name: 'People',
        components: { CloseButton, InviteUsers, ManageUsers },
        setup () {
            return {
                selfSt,
                peopleSt,

                invite: ref(false),
                manage: ref(false),
                tab: ref('role1'),
                splitterModel: ref(10),
                // columns,
                // rows,


                search: ref(""),
                users: ref(users),
                roles: ref(roles),
                nameToRoles: ref (nameToRoles)

                // searchFilter(item, param) {
                //     // searches through all properties of the item, lowercasing and removing accents as well, might put this on other searches
                //     return Object.values(item).reduce((x, y) => x | y.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(param.toLowerCase()), false);
                // },
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
        align-items: center;
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
</style>