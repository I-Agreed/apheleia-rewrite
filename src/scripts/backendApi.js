import { Archetype, ArchetypePermissions, Item, User, Role } from "src/scripts/objects"

const uri = "http://localhost:8000"

function get_bearer() {
    //return localStorage["accessToken"];
    return sessionStorage["userId"];
}

export async function init_stores(invStore, peopleStore, selfStore) {
    let arches = await get_archetypes();
    invStore.schemes = arches;
    console.log(invStore.schemes);

    let items = await get_items(invStore);
    console.log(items);
    items.forEach((x) => x.addToArchetype(invStore));

    let roles = await get_roles();
    console.log(roles)
    peopleStore.roles = roles;

    let users = await get_users();
    for (let i = 0; i < users.length; i++) {
        let r = await get_user_roles(users[i].id);
        console.log(r)
        users[i].role = peopleStore.getRoleById(r);
    }
    peopleStore.users = users;
    console.log(users)

    let self = peopleStore.getUserById(sessionStorage.userId);
    if (self !== undefined) {
        console.log("Self:");
        console.log(self);
        selfStore.user = self;
        selfStore.role = self.role;
        console.log(self)
    }
}

// all functions here should return false upon failure
// 'get' functions return data upon success and others should return true

// Get list of items
export async function get_items(invStore) {
    let response = false;
    await fetch(uri + "/items", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = await response.json();
    console.log(response);
    let items = data.map((x) => new Item(invStore.getArchetypeById(x.archetype).name, x.archetype_data, x.id));
    return items;
}

// Add new item 
export async function add_item(newItem) {
    let item = {
        note: "",
        archetype: newItem.archetype.dbId,
        archetype_data: newItem.archetypeData
    }
    await fetch(uri + "/items", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = response.json();
    console.log(response);
    newItem.dbId = data.id;
    return true;
}

export async function modify_item(modItem) {
    let item = {
        note: "",
        archetype: newItem.archetype.dbId,
        archetype_data: newItem.archetypeData
    }
    await fetch(uri + "/items/" + modItem.dbId, {
        method: "PUT",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    console.log(response);
    return true;
}

// Delete item
export async function delete_item(id) {
    await fetch(uri + `/items/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    //let data = response.json();
    console.log(response);
    return true;
}

// Get list of archetypes
export async function get_archetypes() {
    let response = false;
    await fetch(uri + "/archetypes", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = await response.json();
    console.log("Arches")
    console.log(data);
    let arches = data.map((x) => new Archetype(x.name, x.subject_area, x.schema.fieldTypes, x.schema.fieldNames, x.schema.fieldDefault, [], x.id));

    console.log(arches);
    return arches;
}

// Create Archetype
export async function add_archetype(archetype) {
    let item = {
        name: archetype.name,
        subject_area: archetype.subject,
        schema: JSON.stringify({ fieldNames: archetype.fieldNames, fieldTypes: archetype.fieldTypes, fieldDefault: archetype.fieldDefault }).replaceAll("\"", "'")
    }
    await fetch(uri + "/archetypes", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = response.json();
    archetype.dbId = data.id;
    console.log(response);
    return true;
}

// Delete archetype
export async function delete_archetype(id) {
    await fetch(uri + `/archetype/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    //let data = response.json();
    console.log(response);
    return true;
}

// Modify Archetype
export async function modify_archetype(archetype) {
    let item = {
        name: archetype.name,
        subject_area: archetype.subject,
        schema: { fieldNames: archetype.fieldNames, fieldTypes: archetype.fieldTypes, fieldDefault: archetype.fieldDefault }
    }
    await fetch(uri + "/archetypes/" + archetype.dbId, {
        method: "PUT",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = response.json();
    archetype.dbId = data.id;
    console.log(response);
    return true;
}

// Get list of subject areas
export async function get_subjects() {
    let response = false;
    await fetch(uri + "/subject_areas", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    //let data = response.json();
    console.log(response);
    return response.json();
}

// Create subject area
export async function add_subject(name, admin) {
    let response = false;
    let item = {
        name: name,
        admin: admin
    }
    await fetch(uri + "/subject_areas", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(item)
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    //let data = response.json();
    console.log(response);
    return true;
}

// Delete subject area
export async function delete_subject(id) {
    await fetch(uri + `/subject_areas/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    //let data = response.json();
    console.log(response);
    return true;
}

// Get list of users
export async function get_users() {
    let response = false;
    await fetch(uri + "/users", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = await response.json();
    console.log(response);
    let users = data.map((x) => new User(x, "", "", undefined, undefined)) // TODO: find way to get user roles and history
    return users;
}

// Get roles of user
export async function get_user_roles(userId) {
    let response = false;
    await fetch(uri + `/users/${ userId }`, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = await response.json();
    console.log(data);
    return data.roles[0];
}

// Add user
export async function add_user(user) {
    let item = {
        id: user.id
    }
    let response = false;
    await fetch(uri + "/users", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Accept': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    console.log(response);
    return true;
}

// Give user a role
export async function add_user_role(user, role) {
    let response = false;
    await fetch(uri + `/users/${ user.id }/roles/${ role.id }`, {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    console.log(response);
    return true;
}

// Remove role from user
export async function delete_user_role(user, role) {
    let response = false;
    await fetch(uri + `/users/${ user.id }/roles/${ role.id }`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    console.log(response);
    return true;
}
// Get perms of role
export async function get_role_perms(id) {
    let response = false;
    await fetch(uri + `/roles/${id}`, {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = await response.json();
    console.log(data)
    let perms = data.permissions.map((x) => new ArchetypePermissions(x.id, x.loan, x.recieve, x.meta));
    console.log("PERM")
    console.log(perms)
    return perms;
}


// Get list of roles
export async function get_roles(peopleStore) {
    let response = false;
    await fetch(uri + "/roles", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + get_bearer(),
            'Content-Type': 'application/json'
        }
    }).then(r => response = r).catch(e => { console.log(e); return false; });
    let data = await response.json();
    let roles = [];
    for (let i = 0; i < data.length; i++) {
        let p = await get_role_perms(data[i].id);
        roles.push(new Role(data[i].name, p, false, data[i].id));
    }
    return roles;
}