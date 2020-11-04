let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description,
    }).then(function(project) {
        db.category.findOrCreate({
          where: { name: req.body.categoryLink }
        })
        .then(([category, wasCreated]) => {
          project.addCategory(category)
          .then(() => {
            // res.redirect, or whatevs
            console.log('done adding', category)
            res.redirect('/')
          })
        })
      }, () => {
        console.log('EVERYTHING is done. Now redirect or something')
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



router.post('/:id', (req, res)=>{  //thought it was router.delete but that didnt work. somehow post worked.
  db.project.destroy({
    where: {id: req.params.id}
  })
    .then(numRowsDeleted=>{
       console.log(numRowsDeleted)
      res.redirect('/')  
  }).catch(err=>{
    res.send(err)
  })
})




module.exports = router
