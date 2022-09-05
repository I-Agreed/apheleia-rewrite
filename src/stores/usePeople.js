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
            roles.forEach(role => {
                this.roles.push(role.copy())
            })
        }
        
    }
})