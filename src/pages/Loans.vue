<template>
    <!-- Loans title -->
    <h3 class="absolute-left" style="padding-left: 10%;">loans.</h3>
    <q-page class="absolute-center flex flex-center" id="loans-container">
        <!-- Columns which split the seach bar and table -->
        <div class="column" style="width: 100%; height: 80%;">
            <!-- Search bar -->
            <div class="col col-1" style="width: 100%;">
                <q-input outlined label="Search" style="height: 70%; width: 53%;" v-model="search"/>
            </div>
            
            <!-- Loans table -->
            <div class="col col-11" style="width: 100%;">
                <q-table row-key="name"
                         style="height: 100%;"
                         separator="cell"
                        :rows="selfSt.allLoanRows().filter((x) => searchFilter(x, search))"
                        :columns="columns"
                        :rows-per-page-options="[0]"/>
            </div>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent, ref } from 'vue'
  
    import { useSelf } from '../stores/useSelf'
    import { useInventory } from '../stores/useInventory.js'

    const selfSt = useSelf()
    const inventorySt = useInventory()

    const columns = [
        { name: 'id',       headerStyle: 'width: 10%', align: "center", label: "ID",            field: "id",       sortable: true },
        { name: 'name',     headerStyle: 'width: 40%', align: "center", label: "Item Name",     field: "name",     sortable: true },
        { name: 'borrower', headerStyle: 'width: 20%', align: "center", label: "Borrower",      field: "borrower", sortable: true },
        { name: 'borrow',   headerStyle: 'width: 10%', align: "center", label: "Borrow Date",   field: "borrow",   sortable: true },
        { name: 'due',      headerStyle: 'width: 10%', align: "center", label: "Due Date",      field: "due",      sortable: true },
        { name: 'return',   headerStyle: 'width: 10%', align: "center", label: "Returned Date", field: "return",   sortable: true }
    ]

    export default defineComponent({
        name: 'Loans',
        setup () {
            return {
                selfSt,
                inventorySt,

                columns,

                search: ref(""),

                searchFilter (loan, params) {
                    return Object.values(loan).reduce((x, y) => x || String(y).normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().includes(params.toLowerCase()), false);
                }
            }
        }
    })
</script>
  
<style scoped>
    #loans-container {
        width: 80%;
        height: 80%;
    }
</style>