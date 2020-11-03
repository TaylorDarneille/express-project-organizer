let express = require('express')
let db = require('../models')
let router = express.Router()
// INDEX route
router.get('/',(req,res)=>{
  db.category.findAll()
  .then(foundData=>{
    res.render('categories/index',{data: foundData})
  })
})

//SHOW route
router.get('/:id',(req,res)=>{
  db.category.findOne({
    where: {id: req.params.id},
    include: [db.project]
  })
  .then(foundCategory=>{
    //res.send(foundCategory)
     res.render('categories/show',{category: foundCategory})
  })
})

// DELETE a category
router.delete('/:id',(req,res)=>{
  db.category.destroy({
    where:{id:req.params.id}
  })
  .then(numRowsDeleted=>{
    res.redirect('/')
  })
  .catch(err=>{
    console.log(err);
    res.redirect('/')
  })
  //res.send('deleting'+req.params.id)
})

module.exports = router
