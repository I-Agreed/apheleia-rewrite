<template>
    <!-- Loans title -->
    <h3 class="absolute-left" style="padding-left: 10%;">loans.</h3>
    <q-page class="absolute-center flex flex-center" id="loans-container">
        <!-- columns which split the seach bar and table -->
        <div class="column" style="width: 100%; height: 80%;">
            <!-- Search bar -->
            <div class="col col-1" style="width: 100%;">
                <q-input outlined label="Search" style="height: 70%; width: 53%;"/>
            </div>
            
            <!-- table -->
            <div class="col col-11" style="width: 100%;">
                <q-table :rows="rows" :columns="columns" row-key="name" style="height: 100%;" separator="cell" :rows-per-page-options="[0]"/>
            </div>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
  
    const columns = [
        { name: 'id', headerStyle: 'width: 10%', align: "center", label: "ID", field: "id", sortable: true },
        { name: 'name', headerStyle: 'width: 45%', align: "center", label: "Item Name", field: "name", sortable: true },
        { name: 'borrow', headerStyle: 'width: 15%', align: "center", label: "Borrow Date", field: "borrow", sortable: true },
        { name: 'due', headerStyle: 'width: 15%', align: "center", label: "Due Date", field: "due", sortable: true },
        { name: 'return', headerStyle: 'width: 15%', align: "center", label: "Returned Date", field: "return", sortable: true }
    ]

    const rows = [
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
        { id: "123456789", name: "Item", borrow: "22/02/22", due: "22/02/22", return: "22/02/22" },
    ]

    export default defineComponent({
        name: 'Loans',
        setup () {
            return {
                columns,
                rows
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