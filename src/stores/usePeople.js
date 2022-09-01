import { defineStore } from 'pinia'

//TODO: make these into a struct with a constructor that accepts api output
//      add perms for roles per archetype in the same subject
//      add methods to add, remove, and edit items in an archetype

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            users: [{
                    // internal_id: 0,
                    id: 444444444,
                    name: "Cat",
                    roles: ["Teacher"],
                    info: "This animal does eeeepeee"
                },
                {
                    // internal_id: 1,
                    id: 444444444,
                    name: "Dog",
                    roles: ["Student"],
                    info: "This animal does fossil"
                },
                {
                    // internal_id: 2,
                    id: 444444444,
                    name: "Rabbit",
                    roles: ["Student"],
                    info: "This animal does fossil"
                },
                {
                    // internal_id: 3,
                    id: 444444444,
                    name: "Mouse",
                    roles: ["Coach"],
                    info: "This animal does sabba"
                },
                { id: "123456789", name: "John Smith", roles: "Teacher" },
                { id: "123456789", name: "Jane Smith", roles: "Teacher" },
                { id: "123456789", name: "John Doe", roles: "Teacher" },
                { id: "123456789", name: "Jane Doe", roles: "Teacher" }
            ]
        }
    }
})