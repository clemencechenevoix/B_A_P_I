// require
const express = require('express');
const router = express.Router();

// implementation of the routes logic for the admin

// create a new family for the flower
router.post('/family')

// update the id family
router.put('/family/:id')

// show the information about all the family
router.get('/family')

// create a new location for the flower
router.post('/location')

// update the id location
router.put('/location/:id')

// show the information about all the location
router.get('/location')

// export
module.exports = router