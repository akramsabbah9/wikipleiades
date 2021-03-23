const Article = require("./Article");
const Comment = require("./Comment");
const User = require("./User");
const Image = require("./Image");
const Revision = require("./Revision");
const Vote = require("./Vote");

// TODO: define model relationships here

// Article 
Article.hasMany(Comment, {
    foreignKey: "article_id"
});
Article.hasMany(Image, {
    foreignKey: "article_id"
});
Article.hasMany(Revision, {
    foreignKey: "article_id"
});
Article.hasMany(Vote, {
    foreignKey: "article_id"
});
Article.belongsToMany(User, {
    through: Vote,
    as: 'voted_articles',
    foreignKey: 'article_id'
});
Article.belongsToMany(User, {
    through: Comment,
    as: 'comment_posts',
    foreignKey: 'article_id'
});
Article.belongsToMany(User, {
    through: Revision,
    as: 'revisions_added',
    foreignKey: 'article_id'
});

// User
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
User.hasMany(Vote, {
    foreignKey: 'user_id',
});
User.hasMany(Revision, {
    foreignKey: 'user_id',
});
User.belongsToMany(Article, {
    through: Vote,
    as: 'voted_articles',
    foreignKey: 'user_id'
});

User.belongsToMany(Article, {
    through: Comment,
    as: 'comment_posts',
    foreignKey: 'user_id'
});
User.belongsToMany(Article, {
    through: Revision,
    as: 'revisions_added',
    foreignKey: 'user_id'
});

// Comment 
Comment.belongsTo(Article, {
    foreignKey: "article_id"
});
Comment.belongsTo(User, {
    foreignKey: "user_id"
});

// Vote 
Vote.belongsTo(Article, {
    foreignKey: "article_id"
});
Vote.belongsTo(User, {
    foreignKey: "user_id"
});

// Image 
Image.belongsTo(Article, {
    foreignKey: "article_id"
});


// Revision
Revision.belongsTo(Article, {
    foreignKey: "article_id"
});
Revision.belongsTo(User, {
    foreignKey: "user_id"
});

module.exports = { User, Article, Comment, Image, Revision, Vote };