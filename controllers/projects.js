let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.findOrCreate({
    where: {name: req.body.name},
    defaults: {
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    }
  })
  .then(([project, created]) => {
    db.category.findOrCreate({
      where: {name: req.body.category}
    })
    .then (([category, created]) => {
      project.addCategory(category).then(relationInfo => {
        console.log(project.name, "added to", category.name)
        res.redirect('/')
      })
    })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})
})



// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

router.get('/edit/:id', (req, res) => {
  db.project.findOne({
    where: {id: req.params.id}
  })
  .then(project => {
    res.render('projects/edit', {project: project})
  })
})

router.put('/:id', (req, res) => {
  db.project.findOne({
    where: {id: req.params.id}
  })
  .then(project => {
    project.update({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployedLink,
      description: req.body.description
    }).then(updated => {
      res.redirect('/')
    })
  })
})

module.exports = router
