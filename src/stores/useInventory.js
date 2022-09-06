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
                    ["#F171", "Perfect"],
                    ["#F134", "Perfect"],
                    ["#F146", "Perfect"],
                    ["#F114", "Perfect"],
                    ["#F437", "Minor Damage"],
                    ["#F193", "Needs Immediate Repair"],
                    ["#F483", "Needs Immediate Repair"],
                    ["#F109", "Perfect"],
                    ["#F478", "Perfect"],
                    ["#F101", "Perfect"]
                ]),

                new Archetype("Sabre", "Fencing", [0, 0, 2, 2], ["Name", "Tag", "Blade Condition", "Wire Condition"], ["Item", "000", [{ value: "Perfect" }, { value: "Minor Damage" }, { value: "Needs Immediate Repair" }],
                    [{ value: "Functional" }, { value: "Inconsistent" }, { value: "Broken" }]
                ], [
                    ["Blade 1A", "#S541", "Perfect", "Functional"],
                    ["Blade 1B", "#S478", "Perfect", "Inconsistent"],
                    ["Blade 2A", "#S109", "Perfect", "Inconsistent"],
                    ["Blade 2B", "#S467", "Perfect", "Functional"],
                    ["Blade 2C", "#S327", "Minor Damage", "Functional"],
                    ["Blade 3A", "#S100", "Needs Immediate Repair", "Functional"],
                    ["Blade 3B", "#S464", "Needs Immediate Repair", "Broken"]
                ]),

                new Archetype("Epee", "Fencing", [0, 0, 3, 4, 2], ["Name", "Tag", "Last serviced", "Has Sheath", "Condition"], ["Item", "#E000", "2022-02-02", true, [{ value: "Perfect" }, { value: "Minor Damage" }, { value: "Needs Immediate Repair" }]], [
                    ["Epee 1A", "#E010", "2022-04-05", true, "Perfect"],
                    ["Epee 1B", "#E370", "2021-08-02", true, "Minor Damage"],
                    ["Epee 2A", "#E389", "2020-02-23", false, "Needs Immediate Repair"],
                    ["Epee 2B", "#E975", "2021-12-01", false, "Minor Damage"],
                    ["Epee 2C", "#E278", "2022-09-01", true, "Perfect"]
                ]),

                new Archetype("Camera", "Film", [0, 0, 4, 3], ["ID", "Model", "Has Lens", "Date bought"], ["ABCD", "Camera", true, "2022-02-02"], [
                    ["A3B3", "Canon 5T", true, "2019-02-03"],
                    ["BH7A", "Sony 2000-A", false, "2018-04-22"],
                    ["K23T", "RED-H73", true, "2022-01-01"],
                    ["BH35", "GoPro H10", false, "2017-12-01"],
                    ["HY3U", "Canon 10T", true, "2018-01-25"],
                    ["A9B9", "Canon 500", true, "2021-07-18"]
                ])
            ],
            history: new GlobalHistory(),
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

        // Set property of archetype type
        setArchetypePropertyType(archetypeIndex, fieldIndex, type) {
            const typeTable = { "text": 0, "number": 1, "selection": 2, "date": 3, "checkbox": 4 }

            // Set the default based on type
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
            
            // Change the items field to the default
            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                if (type != "selection") {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = this.schemes[archetypeIndex].fieldDefault[fieldIndex]
                } else {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = this.schemes[archetypeIndex].fieldDefault[fieldIndex][0].value
                }
            }

            this.schemes[archetypeIndex].fieldTypes[fieldIndex] = typeTable[type];
        },

        // Set archetype default
        setArchetypeDefaultField(archetypeIndex, fieldIndex, value) {
            this.schemes[archetypeIndex].fieldDefault[fieldIndex] = value;
        },

        // Modify archetype default field for selection type
        modifyArchetypeDefaultFieldSelection(archetypeIndex, fieldIndex, selectionIndex, value) {
            // Change the field for items
            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                if (this.schemes[archetypeIndex].items[i].values[fieldIndex] === this.focusedSelection) {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = value
                }
            }

            this.schemes[archetypeIndex].fieldDefault[fieldIndex][selectionIndex].value = value;
        },

        // remove the archetype default field for selection type
        removeArchetypeDefaultFieldSelection(archetypeIndex, fieldIndex, selectionIndex) {
            if (this.schemes[archetypeIndex].fieldDefault[fieldIndex].length <= 1) return;
            let val = this.schemes[archetypeIndex].fieldDefault[fieldIndex][selectionIndex].value

            this.schemes[archetypeIndex].fieldDefault[fieldIndex].splice(selectionIndex, 1)

            // delete selection field from all items and set to another one
            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                if (this.schemes[archetypeIndex].items[i].values[fieldIndex] === val) {
                    this.schemes[archetypeIndex].items[i].values[fieldIndex] = this.schemes[archetypeIndex].fieldDefault[fieldIndex][0].value
                }
            }
        },

        // add archetype default selection field
        addArchetypeDefaultFieldSelection(archetypeIndex, fieldIndex) {
            this.schemes[archetypeIndex].fieldDefault[fieldIndex].push({ value: `Option ${this.schemes[archetypeIndex].fieldDefault[fieldIndex].length + 1}` })
        },

        // delete archetype property
        deleteProperty(archetypeIndex, propertyIndex) {
            this.schemes[archetypeIndex].fieldTypes.splice(propertyIndex, 1);
            this.schemes[archetypeIndex].fieldNames.splice(propertyIndex, 1);
            this.schemes[archetypeIndex].fieldDefault.splice(propertyIndex, 1);

            // delete property from all items
            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                this.schemes[archetypeIndex].items[i].values.splice[propertyIndex]
            }
        },

        // create new property for archetype
        newProperty(archetypeIndex) {
            this.schemes[archetypeIndex].fieldTypes.push(0)
            this.schemes[archetypeIndex].fieldNames.push("Property")
            this.schemes[archetypeIndex].fieldDefault.push("Default Text")

            // add property's default value to items
            for (let i = 0; i < this.schemes[archetypeIndex].items.length; i++) {
                this.schemes[archetypeIndex].items[i].values.push("Default Text")
            }
        },

        // delete an archetype
        deleteArchetype(archetypeIndex) {
            this.schemes.splice(archetypeIndex, 1)
        },

        // create a new archetype with default values
        newArchetype() {
            this.schemes.push(new Archetype(`Archetype ${this.schemes.length + 1}`, "Fencing", [0, 1], ["Property 1", "Property 2"], ["Default Value", 0], [
                ["Default Value", 0]
            ]))
        },

        // create an item
        create_item(archetypeId, fields) {
            this.schemes.forEach(scheme => {
                if (archetypeId == scheme.id) {
                    scheme.items.push(fields)
                }
            })
        },

        // create a loan
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

        // get an item by id
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

        // get a loan by item id
        getLoanByItemId(itemId) {
            let outLoan;
            this.history.loans.forEach(loan => {
                if (loan.itemId === itemId) {
                    outLoan = loan
                }
            })

            return outLoan
        },

        // get an archetype by id
        getArchetypeById(archId) {
            return this.schemes.filter((x) => x.dbId === archId)[0];
        },

        // edit loan dates for a loan
        editLendDates(itemId, borrow, due) {
            for (let i = 0; i < this.history.loans.length; i++) {
                if (this.history.loans[i].itemId === itemId) {
                    this.history.loans[i].borrow = borrow
                    this.history.loans[i].due = due
                }
            }
        },

        // return an item
        returnItem(itemId) {
            const d = new Date()

            for (let i = 0; i < this.history.loans.length; i++) {
                if (this.history.loans[i].itemId === itemId) {
                    this.history.loans[i].return = `${d.getFullYear()}-${("0" + (d.getMonth() + 1)).slice(-2)}-${("0" + d.getDate()).slice(-2)}`
                }
            }
        },

        updateArchetypes() {
            get_archetypes().then(data => console.log(data))
            get_items().then(data => console.log(data))
        }
    }
})