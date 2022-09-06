<template>
    <h3 class="absolute-left" style="padding-left: 10%;">notifications.</h3>
    <q-page class="absolute-center flex flex-center" id="notifications-container">
        <div class="q-pa-md" style="height: 80%; width: 100%">
            <!-- Notifications list -->
            <q-list bordered separator class="rounded-borders shadow-1" style="height: 100%;">
                <!-- List entry for each notification -->
                <q-item clickable
                       @click="notify = true;
                               selectedNotification = notification"
                        v-for="notification in selfSt.history.notifications">
                    <q-icon name="notifications" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/> 
                    <p style="margin: 0px; margin-top: 0.5vh;">{{ notification.title }}</p>
                </q-item>
            </q-list>
        </div>
    </q-page>

    <NotificationPopup v-model="notify" :notification="selectedNotification" />
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

                notify: ref(false),
                selectedNotification: ref('')
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