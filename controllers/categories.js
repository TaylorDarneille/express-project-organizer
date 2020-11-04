let express = require('express')
let db = require('../models')
let router = express.Router()

// // GET /categories - show all the categories that exist


// // GET /projects/:id - display a specific project
// router.get('/:id', (req, res) => {
//     db.project.findOne({
//       where: { id: req.params.id }
//     })
//     .then((project) => {
//       if (!project) throw Error()
//       res.render('projects/show', { project: project })
//     })
//     .catch((error) => {
//       res.status(400).render('main/404')
//     })
//   })

module.exports = router
