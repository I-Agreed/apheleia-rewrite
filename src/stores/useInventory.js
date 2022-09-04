import { defineStore } from 'pinia'
import { Archetype, Item, History } from 'src/scripts/objects'

// fieldTypes: 0 = text, 1 = number, 2 = selection, 3 = date, 4 = checkbox

//TODO: make these into a struct with a constructor that accepts api output
//      add perms to all archetypes
//      add methods to add, remove, and edit items in an archetype
//      associate items & archetypes with a subject

// this is all dummy data, final version will be empty and filled in from api
export const useInventory = defineStore('inventoryStore', {
    state: () => {
        return {
            schemes: [
                new Archetype("Foil", "Fencing", [0, 1, 2], ["Tag", "Blade Condition"], ["#000", [{ value: "Perfect" }, { value: "Needs Immediate Repair" }]], [
                    ["#F001", "Perfect"],
                    ["#F002", "Perfect"],
                    ["#F003", "Perfect"],
                    ["#F004", "Perfect"],
                    ["#F005", "Minor Damage"],
                    ["#F006", "Needs Immediate Repair"],
                    ["#F007", "Needs Immediate Repair"],
                    ["#F008", "Perfect"],
                    ["#F009", "Perfect"],
                    ["#F010", "Perfect"]
                ]),

                new Archetype("Sabre", "Fencing", [0, 1, 2, 2], ["Name", "Tag", "Blade Condition", "Wire Condition"], ["Item", "000", [{ value: "Perfect" }, { value: "Needs Immediate Repair" }], [{ value: "Perfect" }, { value: "Needs Immediate Repair" }]], [
                    ["name1", "#S001", "Perfect", "Functional"],
                    ["name2", "#S002", "Perfect", "Inconsistent"],
                    ["name3", "#S003", "Perfect", "Inconsistent"],
                    ["name4", "#S004", "Perfect", "Functional"],
                    ["name5", "#S005", "Minor Damage", "Functional"],
                    ["name6", "#S006", "Needs Immediate Repair", "Functional"],
                    ["name7", "#S007", "Needs Immediate Repair", "Broken"]
                ]),

                new Archetype("Epee", "Fencing", [0], ["Name"], ["Item"], [
                    ["I am the only epee blade. I am alone. Please give me friends and attributes."]
                ]),

                new Archetype("Camera", "Film", [0], ["Name"], ["Item"], [
                    ["I am the only normal camera. Please do not throw me out. Please give me friends and attributes."]
                ]),

                new Archetype("Camera Pro", "Film", [0, 4, 3], ["Name", "Has Lens", "Date Bought"], ["Item", "false", "2022-02-02"], [
                    ["I have a lover. Please give me friends and attributes.", "false", "2022-02-02"],
                    ["I have a lover. Please give me friends, they are boring.", "true", "2022-02-02"],
                    ["RED-H74", "True", "2022-02-02"]
                ])
            ],
            history: new History()
        }
    },
    getters: {},
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
                console.log("cols:", outColumns)
                return outColumns
            } else {
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
                    let item = currentScheme.items[i]
                    let outItem = {};
                    
                    // Populate the item with { fieldName1: value1, fieldName2: value2... }
                    for (let i = 0; i < currentScheme.fieldNames.length; i++) {
                        let key = this.stringToKey(currentScheme.fieldNames[i])

                        outItem[key] = item.values[i]
                    }

                    // Add the item to the rows list
                    outRows.push(outItem)
                }

                console.log("rows:", outRows)
                return outRows
            } else {
                console.log("Error in useInventory.js, actions, rows(schemeName)")
            }
        },
        // returns rows for edit archetype popup
        archetypeRows(schemeName) {
            let rows = []
            let schemeId = this.getSchemeId(schemeName)
            let currentScheme = this.schemes[schemeId]

            for (let i = 0; i < currentScheme.fieldNames.length; i++) {
                rows.push({ property: currentScheme.fieldNames[i], propertyType: getType(currentScheme.fieldTypes[i]), defaultValue: currentScheme.fieldDefault[i] })
            }

            function getType(type) {
                switch (type) {
                    case 0:
                        return "text";
                        break;
                    case 1:
                        return "number";
                        break;
                    case 2:
                        return "selection";
                        break;
                    case 3:
                        return "date";
                        break;
                    case 4:
                        return "checkbox";
                        break;

                    default:
                        break;
                }
            }

            return rows
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