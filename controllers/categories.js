let express = require('express')
let db = require('../models')
let router = express.Router()

// GET/Categories

router.get('/', (req,res) => {
    db.category.findAll()
    .then(categories => {
        res.render('categories/categories', {categories: categories})
    })
    .catch((error) => {
        console.log('Error in GET /', error)
        res.status(400).render('main/404')
    })
})

// GET/:idx

router.get('/:id', (req,res) => {
    db.category.findOne ({
        include: [db.project],
        where: {id: req.params.id}
    }).then(category => {
        res.render('categories/show', { category: category })
    }).catch((error) => {
        console.log('Error in GET /:id', error)
        res.status(400).render('main/404')
    })
})


module.exports = router