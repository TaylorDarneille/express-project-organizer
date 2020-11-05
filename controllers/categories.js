let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/index', { categories: categories })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })

router.get('/:id', (req, res)=>{
  db.category.findOne({
    include: [db.project],
    where: {id: req.params.id}
  })
  .then(category=>{
    res.render('categories/show', { category: category })
  })
  .catch((error) => {
    console.log(error)
    res.status(400).render('main/404')
  })
})






module.exports = router