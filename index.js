require('dotenv').config()
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
let app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(ejsLayouts)

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



// app.get('/categories', require('./controllers/categories'))
app.get("/categories", (req,res)=> {
  
  db.category.findAll()
  .then((foundCategories) =>{
    console.log(foundCategories)
    res.render('categories/index.ejs', {foundCategories: foundCategories})
  })
})

app.get("/categories/:idx", (req,res)=> {
  console.log(req.params)
  db.category.findOne({
    where: {
      id: req.params.idx
    },
    include: [db.project]
  })
  .then((categories)=>{
    console.log("I am in here now")
    if (!categories) throw Error()
    console.log("categories", categories)
    // db.project.findAll({
    //   where: {
    //     id: req.params.idx
    //   },
    //   include: [db.project, db.category]
    // })
    // .then((project)=> {
    //   res.render('categories/show', { categories: categories, project: project})
    // })
    res.render('categories/show', { categories: categories})
  })
  .catch((error) => {
    console.log(error)
    // res.status(400).render('main/404')
  })
})


app.get('*', (req, res) => {
  res.render('main/404')
})

let server = app.listen(process.env.PORT || 3000, function() {
  console.log(`you're listening to the smooth sounds of port ${process.env.PORT}`)
})

module.exports = server
