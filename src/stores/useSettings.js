import { defineStore } from 'pinia'

export const useSettings = defineStore('settingsStore', {
    state: () => {
        return {
            notificationEnabled: false,
            notificationTime: 0, // number of days before
            notificationEmail: "",
            notificationImportant: false,
            theme: "default",
        }
    }, 
    getters: {
        // returns if the page should display in dark mode
        // this is sketchy as hell
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
    }
})