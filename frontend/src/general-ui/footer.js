// import
import {createBalise} from  "../general-service/service-page.js"

// const
const TEXT_CREATOR = "Website created by Clémence Chenevoix"
const TEXT_GITHUB = "Project on git-hub here"
const HREF_GITHUB = "https://github.com/clemencechenevoix/B_A_P_I.git"
    
// function 

export function renderFooter(divName) {
    let divFooter = createBalise("div", null, null, "divFooter")

    let pCreator = createBalise("p", TEXT_CREATOR)
    divFooter.appendChild(pCreator);

    let aGithub = createBalise("a", TEXT_GITHUB, null, null, HREF_GITHUB);
    divFooter.appendChild(aGithub);

    document.getElementById(divName).appendChild(divFooter);
}