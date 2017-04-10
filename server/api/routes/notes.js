import express from 'express';
import Note from '../models/note.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var note = new Note();

    router.get('/average/58e60dc6c91e932518c471c1', (req, res) => {
        req.params.id = '58e60dc6c91e932518c471c1';
        return note.averageOfTrail(req, res);
    });
    router.get('/average/58e64f05f528fc520c7241dd', (req, res) => {
        req.params.id = '58e64f05f528fc520c7241dd';
        return note.averageOfTrail(req, res);
    });
    router.get('/average/58e6506630118755318e4941', (req, res) => {
        req.params.id = '58e6506630118755318e4941';
        return note.averageOfTrail(req, res);
    });

    router.get('/average/:trailId', Auth.hasAuthorization, note.averageOfTrail);

    router.post('/on/:trailId/by/:userId', Auth.hasAuthorization, note.createOrUpdate);

    app.use('/notes', router);
};
