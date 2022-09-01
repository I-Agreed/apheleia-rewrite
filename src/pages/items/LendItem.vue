<template>
    <q-dialog>
        <q-card style="width: 100%;">
            <div class="wide-flexbox">
                <q-card-section>
                    <h3 style="margin-top: 10px; margin-bottom: 20px;">Lend Item</h3>
                </q-card-section>
    
                <q-card-actions style="padding-bottom: 5%;" align="right">
                    <CloseButton/>
                </q-card-actions>

            </div>


            <q-card-section class="q-pt-none">
            Lend to:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-select
                    filled
                    :model-value="model"
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    :options="options"
                    @input-value="setModel"
                    style="width: 250px; padding-bottom: 32px"
                >     
                    <template v-slot:no-option>
                        <q-item>
                            <q-item-section class="text-grey">
                                No results
                            </q-item-section>
                        </q-item>
                    </template>
                </q-select>
            </q-card-section>

            <q-card-section class="q-pt-none">
            Lend until:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-input v-model="time" filled type="date" />
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="OK" color="primary" v-close-popup />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { defineComponent } from 'vue'

    import CloseButton from 'src/components/CloseButton.vue'

    const lendOptions = [
        "abcd",
        "efgh",
        "ijkl",
        "mnop",
        "1234"
    ]

export default defineComponent({
        name: 'Lend Item',
        components: { CloseButton },
        setup () {
            const model = ref(null)
            const options = ref(lendOptions)

            return {
                model,
                options,
                
                setModel (val) {
                    model.value = val
                },
            }
        }
    })
</script>