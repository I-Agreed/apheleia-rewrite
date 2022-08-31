<template>
  <q-layout view="lHh Lpr lFf">
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
    <q-item clickable tag="a" to="home" v-ripple style="height: 80px">
      <q-avatar class="absolute-center">
        <img src="../assets/logo_mono.svg">
      </q-avatar>
    </q-item>
      <q-list>
        <NavbarLink
          v-for="link in topLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
      <q-list class="absolute-bottom">
        <NavbarLink
          v-for="link in bottomLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import NavbarLink from 'src/components/NavbarLink.vue'

const topLinksList = [
  {
    title: 'Dashboard',
    icon: 'home',
    link: '/home'
  },
  {
    title: 'Items',
    icon: 'category',
    link: '/items'
  },
  {
    title: 'People',
    icon: 'people',
    link: '/people'
  },
  {
    title: 'Loans',
    icon: 'inventory',
    link: '/loans'
  },
  {
    title: 'Notifications',
    icon: 'notifications',
    link: '/notifications'
  },
]

const bottomLinksList = [
  {
    title: 'About',
    icon: 'info',
    link: '/about'
  },
  {
    title: 'Help',
    icon: 'help',
    link: '/help'
  },
  {
    title: 'Settings',
    icon: 'settings',
    link: '/settings'
  },
  {
    title: 'Log Out',
    icon: 'logout',
    link: '#'
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
