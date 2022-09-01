<template>
    <q-dialog v-model="editArc" full-width>
        <q-card style="height: 40%; margin: 10% 30%">
            <!-- Popup body -->
            <div class="q-pa-md">
                <div class="wide-flexbox">
                    <h5>{{ selfSt.history.selectedNotification.title }}</h5>
                    <CloseButton />
                </div>
                <div>
                    <p>{{ selfSt.history.selectedNotification.body }}</p>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent } from 'vue'

    import CloseButton from './CloseButton.vue'
    import { useSelf } from '../stores/useSelf'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Notification Popup',
        components: { CloseButton },
        setup () {
            return {
                selfSt,
            }
        }
    })
</script>

<style scoped>
.wide-flexbox {
    display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%; 
}</style>
