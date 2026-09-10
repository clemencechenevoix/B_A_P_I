// require
const {connexion} = require('./database.js')
const { hashPassword } = require('../security/encrypt.js')

// function

/**
* @description handle the error when doing a query
* @param {hash} error, the error
* @return {int} 1 if there is no error and -1 if there is an error
*/
function handleErr(error) {
    if (!error){
        return 1
    }else{
        console.log(error.message)
        return -1
    }
}

/**
* @description return if the information exist (when doing a finding query)
* @param {hash} error, the error
* @return {int} 1 if the information exist, 0 if not, -1 if there is an error
*/
function handleFind(error, result) {
    let var_return = 0
    if (!error && result){
        if (result.rows.length >= 1){
            var_return = 1
        }
    }else{
        console.log(error.message)
        var_return = -1
    }
    return var_return
}

/**
* @description keep demo seed user aligned when they already exist in the database
* @param {hash} value, the values of the demo user to update
* @return
*/
async function updateSeedUser(value) {
    const hashedPassword = await hashPassword(value["usersPassword"])
    const hashedId = await hashPassword(value["userslogin"])
    connexion.query(`
        UPDATE users
        SET usersPassword = $1,
        WHERE userslogin = $2
    `,  [hashedPassword, hashedId], (err)=>{

        connexion.end
        return handleErr(err)
    })
}

/**
* @description find if the admin already exist, if not it will be insert in the database
* @param {hash} value, the values of the new entitie to insert
*/
function findAdmin(value) {
    connexion.query(`
        SELECT *
        FROM users
        WHERE userslogin = $1
    `,  [value["userslogin"]], (err,res)=>{

        if (handleFind(err, res) == 0) {
            connexion.end
            insertAdmin(value)
        } else if (handleFind(err, res) == 1) {
            connexion.end
            updateSeedUser(value)
        }
        connexion.end
    })
}

/**
* @description insert in the database the user with the values value
* @param {hash} value, the values of the new entitie to insert
* @return
*/
async function insertAdmin(value) {
    const hashedPassword = await hashPassword(value["usersPassword"])
    const hashedId = await hashPassword(value["usersLogin"])
    
    connexion.query(`
        INSERT INTO users(userslogin, usersPassword)
        VALUES ($1, $2)
    `,  [hashedId, hashedPassword], (err)=>{

        connexion.end
        return handleErr(err)
    })
}

// call

findAdmin({"usersLogin":"admintest", "usersPassword":"paswordtest"})