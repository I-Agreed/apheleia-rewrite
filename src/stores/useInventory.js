import { defineStore } from 'pinia'

export const useInventory = defineStore('inventoryStore', {
    state: () => {
        return {
            schemes: [
                {
                    id: 0,
                    name: "Foil",
                    totalItems: 16,
                    fieldTypes: [0, 1, 2],
                    fieldNames: ["Name", "Tag", "Condition"],
                    items: [
                        ["Red Brambleback", "101", "Perfect"],
                        ["Worcester", "756", "Perfect"],
                        ["Dark Flame Abyss Dragon", "937", "Perfect"],
                        ["The Stabber", "123", "Perfect"],
                        ["Yordle", "236", "Good"],
                        ["Bunny", "237", "Perfect"],
                        ["Hankerchief", "240", "Needs Immediate Repair"],
                        ["My Maths Extension Mark", "200", "Needs Immediate Repair"],
                        ["My English Advanced Mark", "102", "Needs Immediate Repair"],
                        ["Pineapple", "754", "Good"],
                        ["The Table Flipper", "465", "Good"],
                        ["Skewer", "968", "Needs Immediate Repair"],
                        ["I Throw My Fencing Blade", "183", "Good"],
                        ["The developers have misspelt Aphelia 99% of the time...", "092", "Perfect"],
                        ["The Floor is Made of Floor", "742", "Perfect"],
                        ["Secret Base", "010", "Needs Immediate Repair"]
                    ]
                },
                {
                    id: 1,
                    name: "Sabre",
                    totalItems: 7,
                    fieldTypes: [0, 1, 2, 2 ],
                    fieldNames: ["Name", "Tag", "Condition", "Tip Condition"],
                    items: [
                        ["Swing", "107", "Perfect", "Perfect"],
                        ["Ding", "757", "Perfect", "Perfect"],
                        ["Ding Ding", "931", "Perfect", "Perfect"],
                        ["I Cut You", "124", "Perfect", , "Perfect"],
                        ["CHARGE!", "222", "Good", "Perfect"],
                        ["I Trip", "221", "Perfect", , "Perfect"],
                        ["Swing and Swing", "111", "Needs Immediate Repair", "Perfect"]
                    ]
                },
                {
                    id: 2,
                    name: "Epée",
                    totalItems: 1,
                    fieldTypes: [0],
                    fieldNames: ["Name"],
                    items: [
                        ["I am the only epee blade. I am alone. Please give me friends and attributes."]
                    ]
                },
                {
                    id: 3,
                    name: "Camera",
                    totalItems: 1,
                    fieldTypes: [0],
                    fieldNames: ["Name"],
                    items: [
                        ["I am the only normal camera. Please do not throw me out. Please give me friends and attributes."]
                    ]
                },
                {
                    id: 4,
                    name: "Camera Pro",
                    totalItems: 2,
                    fieldTypes: [0, 4],
                    fieldNames: ["Name", "Has Lens"],
                    items: [
                        ["I have a lover. Please give me friends and attributes.", "False"],
                        ["I have a lover. Please give me friends, they are boring.", "True"],
                        ["RED-H74", "True"]
                    ]
                },
                //{name: "Archetype Name n"}
            ]
        }
    },
    getters: {
    },
    actions: {
        create_item(archetypeId, fields) {
            this.schemes.forEach(scheme => {
                if (archetypeId == scheme.id) {
                    scheme.items.push(fields)
                }
            })
        },
        modify_item() {

        },
        create_archetype() {

        },
        modify_archetype() {

        }
    }
})