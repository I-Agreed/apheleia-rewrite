export class Archetype {
    constructor(name, subject, fieldTypes, fieldNames, fieldDefault, items = [], dbId = "", perms = { loan: false, handBack: false, edit: false }) {
        this.name = name;
        this.subject = subject; // name of subject
        this.fieldTypes = fieldTypes;
        this.fieldName = fieldNames;
        this.fieldDefault = fieldDefault;
        this.dbId = dbId; // id for use with backend api, might be undefined until saved if archetype is created by user
        this.perms = perms; // stores what the current user is able to do with items of this archetype

        // fill item objects
        this.items = [];
        for (let i = 0; i < items.length; i++) {
            this.items.push(Item(this.name, items[i]));
        }
    }
}

export class Item {
    constructor(arch, values, loan = undefined) {
        this.arch = arch; // name of archetype
        this.values = values;
        this.loan = loan; // loan (if applicable)
    }
}