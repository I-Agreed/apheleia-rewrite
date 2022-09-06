import { defineStore } from 'pinia'
import { Archetype, Item, GlobalHistory } from 'src/scripts/objects'
import { get_archetypes, add_archetype, add_subject, get_subjects, get_users, get_items } from '../scripts/backendApi.js'

// fieldTypes: 0 = text, 1 = number, 2 = selection, 3 = date, 4 = checkbox

//TODO: make these into a struct with a constructor that accepts api output
//      add perms to all archetypes
//      add methods to add, remove, and edit items in an archetype
//      associate items & archetypes with a subject

// this is all dummy data, final version will be empty and filled in from api
export const useInventory = defineStore('inventoryStore', {
    state: () => {
        return {
            // Schemes, meaning archetypes
            schemes: [
                new Archetype("Foil", "Fencing", [0, 2], ["Tag", "Blade Condition"], ["#000", [{ value: "Perfect" }, { value: "Minor Damage" }, { value: "Needs Immediate Repair" }]], [
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

                new Archetype("Sabre", "Fencing", [0, 1, 2, 2], ["Name", "Tag", "Blade Condition", "Wire Condition"], ["Item", "000", [{ value: "Perfect" }, { value: "Needs Immediate Repair" }],
                    [{ value: "Functional" }, { value: "Inconsistent" }, { value: "Broken" }]
                ], [
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

                new Archetype("Camera Pro", "Film", [0, 4, 3], ["Name", "Has Lens", "Date Bought"], ["Item", false, "2022-02-02"], [
                    ["I have a lover. Please give me friends and attributes.", false, "2022-02-02"],
                    ["I have a lover. Please give me friends, they are boring.", true, "2022-02-02"],
                    ["RED-H74", true, "2022-02-02"]
                ])
            ],
            history: new GlobalHistory([{ id: "000000", name: "#F001", itemId: "Foil1", borrower: "John Smith", borrow: "2022-02-02", due: "2022-03-02", return: "" }]),
            focusedSelection: ""
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
                    outColumns.push({
                        name: this.stringToKey(fieldName),
                        label: fieldName,
                        field: this.stringToKey(fieldName),
                        align: "center",
                        sortable: true
                    })
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

                    outItem["itemId"] = item.dbId

                    console.log(outItem)

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
                rows.push({
                    property: currentScheme.fieldNames[i],
                    propertyType: getType(currentScheme.fieldTypes[i]),
                    defaultValue: currentScheme.fieldDefault[i]
                })
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

        // set item field value by archetype and item index
        setItemField(archetypeIndex, itemIndex, index, value) {
            this.schemes[archetypeIndex].items[itemIndex].values[index] = value;
        },

        // delete item by archetype and item index
        deleteItem(archetypeIndex, itemIndex) {
            console.log(archetypeIndex, itemIndex)
            this.schemes[archetypeIndex].items.splice(itemIndex, 1)
        },

        // create item from default values
        createDefaultItem(archetypeIndex) {
            this.schemes[archetypeIndex].items.push(new Item(this.schemes[archetypeIndex].name, this.schemes[archetypeIndex].getDefaultValues()))
        },

        // sets archetype field name
        setArchetypeFieldName(archetypeIndex, fieldIndex, name) {
            this.schemes[archetypeIndex].fieldNames[fieldIndex] = name;
        },

        setArchetypePropertyType(archetypeIndex, fieldIndex, type) {
            const typeTable = { "text": 0, "number": 1, "selection": 2, "date": 3, "checkbox": 4 }

            switch (type) {
                case "text":
                    this.schemes[archetypeIndex].fieldDefault[fieldIndex] = "Text"
                    break;

                case "number":
                    this.schemes[archetypeIndex].fieldDefault[fieldIndex] = 0
                    break;

                case "selection":
                    this.schemes[archetypeIndex].fieldDefault[fieldIndex] = [{ value: "Option 1" }, { value: "Option 2" }]
                    break;

                case "date":
                    this.schemes[archetypeIndex].fieldDefault[fieldIndex] = "01-01-2022"
                    break;

                case "checkbox":
                    this.schemes[archetypeIndex].fieldDefault[fieldIndex] = true
                    break;
            }

            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                if (type != "selection") {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = this.schemes[archetypeIndex].fieldDefault[fieldIndex]
                } else {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = this.schemes[archetypeIndex].fieldDefault[fieldIndex][0].value
                }
            }

            this.schemes[archetypeIndex].fieldTypes[fieldIndex] = typeTable[type];
        },

        setArchetypeDefaultField(archetypeIndex, fieldIndex, value) {
            this.schemes[archetypeIndex].fieldDefault[fieldIndex] = value;
        },

        modifyArchetypeDefaultFieldSelection(archetypeIndex, fieldIndex, selectionIndex, value) {
            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                if (this.schemes[archetypeIndex].items[i].values[fieldIndex] === this.focusedSelection) {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = value
                }
            }

            this.schemes[archetypeIndex].fieldDefault[fieldIndex][selectionIndex].value = value;
        },

        removeArchetypeDefaultFieldSelection(archetypeIndex, fieldIndex, selectionIndex) {
            if (this.schemes[archetypeIndex].fieldDefault[fieldIndex].length <= 1) return;
            let val = this.schemes[archetypeIndex].fieldDefault[fieldIndex][selectionIndex].value

            this.schemes[archetypeIndex].fieldDefault[fieldIndex].splice(selectionIndex, 1)

            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                if (this.schemes[archetypeIndex].items[i].values[fieldIndex] === val) {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = this.schemes[archetypeIndex].fieldDefault[fieldIndex][0].value
                }
            }
        },

        addArchetypeDefaultFieldSelection(archetypeIndex, fieldIndex) {
            this.schemes[archetypeIndex].fieldDefault[fieldIndex].push({ value: `Option ${this.schemes[archetypeIndex].fieldDefault[fieldIndex].length + 1}` })
        },

        deleteProperty(archetypeIndex, propertyIndex) {
            this.schemes[archetypeIndex].fieldTypes.splice(propertyIndex, 1);
            this.schemes[archetypeIndex].fieldNames.splice(propertyIndex, 1);
            this.schemes[archetypeIndex].fieldDefault.splice(propertyIndex, 1);

            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                this.schemes[archetypeIndex].items[i].values.splice[propertyIndex]
            }
        },

        newProperty(archetypeIndex) {
            this.schemes[archetypeIndex].fieldTypes.push(0)
            this.schemes[archetypeIndex].fieldNames.push("Property")
            this.schemes[archetypeIndex].fieldDefault.push("Default Text")

            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                this.schemes[archetypeIndex].items[i].values.push("Default Text")
            }
        },

        deleteArchetype(archetypeIndex) {
            this.schemes.splice(archetypeIndex, 1)
        },

        newArchetype() {
            this.schemes.push(new Archetype(`Archetype ${this.schemes.length + 1}`, "Fencing", [0, 1], ["Property 1", "Property 2"], ["Default Value", 0], [
                ["Default Value", 0]
            ]))
        },

        create_item(archetypeId, fields) {
            this.schemes.forEach(scheme => {
                if (archetypeId == scheme.id) {
                    scheme.items.push(fields)
                }
            })
        },

        createLoan(itemId, user, due) {
            const d = new Date()

            this.history.loans.push({
                id: "000000",
                name: this.getItemById(itemId).values[0],
                itemId: itemId,
                borrower: user,
                borrow: `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`,
                due: due,
                return: ""
            })
        },

        getItemById(itemId) {
            let it;
            this.schemes.forEach(arch => {
                arch.items.forEach(item => {
                    if (item.dbId === itemId) {
                        it = item
                    }
                })
            })

            return it
        },

        getLoanByItemId(itemId) {
            let outLoan;
            this.history.loans.forEach(loan => {
                if (loan.itemId === itemId) {
                    outLoan = loan
                }
            })

            return outLoan
        },

        getArchetypeById(archId) {
            return this.schemes.filter((x) => x.dbId === archId)[0];
        },

        editLendDates(itemId, borrow, due) {
            for (let i = 0; i < this.history.loans.length; i++) {
                if (this.history.loans[i].itemId === itemId) {
                    this.history.loans[i].borrow = borrow
                    this.history.loans[i].due = due
                }
            }
        },

        returnItem(itemId) {
            const d = new Date()

            for (let i = 0; i < this.history.loans.length; i++) {
                if (this.history.loans[i].itemId === itemId) {
                    this.history.loans[i].return = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`
                }
            }
        },

        modify_item() {

        },
        create_archetype() {

        },
        modify_archetype() {

        },

        updateArchetypes() {
            get_archetypes().then(data => console.log(data))
            get_items().then(data => console.log(data))
        }
    }
})