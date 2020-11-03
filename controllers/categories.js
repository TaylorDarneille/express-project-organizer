let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - display all the categories that exist
router.get('/', (req, res) => {
    db.category.findAll()
    .then(foundCategories=>{
        res.render('categories', {foundCategories: foundCategories})
    })
})

// GET /categories/:id - display all the projects of category with :id
router.get('/:id', (req, res) => {
    db.category.findOne({
        include: [db.project],
        where: {id: req.params.id}
    }).then((category) => {
        console.log(category)
        res.render('categories/show', { category: category, project: project})
    }).catch((error) => {
        console.log(error)
    })
})