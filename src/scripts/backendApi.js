const uri = "http://172.0.0.1:8000"

// Get list of items
export async function get_items() {
    let response = false;
    await fetch(uri + "/items", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    return response.json();
    console.log(response);
}

// Add new item
export async function add_item(note, archetype, archetypeData) {
    let item = {
        note: note,
        archetype: archetype,
        archetype_data: archetypeData
    }
    await fetch(uri + "/items", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Delete item
export async function delete_item(id) {
    await fetch(uri + `/items/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Get list of archetypes
export async function get_archetypes() {
    let response = false;
    await fetch(uri + "/archetypes", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
    return response.json();
}

// Create Archetype
export async function add_archetype(name, subject_area, schema) {
    let item = {
        name: name,
        subject_area: subject_area,
        schema: schema
    }
    await fetch(uri + "/archetypes", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Delete archetype
export async function delete_item(id) {
    await fetch(uri + `/archetype/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Get list of subject areas
export async function get_subjects() {
    let response = false;
    await fetch(uri + "/subject_areas", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
    return response.json();
}

// Create subject area
export async function add_archetype(name, subject_area, schema) {
    let item = {
        name: name,
        subject_area: subject_area,
        schema: schema
    }
    await fetch(uri + "/subject_area", {
        method: "POST",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        },
        json: item
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Delete subject area
export async function delete_item(id) {
    await fetch(uri + `/subject_area/${id}`, {
        method: "DELETE",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Get list of users
export async function get_users() {
    let response = false;
    await fetch(uri + "/users", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
}

// Get list of roles
export async function get_roles() {
    let response = false;
    await fetch(uri + "/subject_areas", {
        method: "GET",
        headers: {
            'Authorization': "Bearer " + localStorage["accessToken"],
            'Accept': 'application/json'
        }
    }).then(r => response = r).catch(e => console.log(e));
    //let data = response.json();
    console.log(response);
    return response.json();
}