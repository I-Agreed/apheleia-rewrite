<template>
    <q-dialog full-width>
        <q-card style="height: 40%; margin: 6% 30%">
            <!-- Popup card body -->
            <div class="q-pa-md">
                <div class="wide-flexbox">
                    <h5>{{ notification.title }}</h5>
                    <CloseButton />
                </div>
                <div>
                    <p>{{ notification.body }}</p>
                </div>
            </div>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent } from 'vue'

    import { useSelf } from '../stores/useSelf'
    import { Notification } from 'src/scripts/objects'
    import CloseButton from './CloseButton.vue'

    const selfSt = useSelf()

    export default defineComponent({
        name: 'Notification Popup',
        components: { CloseButton },
        setup () {
            return {
                selfSt,
            }
        },
        props: {
            notification: Notification
        }
    })
</script>

<style scoped>
    .wide-flexbox {
        display: flex;
        flex-flow: row nowrap;
        align-content: baseline;
        justify-content: space-between;
        width: 100%; 
    }
</style>
