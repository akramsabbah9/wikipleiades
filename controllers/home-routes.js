const router = require("express").Router();
const { QueryTypes } = require("sequelize");
const sequelize = require("../config/connection");
const { User, Article, Comment, Image, Revision } = require("../models");

// TODO - Add Logout Route

// front page: get article count and display it
router.get("/", (req, res) => {
    sequelize.query(
            "SELECT COUNT(*) AS `article_count` FROM article", { type: QueryTypes.SELECT }
        )
        .then(counterData => {
            // serialize data and render homepage
            const count = counterData[0].article_count;

            res.render("homepage", { count, loggedIn: req.session.loggedIn });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// route user to a random article
router.get("/random", (req, res) => {
    Article.findAll({
            order: sequelize.literal("RAND()"),
            limit: 1
        })
        .then(articleData => {
            // if the results are empty (no articles, respond with 404)
            if (!articleData) {
                return res.status(404).json({ message: "No articles have been created yet" });
            }
            // res.json(articleData);
            // get id from article data and redirect user to that endpoint
            const article_id = articleData[0].id;

            res.redirect(`/article/${article_id}`);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


// route user to login page
router.get("/login", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("login");
});

// route user to login page
router.get("/signup", (req, res) => {
    if (req.session.loggedIn) {
        return res.redirect("/");
    }

    res.render("signup");
});

module.exports = router;