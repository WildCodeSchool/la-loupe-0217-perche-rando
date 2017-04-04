import express from 'express';
import Note from '../models/note.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

module.exports = (app) => {

    var note = new Note();

    router.get('/average/:noteId', Auth.hasAuthorization, note.averageOfTrail);

    router.post('/on/:trailId/by/:userId', Auth.hasAuthorization, note.createOrUpdate);

    app.use('/notes', router);
};
