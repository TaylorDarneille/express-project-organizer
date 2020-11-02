let express = require('express')
let db = require('../models')
const { route } = require('./categories')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  console.log(req.body)
  let categoryName = req.body.category
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description,
    category: req.body.category
  })
  .then(createdProject => {
    console.log('Created Project:', createdProject)
    db.category.findOrCreate({
      where: {
        name: categoryName
      }
    })
    .then(([category, created]) => {
      //console.log(`The categoy for ${project.name} is ${foundCategory}`)
      createdProject.addCategory(category)
      res.redirect('/')
    
    })
  })
  /*.then((project) => {
    res.redirect('/')
  })*/
  .catch((error) => {
    //res.status(400).render('main/404')
    console.log(error)
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id },
    include: [db.category]
  })
  .then((project) => {
    if (!project) throw Error()
    console.log(project)
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

//PUT /projects/:id - add category to existing project
//REFERENCE ROUTE STARTING IN LINE 6
router.post('/:id', (req, res) => {
  let projectId = parseInt(req.params.id)
  let submittedName = req.body.category
  console.log('REQ PARAMS', projectId)
  console.log('ADD CATEGORY REQUEST',submittedName)
  
  db.category.findOrCreate({
    where: {name: submittedName}
  })
  .then(([category, created]) => {
    //console.log(`The categoy for ${project.name} is ${foundCategory}`)
    //createdProject.addCategory(category)
    res.redirect('/')})
  .catch((error) => {
    res.status(400).render('main/404')
    console.log(error)
  })
  
  //res.send('UPDATE CATEGORIES ROUTE WORKING')
})

module.exports = router
