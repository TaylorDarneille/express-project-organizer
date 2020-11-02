let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project) => {
    db.category.findOrCreate({
      where: {name: req.body.category}
    })
    .then(([category,created])=>{
      project.addCategory(category)
    })
    .catch(err =>{
      console.log(err)
    })
    res.redirect('/')
  })
  .catch((error) => {
    console.log('Error in POST /', error)
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    include: [db.category],
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    console.log('Error in GET /:id', error)
    res.status(400).render('main/404')
  })
})

// GET EDIT /projects/:id - edit a project
router.get('/edit/:id', (req,res) =>{
  db.project.findOne({
    include: [db.category],
    where: {id: req.params.id}
  })
  .then((project)=>{
    if (!project) throw Error()
    res.render('projects/edit', { project: project })
  })
  .catch((error)=>{
    console.log('Error in GET EDIT /:id', error)
    res.status(400).render('main/404')
  })
})

// EDIT /projects/:id
router.put('/:id', (req,res)=> {
  db.project.update({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  },
  {
    include: [db.category],
    where: {id: req.body.id}
  })
  //------ This part is having issues -------
  .then((project)=>{
    db.category.findOrCreate({
      where: {name: req.body.category}
    })
    .then(([category,created])=>{
      project.addCategory(category)
    })
    .catch(err =>{
      console.log(err)
    })
  })
  .catch(err => {
    console.log(err)
  })
  res.redirect(`/projects/${req.body.id}`)
})

// DELETE /project/:id
router.delete('/:id', (req,res)=>{
  db.project.destroy({
    where: { id: req.body.id }
  })
  .then(deleted => {
    res.redirect('/')
  })
  .catch(err => {
    console.log('Error in DELETE /:id', err)
  })
})


module.exports = router
