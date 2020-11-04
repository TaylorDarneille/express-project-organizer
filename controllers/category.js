let express = require('express')
let db = require('../models');

let router = express.Router()


router.get('/index', (req, res) => {
    db.category.findAll()
    .then((category) => {
      res.render('categories/index', { category: category })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })


// GET /category/:id - display a specific category
router.get('/show/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id }
    })
    .then((category) => {
      if (!category) throw Error()
      res.render('/categories/show', { category: category })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })


module.exports = router