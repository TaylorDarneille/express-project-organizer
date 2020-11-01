let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories
//Show all categories that exist

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
        console.log(categories)
        res.render('categories/index', { categories: categories })
    })
    .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
    })
    //res.send('LIST OF CATEGORIES')
})

// GET /categories/:id
//Show a specific category and all projects associated with that category

router.get('/:id', (req, res) => {
    res.send('SHOW SPECIFIC CATEGORY')
})

module.exports = router