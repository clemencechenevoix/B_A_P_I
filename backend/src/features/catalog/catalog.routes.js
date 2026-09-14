// require
const express = require('express');
const router = express.Router();

// implementation of the routes logic for the catalog

// create a flower for the catalog (only usable for the Admin)
router.post('/items')

// show more information about the id flower of the catalog
router.get('/items/:id')

// update the information of the id flower of the catalog (only usable for the Admin)
router.put('/items/:id')

// dalete the id flower of the catalog (only usable for the Admin)
router.delete('/items/:id')

// show the information of the flower for the catalog
router.get('/:page')

// export
module.exports = router