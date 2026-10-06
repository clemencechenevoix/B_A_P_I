// import
import {getAuthToken} from "../../../general-service/service-api.js"
import {clearcontent, createBalise, createRowForm, showRequestMessage} from "../../../general-service/service-page.js"

// const
const TEXT_CREATE_FAMILY = "Create family page"
const TEXT_UPDATE_FAMILY = "Update family page"
const TEXT_DELETE_FAMILY = "Are you sure you want to delete this element? it will be delete permenantly"

const TEXT_CREATE_LOCALISATION = "Create localisation page"
const TEXT_UPDATE_LOCALISATION = "Update localisation page"
const TEXT_DELETE_LOCALISATION = "Are you sure you want to delete this element? it will be delete permenantly"

const LABEL_CREATE_FAMILY = "(obligatory) Enter the name of the family"
const LABEL_UPDATE_FAMILY = "Enter the new name of the family"
const LABEL_FAMILY_DESC = "Enter the description of the family"
const LABEL_UPDATE_FAMILY_DESC = "Enter the new description"
const LABEL_LOCALISATION = "(obligatory) Enter the name of the localisation"
const LABEL_UPDATE_LOCALISATION = "Enter the name of the localisation"

const TEXT_BUTTON = "submit"

// api request

async function postFamily(familyName, familyDesc) {
    let desc = null
    if (familyDesc != null) {
        desc = familyDesc.toString()
    }

    const stringUrl = '/api/admin/family'
    let data = await fetch(stringUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        },
        body: JSON.stringify({
            familyName: familyName.toString(),
            familyDesc: desc
        }),
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}

async function postLocalisation(localisationName) {
    const stringUrl = '/api/admin/localisation'
    let data = await fetch(stringUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        },
        body: JSON.stringify({
            localisationName: localisationName.toString(),
        }),
    })
    .then((response) => response.json())
    .then((data) => {
        return data
    });

    return data
}

async function apiUpdateFamily(id, key, value) {
    const stringUrl = '/api/admin/family/' + id.toString()
    let data = await fetch(stringUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        },
        body: JSON.stringify({
            "keys": key,
            "values" : value
        })
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}

async function apiUpdateLocalisation(id, key, value) {
    const stringUrl = '/api/admin/localisation/' + id.toString()
    let data = await fetch(stringUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        },
        body: JSON.stringify({
            "keys": key,
            "values" : value
        })
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}

async function deleteFamily(id) {
    const stringUrl = '/api/admin/family/' + id.toString()
    let data = await fetch(stringUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        }
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}

async function deleteLocalisation(id) {
    const stringUrl = '/api/admin/localisation/' + id.toString()
    let data = await fetch(stringUrl, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        }
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}


// function

// Family

export function renderFamilyForm(divName) {
    let divFamilyForm = createBalise("div", null, "divFamilyForm")
    
    divFamilyForm.appendChild(createBalise("p", TEXT_CREATE_FAMILY));

    let formFamily = createBalise("form", null, "form")
    createRowForm(formFamily, LABEL_CREATE_FAMILY, "text", "familyName")
    createRowForm(formFamily, LABEL_FAMILY_DESC, "text", "familyDesc")

    let submitButton = createBalise("p", TEXT_BUTTON, "submitButton")
    submitButton.addEventListener("click", async (event) => {
        const data = new FormData(formFamily);
        const body = {}
        for (const [name,value] of data) {
            body[name] = value
        }
        let response = await postFamily(body["familyName"], body["familyDesc"])
    
        showRequestMessage(divName, response)
    })
    formFamily.appendChild(submitButton)

    divFamilyForm.append(formFamily)
    document.getElementById(divName).append(divFamilyForm)
}

export function renderUpdateFamilyForm(divName, familyId, hashLink) {
    let divUpdateFamilyForm = createBalise("div", null, "divFamilyForm")
    divUpdateFamilyForm.appendChild(createBalise("p", TEXT_UPDATE_FAMILY));

    let formUpdateFamily = createBalise("form", null, "form")
    createRowForm(formUpdateFamily, LABEL_UPDATE_FAMILY, "text", "familyName")
    createRowForm(formUpdateFamily, LABEL_UPDATE_FAMILY_DESC, "text", "familyDesc")
    let submitButton = createBalise("p", TEXT_BUTTON)
    submitButton.addEventListener("click", async (event) => {
        const data = new FormData(formUpdateFamily);
        let keys = []
        let values = []

        for (const [name,value] of data) {
            if (value != "") {
                keys.push(name)
                values.push(value)
            }
        }
        let response = await apiUpdateFamily(familyId, keys, values)
        showRequestMessage(divName, response)
    })
    formUpdateFamily.appendChild(submitButton)

    divUpdateFamilyForm.appendChild(formUpdateFamily)
    document.getElementById(divName).appendChild(divUpdateFamilyForm)
}

export function renderFamilyDelete(divName, familyId, hashLink) {
    let divDeleteFamily = createBalise("div", null, null, "divDeleteFamily")

    divDeleteFamily.appendChild(createBalise("p", TEXT_DELETE_FAMILY));

    let yesButton = createBalise("a", "yes", "submitButton", null, hashLink["ROUTE_ADMIN_FAMILY"])
    yesButton.addEventListener("click", async (event) => {
        deleteFamily(familyId)
        clearcontent(divName)
    });
    divDeleteFamily.appendChild(yesButton)

     let noButton = createBalise("a", "no", "submitButton", null, hashLink["ROUTE_ADMIN_FAMILY"])
    noButton.addEventListener("click", async (event) => {
        clearcontent(divName)
    });
    divDeleteFamily.appendChild(noButton)

    document.getElementById(divName).appendChild(divDeleteFamily)
}

// Localisation

export function renderLocalisationForm(divName) {
    let divLocalisationForm = createBalise("div", null, "divLocalisationForm")

    divLocalisationForm.appendChild(createBalise("p", TEXT_CREATE_LOCALISATION))

    let formLocalisation = createBalise("form", null, "form")
    createRowForm(formLocalisation, LABEL_LOCALISATION, "text", "localisationName")

    let submitButton = createBalise("p", TEXT_BUTTON, "submitButton")

    submitButton.addEventListener("click", async (event) => {
        const data = new FormData(formLocalisation);
        const body = {}
        for (const [name,value] of data) {
            body[name] = value
        }
        let response = await postLocalisation(body["localisationName"])

        showRequestMessage(divName, response)
    })
    formLocalisation.appendChild(submitButton)

    divLocalisationForm.appendChild(formLocalisation)
    document.getElementById(divName).appendChild(divLocalisationForm)
}

export function renderUpdateLocalisationForm(divName, localisationId) {
    let divUpdateLocalisationForm = createBalise("div", null, "divLocalisationForm")

    divUpdateLocalisationForm.appendChild(createBalise("p", TEXT_UPDATE_LOCALISATION))

    let formUpdateLocalisation = createBalise("form", null, "form")
    createRowForm(formUpdateLocalisation, LABEL_UPDATE_LOCALISATION, "text", "localisationName")

    let submitButton = createBalise("p", TEXT_BUTTON, "submitButton")

    submitButton.addEventListener("click", async (event) => {
        const data = new FormData(formUpdateLocalisation);
        let keys = []
        let values = []

        for (const [name,value] of data) {
            if (value != "") {
                keys.push(name)
                values.push(value)
            }
        }
        let response = await apiUpdateLocalisation(localisationId, keys, values)
        showRequestMessage(divName, response)
    })
    formUpdateLocalisation.appendChild(submitButton)

    divUpdateLocalisationForm.appendChild(formUpdateLocalisation)
    document.getElementById(divName).appendChild(divUpdateLocalisationForm)
}

export function renderLocalisationDelete(divName, localisationId, hashLink) {
    let divDeleteLocalisation = createBalise("div", null, null, "divDeleteLocalisation")

    divDeleteLocalisation.appendChild(createBalise("p", TEXT_DELETE_LOCALISATION))

    let yesButton = createBalise("a", "Yes", "submitButton", null, hashLink["ROUTE_ADMIN_LOCALISATION"])
    yesButton.addEventListener("click", async (event) => {
        deleteLocalisation(localisationId)
        clearcontent(divName)
    });
    divDeleteLocalisation.appendChild(yesButton)

    let noButton = createBalise("a", "No", "submitButton", null, hashLink["ROUTE_ADMIN_LOCALISATION"])
    noButton.addEventListener("click", async (event) => {    
        clearcontent(divName)
    });
    divDeleteLocalisation.appendChild(noButton)

    document.getElementById(divName).appendChild(divDeleteLocalisation)
}