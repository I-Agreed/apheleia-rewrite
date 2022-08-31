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
        // Converts strings (such as fieldName) to working keys
        stringToKey(string) {
            return string.replace(" ", "_")
        },
        // Returns the schemeId of a matching scheme with a matching name in the database, returns -1 if not found
        getSchemeId(schemeName) {
            let schemeId = -1
            for (let i = 0; i < this.schemes.length; ++i) {
                if (this.schemes[i].name == schemeName) {
                    schemeId = i
                    break
                }
            }
            return schemeId
        },
        // Returns the columns (table headers) necessary for the items display for a given scheme (item type)
        columns(schemeName) {
            let schemeId = this.getSchemeId(schemeName)
            
            // If a matching scheme was found
            if (schemeId != -1) {
                let outColumns = []
                // Add the field names to the columns list
                this.schemes[schemeId].fieldNames.forEach(fieldName => {
                    outColumns.push({ name: this.stringToKey(fieldName), label: fieldName, field: this.stringToKey(fieldName), align: "center", sortable: true })
                })

                // Add the last column for lending and return
                outColumns.push({ name: 'lend', headerStyle: 'width: 10%', align: "center", label: "", field: "lend", sortable: false })
                return outColumns
            }
            else {
                console.log("Error in useInventory.js, actions, columns(schemeName)")
            }
        },
        // Returns the table rows for the items display for a given scheme (item type)
        rows(schemeName) {
            let schemeId = this.getSchemeId(schemeName)
            
            // If a matching scheme was found
            if (schemeId != -1) {
                let outRows = []
                let currentScheme = this.schemes[schemeId]

                // Add the item data to the rows
                // Loop through all the items
                for (let i = 0; i < currentScheme.items.length; ++i) {
                    // Create an item
                    let item = {}

                    // Populate the item with { fieldName1: value1, fieldName2: value2... }
                    for (let fieldIndex = 0; fieldIndex < currentScheme.fieldNames.length; ++fieldIndex) {
                        let key = this.stringToKey(currentScheme.fieldNames[fieldIndex])
                        
                        item.key = currentScheme.items[i][fieldIndex]
                    }

                    // Add the item to the rows list
                    outRows.push(item)
                }

                return outRows
            }
            else {
                console.log("Error in useInventory.js, actions, rows(schemeName)")
            }
        },
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