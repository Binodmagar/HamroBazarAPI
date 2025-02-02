const express = require('express');
const Product = require('../models/product');
const auth = require('../auth');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        Product.find({})
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    })

    .post((req, res, next) => {
        Product.create(req.body)
            .then((Product) => {
                res.statusCode = 201;
                res.json(Product);
            })
            .catch(next);
    })
    .put((req, res) => {
        res.statusCode = 405;
        res.json({ message: "Method not allowed" });
    })
    .delete(auth.verifyAdmin, (req, res, next) => {
        Product.deleteMany({})
            .then((reply) => {
                res.json(reply);
            })
            .catch(next)
    })
    .post()
    .put()
    .delete();

router.route('/trending')
    .get((req, res, next) => {
        Product.find({popular:true})
            .then((products) => {
                res.json(products);
            })
            .catch(next);
    })
module.exports = router;