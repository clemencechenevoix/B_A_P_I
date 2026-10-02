// import
import {renderToolBarPublic, renderToolBarAdmin} from "../../../general-ui/tool-bar.js"
import {renderAddMenu} from "../ui/admin-add-menu.js"
import {renderFooter} from "../../../general-ui/footer.js"

import {requireAuthToken} from "../../../general-service/service-api.js"

import {principalDiv} from "../../../general-service/service-page.js"

// function

export async function renderAddPage(hashLink) {
    if (requireAuthToken()) {
        renderToolBarAdmin(principalDiv, hashLink)
    } else {
        renderToolBarPublic(principalDiv, hashLink)
    }

    renderAddMenu(principalDiv, hashLink)

    renderFooter(principalDiv)
}