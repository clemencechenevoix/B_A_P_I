// import
import {clearcontent, createBalise, createImg} from  "../general-service/service-page.js" 
import {renderAddPage} from "../feature/admin/service/layout-admin-add-page.js"
import {clearAuthStorage} from "../general-service/service-api.js"

const TITLE_PUBLIC = "B.A.P.I."
const TITLE_ADMIN = "Espace Admin"

// function

export function renderToolBarPublic(divName, hashLink) {
    let divToolBar = createBalise("div", null, null, "divToolBar")

    let div = createBalise("div")

    let aLogoBapi = createBalise("a", createImg(hashLink["SRC_LOGO_BAPI"], "iconTool"), null, null, hashLink["ROUTE_CATALOG"]);
    div.appendChild(aLogoBapi);

    let aIconConnexion = createBalise("a", createImg(hashLink["SRC_ICON_CONNEXION"], "iconTool"), null, null, hashLink["ROUTE_CONNEXION"]);
    div.appendChild(aIconConnexion);

    divToolBar.appendChild(div);

    let textTitle = createBalise("h1", TITLE_PUBLIC)
    divToolBar.appendChild(textTitle);

    let imgSearchIcon = createImg(hashLink["SRC_ICON_SEARCH"], "iconTool")
    imgSearchIcon.addEventListener("click", (event) => {
        console.log("search")
    });
    divToolBar.appendChild(imgSearchIcon);

    document.getElementById(divName).appendChild(divToolBar);
}

export function renderToolBarAdmin(divName, hashLink) {
    let divToolBar = createBalise("div", null, null, "divToolBar")

    let div1 = createBalise("div", null, null, "div1")

    let aLogoBapi = createBalise("a", createImg(hashLink["SRC_LOGO_BAPI"], "iconTool"), null, null, hashLink["ROUTE_CATALOG"]);
    div1.appendChild(aLogoBapi);

    let aIconConnexion = createBalise("a", "log out", null, "logOut", hashLink["ROUTE_CATALOG"]);
    aIconConnexion.addEventListener("click", (event) => {
        clearAuthStorage()
    });
    div1.appendChild(aIconConnexion);

    let imgAddIcon = createImg(hashLink["SRC_ICON_ADD"], "iconTool")
    imgAddIcon.addEventListener("click", (event) => {
        clearcontent(divName)  
        renderAddPage(hashLink)
    });
    div1.appendChild(imgAddIcon);
    divToolBar.appendChild(div1);

    let textTitle = createBalise("h1", TITLE_ADMIN)
    divToolBar.appendChild(textTitle);

    let div2 = createBalise("div")

    let aFamilyIcon = createBalise("a", createImg(hashLink["SRC_ICON_FAMILY"], "iconTool"), null, null, hashLink["ROUTE_ADMIN_FAMILY"]);
    div2.appendChild(aFamilyIcon);

    let aLocalisationIcon = createBalise("a", createImg(hashLink["SRC_ICON_LOCALISATION"], "iconTool"), null, null, hashLink["ROUTE_ADMIN_LOCALISATION"]);
    div2.appendChild(aLocalisationIcon);

    let imgSearchIcon = createImg(hashLink["SRC_ICON_SEARCH"], "iconTool")
    imgSearchIcon.addEventListener("click", (event) => {
        console.log("search")
    });
    div2.appendChild(imgSearchIcon);

    divToolBar.appendChild(div2);
    document.getElementById(divName).appendChild(divToolBar);
}