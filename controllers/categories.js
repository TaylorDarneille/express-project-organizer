let express = require ('express')
let db= require ('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories=>{
      res.render('categories/index', {categories: categories})
    })
    
  })
  

router.get('/:id', (req, res) => {
    db.category.findOne({
      where: {
        id: req.params.id
      },
      include: [db.project]
    })
    .then(foundCategory=>{
      foundCategory.getProjects()
      .then(projects=>{
        res.render('categories/show', {category: foundCategory, projects: projects})
      })
      .catch((error) => {
        console.log(error)
      })
    })
  })

  module.exports = router