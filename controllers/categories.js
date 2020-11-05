let express = require ('express')
let db= require ('../models')
let router = express.Router()



/////A route to get all categories and show them on one page
router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories=>{
      res.render('categories/index', {categories: categories})
    })
    
  })
  
///// A route to get one category at index and show the projects that belong to it
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