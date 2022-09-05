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
                if(loan.borrower === sessionStorage["givenName"] + " " + sessionStorage["surname"] && loan.return === "") {
                    this.currentLoans.push(loan)
                }
            })

            console.log(this.currentLoans)
            return this.currentLoans
        },
        historyLoansRows() {
            this.history.loans = []
            inventorySt.history.loans.forEach(loan => {
                if(loan.borrower === sessionStorage["givenName"] + " " + sessionStorage["surname"] && loan.return != "") {
                    this.history.loans.push(loan)
                }
            })
            return this.history.loans
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
        }
    }
})