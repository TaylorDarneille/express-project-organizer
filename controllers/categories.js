let express = require('express')
let db = require('../models')
let router = express.Router()



  router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
      res.render('categories/index', { category: category })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })

  







  module.exports = router