<template>
    <h3 class="absolute-left" style="padding-left: 10%;">people.</h3>
    <q-page class="absolute-center flex flex-center" id="people-container">
        <div class="column" style="width: 100%; height: 80%;">
            <div class="col col-1" style="width: 100%;">
                <div class="row" style="width: 100%; height: 100%;">
                    <div class="col-8">
                        <q-input outlined label="Search" style="height: 70%; width: 80%;"/>
                    </div>
                    <div class="col-2">
                        <q-btn color="primary" label="Manage Roles" style="height: 70%; width: 80%; margin-left: 20%;"/>
                    </div>
                    <div class="col-2">
                        <q-btn color="primary" label="Invite Users" style="height: 70%; width: 80%; margin-left: 20%;" @click="invite = true"/>
                    </div>
                </div>
            </div>
            <div class="col col-11" style="width: 100%;">
                <q-table :rows="rows" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]">
                    <template v-slot:body-cell-role="props">
                        <q-td :props="props">
                        <div>
                            <q-select filled v-model="props.value" :options="['Teacher', '2', '3']"/>
                        </div>
                    </q-td>
                    </template>
                </q-table>
            </div>
        </div>

        <!-- popups -->
        <q-dialog v-model="invite">
            <InviteUsers url="https://apheleia.com/1bh3tg"/>
        </q-dialog>
    </q-page>
</template>
  
<script>
    import { defineComponent, ref } from 'vue'
    import InviteUsers from 'src/components/InviteUsers.vue'
  
    const columns = [
        { name: 'id', headerStyle: 'width: 20%', align: "center", label: "School ID", field: "id", sortable: true },
        { name: 'name', headerStyle: 'width: 60%', align: "center", label: "Name", field: "name", sortable: true },
        { name: 'role', headerStyle: 'width: 20%', align: "center", label: "Role", field: "role", sortable: true }
    ]

    const rows = [
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" },
        { id: "123456789", name: "John Smith", role: "Teacher" }
    ]

    export default defineComponent({
        name: 'People',
        components: {
            InviteUsers
        },
        setup () {
            return {
                invite: ref(false),
                columns,
                rows
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