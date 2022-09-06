<template>
    <q-dialog>
        <q-card style="width: 100%;">
            <!-- Title -->
            <q-card-section>
                <div class="wide-flexbox">
                    <h3 style="margin-top: 10px; margin-bottom: 20px;">Invite Users</h3>
                    <CloseButton />
                </div>
            </q-card-section>
            
            <q-card-section class="q-pt-none">
                <span style="font-size: large;">Use this link to invite users:</span>
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-field outlined stack-label style="font-size: x-large;">
                    <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0">{{ url }}</div>
                    </template>
                </q-field>
            </q-card-section>

            <q-card-section>
                <span style="color: #333; font-size: larger;">*The link is only valid when this popup is open.</span>
            </q-card-section>
        </q-card>
    </q-dialog>
</template>
  
<script>
    import { defineComponent } from 'vue'
    
    import CloseButton from 'src/components/CloseButton.vue';
    
    export default defineComponent({
        name: "InviteUsers",
        components: { CloseButton },
        props: {
            url: {
                type: String,
                required: true
            },
        }
})
</script>

<style>
    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: space-around; justify-content: space-between; width: 100%;
    }
</style>