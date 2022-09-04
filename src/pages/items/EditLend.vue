<template>
    <q-dialog @show="time = inventorySt.getLoanByItemId(itemsLocalSt.focused_item).due; model = inventorySt.getLoanByItemId(itemsLocalSt.focused_item).borrow">
        <q-card style="width: 100%;">
            <q-card-section class="wide-flexbox">
                <h3 style="margin-top: 10px; margin-bottom: 20px;">Edit Lend</h3>
                <q-card-actions style="padding-bottom: 5%;" align="right">
                    <CloseButton/>
                </q-card-actions>
            </q-card-section>

            <q-card-section class="q-pt-none">
            Lend from:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-input v-model="model" filled type="date" />
            </q-card-section>

            <q-card-section class="q-pt-none">
            Lend until:
            </q-card-section>

            <q-card-section style="padding-top: 0px;">
                <q-input v-model="time" filled type="date" />
            </q-card-section>

            <q-card-actions align="right">
                <q-btn flat label="Return Now" color="primary" v-close-popup @click="inventorySt.returnItem(itemsLocalSt.focused_item)"/>
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Save" color="primary" v-close-popup @click="inventorySt.editLendDates(itemsLocalSt.focused_item, model, time)" />
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

    const people = usePeople()
    const inv = useInventory()
    const itemsLocalSt = itemsLocal()

    const lendOptions = people.users.map(user => `${user.first_name} ${user.last_name}`)

export default defineComponent({
        name: 'Editlend',
        components: { CloseButton },
        setup () {
            const model = ref("")
            const options = ref(lendOptions)

            return {
                model,
                options,
                peopleSt: people,
                inventorySt: inv,
                time: ref(""),
                itemsLocalSt,
                
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
