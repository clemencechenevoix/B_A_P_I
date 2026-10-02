// import
import {renderToolBarPublic, renderToolBarAdmin} from "../../../general-ui/tool-bar.js"
import {renderFamilyForm} from "../ui/admin-form.js"
import {renderFooter} from "../../../general-ui/footer.js"

import {requireAuthToken} from "../../../general-service/service-api.js"

import {principalDiv} from "../../../general-service/service-page.js"

// const

const HASH_LINK = {
    "SRC_LOGO_BAPI" : "../../../../public/bapi_logo.png",
    "SRC_ICON_CONNEXION" : "../../../../public/connexion_icon.png",
    "SRC_ICON_SEARCH" : "../../../../public/search_icon.png",
    "SRC_ICON_ADD" : "../../../../public/add_icon.png",
    "SRC_ICON_FAMILY" : "../../../../public/family_icon.png",
    "SRC_ICON_LOCALISATION" : "../../../../public/localisation_icon.png",

    "SRC_ICON_PICTURE" : "../../../../public/picture_icon.png",
    "SRC_ICON_DELETE" : "../../../../public/delete_icon.png",
    "SRC_ICON_UPDATE" : "../../../../public/update_icon.png",

    "ROUTE_CATALOG" : "../../../../index.html",
    "ROUTE_CONNEXION" : "../../auth/route/auth-login-page.html",
    "ROUTE_FAMILY_CREATE" : "../../admin/route/admin_family_create_page.html",
    "ROUTE_LOCALISATION_CREATE" : "../../admin/route/admin_localisation_create_page.html",
    "ROUTE_CATALOG_ITEM" : "../../catalog/route/catalog_items_page.html",
    "ROUTE_ADMIN_FAMILY" : "../../admin/route/admin_family_page.html",
    "ROUTE_ADMIN_LOCALISATION" : "../../admin/route/admin_localisation_page.html"
}

// function

async function render_page(hashLink) {
    if (requireAuthToken()) {
        renderToolBarAdmin(principalDiv, hashLink)
    } else {
        renderToolBarPublic(principalDiv, hashLink)
    }

    renderFamilyForm(principalDiv)

    renderFooter(principalDiv)
}

// general
render_page(HASH_LINK)