let express = require('express')
let db = require('../models')
let router = express.Router()



  router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
      res.render('categories/index', { category: category })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })

  // router.get('/:id', (req, res) => {
  //   db.category.findOne({
  //     where: { id: req.params.id }
  //   })
  //   .then((category) => {
  //     if (!category) throw Error()
  //     res.render('categories/show', { category: category })
  //   })
  //   .catch((error) => {
  //     res.status(400).render('main/404')
  //   })
  // })

//   router.get('/:id', (req, res) => {
//   db.project.findAll({
//   include:[db.category]
// })
// .then(foundProjects=>{
//   foundProjects.forEach(project=>{
//     console.log(`${project.name}`)
//     project.categories.forEach(category=>{
//       console.log(category.name)
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   })
//   })
// })


router.get('/:id', (req, res) => {
  db.category.findOne({
      where: {id: req.params.id},
      include:[db.project]
    })
      .then(foundCategory=>{
          foundCategory.projects.forEach(project=>{
              console.log(`${foundCategory.name}, has these projects ${project.name}`)
              res.render('categories/show', { foundCategory: foundCategory, project:project})
          })
      })
      .catch(err=>{
          console.log(err)
      })
})







  module.exports = router