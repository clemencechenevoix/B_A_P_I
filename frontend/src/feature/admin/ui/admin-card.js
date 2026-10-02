// import
import {clearcontent, createBalise, createImg} from "../../../general-service/service-page.js"

// const
const TEXT_DESCRIPTION = "Description of the family: "

// function

export function renderFamilyCard(divName, content, renderFamilyIdUpdateFunction, renderFamilyIdDeleteFunction, hashLink) {
    let divFamilyCard = createBalise("div", null, "divFamilyCard")

    divFamilyCard.appendChild(createBalise("p", content["familyname"]));

    divFamilyCard.appendChild(createBalise("p", TEXT_DESCRIPTION));
    
    if (content["familydesc"] == null) {
        divFamilyCard.appendChild(createBalise("p", "none"));
    } else {
        divFamilyCard.appendChild(createBalise("p", content["familydesc"]));
    }
    let divManagementTool = createBalise("div", null, null, "divManagementTool")
    
    let imgUpdate = createImg(hashLink["SRC_ICON_UPDATE"], "iconTool")
    imgUpdate.addEventListener("click", (event) => {
        clearcontent(divName)
        renderFamilyIdUpdateFunction(divName, content["familyid"], hashLink)
    });
    divManagementTool.appendChild(imgUpdate);

    let imgDelete = createImg(hashLink["SRC_ICON_DELETE"], "iconTool")
    imgDelete.addEventListener("click", (event) => {
        clearcontent(divName)
        renderFamilyIdDeleteFunction(divName, content["familyid"], hashLink)
    });
    divManagementTool.appendChild(imgDelete);

    divFamilyCard.appendChild(divManagementTool);
    document.getElementById(divName).appendChild(divFamilyCard);
}

export function renderLocalisationCard(divName, content, renderLocalisationIdUpdateFunction, renderLocalisationIdDeleteFunction, hashLink) {
    let divLocalisationCard = createBalise("div", null, "divLocalisationCard")

    divLocalisationCard.appendChild(createBalise("p", content["localisationname"]));

    let divManagementTool = createBalise("div", null, null, "divManagementTool")
    
    let imgUpdate = createImg(hashLink["SRC_ICON_UPDATE"], "iconTool")
    imgUpdate.addEventListener("click", (event) => {
        clearcontent(divName)
        renderLocalisationIdUpdateFunction(divName, content["localisationid"], hashLink)
    });
    divManagementTool.appendChild(imgUpdate);

    let imgDelete = createImg(hashLink["SRC_ICON_DELETE"], "iconTool")
    imgDelete.addEventListener("click", (event) => {
        clearcontent(divName)
        renderLocalisationIdDeleteFunction(divName, content["localisationid"], hashLink)
    });
    divManagementTool.appendChild(imgDelete);

    divLocalisationCard.appendChild(divManagementTool);
    document.getElementById(divName).appendChild(divLocalisationCard);
}