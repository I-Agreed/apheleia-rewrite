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
                        <q-input outlined label="Search" style="height: 70%; width: 80%;"/>
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
                <q-table :rows="rows" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]">
                    <!-- Roles selection box -->
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

        <!-- Invite user popup -->
        <q-dialog v-model="invite">
            <InviteUsers url="https://apheleia.com/1bh3tg"/>
        </q-dialog>

        <!-- manage users popup -->
        <q-dialog v-model="manage" full-width>
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
                manage: ref(false),
                tab: ref('role1'),
                splitterModel: ref(10),
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

.roles-popup-titles {
    font-size: 18pt;
}

.roles-popup-text {
    font-size: 14pt;
}
</style>