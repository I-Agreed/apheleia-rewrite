<template>
    <h3 class="absolute-left" style="padding-left: 10%;">dashboard.</h3>
    <q-page class="absolute-center flex flex-center" id="dash-container">
        <!-- Container for the two columns -->
        <div class="row" style="width: 100%; height: 80%;">
            <!-- Left column -->
            <div class="column col-7" style="height: 100%;">
                <!-- Current Loans on the top left -->
                <div class= "col col-6">
                    <h5>Current Loans</h5>
                    <!-- Table of current loans -->
                    <div class="q-pa-md" style="height: 85%;">
                        <q-table :rows="rows" :columns="columns" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell"/>
                    </div>
                </div>

                <!-- Loan history on bottom left -->
                <div class= "col col-6">
                    <h5>Loan History</h5>
                    <!-- Table of loan history -->
                    <div class="q-pa-md" style="height: 100%;">
                        <q-table :rows="rows" :columns="columns" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell"/>
                    </div>
                </div>
            </div>
            <!-- Right column -->
            <div class="col-5">
                <h5>Notifications</h5>
                <!-- List for notifications -->
                <NotificationsPanel />
            </div>
        </div>
    </q-page>
</template>
  
<script>
    import { useSelf } from '../stores/useSelf'
    import NotificationsPanel from './dashboard/Notifications.vue'

    const selfSt = useSelf()


    const columns = [
        { name: 'name', align: "center", label: "Item", field: row => row.name, sortable: true },
        { name: 'lent', align: "center", label: "Lent On", field: "lent", sortable: true },
        { name: 'due', align: "center", label: "Due By", field: "due", sortable: true }
    ]

    const rows = [
        { name: "Item 1", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 2", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 3", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 4", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 5", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 6", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 7", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 8", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 9", lent: "02/02/2022", due: "22/02/2022" },
        { name: "Item 10", lent: "02/02/2022", due: "22/02/2022" }
    ]

    const notifications = [
        "This is a notification.",
        "This is a notification.",
        "This is a notification.",
        "This is a notification.",
        "This is a notification.",
        "This is a notification.",
        "This is a notification.",
        "This is a notification.",
        "This is a notification."
    ]
    
    import { defineComponent } from 'vue'
  
    export default defineComponent({
        name: 'Dashboard',
        setup () {
            return {
                selfSt,
                columns,
                rows,
                notifications
            }
        }
    })
</script>

<style scoped>
#dash-container {
    width: 80%;
    height: 80%;
}

h5 {
    margin-top: 0px;
    margin-bottom: 1vh;
}
</style>