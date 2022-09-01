import { defineStore } from 'pinia'

import { User, Role } from 'src/scripts/objects.js'

//TODO: make these into a struct with a constructor that accepts api output
//      add perms for roles per archetype in the same subject
//      add methods to add, remove, and edit items in an archetype

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            roles: [
                new Role("Teacher", {}),
                new Role("Student", {})
            ],
            users: [
                new User(444444444, "Dat",       "Huynh",     0),
                new User(444444444, "Jennifer",  "May",       0),
                new User(444444444, "Rebecca",   "Dam",       0),
                new User(444444444, "Johnathan", "Min",       1),
                new User(444444444, "Brendan",   "Alcorn",    1),
                new User(444444444, "Kai",       "Cao",       1),
                new User(444444444, "Klim",      "Tsoutsman", 1)
            ]
        }
    }
})