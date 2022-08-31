<template>
    <h3 class="absolute-left" style="padding-left: 10%;">notifications.</h3>
    <q-page class="absolute-center flex flex-center" id="notifications-container">
        <div class="q-pa-md" style="height: 80%; width: 100%">
            <q-list bordered separator class="rounded-borders shadow-1" style="height: 100%;">
                <q-item clickable v-for="notification in selfSt.history.notifications">
                    <q-icon name="notifications" size="sm" style="margin-right: 1vh; margin-top: 0.3vh;"/> 
                    <p style="margin: 0px; margin-top: 0.5vh;">{{ notification }}</p>
                </q-item>
            </q-list>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
  
    import { useSelf } from '../stores/useSelf'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Notifications',
        setup () {
            return {
                selfSt
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