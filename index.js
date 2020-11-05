require('dotenv').config()
let express = require('express')
let ejsLayouts = require('express-ejs-layouts')
let db = require('./models')
// const category = require('./models/category')
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
app.use('/categories', require('./controllers/categories'))





// app.get('/', (req, res) => {
//     db.category.findOne({
//       where: { id: req.params.id }
//     })
//     .then((category) => {
//       if (!category) throw Error()
//       res.render('categories/show', { category: category })
//     })
//     .catch((error) => {

//       console.log(error)
//       // res.status(400).render('main/404')
//     })
//   })



app.get('*', (req, res) => {
  res.render('main/404')
})

let server = app.listen(process.env.PORT, function() {
  console.log(`you're listening to the smooth sounds of port ${process.env.PORT}`)
})


module.exports = server
