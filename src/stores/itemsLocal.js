import { defineStore } from 'pinia'

export const itemsLocal = defineStore('itemsLocal', {
    state: () => {
        return {
            showFilters: false,
            showManageMenu: false,
            searchParams: "",
            tabbedScheme: "",
            tabbedSchemeName: "",
            pdf_preview: false
        }
    },
    getters: {
        filter_state() {return this.showFilters},
        manage_state() {return this.showManageMenu},
        search_params() {return this.searchParams},
        tabbed_scheme() {return this.tabbedScheme}
    },
    actions: {
        toggle_manage() {this.showManageMenu = !this.showManageMenu},
        // show_manage() {this.showManageMenu = true},
        hide_manage() {this.showManageMenu = false},
        toggle_filters() {this.showFilters = !this.showFilters},
        set_tabbed(scheme) { this.tabbedScheme = scheme; this.tabbedSchemeName = scheme.name }
        // show_filters() {this.showFilters = true},
        // hide_filters() {this.showFilters = false}
    }
})