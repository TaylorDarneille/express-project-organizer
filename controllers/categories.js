let express = require('express')
let db = require('../models')
let router = express.Router()
​
router.get('/', (req, res)=>{
    db.category.findAll()
    .then((categories)=>{
        //render to category index, pass in category in the route
        res.render('categories/index', {categories: categories})
    })
    .catch(err =>{
        console.log(err)
    })
})
​
router.get('/:id', (req, res)=>{
    // res.send('hellooooooooo')
    console.log(req.params.id)
    db.category.findOne({
        where: {id: req.params.id},
        include: [db.project]
    })
    .then((category)=>{
        console.log(category)
        //render category show page, pass in category to res.render in the show page
        if (!category) throw Error()
        res.render('categories/show', {category: category, projects: category.projects})
        // res.send('hello')
    })
    .catch(err =>{
        console.log('THIS IS THE ERROR<================', err)
    })
    // db.category.findByPk(req.params.id, {
    //     include: [db.project]
    // })
    // .then(foundCategory =>{
    //     console.log('FOUND CATEGORIES<<<<<<<<<<', foundCategory.projects)
    // })
    // .catch(err =>{
    //     console.log('ERROR <=========', err)
    // })
})
​
​
​
module.exports=router