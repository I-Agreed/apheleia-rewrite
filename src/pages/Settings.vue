<template>
    <q-page class="absolute-center flex flex-center" id="settings-container">
        <div class="q-gutter-sm">
            <h3 style="margin-bottom: 1.5vh;">settings.</h3>
            
            <!-- Settings -->
            <div><q-checkbox left-label v-model="currentSettings.notify" label="Enable Notifications:"             /></div>
            <div><q-checkbox left-label v-model="currentSettings.remind" label="Remind Me For Upcoming Due Dates:" /></div>
            <div>
                <q-select outlined v-model="currentSettings.remindDaysBefore"
                         :options="['1', '2', '3', '7', '14']"/>
            </div>
            
            <div style="margin-top: 1vh;">
                <p style="margin-bottom: 0.2vh;">Send Notifications to:</p>
                <q-input filled label="email" style="width: 30vw;" v-model="currentSettings.email"
                         :rules="[val => settingsSt.validEmail(val) || 'Invalid Email!']">
                    <template v-slot:before> <q-icon name="mail"/> </template>
                </q-input>
            </div>

            <!-- Buttons: Save and Revert -->
            <div style="margin-top: 3vh;">
                <q-btn color="primary" label="Save" style="margin-right: 1vw;"
                      @click="settingsSt.setSettings(currentSettings)"
                      :disable="settingsSt.validEmail(currentSettings.email) == false"/>
                <q-btn color="primary" label="Revert"
                      @click="currentSettings = originalSettings.copy()"/>
            </div>

            <div style="display: flex; width: 100%;">
                <q-btn color="primary" label="Become User"
                      @click="selfSt.becomeUser(activeUser)"/>
                <q-select outlined v-model="activeUser"
                         :options="peopleSt.users.map(user => user.first_name)" />
            </div>
        </div>
    </q-page>
</template>
  
<script>
    import { defineComponent } from 'vue'
    import { ref } from 'vue'

    import { useSelf } from 'src/stores/useSelf'
    import { useSettings } from 'src/stores/useSettings'
    import { usePeople } from 'src/stores/usePeople'

    const selfSt     = useSelf()
    const settingsSt = useSettings()
    const peopleSt   = usePeople()
    
    let originalSettings = settingsSt.notificationSettings.copy()
    let currentSettings  = settingsSt.notificationSettings.copy()

    export default defineComponent({
        name: 'Settings',
        setup () {
            return {
                selfSt,
                settingsSt,
                peopleSt,

                originalSettings: ref(originalSettings),
                currentSettings: ref(currentSettings),

                activeUser: ref('')
            }
        }
    })
</script>
  
<style scoped>
    #settings-container {
        width: 80%;
        height: 80%;
    }
</style>