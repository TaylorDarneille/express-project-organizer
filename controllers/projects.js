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
    //find category name with typed text
    db.category.findOrCreate({where:{name:req.body.category}})
    .then((category)=>{
      //console.log(category.id);
      //res.redirect('/');
      db.category.findOne({where:{name:req.body.category}})
      .then((category)=>{
        db.ProjectCategory.create({
          projectId:project.id,
          categoryId:category.id
        })
        .then(()=>{
          res.redirect('/')
        })
      })
    })
    /*db.category.findOrCreate({where:{name:req.body.category}}),(err,category)=>{
      db.ProjectCategory.create({
        projectId:project.id,
        categoryId:category.id
      })
      .then(()=>{
        res.redirect('/')
      })
    })*/
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

router.post('/addCategory',(req,res)=>{
  db.category.findOrCreate({where:{name:req.body.newCategory}})
  .then(()=>{
    db.category.findOne({where:{name:req.body.newCategory}})
    .then((category)=>{
      db.ProjectCategory.create({
        projectId:req.body.projectId,
        categoryId:category.id
      })
      .then(()=>{
        res.redirect('/projects/'+ req.body.projectId)
      })
    })
  })
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

module.exports = router
