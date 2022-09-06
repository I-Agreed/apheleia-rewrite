<template>
    <div class="col col-6">
        <div class="q-pa-md" style="height: 85%;">
            <!-- Current Loans Title -->
            <h5>Current Loans</h5>

            <!-- Current Loans Table -->
            <q-table :rows="selfSt.currentLoansRows()" :columns="selfSt.currentLoansColumns" row-key="name" :hide-pagination="true" :rows-per-page-options="[0]" style="height: 100%;" separator="cell"/>
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