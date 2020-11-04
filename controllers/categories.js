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
















// GET /projects/:id - display a specific project
// router.get('/:id', (req, res) => {
//     db.project.findOne({
//       where: { id: req.params.id }
//     })
//     .then((project) => {
//       if (!project) throw Error()
//       res.render('projects/show', { project: project })
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   })









module.exports = router