let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post("/", (req, res) => {
  db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description,
  })
  .then((createdProject) => {
    db.category.findOrCreate({
      where: { name: req.body.category },
    })
    .then(([categoryCreated, wasCreated]) => {
      createdProject.addCategory(categoryCreated) //associate the category created with the project 
      .then(newRelation=> {
        //console.log('newRelation', newRelation);
      })
      //console.log("Category Created:", categoryCreated);
      //console.log("Was a new category created?", wasCreated);
    });
    res.redirect("/");
    })
    .catch((error) => {
    res.status(400).render("main/404");
  });
});


// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  res.render('projects/new')
})

//GET route to view categories 
router.get('/categories', (req,res)=> {
  db.category.findAll()
  .then((categories)=> {
    //console.log('categories', categories);
    res.render('categories/show', {categoryList: categories});
  })
})

//GET route to show projects related to selected category
// router.get('/categories/:id', (req,res)=> {
//   //console.log(req.params.id);
//   db.category.findOne({
//     where: {id: req.params.id},
//     include: [db.project]
//   })
//   .then(foundCategory=> {
//     //console.log('foundCategory.projects', foundCategory.projects); //plural because the relationship is many to many 
//     res.render('categories/id/show', {category: foundCategory, projects: foundCategory.projects});
//   })
// })

//THE ABOVE CAN ALSO BE WRITTEN LIKE THIS
router.get('/categories/:id', (req,res)=> {
  //console.log(req.params.id);
  db.category.findByPk(req.params.id,{
    include: [db.project]
  })
  .then(foundCategory=> {
    //console.log('foundCategory.projects', foundCategory.projects); //plural because the relationship is many to many 
    res.render('categories/id/show', {category: foundCategory, projects: foundCategory.projects});
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
