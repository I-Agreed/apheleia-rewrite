import { defineStore } from 'pinia'

import { User, Role, ArchetypePermissions } from 'src/scripts/objects.js'
import { useInventory } from 'src/stores/useInventory'

//TODO: make these into a struct with a constructor that accepts api output
//      add perms for roles per archetype in the same subject
//      add methods to add, remove, and edit items in an archetype

let teacherPermissions = []
let studentPermissions = []

const inventorySt = useInventory()

inventorySt.schemes.forEach(scheme => {
    teacherPermissions.push(new ArchetypePermissions(scheme.name, true, true, true))
    studentPermissions.push(new ArchetypePermissions(scheme.name, false, false, false))
});

teacherPermissions[0] = new ArchetypePermissions("Foil", true, true, true)

const roles = [
    new Role("Teacher", teacherPermissions, true),
    new Role("Student", studentPermissions)
]

const users = [
    new User(444444444, "Dat", "Huynh", roles[0]),
    new User(444444444, "Jennifer", "May", roles[0]),
    new User(444444444, "Rebecca", "Dam", roles[0]),
    new User(444444444, "Johnathan", "Min", roles[1]),
    new User(444444444, "Brendan", "Alcorn", roles[1]),
    new User(444444444, "Kai", "Cao", roles[1]),
    new User(444444444, "Klim", "Tsoutsman", roles[1]),
    new User(444444444, "John", "Smith", roles[1])
]

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            roles: roles,
            users: users
        }
    },
    actions: {
        setRoles(roles) {
            this.roles.length = 0
            roles.forEach(role => {
                this.roles.push(role.copy())
            })
        },
        sortUsers() {
            this.users.sort((a, b) => {
                // First sort by (a.role.name > b.role.name ), true = swap
                // If false, then sort by (a.last_name > b.last_name), true = swap
                // If also false, then sort by (a.first_name > b.first_name)
                return a.role.name  > b.role.name  ||
                       a.last_name  > b.last_name  ||
                       a.first_name > b.first_name
            })
        },
        updateRoles() {
            // Update user.role for each user
            this.users.forEach(user => {
                this.roles.forEach(role => {
                    if (role.name == user.role.name) {
                        user.role = role
                    }
                })
            })
        },
        updateUser(firstName, lastName, roleName) {
            // Find the role in the store with a matching role name
            selectedRole = new Role("INVALID_ROLE")
            this.roles.forEach(role => {
                if (role.name == roleName) {
                    selectedRole = role.copy()
                }
            })

            if (selectedRole.name != "INVALID_ROLE") {
                selectedUser = new User(-1, "INVALID_USER")
                userIndex = -1

                // Find index of matching user in the store by name
                for (let i = 0; i < this.users.length; ++i) {
                    if (user.first_name == firstName && user.last_name == lastName) {
                        selectedUser = user.copy()
                        userIndex = i
                        break
                    }
                }

                if (selectedUser.firstName != "INVALID_USER" && selectedUser.id != -1 && userIndex != -1) {
                    this.users.splice(userIndex, 1) // Remove the user from the store

                    // Give the user the new role and add them to the store
                    selectedUser.role = selectedRole
                    this.users.push(selectedUser)

                    updateRoles()
                    sortUsers()
                }
                else {
                    console.log("Error! usePeople.js usePeople actions updateUser(firstName, lastName, roleName) could not find the user by name")
                }
            }
            else {
                console.log("Error! usePeople.js usePeople actions updateUser(firstName, lastName, roleName) could not find the role by roleName")
            }
        }
    }
})