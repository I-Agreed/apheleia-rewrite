<template>
    <h3 class="absolute-left" style="padding-left: 10%;">dashboard.</h3>
    <q-page class="absolute-center flex flex-center" id="dash-container">
        <!-- Container for the two columns -->
        <div class="row" style="width: 100%; height: 80%;">
            <!-- Left column -->
            <div class="column col-7" style="height: 100%;">
                <LoansPanel />
                <HistoryPanel />
            </div>
            <!-- Right column -->
            <div class="col-5">
                <NotificationsPanel />
            </div>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { useInventory } from '../stores/useInventory.js'
    import LoansPanel from './dashboard/Loans.vue'
    import HistoryPanel from './dashboard/History.vue'
    import NotificationsPanel from './dashboard/Notifications.vue'

    const inventorySt = useInventory()
    inventorySt.updateArchetypes()
    
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
  
    export default defineComponent({
        name: 'Dashboard',
        components: { LoansPanel, HistoryPanel, NotificationsPanel },
        setup () {
            return {
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