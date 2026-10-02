// import
import {getAuthToken} from "../../../general-service/service-api.js"
import {clearcontent, createBalise, createRowForm, showRequestMessage} from  "../../../general-service/service-page.js"

// const
const TEXT_DELETE_FLOWER = "Are you sure you want to delete this element? it will be delete permenantly"
const TEXT_UPDATE_FLOWER = "Update the flower"
const TEXT_CREATE_FLOWER = "Create flower page"

const LABEL_UPDATE_FLOWER = "Enter the new name of the flower"
const LABEL_UPDATE_FAMILY = "Enter the new family of the flower"
const LABEL_UPDATE_LOCALISATION = "Enter the new localisation of the flower"

const LABEL_CREATE_FLOWER = "(obligatory) Enter the name of the flower"
const LABEL_CREATE_FAMILY = "(obligatory) Enter the family of the flower"
const LABEL_CREATE_LOCALISATION = "(obligatory) Enter the localisation of the flower"

const TEXT_BUTTON = "submit"

// api request

async function postFlower(flowerName, familyName, localisationName) {
    const stringUrl = 'http://localhost:8080/api/catalog/items'
    let data = await fetch(stringUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        },
        body: JSON.stringify({
            flowerName: flowerName.toString(),
            familyName: familyName.toString(),
            localisationName: localisationName.toString()
        }),
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}

async function putFlower(id, key, value) {
    const stringUrl = 'http://localhost:8080/api/catalog/items/' + id.toString()
    let data = await fetch(stringUrl, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        },
        body: JSON.stringify({
            keys: key,
            values: value
        }),
    })
    .then((response) => response.json())
    .then((data) => {
            return data
    });

    return data
}

async function deleteFlower(id) {
    const stringUrl = 'http://localhost:8080/api/catalog/items/' + id.toString()
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

export function renderFlowerForm(divName) {
    let divFlowerForm = createBalise("div", null, "divFlowerForm")

    let textFlower = createBalise("p", TEXT_CREATE_FLOWER)
    divFlowerForm.appendChild(textFlower);

    let formFlower = createBalise("form", null, "form")
    createRowForm(formFlower, LABEL_CREATE_FLOWER, "text", "flowerName")
    createRowForm(formFlower, LABEL_CREATE_FAMILY, "text", "familyName")
    createRowForm(formFlower, LABEL_CREATE_LOCALISATION, "text", "localisationName")

    let submitButton = createBalise("p", TEXT_BUTTON, "submitButton")
    submitButton.addEventListener("click", async (event) => {    
        const data = new FormData(formFlower);
        const body = {}

        for (const [name,value] of data) {
            body[name] = value
        }
        let response = await postFlower(body["flowerName"], body["familyName"], body["localisationName"])
        showRequestMessage(divName, response)
    });
    formFlower.appendChild(submitButton)

    divFlowerForm.appendChild(formFlower)
    document.getElementById(divName).appendChild(divFlowerForm)
}

export function renderFlowerDelete(divName, flowerId, renderFlowerIdFunction, hashLink) {
    let divDeleteFlower = createBalise("div", null, null, "divDeleteFlower")

    let textFlower = createBalise("p", TEXT_DELETE_FLOWER)
    divDeleteFlower.appendChild(textFlower);

    let yesButton = createBalise("a", "yes", "submitButton", null , hashLink["ROUTE_CATALOG"])
    yesButton.addEventListener("click", async (event) => {    
        deleteFlower(flowerId)
        clearcontent(divName)
    });
    divDeleteFlower.appendChild(yesButton)

    let noButton = createBalise("a", "no", "submitButton")
    noButton.addEventListener("click", async (event) => {    
        clearcontent(divName)
        renderFlowerIdFunction(flowerId, hashLink)
    });
    divDeleteFlower.appendChild(noButton)

    document.getElementById(divName).appendChild(divDeleteFlower)
}

export function renderUpdateFlowerForm(divName, flowerId) {
    let divUpdateFlowerForm = createBalise("div", null, "divFlowerForm")

    let textUpdateFlower = createBalise("p", TEXT_UPDATE_FLOWER)
    divUpdateFlowerForm.appendChild(textUpdateFlower);

    let formUpdateFlower = createBalise("form", null, "form")
    createRowForm(formUpdateFlower, LABEL_UPDATE_FLOWER, "text", "flowerName")
    createRowForm(formUpdateFlower, LABEL_UPDATE_FAMILY, "text", "familyName")
    createRowForm(formUpdateFlower, LABEL_UPDATE_LOCALISATION, "text", "localisationName")

    let submitButton = createBalise("p", TEXT_BUTTON, "submitButton")
    formUpdateFlower.appendChild(submitButton)
    submitButton.addEventListener("click", async (event) => {
        const data = new FormData(formUpdateFlower);
        let keys = []
        let values = []

        for (const [name,value] of data) {
            if (value != "") {
                keys.push(name)
                values.push(value)
            }
        }
        let response = await putFlower(flowerId, keys, values)
        showRequestMessage(divName, response)
    });

    divUpdateFlowerForm.appendChild(formUpdateFlower)
    document.getElementById(divName).appendChild(divUpdateFlowerForm)
}