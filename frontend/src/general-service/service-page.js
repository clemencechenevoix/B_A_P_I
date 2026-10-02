// const

export const principalDiv = "page" 

// function

export function clearcontent(elementID) { 
    document.getElementById(elementID).innerHTML = ""; 
}

export function createBalise(type, content = null, classification = null, identification = null, href = null){
    let balise = document.createElement(type);
    
    if (content != null) {
        if (content instanceof Node) {
            balise.appendChild(content)
        } else {
            balise.appendChild(document.createTextNode(content))
        }
    }
    if (classification != null) {
        balise.className = classification
    }
    if (identification != null) {
        balise.id = identification
    }
    if (href != null) {
        balise.href = href
    }
    return balise
}

export function createImg(source = null, classification = null) {
    let img = new Image()

    if (source != null) {
        img.src = source
    }
    if (classification != null) {
        img.className = classification
    }
    return img
}

export function createRowForm(formBalise, labelTxt, inputType, inputName) {
    let label = document.createElement("label")
    label.appendChild(document.createTextNode(labelTxt))
    let input = document.createElement("input")
    input.type = inputType
    input.name = inputName
    formBalise.appendChild(label)
    formBalise.appendChild(input)
}

export function showRequestMessage(divName, response) {
    let textRes = createBalise("p", null, null, "pResponse")
    if (response.error != null) {
        textRes.appendChild(document.createTextNode(response.error));
    } else {
        textRes.appendChild(document.createTextNode(response.message));
    }
    let footer = document.getElementById("divFooter")
    let previousResponse = document.getElementById("pResponse")
    if (previousResponse == null) {
        document.getElementById(divName).insertBefore(textRes, footer);
    } else {
        document.getElementById(divName).replaceChild(textRes, previousResponse);
    }
}