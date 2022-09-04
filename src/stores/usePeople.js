import { defineStore } from 'pinia'

import { User, Role, ArchetypePermissions } from 'src/scripts/objects.js'
import useInventory from './useInventory'

//TODO: make these into a struct with a constructor that accepts api output
//      add perms for roles per archetype in the same subject
//      add methods to add, remove, and edit items in an archetype


export const usePeople = defineStore('peopleStore', {
    state: () => {
        loadFromDatabase()
        return {
            roles,
            users
        }
    },
    actions: {
        setRoles(roles) {
            roles.forEach(role => {
                this.roles.push(role.copy())
            })
        },
        loadFromDatabase() {
            // TODO: Brendan was away
            
            let teacherPermissions = []
            let studentPermissions = []

            inventorySt = useInventory()

            inventorySt.schemes.forEach(scheme => {
                teacherPermissions.push(new ArchetypePermissions(scheme.name, true, true, true))
                studentPermissions.push(new ArchetypePermissions(scheme.name, false, false, false))
            });

            const roles = [
                new Role("Teacher", teacherPermissions),
                new Role("Student", studentPermissions)
            ]

            this.roles = roles
            this.users = [
                new User(444444444, "Dat", "Huynh", roles[0]),
                new User(444444444, "Jennifer", "May", roles[0]),
                new User(444444444, "Rebecca", "Dam", roles[0]),
                new User(444444444, "Johnathan", "Min", roles[1]),
                new User(444444444, "Brendan", "Alcorn", roles[1]),
                new User(444444444, "Kai", "Cao", roles[1]),
                new User(444444444, "Klim", "Tsoutsman", roles[1])
            ]
        }
    }
})