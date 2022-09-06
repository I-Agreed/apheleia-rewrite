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
    import { useSelf } from 'src/stores/useSelf'
    import { usePeople } from 'src/stores/usePeople'
    import LoansPanel from './dashboard/Loans.vue'
    import HistoryPanel from './dashboard/History.vue'
    import NotificationsPanel from './dashboard/Notifications.vue'
    import { init_stores } from 'src/scripts/backendApi'

    const inventorySt = useInventory();
    const peopleSt = usePeople();
    const selfSt = useSelf();

    //inventorySt.updateArchetypes()
    
    init_stores(inventorySt, peopleSt, selfSt);

    export default defineComponent({
        name: 'Dashboard',
        components: { LoansPanel, HistoryPanel, NotificationsPanel }
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