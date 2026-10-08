// import
import {clearcontent, createBalise, createImg} from  "../../../general-service/service-page.js"

// function

export function renderFlowerCard(divName, content, hashLink, renderIdFunction) {
    let divFlowerCard = createBalise("div", null, "divFlowerCard")

    let imgFlower = createImg()
    if (content["flowerimage"] == null) {
        imgFlower.src = hashLink["SRC_ICON_PICTURE"]
    } else {
        imgFlower.src = content["flowerimage"]
    }
    divFlowerCard.appendChild(imgFlower);

    divFlowerCard.appendChild(createBalise("p", content["familyname"]));
    divFlowerCard.appendChild(createBalise("p", content["flowername"]));
    divFlowerCard.addEventListener("click", (event) => {
        clearcontent(divName)
        renderIdFunction(content["flowerid"], hashLink)
    });

    document.getElementById(divName).appendChild(divFlowerCard);
}

export function renderFlowerCardId(divName, content, hashLink) {
    let divFlowerCard = createBalise("div", null, null, "divFlowerIdCard");

    let imgFlower = createImg()
    if (content["flowerimage"] == null) {
        imgFlower.src = hashLink["SRC_ICON_PICTURE"]
    } else {
        imgFlower.src = content["flowerimage"]
    }
    divFlowerCard.appendChild(imgFlower);

    divFlowerCard.appendChild(createBalise("p", content["flowername"]));
    divFlowerCard.appendChild(createBalise("br"));

    divFlowerCard.appendChild(createBalise("p", content["familyname"]));

    if (content["familydesc"] != null) {
        divFlowerCard.appendChild(createBalise("p", content["familydesc"]));
    }
    divFlowerCard.appendChild(createBalise("br"));
    
    divFlowerCard.appendChild(createBalise("p", content["Localisationname"]));
    document.getElementById(divName).appendChild(divFlowerCard);
}

export function renderFlowerCardIdAdmin(divName, content, renderFlowerIdUpdateFunction, renderFlowerIdDeleteFunction, hashLink) {
    let divFlowerCard = createBalise("div", null, null, "divFlowerIdCard");

    let imgFlower = createImg()
    if (content["flowerImage"] == null) {
        imgFlower.src = hashLink["SRC_ICON_PICTURE"]
    } else {
        imgFlower.src = content["flowerimage"]
    }
    divFlowerCard.appendChild(imgFlower);

    divFlowerCard.appendChild(createBalise("p", content["flowername"]));

    divFlowerCard.appendChild(createBalise("p", content["familyname"]));

    if (content["familydesc"] != null) {
        divFlowerCard.appendChild(createBalise("p", content["familydesc"]));
    }
    
    divFlowerCard.appendChild(createBalise("p", content["localisationname"]));
   
    let divManagementTool = createBalise("div", null, null, "divManagementtool");
    let imgUpdate = createImg(hashLink["SRC_ICON_UPDATE"], "iconTool")
    imgUpdate.addEventListener("click", (event) => {
        clearcontent(divName)
        renderFlowerIdUpdateFunction(divName, content["flowerid"], hashLink)
    });
    divManagementTool.appendChild(imgUpdate);

    let imgFlowerDelete = createImg(hashLink["SRC_ICON_DELETE"], "iconTool")
    imgFlowerDelete.addEventListener("click", (event) => {
        clearcontent(divName)
        renderFlowerIdDeleteFunction(divName, content["flowerid"], hashLink)
    });
    divManagementTool.appendChild(imgFlowerDelete);

    divFlowerCard.appendChild(divManagementTool);
    document.getElementById(divName).appendChild(divFlowerCard);
}