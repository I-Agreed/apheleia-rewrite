import { defineStore } from 'pinia'

export const useNav = defineStore('useNav', {
    state: () => {
        return {
            showNav: true
        }
    },
    actions: {
        disableNavBar() { this.showNav = false }
    }
})