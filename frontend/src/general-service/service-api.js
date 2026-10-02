// import

//require('dotenv').config()

// function

export function getAuthToken() {
  return localStorage.getItem("bapi-token") || "";
}

export function clearAuthStorage() {
  localStorage.removeItem("bapi-token");
}

export function localStorageToken(token) {
    localStorage.setItem("bapi-token", token);
}

export function requireAuthToken() {
  const token = getAuthToken();

  if (!token) {
    return 0
  }

  return 1;
}