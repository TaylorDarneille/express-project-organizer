let express = require('express')
let db = require('../models')
let router = express.Router()

//GET /categories
router.get("/categories", (req,res)=> {
     db.category.findAll()
    .then((foundCategories) =>{
      console.log(foundCategories)
      res.render('categories/categories', {foundCategories: foundCategories})
    })
  })
  

//GET:idx

router.get("/categories/:idx", (req,res)=> {
    console.log(req.params)
    db.category.findOne({
      where: {
        id: req.params.idx
      },
      include: [db.project]
    })
    .then((categories)=>{

      if (!categories) throw Error()
      console.log("categories", categories)
      res.render('categories/show', { categories: categories})
    })
    .catch((error) => {
      console.log(error)
      // res.status(400).render('main/404')
    })
  })

  

  

module.exports = router
