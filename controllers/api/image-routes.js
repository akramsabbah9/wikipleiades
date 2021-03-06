const router = require('express').Router();
const { Article, User, Image } = require('../../models');
const withAuth = require("../../utils/auth.js");

// get all images
router.get('/', (req, res) => {
    Image.findAll()
        .then(imageData => res.json(imageData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// get an image by id
router.get('/:id', (req, res) => {
    Image.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                    model: User,
                    attributes: ['id', 'username']
                },
                {
                    model: Article,
                    attributes: ['id', 'title', 'created_at'],
                },


            ]
        })
        .then(imageData => res.json(imageData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// adds a new image
router.post('/', withAuth, (req, res) => {
    // input: {"image_url": "https://myimage.com","user_id": 1, "article_id": 2}
    Image.create({
            image_url: req.body.image_url,
            user_id: req.session.user_id,
            article_id: req.body.article_id
        })
        .then(imageData => res.json(imageData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// alter an image's data
router.put("/:id", withAuth, (req, res) => {
    Image.update({
            image_url: req.body.image_url,
            user_id: req.session.user_id
        }, {
            where: { id: req.params.id }
        })
        .then(imageData => {
            if (!imageData[0]) {
                res.status(404).json({
                    message: 'No image found with that id'
                });
                return;
            }
            res.json(imageData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// delete an image by id
router.delete('/:id', withAuth, (req, res) => {
    Image.destroy({
            where: {
                id: req.params.id
            }
        })
        .then(imageData => {
            if (!imageData) {
                res.status(404).json({
                    message: 'No image found with this id!'
                });
                return;
            }
            res.json(imageData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;