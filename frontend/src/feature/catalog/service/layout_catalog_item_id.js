// import
import {renderToolBarPublic, renderToolBarAdmin} from "../../../general-ui/tool-bar.js"
import {renderFlowerCardId, renderFlowerCardIdAdmin} from "../ui/catalog-card.js"
import {renderUpdateFlowerForm, renderFlowerDelete} from "../ui/catalog-form.js"
import {renderFooter} from "../../../general-ui/footer.js"

import {requireAuthToken} from "../../../general-service/service-api.js"

import {principalDiv} from "../../../general-service/service-page.js"

// function
async function getCatalog(id) {
  const stringUrl = '/api/catalog/items/' + id.toString()
  const res = await fetch(stringUrl, {
      method: "GET"
  })
  const data = await res.json();
  return data
}

async function renderCatalogId(id, hashLink) {
  const data = await getCatalog(id)
  const result = data.result[0]
  
  if (requireAuthToken()) {
    renderFlowerCardIdAdmin(principalDiv, result, renderCatalogIdUpdatePage, renderCatalogIdDeletePage, hashLink)
  } else {
    renderFlowerCardId(principalDiv, result, hashLink)
  }

  return data
}

export async function renderCatalogIdPage(id, hashLink) {
  if (requireAuthToken()) {
      renderToolBarAdmin(principalDiv, hashLink)
  } else {
      renderToolBarPublic(principalDiv, hashLink)
  }

  await renderCatalogId(id, hashLink)

  renderFooter(principalDiv)
}

export async function renderCatalogIdUpdatePage(divName, id, hashLink) {
  if (requireAuthToken()) {
      renderToolBarAdmin(principalDiv, hashLink)
  } else {
      renderToolBarPublic(principalDiv)
  }

  renderUpdateFlowerForm(divName, id, hashLink)

  renderFooter(principalDiv)
}

export async function renderCatalogIdDeletePage(divName, id, hashLink) {
  if (requireAuthToken()) {
      renderToolBarAdmin(principalDiv, hashLink)
  } else {
      renderToolBarPublic(principalDiv)
  }

  renderFlowerDelete(divName, id, renderCatalogIdPage, hashLink)

  renderFooter(principalDiv)
}