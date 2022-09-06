import { defineStore } from 'pinia'

export const itemsLocal = defineStore('itemsLocal', {
    state: () => {
        return {
            showFilters: false,
            showManageMenu: false,
            searchParams: "",
            tabbedScheme: "",
            tabbedSchemeName: "",
            pdf_preview: false,
            focused_archetype: "",
            focused_item: "",
            focused_due: "",
            focused_borrowed: ""
        }
    },
    getters: {
        filter_state() {return this.showFilters},
        manage_state() {return this.showManageMenu},
        search_params() {return this.searchParams},
        tabbed_scheme() {return this.tabbedScheme}
    },
    actions: {
        // Toggle manage menu
        toggle_manage() {this.showManageMenu = !this.showManageMenu},
        // show_manage() {this.showManageMenu = true},
        // Hide manage menu
        hide_manage() {this.showManageMenu = false},
        // Toggle Filters
        toggle_filters() {this.showFilters = !this.showFilters},
        // Set tabbed archetype
        set_tabbed(scheme) { this.tabbedScheme = scheme; this.tabbedSchemeName = scheme.name },
        // Set focused archetype
        set_focused_archetype(arch) { this.focused_archetype= arch }
        // show_filters() {this.showFilters = true},
        // hide_filters() {this.showFilters = false}
    }
})