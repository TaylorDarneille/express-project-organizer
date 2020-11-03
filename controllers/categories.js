let express = require('express')
let db = require('../models')
let router = express.Router()

//GET /categories
router.get('/', (req, res)=>{
    db.category.findAll()
    .then((categories) =>{
        res.render('categories/index', { categories: categories })
    })
    .catch(err =>{
        console.log(err)
    })
})

//GET /categories/:id
router.get('/:id', (req, res)=>{
    db.category.findOne({
        where: {id: req.params.id}
    })
    .then((category)=>{
        res.render('categories/show', {category: category})
    })
})


module.exports = router