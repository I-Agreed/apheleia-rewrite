import { defineStore } from 'pinia'

export const useSelf = defineStore('selfStore', {
    state: () => {
        return {
            role: {
                permissions: {
                    loanable_archetypes: [
                        0, 2, 3
                    ]
                }
            },
            items: [
                {
                    
                },
                {
                    
                }
            ],
            settings: {
                email: "my_email@gmail.com",
                mark_as_important: true,
                notification_frequency: 3,
                page_theme: 1,
                receive_announcements: true,
                receive_updates: true,
                receive_reminders: true,
                receive_emails: true,
                receive_echoes: true
            },
            history: {
                loans: [
                    { id: "000000001", name: "Item1", borrow: "18/02/22", due: "22/03/22", return: "28/02/22" },
                    { id: "000000010", name: "Item2", borrow: "17/02/22", due: "22/04/22", return: "30/03/22" },
                    { id: "000000011", name: "Item3", borrow: "19/02/22", due: "27/05/22", return: "03/05/22" },
                    { id: "000000100", name: "Item4", borrow: "13/02/22", due: "22/06/22", return: "30/09/22" },
                ],
                notifications: [
                    "Item 1 is due today!",
                    "The due date for Item 2 has been changed to an earlier date.",
                    "Did you know? The developers have misspelt Apheleia as 'Aphelia' about 99% of the time! (Including just now!)"
                ]
            }
        }
    },
    getters: { // these use variable naming because they arent accessed as functions
        userId: () => {
            return sessionStorage["userId"];
        },
        givenName: () => {
            return sessionStorage["givenName"];
        },
        surname: () => {
            return sessionStorage["surname"];
        },
        fullName: () => {
            return sessionStorage["givenName"] + " " + sessionStorage["surname"];
        }
    },
    actions: {
    }
    
})