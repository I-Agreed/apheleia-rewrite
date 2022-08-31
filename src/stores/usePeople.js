import { defineStore } from 'pinia'

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            users: [
                {
                    // internal_id: 0,
                    id: 444444444,
                    name: "Cat",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does eeeepeee"
                },
                {
                    // internal_id: 1,
                    id: 444444444,
                    name: "Dog",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does fossil"
                },
                {
                    // internal_id: 2,
                    id: 444444444,
                    name: "Rabbit",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does fossil"
                },
                {
                    // internal_id: 3,
                    id: 444444444,
                    name: "Mouse",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does sabba"
                },
                { id: "123456789", name: "John Smith", roles: "Teacher" },
                { id: "123456789", name: "Jane Smith", roles: "Teacher" },
                { id: "123456789", name: "John Doe",   roles: "Teacher" },
                { id: "123456789", name: "Jane Doe",   roles: "Teacher" }
            ]
        }
    }
})