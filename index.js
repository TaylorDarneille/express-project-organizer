require('dotenv').config()
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)

app.use(express.static(__dirname + '/public/'))

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
// app.use('/categories', require('./controllers/categories'))

app.get('/categories', (req, res) => {
  db.category.findAll()
  .then(categories=>{
    console.log(categories)
    res.render("categories", {categories: categories})
  })
})

// GET /categories/:id - display all the projects of category with :id
app.get('/categories/:id', (req, res) => {
  db.category.findOne({
      include: [db.project],
      where: {id: req.params.id}
  }).then((category) => {
      console.log(category)
      console.log(category.projects)
      res.render('categories/show', { category: category, projects: category.projects})
  }).catch((error) => {
      console.log(error)
  })
})

app.get('*', (req, res) => {
  res.render('main/404')
})


let server = app.listen(process.env.PORT, function() {
  console.log(`you're listening to the smooth sounds of port ${process.env.PORT}`)
})

module.exports = server
