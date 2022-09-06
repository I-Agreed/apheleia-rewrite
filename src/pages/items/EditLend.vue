<template>
    <q-dialog @show="time = inventorySt.getLoanByItemId(itemsLocalSt.focused_item).due;
                     model = inventorySt.getLoanByItemId(itemsLocalSt.focused_item).borrow;
                     owner = inventorySt.getLoanByItemId(itemsLocalSt.focused_item).loanedTo">
        <q-card style="width: 100%;">
            <!-- Header -->
            <q-card-section class="wide-flexbox">
                <!-- Edit Lend title -->
                <h3 style="margin-top: 10px; margin-bottom: 20px;">Edit Lend</h3>
                <!-- Close Button -->
                <q-card-actions style="padding-bottom: 5%;" align="right">
                    <CloseButton/>
                </q-card-actions>
            </q-card-section>

            <!-- Lend from section -->
            <q-card-section class="q-pt-none">
                <span>Lend from:</span>
                <q-input v-model="model" filled type="date" style="padding-top: 5px;"/>
            </q-card-section>

            <!-- Lend Until Section -->
            <q-card-section class="q-pt-none">
                <span>Lend until:</span>
                <q-input v-model="time" filled type="date" style="padding-top: 5px;"/>
            </q-card-section>

<<<<<<< HEAD
            <!-- Bottom buttons -->
=======
            <!-- Exit buttons -->
>>>>>>> 771e4f3d407b429780f9088388a1ceb7601bbe48
            <q-card-actions align="right">
                <q-btn flat label="Return Now" color="primary" v-close-popup @click="inventorySt.returnItem(itemsLocalSt.focused_item)"/>
                <q-btn flat label="Cancel" color="primary" v-close-popup />
                <q-btn flat label="Save" color="primary" v-close-popup
                      @click="inventorySt.editLendDates(itemsLocalSt.focused_item, model, time)
                              //peopleSt.notifyLoanChange()
                              " />
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

    const lendOptions = people.users.map(user => `${user.first_name} ${user.last_name}`)

    export default defineComponent({
        name: 'Editlend',
        components: { CloseButton },
        setup () {
            const options = ref(lendOptions)

            return {
                peopleSt,
                inventorySt,
                itemsLocalSt,

                model: ref(""),
                time: ref(""),
                owner: ref(""),

                options,
                
                setModel (val) {
                    model.value = val
                }
            }
        }
    })
</script>

<style>
    .wide-flexbox {
        display: flex; flex-flow: row nowrap; align-content: baseline; justify-content: space-between; width: 100%;
    }
</style>
