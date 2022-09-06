<!-- Contains the component for the link buttons in MainLayout -->
<template>
    <!-- Button -->
    <q-item clickable v-ripple tag="a" :to="link" style="height: 70px"
            v-if="selfSt.hasAnyPerm() || (title != 'Items')">
        <!-- Icon -->
        <q-item-section avatar v-if="icon">
            <q-icon :name="icon" size="md" color="white"/>
        </q-item-section>

        <!-- Text -->
        <q-item-section>
            <q-item-label style="color: white; font-family: montserrat;">{{ title }}</q-item-label>
        </q-item-section>
    </q-item>
</template>

<script>
import { defineComponent } from 'vue'

import { useSelf } from '../stores/useSelf'

const selfSt = useSelf()

export default defineComponent({
    name: 'NavbarLink',
    // Passed in parameters
    props: {
        title: {
            type: String,
            required: true
        },
        link: {
            type: String,
            default: '#'
        },
        icon: {
            type: String,
            default: ''
        }
    },
    setup () {
        return {   
            selfSt
        }
    } 
})
</script>
