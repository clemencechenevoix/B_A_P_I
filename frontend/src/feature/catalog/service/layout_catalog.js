// import
import {renderToolBarPublic, renderToolBarAdmin} from "../../../general-ui/tool-bar.js"
import {renderNavBar} from "../../../general-ui/nav-bar.js"
import {renderFooter} from "../../../general-ui/footer.js"
import {renderFlowerCard} from "../ui/catalog-card.js"

import {renderCatalogIdPage} from "./layout_catalog_item_id.js"
import {requireAuthToken} from "../../../general-service/service-api.js"

import {principalDiv} from "../../../general-service/service-page.js"

// const

const HASH_LINK = {
    "SRC_LOGO_BAPI" : "public/bapi_logo.png",
    "SRC_ICON_CONNEXION" : "public/connexion_icon.png",
    "SRC_ICON_SEARCH" : "public/search_icon.png",
    "SRC_ICON_ADD" : "public/add_icon.png",
    "SRC_ICON_FAMILY" : "public/family_icon.png",
    "SRC_ICON_LOCALISATION" : "public/localisation_icon.png",

    "SRC_ICON_PICTURE" : "public/picture_icon.png",
    "SRC_ICON_DELETE" : "public/delete_icon.png",
    "SRC_ICON_UPDATE" : "public/update_icon.png",
    "SRC_LEFT_ARROW" : "public/fleche_g.png",
    "SRC_RIGHT_ARROW" : "public/fleche_d.png",

    "ROUTE_CATALOG" : "index.html",
    "ROUTE_CONNEXION" : "./src/feature/auth/route/auth-login-page.html",
    "ROUTE_FAMILY_CREATE" : "./src/feature/admin/route/admin_family_create_page.html",
    "ROUTE_LOCALISATION_CREATE" : "./src/feature/admin/route/admin_localisation_create_page.html",
    "ROUTE_CATALOG_ITEM" : "./src/feature/catalog/route/catalog_items_page.html",
    "ROUTE_ADMIN_FAMILY" : "./src/feature/admin/route/admin_family_page.html",
    "ROUTE_ADMIN_LOCALISATION" : "./src/feature/admin/route/admin_localisation_page.html"
}


// api request

async function getCatalog(page) {
    const stringUrl = 'http://localhost:8080/api/catalog/' + page.toString()
    const res = await fetch(stringUrl, {
        method: "GET"
    })
    const data = await res.json();
    return data
}


// function

async function renderCatalog(page, hashLink) {
    const data = await getCatalog(page)
    let result = data.result["result"]
    let index = 0
    
    while (index < result.length) {
        renderFlowerCard(principalDiv, result[index], hashLink, renderCatalogIdPage)
        index += 1
    }

    return data
}

export async function renderCatalogPage(page) {
    if (requireAuthToken()) {
        renderToolBarAdmin(principalDiv, HASH_LINK)
    } else {
        renderToolBarPublic(principalDiv, HASH_LINK)
    }

    const data = await renderCatalog(page, HASH_LINK)

    renderNavBar(principalDiv, data.result["page"], data.result["maxPage"], renderCatalogPage,  HASH_LINK)
    renderFooter(principalDiv)
}

// general
renderCatalogPage(0)