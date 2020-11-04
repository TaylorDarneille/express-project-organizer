let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories: categories })
    })
    .catch((error) => {
      console.log('Error in GET /categories/index', error)
      res.status(400).render('main/404')
    })
  })

router.get('/:id', (req, res) => {
    db.category.findOne({
      where: {name: `${req.params.id}`}  
    })
    .then(category => {
        console.log(category)
        category.getProjects().then(projects => {
            console.log(projects)
            if (!category) throw Error()
            res.render('categories/show', { category: category, projects: projects })
        })
    })
    .catch((error) => {
    res.status(400).render('main/404')
    })
})

module.exports = router
