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

// User 
User.hasMany(Article, {
    foreignKey: "article_id"
});
User.hasMany(Comment, {
    foreignKey: 'user_id',
});
User.hasMany(Image, {
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

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
User.belongsToMany(Article, {
    through: Image,
    as: 'image_posts',

    foreignKey: 'user_id',
    onDelete: 'SET NULL'
});
User.belongsToMany(Article, {
    through: Comment,
    as: 'comment_posts',
    foreignKey: 'user_id',
    onDelete: 'SET NULL'
})

// Comment 
Comment.belongsTo(Article, {
    foreignKey: "article_id"
});
Comment.belongsTo(User, {
    foreignKey: "article-id"
})

// Vote 
Vote.belongsTo(Article, {
    foreignKey: "article_id"
});

// Image 
Image.belongsTo(Article, {
    foreignKey: "article_id"
});

// Revision
Revision.belongsTo(Article, {
    foreignKey: "article_id"
});

/*
module.exports = { Article, Comment, Vote };
//*/
module.exports = { User, Article, Comment, /* Source,*/ Image, Revision, Vote };