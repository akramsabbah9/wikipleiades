const router = require("express").Router();

const articleRoutes = require("./article-routes");
const commentRoutes = require("./comment-routes");
const userRoutes = require("./user-routes");
const revisionRoutes = require("./revision-routes");


router.use("/articles", articleRoutes);
router.use("/comments", commentRoutes);
router.use("/users", userRoutes);
router.use("/revisions", revisionRoutes);

module.exports = router;