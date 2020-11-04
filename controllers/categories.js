let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories - show all the categories that exist
router.get("/", (req, res)=>{
    db.category.findAll()
    .then(categories=>{
        res.render("categories/index", {categories})
    })
})

// GET /categories/:id - show a specific category and all the projects with that category 
router.get("/:id", (req, res)=>{
    db.category.findOne({
        where: {
            id: parseInt(req.params.id)
        },
        include: [db.project]
    }).then(category=>{
        res.render("categories/show", {category})
    })
})

module.exports = router