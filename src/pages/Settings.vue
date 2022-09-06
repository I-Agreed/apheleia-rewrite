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
                <q-input filled v-model="currentSettings.email" label="email" style="width: 30vw;">
                    <template v-slot:before>
                        <q-icon name="mail" />
                    </template>
                </q-input>
                <p v-if="settingsSt.validEmail(currentSettings.email) == false" red>Invalid Email!</p>
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
                         :options="becomeOptions" />
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

    import { Settings } from 'src/scripts/objects'

    const selfSt     = useSelf()
    const settingsSt = useSettings()
    const peopleSt   = usePeople()

    const becomeOptions = peopleSt.users.map(user => user.first_name)
    
    let originalSettings = settingsSt.notificationSettings.copy()
    let currentSettings  = settingsSt.notificationSettings.copy()

    export default defineComponent({
        name: 'Settings',
        setup () {
            return {
                selfSt,
                settingsSt,

                originalSettings: ref(originalSettings),
                currentSettings: ref(currentSettings),

                becomeOptions: ref(becomeOptions),
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