<template>
    <!-- People title -->
    <h3 class="absolute-left" style="padding-left: 10%;">people.</h3>
    <q-page class="absolute-center flex flex-center" id="people-container">
        <!-- Columns to seperate the search bar/buttons from the table -->
        <div class="column" style="width: 100%; height: 80%;">
            <div class="col col-1" style="width: 100%;">
                <!-- Search bar/buttons group -->
                <div class="row" style="width: 100%; height: 100%;">
                    <!-- Search bar -->
                    <div class="col-8">
                        <q-input outlined v-model="search" label="Search" style="height: 70%; width: 80%;"/>
                    </div>

                    <!-- Buttons -->
                    <div class="col-2">
                        <q-btn color="primary" label="Manage Roles" style="height: 70%; width: 80%; margin-left: 20%;" @click="manage = true"/>
                    </div>
                    <div class="col-2">
                        <q-btn color="primary" label="Invite Users" style="height: 70%; width: 80%; margin-left: 20%;" @click="invite = true"/>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="col col-11" style="width: 100%;">
                <!-- <q-table :rows="peopleSt.users.filter((x) => searchFilter(x, search))" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]"> -->
                <q-table :rows="peopleSt.users.filter((x) => searchFilter(x, search))" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]">
                    <!-- Roles selection box -->
                    <template v-slot:body-cell-role="props">
                        <q-td :props="props">
                            <div>
                                <q-select filled v-model="props.value" :options="['Teacher', '2', '3']"/>
                            </div>
                        </q-td>
                        <!-- Delete user -->
                        <q-td :props="props">
                            <q-btn color="red" label="Remove user" @click="lend = true"/>
                        </q-td>
                    </template>
                </q-table>
            </div>
        </div>

        <!-- popups -->

        <!-- Invite user popup -->
        <q-dialog v-model="invite">
            <InviteUsers url="https://apheleia.com/1bh3tg"/>
        </q-dialog>

        <!-- manage users popup -->
        <ManageUsers v-model="manage" />
    </q-page>
</template>
  
<script>
    import { defineComponent, ref } from 'vue'
    
    import { usePeople } from '../stores/usePeople'

    import InviteUsers from 'src/components/InviteUsers.vue'
    import CloseButton from '../components/CloseButton.vue'
    import ManageUsers from './users/ManageUsers.vue'

    const peopleSt = u
    sePeople()

    const columns = [
        { name: 'id',         headerStyle: 'width: 12%', align: "center", label: "School ID",  field: "id",         sortable: true },
        { name: 'first_name', headerStyle: 'width: 30%', align: "center", label: "First Name", field: "first_name", sortable: true },
        { name: 'last_name',  headerStyle: 'width: 30%', align: "center", label: "Last Name",  field: "last_name",  sortable: true },
        { name: 'role',       headerStyle: 'width: 20%', align: "center", label: "Role",       field: "roles",      sortable: true }
    ]

    const rows = [
    ]

    export default defineComponent({
        name: 'People',
        components: { InviteUsers, CloseButton, ManageUsers },
        setup () {
            return {
                invite: ref(false),
                manage: ref(false),
                tab: ref('role1'),
                splitterModel: ref(10),
                columns,
                rows,
                peopleSt,
                search: ref(""),

                searchFilter(item, param) {
                    // searches through all properties of the item, lowercasing and removing accents as well, might put this on other searches
                    return Object.values(item).reduce((x, y) => x | y.toString().normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(param.toLowerCase()), false);
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


</style>