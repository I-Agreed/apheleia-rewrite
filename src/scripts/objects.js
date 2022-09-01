/*
My thought process with the classes is that they would be easier to manipulate, such as creation, deletion, and modification.
They could either be created by the user on their end, or be loaded in from the database.
TODO: At some point after logging in to the web page, the program should request the lists of every archetype, item, loan, role, user, and subject area that the user is able to interact with.
Each class should have a method that constructs an instance from the raw data recieved from the api, and probably also a function to do the inverse for modifications.
Other things, such as loans, roles, and subjects should also have classes but i dont have time to create them.
*/

export class Archetype {
    constructor(name, subject, fieldTypes, fieldNames, fieldDefault, items = [], dbId = "", perms = { loan: false, handBack: false, edit: false }) {
        this.name = name;
        this.subject = subject; // name of subject
        this.fieldTypes = fieldTypes;
        this.fieldNames = fieldNames;
        this.fieldDefault = fieldDefault;
        this.dbId = dbId; // id for use with backend api, might be undefined until saved if archetype is created by user
        this.perms = perms; // stores what the current user is able to do with items of this archetype

        // fill item objects
        this.items = [];
        for (let i = 0; i < items.length; i++) {
            this.items.push(new Item(this.name, items[i]));
        }
    }

    // data is output from get archetype api function
    // im also not entirely sure how the database schema property of archetypes is structured
    fromRawApi(data) {
        return new Archetype(data.name, data.subject_area, data.schema, data.schema, [], data.id);
    }
}

export class Item {
    constructor(arch, values, dbId = "", loan = undefined) {
        this.arch = arch; // name of archetype
        this.values = values;
        this.loan = loan; // loan (if applicable)
    }

    // TODO: i dont have a lot of time rn, the data.archetype is actually the database id of the archetype, this should be fixed
    fromRawApi(data) {
        return new Item(data.archetype, data.archetype_data, data.id);
    }
}

export class Role {
    constructor(name, permissions) {
        this.name = name
        this.permissions = permissions // TODO:
    }

    fromRawApi(data) {}
}

export class User {
    constructor(id, first_name, last_name, role) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.role = role
    }

    fromRawApi(data) {

    }
}