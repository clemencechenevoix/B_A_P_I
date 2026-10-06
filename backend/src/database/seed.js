// require
const {connexion} = require('./database.js')
const { hashPassword } = require('../security/encrypt.js')
require('dotenv').config()

const  {flower} = require('./const-seed.js')

// function

/**
* @description insert in the database the user with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
async function insertAdmin(value) {
    const hashedPassword = await hashPassword(value["usersPassword"])

    await connexion.query(`
        INSERT INTO users(userslogin, usersPassword, usersRole)
        VALUES ($1, $2, $3)
    `,  [value["usersLogin"], hashedPassword, value["usersRole"]])
}

/**
* @description insert in the database the family with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
async function insertFamily(value) {    
    await connexion.query(`
		INSERT INTO family(familyName)
		VALUES ($1)
	`, [value["family"]])
}

/**
* @description insert in the database the localisation with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
async function insertLocalisation(value) {
    await connexion.query(`
		INSERT INTO localisation(localisationName)
		VALUES ($1)
	`, [value["localisation"]])
}

/**
* @description insert in the database the flower with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
async function insertFlower(value) {
    const family = await connexion.query(`
        SELECT familyId
        FROM family
        WHERE familyName = $1
    `,  [value["family"]])

    const localisation = await connexion.query(`
        SELECT localisationId 
        FROM localisation
        WHERE localisationName = $1
    `,  [value["localisation"]])


    await connexion.query(`
        INSERT INTO flower(flowerName, familyId, localisationId)
        VALUES ($1, $2, $3)
    `,  [value["name"], family.rows[0]["familyid"], localisation.rows[0]["localisationid"]])
}

/**
* @description find if the admin already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
*/
async function findAdmin(value) {
    let result = await connexion.query(`
		SELECT *
		FROM users
		WHERE users.userslogin = $1
	`, [value["usersLogin"]])

	if (result.rows.length != 0) {
		return
	}

    await insertAdmin (value)
}

/**
* @description find if the family already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
*/
async function findFamily(value) {
    let result = await connexion.query(`
		SELECT *
		FROM family
		WHERE family.familyName = $1
	`, [value["family"]])

	if (result.rows.length != 0) {
		return
	}

    await insertFamily(value)
}

/**
* @description find if the localisation already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
*/
async function findLocalisation(value) {
    let result = await connexion.query(`
		SELECT *
		FROM localisation
		WHERE localisation.localisationName = $1
	`, [value["localisation"]])

	if (result.rows.length != 0) {
		return
	}

    await insertLocalisation(value)
}

/**
* @description find if the flower already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
*/
async function findFlower(value) {
    let result = await connexion.query(`
		SELECT *
		FROM flower
		WHERE flower.flowerName = $1
	`, [value["name"]])

	if (result.rows.length != 0) {
		return
	}

    await insertFlower(value)
}

async function addFlower(arrayValue){
    const flowerLength = arrayValue.length
    let index = 0

    while (index < flowerLength) {
        await findFamily(arrayValue[index])
        await findLocalisation(arrayValue[index])
        await findFlower(arrayValue[index])
        index += 1
    }
}

// call
findAdmin({"usersLogin":process.env.ADMIN_LOGIN, "usersPassword":process.env.ADMIN_PASSWORD, "usersRole": process.env.ADMIN_ROLE})
addFlower(flower)