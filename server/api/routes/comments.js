import express from 'express';
import Comment from '../models/comment.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

// TODO add authorization so that only loggedin users can access the trails
module.exports = (app) => {

    var comment = new Comment();

    router.get('/byTrail/:idTrail', Auth.hasAuthorization, comment.findByTrailId);

    router.post('/', Auth.hasAuthorization, comment.create);

    app.use('/comments', router);
};
