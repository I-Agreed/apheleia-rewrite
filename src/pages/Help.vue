<template>
    <h3 class="absolute-left" style="padding-left: 10%;">help.</h3>
    <q-page class="absolute-center flex flex-center" id="help-container">
        <div style="height: 80%; width: 100%; border: 2px solid var(--aph-grey); border-radius: 10px;">
            <q-splitter v-model="splitterModel" style="height: 100%">
                <template v-slot:before>
                    <q-tabs v-model="tab" vertical class="text-primary">
                        <q-tab name="dashboard" label="Dashboard" />
                        <q-tab name="items" label="Items" />
                        <q-tab name="people" label="People" />
                    </q-tabs>
                </template>
                <template v-slot:after>
                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel name="dashboard">
                            <div class="text-h4 q-mb-md">123</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>

                        <q-tab-panel name="items">
                            <div class="text-h4 q-mb-md">123</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>

                        <q-tab-panel name="people">
                            <div class="text-h4 q-mb-md">123</div>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quis praesentium cumque magnam odio iure quidem, quod illum numquam possimus obcaecati commodi minima assumenda consectetur culpa fuga nulla ullam. In, libero.</p>
                        </q-tab-panel>
                    </q-tab-panels>
                </template>
            </q-splitter>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'

    export default defineComponent({
        name: 'Help',
        setup () {
            return {
                tab: ref('dashboard'),
                splitterModel: ref(20)
            }
        }
    })
</script>
  
<style scoped>
    #help-container {
        width: 80%;
        height: 80%;
    }
</style>