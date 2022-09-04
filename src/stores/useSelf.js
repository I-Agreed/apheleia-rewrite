import { defineStore } from 'pinia'
import { Role, Item, User, ArchetypePermissions, Settings, UserHistory, Notification } from 'src/scripts/objects.js'
import { usePeople } from './usePeople'
import { useSettings } from './useSettings'

const peopleSt = usePeople()
const settingsSt = useSettings()

export const useSelf = defineStore('selfStore', {
    state: () => {
        return {
            role: peopleSt.roles[0],
            currentLoans: [
                // new Item("Foil", ["#001", "Perfect"], this.user),
                { name: 'Item1', lent: '02/02/22', due: '22/02/22' },
                { name: 'Item2', lent: '02/02/22', due: '22/02/22' }
            ],
            history: new UserHistory([
                { id: "000000001", name: "Item1", borrow: "18/02/22", due: "22/03/22", return: "28/02/22" },
                { id: "000000010", name: "Item2", borrow: "17/02/22", due: "22/04/22", return: "30/03/22" },
                { id: "000000011", name: "Item3", borrow: "19/02/22", due: "27/05/22", return: "03/05/22" },
                { id: "000000100", name: "Item4", borrow: "13/02/22", due: "22/06/22", return: "30/09/22" },
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
                { name: 'name', align: "center", label: "Item",    field: "name", sortable: true },
                { name: 'lent', align: "center", label: "Lent On", field: "lent", sortable: true },
                { name: 'due',  align: "center", label: "Due By",  field: "due",  sortable: true }
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
            console.log(this.currentLoans)
            return this.currentLoans
        },
        historyLoansRows() {
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
        },

        // For presentation
        becomeStudent() {
            this.role = peopleSt.roles[1]
        },
        becomeTeacher() {
            this.role = peopleSt.roles[0]
        }
    }
})