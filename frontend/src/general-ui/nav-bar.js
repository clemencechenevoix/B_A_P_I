// import
import {clearcontent, createBalise, createImg} from  "../general-service/service-page.js" 

// function

export function renderNavBar(divName, number, numberTotal, renderfunction, role, hashLink) {
    let divNavBar = createBalise("div", null, null, "divNavBar")
    
    if (0 < number) {
        let imgLeftArrow = createImg(hashLink["SRC_LEFT_ARROW"])

        imgLeftArrow.addEventListener("click", (event) => {
            clearcontent(divName)
            renderfunction(role, number - 1)
        });

        divNavBar.appendChild(imgLeftArrow);
    }

    let pNumber = document.createElement("p")
    pNumber.appendChild(document.createTextNode(parseInt(number) + " .. " + parseInt(numberTotal))); 
    divNavBar.appendChild(pNumber);

    if (number < numberTotal) {        
        let imgRightArrow = createImg(hashLink["SRC_RIGHT_ARROW"])

        imgRightArrow.addEventListener("click", (event) => {
            clearcontent(divName)
            renderfunction(role, number + 1)
        });

        divNavBar.appendChild(imgRightArrow)
    }

    document.getElementById(divName).appendChild(divNavBar);
}