let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
  db.project.findOrCreate({
      where: {
        name: req.body.name,
        githubLink: req.body.githubLink,
        deployLink: req.body.deployedLink,
        description: req.body.description
      }
    })
    .then(async ([newProject, created]) => {
      // split the comma separate string into an array of strings
      const categoriesArrayOfString = req.body.category.split(', ');
      categoriesArrayOfString.forEach(async string => {
        const arr = await db.category.findOrCreate({
          where: {
            name: string.toLowerCase() //to avoid any capitalization issues
          }
        });
        await newProject.addCategory(arr[0])
      });
      res.redirect('/')
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
})

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

// DELETE a project
router.delete('/:id', (req, res) => {
  db.project.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(numRowsDeleted => {
      res.redirect('/')
      // should i be checking if all categories are empty? and if so delete those empty ones?
    })
    .catch(err => {
      console.log(err);
      res.redirect('/')
    })
})

// edit route, shows the edit form
router.get('/:id/edit', (req, res) => {
  db.project.findByPk(req.params.id, {
      include: [db.category]
    })
    .then(foundProject => {
      let mycategories = foundProject.categories.map(category => {
        return category.name
      }).join(", ")
      res.render('projects/edit', {
        project: foundProject,
        categories: mycategories
      })
    })
})

router.put('/:id', (req, res) => {
  db.project.update({
      name: req.body.name,
      githubLink: req.body.githubLink,
      deployLink: req.body.deployLink,
      description: req.body.description
    }, {
      where: {
        id: req.params.id
      }
    })
    .then(async numUpdates => {
      let myProj = await db.project.findByPk(req.params.id)
      res.send(myProj)
      //res.redirect(`/projects/${req.params.id}`)
    })
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
      where: {
        id: req.params.id
      }
    })
    .then((project) => {
      if (!project) throw Error()
      res.render('projects/show', {
        project: project
      })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
})

module.exports = router
