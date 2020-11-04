let express = require("express");
let db = require("../models");
let router = express.Router();

// POST /projects - create a new project
router.post("/", (req, res) => {
    db.project
        .create({
            name: req.body.name,
            githubLink: req.body.githubLink,
            deployLink: req.body.deployedLink,
            description: req.body.description,
        })
        .then((project) => {
            db.category
                .findOrCreate({
                    where: { name: req.body.category },
                })
                .then(([categoryCreated, wasCreated]) => {
                    //associate the category created with project
                    project.addCategory(categoryCreated);
                    console.log("Category Created:", categoryCreated);
                    console.log("Was a new category created?", wasCreated);
                })
                .catch((err) => console.log(err));
            res.redirect("/");
        })
        .catch((error) => {
            res.status(400).render("main/404");
        });
});

// GET /projects/new - display form for creating a new project
router.get("/new", (req, res) => {
    res.render("projects/new");
});

//Show all categories that exist
router.get("/categories", (req, res) => {
    db.category.findAll().then((categories) => {
        res.render("categories/show.ejs", { data: categories });
    });
});

router.get("/categories/:id", (req, res) => {
    let urlParam = req.params.id;
    db.category
        .findOne({
            where: { id: urlParam },
            include: [db.project],
        })
        .then((foundCategory) => {
            console.log(foundCategory.name);
            console.log("Projects:", foundCategory.projects[0].name);
            res.render("categories/id/show.ejs", {
                category: foundCategory,
                projects: foundCategory.projects,
            });
        })
        .catch((err) => console.log(err));
});

// GET /projects/:id - display a specific project
router.get("/:id", (req, res) => {
    db.project
        .findOne({
            where: { id: req.params.id },
        })
        .then((project) => {
            if (!project) throw Error();
            res.render("projects/show", { project: project });
        })
        .catch((error) => {
            res.status(400).render("main/404");
        });
});

module.exports = router;
