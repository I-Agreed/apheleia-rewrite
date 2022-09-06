<template>
    <q-page class="absolute-center flex flex-center" id="about-container">
        <!-- Logo -->
        <q-img src="../assets/logo.svg" spinner-color="white" style="height: 140px; max-width: 150px"/>
        <div style="margin-left: 2vh;">
            <!-- Title, version & authors -->
            <h3 style="margin-bottom: 0px; margin-top: 0px;">Apheleia</h3>
            <p>v0.1.5 by Klim, Kai Bo, Brendan & Johnathan</p>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'

    export default defineComponent({
        name: 'About'
    })
</script>
  
<style scoped>
    #about-container {
        width: 80%;
        height: 80%;
    }
</style>