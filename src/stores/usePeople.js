import { defineStore } from 'pinia'

import { User, Role } from 'src/scripts/objects.js'


//TODO: make these into a struct with a constructor that accepts api output
//      add perms for roles per archetype in the same subject
//      add methods to add, remove, and edit items in an archetype

const roles = [
    new Role("Teacher", {}),
    new Role("Student", {})
]

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            roles: roles,
            users: [
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