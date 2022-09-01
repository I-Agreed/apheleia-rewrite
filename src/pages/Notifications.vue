<template>
    <!-- Notifications title -->
    <h3 class="absolute-left" style="padding-left: 10%;">notifications.</h3>
    <q-page class="absolute-center flex flex-center" id="notifications-container">
        <!-- Notifications list -->
        <div class="q-pa-md" style="height: 80%; width: 100%">
            <q-list bordered separator class="rounded-borders shadow-1" style="height: 100%;">
                <q-item clickable v-for="notification in selfSt.history.notifications" @click="notify = true; selfSt.history.selectedNotification = notification">
                <!-- List entry for each notification -->
                    <q-icon name="notifications" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/> 
                    <p style="margin: 0px; margin-top: 0.5vh;">{{ notification.title }}</p>
                </q-item>
            </q-list>
        </div>
    </q-page>

    <NotificationPopup v-model="notify"/>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'

    import { useSelf } from '../stores/useSelf'

    import NotificationPopup from '../components/NotificationPopup.vue'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Notifications',
        components: { NotificationPopup },
        setup () {
            return {
                selfSt,
                notify: ref(false)
            }
        }
    })
</script>
  
<style scoped>
    #notifications-container {
        width: 80%;
        height: 80%;
    }
</style>