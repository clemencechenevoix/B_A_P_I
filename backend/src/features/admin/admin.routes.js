// require
const express = require('express');
const router = express.Router();

// implementation of the routes logic for the admin

// show the information about all the family
router.get('/family')

// create a new family for the flower
router.post('/family')

// update the id family
router.put('/family/:id')

// delete the family id
router.delete('/family/:id')

// show the information about all the location
router.get('/location')

// create a new location for the flower
router.post('/location')

// update the id location
router.put('/location/:id')

// delete the location id
router.delete('/location/:id')

// export
module.exports = router