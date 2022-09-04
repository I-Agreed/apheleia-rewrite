import { defineStore } from 'pinia'
import { Settings } from 'objects.js'

export const useSettings = defineStore('settingsStore', {
    state: () => {
        return {
            notificationSettings: new Settings(),

            // Colour theme
            theme: "default",
        }
    },
    getters: {
        // returns if the page should display in dark mode
        isDarkTheme: (state) => {
            //console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
            //console.log(state.theme);
            let output;
            if (state.theme == "default") {
                output = window.matchMedia("(prefers-color-scheme: dark)").matches;
            } else {
                output = (state.theme == "dark");
            }
            // fix root colour
            // remove root classes
            let root = document.documentElement;
            if (root.classList.contains("root-light")) {
                root.classList.remove("root-light");
            } else if (root.classList.contains("root-dark")) {
                root.classList.remove("root-dark");
            }

            // add class back to root
            if (output) {
                root.classList.add("root-dark");
            } else {
                root.classList.add("root-light");
            }
            return output;
        }
    },
    actions: {
        setSettings(settings) {
            this.notificationSettings = settings.copy()
        },
        validEmail(email) {
            return (email.contains("@") ? true : false) || (email == "")
        }
    }
})