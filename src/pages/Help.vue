<template>
    <h3 class="absolute-left" style="padding-left: 10%;">help.</h3>
    <q-page class="absolute-center flex flex-center" id="help-container">
        <div style="height: 80%; width: 100%; border: 2px solid var(--aph-grey); border-radius: 10px;">          <!-- Rounded border -->
            <!-- Splitter which splits vertically between the tabs and content -->
            <q-splitter v-model="splitterModel" style="height: 100%">
                <!-- The tabs on the left -->
                <template v-slot:before>
                    <q-tabs v-model="tab" vertical class="text-primary">
                        <q-tab name="overview" label="Overview" />
                        <q-tab name="dashboard" label="Dashboard" />
                        <q-tab name="items" label="Items" />
                        <q-tab name="people" label="People" />
                    </q-tabs>
                </template>
                <!-- The panels on the right, connected to the tabs by the 'name' variable -->
                <template v-slot:after>
                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel name="overview">
                            <div class="text-h4 q-mb-md">Overview</div>
                            <p>What is apheleia?</p>
                            <p>apheleia is a storage management system that tracks the loans of items as they are borrowed and returned by different users. It can notify you if an item is due to be returned soon.</p>
                            <p>The other help menus will explain how to navigate and interact with the different pages. We've tried to keep it as simple as possible so you don't have to think about any complex stuff.</p>
                        </q-tab-panel>
                        <q-tab-panel name="dashboard">
                            <div class="text-h4 q-mb-md">Dashboard</div>
                            <p>The dashboard is where you can find your current loans and notifications. It's a general overview of the information you can find in the other pages.</p>
                        </q-tab-panel>
                        <q-tab-panel name="items">
                            <div class="text-h4 q-mb-md">Items</div>
                            <p>On this page you can find the all the items you have viewing access to, even if you aren't loaning them. By clicking the tabs at the top you can switch the view between different types of items.</p>
                            <p>Here you can either 'borrow' or 'request to borrow' items, but that depends on whether or not your teacher has given you permission to do so without it being checked off. If that's the case then you should ask your teacher to loan you the item.</p>
                            <p>You can search for items on this page by using the search bar and sort them in ascending/descending order by clicking their headings.</p>
                            <!-- <div class="text-h4 q-mb-md">Teachers</div>
                            <p>TODO: Good luck figuring it out</p> -->
                        </q-tab-panel>
                        <q-tab-panel name="people">
                            <div class="text-h4 q-mb-md">Users and Roles</div>
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
    p {
        font-size: large;
    }
</style>