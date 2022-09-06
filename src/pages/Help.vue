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
                        <q-tab name="items" label="Items" v-if="selfSt.hasAnyPerm()" />
                        <q-tab name="people" label="People" />
                        <q-tab name="loans" label="Loans" />
                        <q-tab name="notifications" label="Notifications" />
                    </q-tabs>
                </template>
                <!-- The panels on the right, connected to the tabs by the 'name' variable -->
                <template v-slot:after>
                    <q-tab-panels v-model="tab" animated vertical transition-prev="jump-up" transition-next="jump-down">
                        <q-tab-panel name="overview">
                            <div class="text-h4 q-mb-md">Overview</div>
                            <p>What is apheleia?</p>
                            <p>Apheleia (stylized apheleia) is a fast, digital storage management system that keeps track of item loans as they are passed around to different people. It lets equipment managers be certain that no items have been lost from the inventory and is able to remind users before their loans are due.</p>
                            <p>This page is available in case some areas of the program are unclear.</p>
                        </q-tab-panel>
                        <q-tab-panel name="dashboard">
                            <div class="text-h4 q-mb-md">Dashboard</div>
                            <p>The dashboard is a general overview of the information on other pages. Most users won't have to interact with anything else. It displays a brief summary of current loans, past loans and your unread notifications. Click on notifications to expand them.</p>
                            <img src="../../img/dash.png" alt="" style="width: 100%; display: block;" />
                        </q-tab-panel>
                        <q-tab-panel name="items" v-if="selfSt.hasAnyPerm()">
                            <div class="text-h4 q-mb-md">Items</div>
                            <p>This page will display all the items in the inventory. Different item types have been split into multiple tab panels and some may display more information than others.</p>
                            <p>Items can be lent out to the people invited into the system by pressing the <i>Lend Item</i> button on the right. A popup will appear allowing the you to select another person to lend it to. In this menu you are also able to set a due date for the item by changing the date field.</p>
                            <p>Loaned items will have a different button appear next to them. If an item has <i>Edit Loan</i> beside it, then it has already been loaned out to somebody. Clicking on this will open up a popup menu that allows you to edit the due date of a loan. The person currently borrowing the item will be notified if the due date is changed.</p>
                            <div v-if="selfSt.role.canEdit()">
                                <p><b>Print Items</b></p>
                                <p>Clicking on this button will generate a PDF file and download it onto your computer. The items are organised by type and spread across multiple pages in a spreadsheet format.</p>
                                <p><b>Manage Items</b></p>
                                <p>In the <u>Manage Items</u> menu you can create new items and item types for the inventory. Similarly to the ones on the main items page the different types of items have been split into tabs. By clicking the cells in the table the information for the items can be modified. The type of information is specified by the item type. Additionally, you are able to create new items by pressing the <i>New Item</i> button in the bottom left and delete items by pressing the <i>Delete Item</i> button on the right. All changes are immediately saved, so a prompt will appear just in case you accidentally press it.</p>
                                <div style="display: flex; justify-content: space-around;">
                                    <img src="../../img/lenditem.png" alt="" style="width: 30%; display: block;" />
                                    <img src="../../img/editlend.png" alt="ahhh" style="width: 30%; display: block;" />
                                </div>
                                <p><b>New / Edit Item Type</b></p>
                                <p>Pressing on these buttons will open up the <u>Edit Item Type</u> menu with different options. Rather than creating items in the inventory, in this menu you are defining the information for the item. These are known as properties. A property can be one of a number, text, a date, a checkbox or a selection/option. As an example, a 'selection/option' can represent the item's status. i.e (Perfect, Light Damage, Needs Service, Broken)</p>
                                <p>New properties can be created by clicking the <i>New Property</i> button in the bottom left. This will appear as a new row in the table. You can name the property by clicking in the cell beneath 'Property Name' and select a type for the property below 'Property Type'. Optionally, you can give it a default value. However, for the 'selection/option' property type, the values specified beneath the 'Default Value' heading will be the values available for you to choose from when you create items. With the example above, "Perfect", "Light Damage", "Needs Service" and "Broken" should be added as 4 different selection options. More options can be added with the + button and options can be removed with the bin button.</p>
                                <p>Item properties can be removed with the bin button on the far right, but be aware that all changes are immediately saved. Similarly to <i>Delete Item</i>, a prompt will appear for any delete operation.</p>
                                <img src="../../img/edititemtype.png" alt="" style="width: 100%; display: block;" />
                                <p><u>Manage Items:</u> Item types can also be deleted by pressing the buttons on the bottom left of the <u>Manage Items</u> menu, however this will mean deleting all items associated with that type. i.e In certain scenarios a large collection of the inventory could be deleted and lost. Take extreme care if you consider deleting an item type.</p>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="people">
                            <div class="text-h4 q-mb-md">Users and Roles</div>
                            <p>This page lists out all the users that are able to receive loans from the inventory. The 'role' of a user is decided by the equipment manager. Depending on the role, some advanced features may reveal themself to the user. Help for those features can be found on this page.</p>
                            <div v-if="selfSt.role.managePeople">
                                <p><b>Manage People</b></p>
                                <p>You are able to edit other users roles by selecting the dropdown in the cells of the <i>Role</i> column. As an example, you can give somebody a 'Student' or 'Teacher' role, if they were to exist. These roles can have different access permissions which are discussed below.</p>
                                <p>To invite new users press the <i>Invite Users</i> button to the top right. When others enter the popup link into a web browser they will be invited to join the equipment management group. On the right you are also able to remove user access of the inventory. A prompt will appear in case this occurs by accident. Items that have been lent out to a removed user will be returned to the inventory.</p>
                                <img src="../../img/invite.png" alt="" style="width: 40%; display: block;" />
                                <p><b>Manage Roles</b></p>
                                <p>By pressing the <i>Manage Roles</i> button you are able to edit the 5 roles (levels of access). They are separated by tabs on the left and can be renamed by clicking their name beneath the <u>Manage Roles</u> heading.</p>
                                <p>This page will keep a track of the changed you have made. You can revert changes by clicking <i>Revert</i>, or save changes by clicking <i>Save</i>. Be aware that upon saving you can no longer revert to the previous changes. Because it is unlikely that you will access this page or modify permissions frequently, no prompts appear to confirm a revert or save operation. Most changes can be undone by enabling/disabling a checkbox and saving the page once more.</p>
                                <p>Each role can interact with each item type differently. If 'Can Loan' and 'Can Return' are enabled for a role, then users with that role can lend and edit loans of that item type to other users. Enabling 'Can Modify' will mean that users with can manipulate those item types. For example, a 'Media Team Member' may be able to loan and return tripods, but cannot loan or return cameras. Instead, only 'Teachers' can loan and return cameras.</p>
                                <img src="../../img/manageroles.png" alt="" style="width: 100%; display: block;" />
                                <p>For roles to 'Manage People' please request the Administrator of apheleia in your environment to enable this for a certain role. To prevent any unwanted access to the storage system it is recommended that a minimal amount of people have a role able to 'Manage People'.</p>
                            </div>
                        </q-tab-panel>
                        <q-tab-panel name="loans">
                            <div class="text-h4 q-mb-md">Loans</div>
                            <p>On this page you will find all the past loans you have access to. For most users this will be limited to their own, but others may be presented with a history of every loan associated with the inventory in the past.</p>
                            <img src="../../img/loans.png" alt="" style="width: 100%; display: block;" />
                        </q-tab-panel>
                        <q-tab-panel name="notifications">
                            <div class="text-h4 q-mb-md">Notifications</div>
                            <p>Click on notifications to expand them. Notifications will be sent depending on the settings chosen in the settings page. The notifications will remind you of upcoming due dates, over due loans or due date alterations by your equipment manager.</p>
                            <img src="../../img/notification.png" alt="" style="width: 100%; display: block;" >
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

    import { useSelf } from 'src/stores/useSelf'
    
    const selfSt = useSelf()

    export default defineComponent({
        name: 'Help',
        setup () {
            return {
                selfSt,

                tab: ref('overview'),
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
    
    text-h4 {
        font-size: xx-large;
    }

    p {
        padding-top: 20px;
        font-size: x-large;
    }
</style>