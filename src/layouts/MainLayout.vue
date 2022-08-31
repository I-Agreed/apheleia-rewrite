<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Sidebar -->
    <q-drawer
      v-model="drawer"
      show-if-above
      bordered

      :mini="miniState"
      @mouseover="miniState = false"
      @mouseout="miniState = true"

      :mini-width="miniWidth"
      :width="240"

      style="background-color: var(--aph-purple);"
    >
    <!-- Logo button -->
    <q-item clickable tag="a" to="/dash" v-ripple style="height: 80px">
      <!-- Logo Image -->
      <q-avatar class="absolute-center">
        <img src="../assets/logo_mono.svg">
      </q-avatar>
    </q-item>
      <!-- Top list of buttons -->
      <q-list>
        <NavbarLink
          v-for="link in topLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>

      <!-- Bottom list of buttons -->
      <q-list class="absolute-bottom">
        <NavbarLink
          v-for="link in bottomLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <!-- The actual page being rendered -->
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NavbarLink from 'src/components/NavbarLink.vue'

// Information about the links
const topLinksList = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/dash'
  },
  {
    title: 'Items',
    icon: 'category',
    link: '/dash/items'
  },
  {
    title: 'People',
    icon: 'people',
    link: '/dash/people'
  },
  {
    title: 'Loans',
    icon: 'inventory',
    link: '/dash/loans'
  },
  {
    title: 'Notifications',
    icon: 'notifications',
    link: '/dash/notifications'
  },
]

const bottomLinksList = [
  {
    title: 'About',
    icon: 'info',
    link: '/dash/about'
  },
  {
    title: 'Help',
    icon: 'help',
    link: '/dash/help'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/dash/settings'
  },
  {
    title: 'Log Out',
    icon: 'logout',
    link: '/logout'
  }
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    NavbarLink
  },

  setup () {
    return {
      topLinks: topLinksList,
      bottomLinks: bottomLinksList,
      miniState: ref(true),
      miniWidth: 80
    }
  }
})
</script>
