<template>
    <h3 class="absolute-left" style="padding-left: 10%;">people.</h3>
    <q-page class="absolute-center flex flex-center" id="people-container">
        <!-- Main Content -->
        <div class="column" style="width: 100%; height: 80%;">

            <!-- Header -->
            <div class="col col-1 wide-flexbox row" style="width: 100%;">
                <!-- Left: Search bar -->
                <span style="width: 50%;">
                    <q-input outlined v-model="search" label="Search" style="height: 70%; width: 80%;"/>
                    <div class="col-8">
                    </div>
                </span>

                <!-- Right: Buttons -->
                <span style="width: 30%; display: flex; flex-flow: row nowrap; justify-content: flex-end; align-content: baseline;">
                    <div v-if="selfSt.ADMIN" class="col-2" style="width: 45%; margin-right: auto;">
                        <q-btn color="primary" label="Manage Roles" style="height: 70%; width: 100%;" @click="manage = true"/>
                    </div>
                    <div class="col-2" style="width: 45%;">
                        <q-btn color="primary" label="Invite Users" style="height: 70%; width: 100%;" @click="invite = true"/>
                    </div>
                </span>
            </div>

            <!-- Table -->
            <div class="col col-11" style="width: 100%;">
                <!-- <q-table :rows="peopleSt.users.filter((x) => searchFilter(x, search))" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]"> -->
                <q-table :rows="peopleSt.users" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]">
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

        <!-- Popups -->
        <InviteUsers url="https://apheleia.com/1bh3tg" v-model="invite"/>
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
        components: { CloseButton, InviteUsers, ManageUsers },
        setup () {
            return {
                selfSt,
                peopleSt,

                invite: ref(false),
                manage: ref(false),
                tab: ref('role1'),
                splitterModel: ref(10),
                columns,
                rows,
                search: ref(""),

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

</style>