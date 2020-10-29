let express = require('express')
let db = require('../models')
let router = express.Router()


router.get('/',(req, res)=>{
  db.category.findAll({

  })
  .then(responseData=>{
      res.render('categories/all.ejs',{data:responseData})
  })
})

router.get('/:id',(req,res)=>{
    db.category.findOne({
                where: {id: req.params.id},
                include: [db.project]
            })
            .then(foundCategory=>{
                // res.send(foundCategory)
                res.render('categories/details',{projects:foundCategory.projects})
            })
})


module.exports = router