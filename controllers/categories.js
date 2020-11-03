let express = require('express')
let db = require('../models')
let router = express.Router()



router.get('/new', (req, res) => {
    res.render('projects/categories')
  })

  router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id }
    })
    .then((category) => {
      if (!category) throw Error()
      res.render('categories/show', { category: category })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

  module.exports = router