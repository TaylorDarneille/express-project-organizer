let express = require('express')
let db = require('../models')
let router = express.Router()



router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories: categories})
    })
    .catch((error) => {
        console.log(error)
    })
  })







//this gives me all the projects and their categories/;

// router.get('/:id', (req, res) => {
//     db.project.findAll({
//         include: [db.category]
//     })
//     .then(foundProjects=>{
//         foundProjects.forEach(project=>{
//             console.log(`${project.name} 's categories:`)
//             project.categories.forEach(category=>{
//                 console.log(category.name, category.id)
//             })
//         })
//     })
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