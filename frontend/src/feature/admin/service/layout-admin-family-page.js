// import
import {renderToolBarPublic, renderToolBarAdmin} from "../../../general-ui/tool-bar.js"
import {renderFamilyCard} from "../ui/admin-card.js"
import {renderUpdateFamilyForm, renderFamilyDelete} from "../ui/admin-form.js"
import {renderFooter} from "../../../general-ui/footer.js"

import {getAuthToken, requireAuthToken} from "../../../general-service/service-api.js"

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
    "SRC_LEFT_ARROW" : "../../../../public/fleche_g.png",
    "SRC_RIGHT_ARROW" : "../../../../public/fleche_d.png",

    "ROUTE_CATALOG" : "../../../../index.html",
    "ROUTE_CONNEXION" : "../../auth/route/auth-login-page.html",
    "ROUTE_FAMILY_CREATE" : "../../admin/route/admin_family_create_page.html",
    "ROUTE_LOCALISATION_CREATE" : "../../admin/route/admin_localisation_create_page.html",
    "ROUTE_CATALOG_ITEM" : "../../catalog/route/catalog_items_page.html",
    "ROUTE_ADMIN_FAMILY" : "../../admin/route/admin_family_page.html",
    "ROUTE_ADMIN_LOCALISATION" : "../../admin/route/admin_localisation_page.html"
}

// function

async function getFamily() {
    const stringUrl = '/api/admin/family'
    const res = await fetch(stringUrl, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: ("Bearer " + getAuthToken()).toString()
        }
    })
    const data = await res.json();
    return data
}

async function renderFamily(hashLink) {
    const data = await getFamily()
    const result = data.result
    let index = 0

    while (index < result.length) {
        renderFamilyCard(principalDiv, result[index], renderFamilyIdUpdatePage, renderFamilyIdDeletePage, hashLink)
        index += 1
    }
}

export async function renderFamilyIdUpdatePage(divName, id, hashLink) {
    if (requireAuthToken()) {
        renderToolBarAdmin(principalDiv, hashLink)
    } else {
        renderToolBarPublic(principalDiv, hashLink)
    }

    renderUpdateFamilyForm(divName, id, hashLink)

    renderFooter(principalDiv)
}

export async function renderFamilyIdDeletePage(divName, id, hashLink) {
    if (requireAuthToken()) {
        renderToolBarAdmin(principalDiv, hashLink)
    } else {
        renderToolBarPublic(principalDiv, hashLink)
    }

    renderFamilyDelete(divName, id, hashLink)

    renderFooter(principalDiv)
}

async function renderFamilyPage() {
    if (requireAuthToken()) {
        renderToolBarAdmin(principalDiv, HASH_LINK)
    } else {
        renderToolBarPublic(principalDiv, HASH_LINK)
    }

    await renderFamily(HASH_LINK)

    renderFooter(principalDiv)
}

renderFamilyPage()