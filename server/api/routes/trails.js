import express from 'express';
import Trail from '../models/trail.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var trail = new Trail();

    router.get('/', Auth.hasAuthorization, trail.findAll);

    router.get('/count/:trailsPerPages', Auth.hasAuthorization, trail.count);

    router.get('/:id', Auth.hasAuthorization, trail.findById);

    router.post('/', Auth.hasAuthorization, trail.create);

    // TODO add delete route and eventually an update one
    app.use('/trails', router);
};
