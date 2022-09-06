<template>
    <div class="col col-6">
        <div class="q-pa-md" style="height: 100%;">
            <!-- Loan History Title -->
            <h5>Loan History</h5>
            <!-- Load information from the store into a table -->
            <q-table row-key="name"
                     style="height: 100%;"
                     separator="cell"
                    :rows="selfSt.historyLoansRows()"
                    :columns="selfSt.historyLoansColumns"
                    :hide-pagination="true"
                    :rows-per-page-options="[0]" />
        </div>
    </div>
</template>

<script>
    import { defineComponent } from 'vue'
    
    import { useSelf } from '../../stores/useSelf'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Dashboard History',
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