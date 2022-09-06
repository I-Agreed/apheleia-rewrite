/*
My thought process with the classes is that they would be easier to manipulate, such as creation, deletion, and modification.
They could either be created by the user on their end, or be loaded in from the database.
TODO: At some point after logging in to the web page, the program should request the lists of every archetype, item, loan, role, user, and subject area that the user is able to interact with.
Each class should have a method that constructs an instance from the raw data recieved from the api, and probably also a function to do the inverse for modifications.
Other things, such as loans, roles, and subjects should also have classes but i dont have time to create them.
*/

export class Archetype {
    constructor(name, subject, fieldTypes, fieldNames, fieldDefault, items = [], dbId = "", perms = { }) {
        this.name = name
        this.subject = subject // name of subject
        this.fieldTypes = fieldTypes
        this.fieldNames = fieldNames
        this.fieldDefault = fieldDefault
        this.dbId = dbId // id for use with backend api, might be undefined until saved if archetype is created by user

        // fill item objects
        this.items = [];
        for (let i = 0; i < items.length; i++) {
            this.items.push(new Item(this.name, items[i], `${this.name}${i}`));
        }
    }

    // data is output from get archetype api function
    // im also not entirely sure how the database schema property of archetypes is structured
    fromRawApi(data) {
        return new Archetype(data.name, data.subject_area, data.schema, data.schema, [], data.id);
    }

    // collapse the values for selectors and return array
    getDefaultValues() {
        let out = []

        for (let i = 0; i < this.fieldTypes.length; i++) {
            if (this.fieldTypes[i] === 2) {
                out.push(this.fieldDefault[i][0].value)
            } else {
                out.push(this.fieldDefault[i])
            }
        }

        return out;
    }
}

export class Item {
    constructor(arch, values, dbId = "") {
        this.dbId = dbId;
        this.arch = arch; // name of archetype
        this.values = values;
    }

    // TODO: i dont have a lot of time rn, the data.archetype is actually the database id of the archetype, this should be fixed
    fromRawApi(data) {
        return new Item(data.archetype, data.archetype_data, data.id);
    }
}

export class ArchetypePermissions {
    constructor(arch = "", loan = false, handBack = false, edit = false) {
        this.arch = arch
        this.setPerms(loan, handBack, edit)
    }

    setPerms(loan, handBack, edit) {
        this.loan = loan
        this.handBack = handBack
        this.edit = edit
    }

    copy() {
        return new ArchetypePermissions(this.arch, this.loan, this.handBack, this.edit)
    }
}

export class Role {
    constructor(name = "", archetypePermissions = new Array(new ArchetypePermissions()), managePeople = false) {
        this.name = name
        this.archetypePermissions = archetypePermissions // An list of ArchetypePermissions for each archetype
        this.managePeople = managePeople
        this.identifier = name
    }

    // Get the ArchetypePermissions for an archetype by name
    getArchetypePerms(arch) {
        let outPerms;
        // Loop through the role's archetype_permissions and return the one corresponding to a certain Archetype (by name)
        this.archetypePermissions.forEach(archetypePermissions => {
            if (archetypePermissions.arch === arch) {
                outPerms = archetypePermissions
            }
        });

        return outPerms
    }

    copy() {
        let archPermissionsList = []
        this.archetypePermissions.forEach(perm => archPermissionsList.push(perm.copy()))
        return new Role(this.name, archPermissionsList, this.managePeople)
    }

    fromRawApi(data) {}
}

export class Loan {
    constructor(loanId, itemId, loanedBy, loanedTo, dateLoaned, dateDue, dateReturned) {
        this.loanId = loanId
        this.itemId = itemId
        this.loanedBy = loanedBy
        this.loanedTo = loanedTo
        this.dateLoaned = dateLoaned
        this.dateDue = dateDue
        this.dateReturned = dateReturned
    }

    fromRawApi(data) {}
}

export class Notification {
    constructor(id, title, body, read = false, author = "System") {
        this.id = id
        this.title = title
        this.body = body
        this.read = read
        this.author = author
    }
}

export class UserHistory {
    constructor(loans = [], notifications = []) {
        this.loans = loans
        this.notifications = notifications
    }

    fromRawApi(data) {
    }
}

export class ItemHistory {
    constructor(loans = []) {
        this.loans = loans
    }
}

export class GlobalHistory {
    constructor(loans = [], notifications = []) {
        this.loans = loans
        this.notifications = notifications
    }

    checkIfLoaned(itemId) {
        let out = false
        this.loans.forEach(loan => {
            if (loan.itemId === itemId && loan.return === "") {
                out = true
            }
        })

        return out
    }
}

export class User {
    constructor(id, first_name, last_name, role, history) {
        this.id = id
        this.first_name = first_name
        this.last_name = last_name
        this.role = role
        this.history = history
    }

    fromRawApi(data) {
    }

    copy() {
        return new User(this.id, this.first_name, this.last_name, this.role, this.history)
    }
}

// Notifications may include announcements and loan date changes.
// If remind is true, an email will be sent remindDaysBefore days before an item is due.
export class Settings {
    constructor(notify = false, remind = false, remindDaysBefore = 1, email = "") {
        this.notify = notify
        this.remind = remind
        this.remindDaysBefore = remindDaysBefore
        this.email = email
    }

    copy() {
        return new Settings(this.notify, this.remind, this.remindDaysBefore, this.email)
    }
}