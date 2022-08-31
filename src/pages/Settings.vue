<template>
    <h3 class="absolute-left" style="padding-left: 10%;">settings.</h3>
    <q-page class="absolute-center flex flex-center" id="settings-container">
        <div class="q-gutter-sm">
            <div><q-checkbox left-label v-model="notifications" label="Enable Notifications:" /></div>
            <div><q-checkbox left-label v-model="reminder" label="Remind Me For Overdue Items:" /></div>
            <div style="margin-top: 1vh;">
                <p style="margin-bottom: 0.2vh;">Send Notifications to:</p>
                <q-input filled v-model="email" label="email" style="width: 30vw;"/>
            </div>
            <div style="margin-top: 3vh;">
                <q-btn color="primary" label="Save Changes" style="margin-right: 1vw;"/>
                <q-btn color="primary" label="Restore Default"/>
            </div>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'

    export default defineComponent({
        name: 'Settings',
        setup () {
            return {
                notifications: ref(false),
                reminder: ref(false),
                email: ref("")
            }
        }
    })
</script>
  
<style scoped>
    #settings-container {
        width: 80%;
        height: 80%;
    }
</style>