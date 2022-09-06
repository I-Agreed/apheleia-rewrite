<template>
    <div class="col col-6">
        <div class="q-pa-md" style="height: 85%;">
            <!-- Current Loans Title -->
            <h5>Current Loans</h5>
<<<<<<< HEAD

            <!-- Current Loans Table -->
            <q-table :rows="selfSt.currentLoansRows()" :columns="selfSt.currentLoansColumns" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell"/>
=======
            <!-- Load information from the store into a table -->
            <q-table row-key="name"
                     style="height: 100%;"
                     separator="cell"
                    :rows="selfSt.currentLoansRows()"
                    :columns="selfSt.currentLoansColumns"
                    :hide-pagination="true"
                    :rows-per-page-options="[0]" />
>>>>>>> 771e4f3d407b429780f9088388a1ceb7601bbe48
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    import { useSelf } from '../../stores/useSelf'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Dashboard Loans',
        setup () {
            return {
                selfSt
            }
        }
    })
</script>

<style scoped>
    h5 {
        margin-top: 0px;
        margin-bottom: 1vh;
    }
</style>