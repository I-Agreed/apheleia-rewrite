<template>
    <q-dialog>
        <q-card style="width: 100%;">
            <!-- Header -->
            <q-card-section class="wide-flexbox">
                <!-- Title -->
                <h3 style="margin-top: 10px; margin-bottom: 20px;">Lend Item</h3>

                <!-- Close Button -->
                <q-card-actions style="padding-bottom: 5%;" align="right">
                    <CloseButton/>
                </q-card-actions>
            </q-card-section>

            <!-- Lend to section -->
            <q-card-section class="q-pt-none">
                <span>Lend to:</span>
                <q-select outlined v-model="model" :options="options" style="padding-top: 5px;" />
            </q-card-section>

            <!-- Lend until section -->
            <q-card-section class="q-pt-none">
                <span>Lend until:</span>
                <q-input v-model="time" filled type="date" style="padding-top: 5px;" />
            </q-card-section>

            <!-- Exit buttons -->
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Lend" color="primary" v-close-popup @click="inventorySt.createLoan(itemsLocalSt.focused_item, model, time);" />
            </q-card-actions>
        </q-card>
    </q-dialog>
</template>

<script>
    import { ref } from 'vue'
    import { defineComponent } from 'vue'

    import { usePeople } from "../../stores/usePeople.js"
    import { useInventory } from "../../stores/useInventory.js"
    import { itemsLocal } from '../../stores/itemsLocal'
    import CloseButton from 'src/components/CloseButton.vue'

    const peopleSt = usePeople()
    const inventorySt = useInventory()
    const itemsLocalSt = itemsLocal()

    const lendOptions = peopleSt.users.map(user => `${user.id}`)
    export default defineComponent({
        name: 'Lend Item',
        components: { CloseButton },
        setup () {
            const model = ref(lendOptions[0])
            const options = ref(lendOptions)

            return {
                peopleSt,
                inventorySt,
                itemsLocalSt,
                
                model,
                options,
                time: ref("2022-01-01"),
                console,
                
                setModel (val) {
                    model.value = val
                },
            }
        }
    })
</script>

<style>
    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%;
    }
</style>
