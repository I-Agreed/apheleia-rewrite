<template>
    <div class="q-pa-md" style="height: 100%;">
        <h5>Unread Notifications</h5>
        <!-- Notifications list -->
        <q-list bordered separator class="rounded-borders shadow-1" style="height: 100%;">
            <!-- Notification item -->
            <q-item clickable
                   @click="notify = true;
                           selectedNotification = notification"
                    v-for="notification in selfSt.user.unreadNotifications()">

                <q-icon name="notifications" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/>

                <span class="notification-title">{{ notification.title }}</span>

                <!-- Tick button -->
                <q-icon name="check" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"
                       @click="selfSt.readNotification(notification.id); notify = true" /> 
            </q-item>
        </q-list>
    </div>

    <NotificationPopup v-model="notify" :notification="selectedNotification"/>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    
    import { useSelf } from '../../stores/useSelf'
    import NotificationPopup from '../../components/NotificationPopup.vue'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Dashboard Notifications',
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
    h5 {
        margin-top: 0px;
        margin-bottom: 1vh;
    }
    .notification-title {
        margin: 0px; margin-top: 0.5vh; margin-right: 10%; width: 100%;
    }
</style>
