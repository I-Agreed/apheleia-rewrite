<template>
    <div class="q-pa-md" style="height: 100%;">
        <h5>Notifications</h5>
        <q-list bordered separator class="rounded-borders shadow-1" style="height: 100%;">
            <q-item clickable v-for="notification in selfSt.unreadNotifications()" @click="notify = true; selfSt.history.selectedNotification = notification">
                <q-icon name="notifications" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/>
                <span style="margin: 0px; margin-top: 0.5vh; margin-right: 10%; width: 100%;">{{ notification.title }}</span>
                <q-icon @click="selfSt.history.notifications = selfSt.history.notifications.filter(notif => notif != notification)" name="close" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/> 
            </q-item>
        </q-list>
    </div>

    <NotificationPopup v-model="notify"/>
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
</style>
