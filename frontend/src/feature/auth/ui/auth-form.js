// import
import {localStorageToken} from "../../../general-service/service-api.js"
import {createBalise, createRowForm, showRequestMessage} from  "../../../general-service/service-page.js"

// const
const TEXT_LOGIN = "Login page"
const LABEL_LOGIN = "Enter your login"
const LABEL_PASSWORD = "Enter your password"
const TEXT_BUTTON = "submit"

// api request

async function postLogin(login, password) {
    const stringUrl = '/api/auth/login'
    let data = await fetch(stringUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
            usersPassword: login.toString(),
            usersLogin: password.toString()
        }),
    })
    .then((response) => response.json())
    .then((data) => {

            return data
    });

    return data
}

// function

export function renderLoginForm(divName) {
    let divLogin = createBalise("div", null, null, "divLogin")

    let textLogin = createBalise("p", TEXT_LOGIN)
    divLogin.appendChild(textLogin);

    let formLogin = createBalise("form", null, "form")
    createRowForm(formLogin, LABEL_LOGIN, "text", "usersLogin")
    createRowForm(formLogin, LABEL_PASSWORD, "text", "usersPassword")

    let submitButton = createBalise("p", TEXT_BUTTON, "submitButton")
    submitButton.addEventListener("click", async (event) => {    

        const data = new FormData(formLogin);
        const body = {}
        for (const [name,value] of data) {
            body[name] = value
        }
        let response = await postLogin(body["usersLogin"], body["usersPassword"])
        showRequestMessage(divName, response)

        if (response.message != null) {
            localStorageToken(response.result["token"])
        }
    });
    formLogin.appendChild(submitButton)

    divLogin.appendChild(formLogin)
    document.getElementById(divName).appendChild(divLogin)
}