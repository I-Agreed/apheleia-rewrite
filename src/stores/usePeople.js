import { defineStore } from 'pinia'

export const usePeople = defineStore('peopleStore', {
    state: () => {
        return {
            users: [
                { id: 444444444, first_name: "Dat",     last_name: "Huynh", role: "Teacher" },
                { id: 444444444, first_name: "Jennifer", last_name: "May",   role: "Teacher" },
                { id: 444444444, first_name: "Rebecca", last_name: "Dam",   role: "Teacher" },
                { id: 444444444, first_name: "Johnathan", last_name: "Min", role: "Student" },
                { id: 444444444, first_name: "Brendan", last_name: "Alcorn", role: "Student" },
                { id: 444444444, first_name: "Kai Bo", last_name: "Cao", role: "Student" },
                { id: 444444444, first_name: "Klim", last_name: "Tsoutsman", role: "Student" }
            ]
        }
    }
})