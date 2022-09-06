import { defineStore } from 'pinia'
import { Role, Item, User, ArchetypePermissions, Settings, UserHistory, Notification } from 'src/scripts/objects.js'
import { usePeople } from './usePeople'
import { useSettings } from './useSettings'
import { useInventory } from './useInventory'

const peopleSt = usePeople()
const settingsSt = useSettings()
const inventorySt = useInventory()

export const useSelf = defineStore('selfStore', {
    state: () => {
        return {
            user: peopleSt.users[0],
            role: peopleSt.roles[0],
            currentLoans: [
                
            ],
            history: new UserHistory([

            ], 
            [
                new Notification(0, "Item 1 is due today!", "Item 1 is due today, you should return it to your teacher."),
                new Notification(1, "Due date change: Item 2", "The due date for Item 2 has been changed to an earlier date."),
                new Notification(2, "Did you know?", "Did you know? The developers have misspelt Apheleia as 'Aphelia' about 99% of the time! (Including just now!)")
            ]),
            selectedNotification: {}
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
        },
        currentLoansColumns: () => {
            return [
                { name: 'name', align: "center", label: "Item",    field: "name",   sortable: true },
                { name: 'lent', align: "center", label: "Lent On", field: "borrow", sortable: true },
                { name: 'due',  align: "center", label: "Due By",  field: "due",    sortable: true }
            ]
        },
        historyLoansColumns: () => {
            return [
                { name: 'name',   align: "center", label: "Item",     field: "name",   sortable: true },
                { name: 'borrow', align: "center", label: "Borrowed", field: "borrow", sortable: true },
                { name: 'due',    align: "center", label: "Due",      field: "due",    sortable: true },
                { name: 'return', align: "center", label: "Returned", field: "return", sortable: true }
            ]
        }
    },
    actions: {
        currentLoansRows() {
            this.currentLoans = []
            inventorySt.history.loans.forEach(loan => {
                if(loan.borrower === this.user.first_name + " " + this.user.last_name && loan.return === "") {
                    this.currentLoans.push(loan)
                }
            })

            if(this.hasAnyPerm()) {
                this.role.archetypePermissions.forEach(perms => {
                    if (perms.loan || perms.handBack) {
                        inventorySt.history.loans.forEach(loan => {
                            console.log(loan)
                            if(inventorySt.getItemById(loan.itemId).arch === perms.arch && loan.return === "") {
                                this.currentLoans.push(loan)
                            }
                        })
                    }
                })
            }

            return [...new Set(this.currentLoans)]
        },
        historyLoansRows() {
            this.history.loans = []
            inventorySt.history.loans.forEach(loan => {
                if(loan.borrower === this.user.first_name + " " + this.user.last_name && loan.return != "") {
                    this.history.loans.push(loan)
                }
            })

            if(this.hasAnyPerm()) {
                this.role.archetypePermissions.forEach(perms => {
                    if (perms.loan || perms.handBack) {
                        inventorySt.history.loans.forEach(loan => {
                            if(inventorySt.getItemById(loan.itemId).arch === perms.arch && loan.return != "") {
                                this.currentLoans.push(loan)
                            }
                        })
                    }
                })
            }

            return [...new Set(this.history.loans)]
        },
        allLoanRows() {
            return [...new Set(this.currentLoansRows().concat(this.historyLoansRows()))]
        },
        unreadNotifications() {
            return this.history.notifications.filter(notification => notification.read != true)
        },
        readNotification(id) {
            this.history.notifications.forEach(notification => {
                if (notification.id == id) {
                    notification.read = true
                }
            })
        },
        hasAnyPerm() {
            let out = false;
            this.user.role.archetypePermissions.forEach(perms => {
                if (perms.loan || perms.handBack || perms.edit) {
                    out = true
                }
            })

            return out;
        },
        updateSelfRole() {
            peopleSt.roles.forEach(role => {
                if (this.user.role.name == role.name) {
                    this.user.role = role
                }
            })
        },

        // For presentation
        becomeUser(name) {
            peopleSt.users.forEach(user => {
                if (user.first_name == name) {
                    this.user = user
                }
            })
        }
    }
})