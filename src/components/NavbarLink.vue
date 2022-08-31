<template>
  <q-item clickable tag="a" :href="link" v-ripple style="height: 70px">
    <q-item-section v-if="icon" avatar >
      <q-icon :name="icon" size="md" color="white"/>
    </q-item-section>

    <q-item-section>
      <q-item-label style="color: white; font-family: montserrat;">{{ title }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'NavbarLink',
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
  }
})
</script>
