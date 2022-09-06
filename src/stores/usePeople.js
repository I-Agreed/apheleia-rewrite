import { defineStore } from 'pinia'

import { User, Role, ArchetypePermissions, Notification } from 'src/scripts/objects.js'
import { useInventory } from 'src/stores/useInventory'

// Create test data
let teacherPermissions = []
let studentPermissions = []

const inventorySt = useInventory()

inventorySt.schemes.forEach(scheme => {
    teacherPermissions.push(new ArchetypePermissions(scheme.name, true, true, true))
    studentPermissions.push(new ArchetypePermissions(scheme.name, false, false, false))
});

teacherPermissions[0] = new ArchetypePermissions("Foil", true, true, true)

const roles = [
    new Role("Management", teacherPermissions, true),
    new Role("Captain", teacherPermissions),
    new Role("Group Leader", studentPermissions),
    new Role("Scouts", studentPermissions),
    new Role("Default", studentPermissions)
]

let users = [
    new User(444444444, "Dat", "Huynh", roles[0]),
    new User(444444444, "Jennifer", "May", roles[0]),
    new User(444444444, "Rebecca", "Dam", roles[0]),
    new User(436980639, "Johnathan", "Min", roles[3]),
    new User(444444444, "Brendan", "Alcorn", roles[1]),
    new User(437333289, "Kevin", "Cao", roles[2]),
    new User(444444444, "Klim", "Tsoutsman", roles[2]),
    new User(444444444, "John", "Smith", roles[3])
]

users[3].notify(new Notification(0, "Item 1 is due today!", "Item 1 is due today, please return it to your equipment manager.")) // Johnathan
users[4].notify(new Notification(2, "Did you know?", "Did you know? The developers have misspelt Apheleia as 'Aphelia' about 99% of the time! (Including just now!)")) // Brendan


export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            roles: roles,
            users: users
        }
    },
    actions: {
        setRoles(roles) {
            this.roles = []
            roles.forEach(role => {
                this.roles.push(role.copy())
            })
        },
        sortUsers() {
            this.users.sort((a, b) => {
                // First sort by (a.role.name > b.role.name ), true = swap
                // If false, then sort by (a.last_name > b.last_name), true = swap
                // If also false, then sort by (a.first_name > b.first_name)
                return a.role.name.localeCompare(b.role.name) ||
                    a.last_name.localeCompare(b.last_name) ||
                    a.first_name.localeCompare(b.first_name)
            })
        },
        updateRoles() {
            // Update user.role for each user
            this.users.forEach(user => {
                this.roles.forEach(role => {
                    if (role.identifier == user.role.name) {
                        user.role = role.copy()
                    }
                })
            })
        },
        removeUser(firstName, lastName) {
            let userIndex = -1
            for (let i = 0; i < this.users.length; ++i) {
                if (this.users[i].first_name == firstName && this.users[i].last_name == lastName) {
                    userIndex = i
                    break
                }
            }

            if (userIndex != -1) {
                this.users.splice(userIndex, 1) // Remove the user
            } else {
                console.log("Error! usePeople.js usePeople actions removeUser(firstName, lastName) could not find the user by name")
            }
        },
        newRole() {
            var archetypePerms = []
            for (let i = 0; i < inventorySt.schemes.length; ++i) {
                archetypePerms.push(new ArchetypePermissions(inventorySt.schemes[i].name, false, false, false))
                console.log("HELLO WORLD")
            }

            this.roles.push(new Role("New Role"), archetypePerms)
        },
        getRoleById(id) {
            return this.roles.filter((x) => x.id == id)[0];
        },
        getUserById(id) {
            return this.users.filter((x) => x.id == id)[0];
        },
        // notifyLoanChange(newLoan) {
        //     this.users.forEach(user => {
        //         user.history.loans.forEach(loan => {
        //             if (loan.loanId == newLoan.loanId) {
        //                 user.notify(new Notification(
        //                     1,
        //                     "Loan due date change",
        //                     "The due date for one of your loans has changef from " + loan.dateDue + " to " newLoan.dateDue + ".")
        //                 )
        //             }

        //         })
        //     })
        // }
    }
})