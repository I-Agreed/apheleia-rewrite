import { defineStore } from 'pinia'

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            users: [
                {
                    internal_id: 0,
                    school_id: 444444444,
                    name: "Cat",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does eeeepeee"
                },
                {
                    internal_id: 1,
                    school_id: 444444444,
                    name: "Dog",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does fossil"
                },
                {
                    internal_id: 2,
                    school_id: 444444444,
                    name: "Rabbit",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does fossil"
                },
                {
                    internal_id: 3,
                    school_id: 444444444,
                    name: "Mouse",
                    roles: [
                        0,
                        1,
                        2,
                    ],
                    info: "This animal does sabba"
                }
            ]
        }
    }
})