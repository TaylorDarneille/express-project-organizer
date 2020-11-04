require('dotenv').config()
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)

// GET / - home page that lists all projects
app.get('/', (req, res) => {
  db.project.findAll()
  .then((projects) => {
    res.render('main/index', { projects: projects })
  })
  .catch((error) => {
    console.log('Error in GET /', error)
    res.status(400).render('main/404')
  })
})

app.use('/projects', require('./controllers/projects'))


app.get('/categories', (req, res) => {
  db.category.findAll()
  .then(foundCategories=>{
    console.log(foundCategories)
    res.render('categories', {foundCategories: foundCategories})
  })
  .catch(err=>{
    console.log(err)
  })
})

app.get('/categories/:idx', (req, res) => {
  db.category.findOne({
    where: { id: req.params.idx },
    include: [db.project]
  })
  .then(foundCategory=>{
    console.log("found category:", foundCategory.get(), "category id:", req.params.idx)
    foundCategory.getProjects()
    .then(foundProjects=>{
      console.log(`${foundProjects.length} found for ${foundCategory.name}`)
      res.render('categories/show', {projects: foundProjects, category: foundCategory })
    })
  })
  .catch(err=>{
    console.log("error is:", err)
  })
})
              // foundCategory.projects.forEach(project=>{
              //   console.log(`category: ${foundCategory.name} has project: ${project.name}`)
              // })



//     })
//     foundCategory.getProjects()
//     .then(foundProjects=>{
//       res.render('categories/show', {project: foundProjects, category: foundCategory})
//     })
//   })
// })

app.get('*', (req, res) => {
  res.render('main/404')
})

let server = app.listen(process.env.PORT || 3000, function() {
  console.log(`you're listening to the smooth sounds of port ${process.env.PORT}`)
})

module.exports = server
