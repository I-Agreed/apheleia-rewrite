<template>
    <q-dialog>
        <q-card style="width: 100%;">
            <q-card-section class="wide-flexbox">
                <h3 style="margin-top: 10px; margin-bottom: 20px;">Lend Item</h3>
                <q-card-actions style="padding-bottom: 5%;" align="right">
                    <CloseButton/>
                </q-card-actions>
            </q-card-section>

            <q-card-section class="q-pt-none">
            Lend to:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-select outlined v-model="model" :options="options" />
            </q-card-section>

            <q-card-section class="q-pt-none">
            Lend until:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-input v-model="time" filled type="date" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Lend" color="primary" v-close-popup @click="inventorySt.createLoan(itemsLocalSt.focused_item, model, time)" />
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

    const lendOptions = peopleSt.users.map(user => `${user.first_name} ${user.last_name}`)

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
