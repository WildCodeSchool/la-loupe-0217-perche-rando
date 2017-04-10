import express from 'express';
import Comment from '../models/comment.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

// TODO add authorization so that only loggedin users can access the trails
module.exports = (app) => {

    var comment = new Comment();

    router.get('/byTrail/58e60dc6c91e932518c471c1', (req, res) => {
        req.params.id = '58e60dc6c91e932518c471c1';
        return comment.findByTrailId(req, res);
    });
    router.get('/byTrail/58e64f05f528fc520c7241dd', (req, res) => {
        req.params.id = '58e64f05f528fc520c7241dd';
        return comment.findByTrailId(req, res);
    });
    router.get('/byTrail/58e6506630118755318e4941', (req, res) => {
        req.params.id = '58e6506630118755318e4941';
        return comment.findByTrailId(req, res);
    });

    router.get('/byTrail/:idTrail', Auth.hasAuthorization, comment.findByTrailId);

    router.post('/', Auth.hasAuthorization, comment.create);

    app.use('/comments', router);
};
