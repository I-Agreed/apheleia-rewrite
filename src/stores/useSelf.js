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
                    "Loan 1",
                    "Loan 2",
                    "Loan 3",
                    "Loan 4",
                    "Loan 5",
                    "Loan 6",
                    "Loan 7",
                    "Loan 8"
                ],
                notifications: [
                    "Item 1 is due today!",
                    "The due date for Item 2 has been changed to an earlier date.",
                    "Did you know? The developers have misspelt Apheleia as 'Aphelia' about 99% of the time! (Including just now!)"
                ]
            }
        }
    }, getters: { // these use variable naming because they arent accessed as functions
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
        },
    }
    
})