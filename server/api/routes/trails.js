import express from 'express';
import Trail from '../models/trail.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var trail = new Trail();

    router.get('/', Auth.hasAuthorization, trail.findAll);

    router.get('/top10', Auth.hasAuthorization, trail.top10.bind(trail));

    router.get('/count/:trailsPerPages', Auth.hasAuthorization, trail.count);

    router.get('/58e60dc6c91e932518c471c1', (req, res) => {
        req.params.id = '58e60dc6c91e932518c471c1';
        return trail.findById(req, res);
    });

    router.get('/58e64f05f528fc520c7241dd', (req, res) => {
        req.params.id = '58e64f05f528fc520c7241dd';
        return trail.findById(req, res);
    });
    router.get('/58e6506630118755318e4941', (req, res) => {
        req.params.id = '58e6506630118755318e4941';
        return trail.findById(req, res);
    });

    router.get('/:id', Auth.hasAuthorization, trail.findById);

    router.post('/', Auth.hasAuthorization, trail.create);

    router.delete('/:id', Auth.hasAuthorization, Auth.isAuthor, trail.delete);

    app.use('/trails', router);
};
