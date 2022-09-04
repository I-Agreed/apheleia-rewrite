<template>
    <div class="q-pa-md" style="height: 100%;">
        <h5>Unread Notifications</h5>
        <q-list bordered separator class="rounded-borders shadow-1" style="height: 100%;">
            <q-item clickable v-for="notification in selfSt.unreadNotifications()" @click="notify = true; selfSt.history.selectedNotification = notification">
                <q-icon name="notifications" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/>
                <span class="notification-title">{{ notification.title }}</span>
                <q-icon @click="selfSt.readNotification(notification.id); notify = true" name="close" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/> 
            </q-item>
        </q-list>
    </div>

    <NotificationPopup v-if="notify == true"/>
</template>

<script>
    import { defineComponent, ref } from 'vue'
    import { useSelf } from '../../stores/useSelf'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Dashboard Notifications',
        setup () {
            return {
                selfSt,
                notify: ref(false)
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
