<template>
    <h3 class="absolute-left" style="padding-left: 10%;">items.</h3>
    <q-page class="absolute-center flex flex-center" id="items-container">

    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'

    export default defineComponent({
        name: 'Items'
    })
</script>
  
<style scoped>
    #items-container {
        width: 80%;
        height: 80%;
    }
</style>