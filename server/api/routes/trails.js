import express from 'express';
import Trail from '../models/trail.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

// TODO add authorization so that only loggedin users can access the trails
module.exports = (app) => {

    var trail = new Trail();

    // TODO make it possible to filter some of the trails with paramters (commune, notation ...)
    router.get('/', trail.findAll);

    router.get('/:id', trail.findById);

    router.post('/', trail.create);

    // TODO add delete route and eventually an update one
    app.use('/trails', router);
};
