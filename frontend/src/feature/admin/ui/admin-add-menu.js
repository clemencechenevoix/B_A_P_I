// import
import {clearcontent, createBalise, createImg} from  "../../../general-service/service-page.js"

// function

export function renderAddMenu(divName, hashLink) {
    let divAdd = document.createElement("div");

    // flower
    let aAddFlower = createBalise("a", null, "aAdd", null, hashLink["ROUTE_CATALOG_ITEM"])
    aAddFlower.addEventListener("click", (event) => {  
        clearcontent(divName)  
    });
    
    let divAddFlower = createBalise("div", null, "divAdd")

    divAddFlower.appendChild(createImg(hashLink["SRC_ICON_ADD"]))
    divAddFlower.appendChild(createBalise("p", "add a new flower"))

    aAddFlower.appendChild(divAddFlower);
    divAdd.appendChild(aAddFlower);

    // family
    let aAddFamily = createBalise("a", null, "aAdd", null, hashLink["ROUTE_FAMILY_CREATE"])
    aAddFamily.addEventListener("click", (event) => {  
        clearcontent(divName)  
    });
    
    let divAddFamily = createBalise("div", null, "divAdd")

    divAddFamily.appendChild(createImg(hashLink["SRC_ICON_ADD"]))
    divAddFamily.appendChild(createBalise("p", "add a new family"))
    
    aAddFamily.appendChild(divAddFamily);
    divAdd.appendChild(aAddFamily);

    // localisation
    let aAddLocalisation = createBalise("a", null, "aAdd", null, hashLink["ROUTE_LOCALISATION_CREATE"])
    aAddLocalisation.addEventListener("click", (event) => {  
        clearcontent(divName)  
    });
    
    let divAddLocalisation = createBalise("div", null, "divAdd")

    divAddLocalisation.appendChild(createImg(hashLink["SRC_ICON_ADD"]))
    divAddLocalisation.appendChild(createBalise("p", "add a new localisation"))
    
    aAddLocalisation.appendChild(divAddLocalisation);
    divAdd.appendChild(aAddLocalisation);

    document.getElementById(divName).appendChild(divAdd)
}