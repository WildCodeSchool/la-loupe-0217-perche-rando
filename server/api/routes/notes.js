import express from 'express';
import Note from '../models/note.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

// TODO add authorization so that only loggedin users can access the trails
module.exports = (app) => {

    var note = new Note();

    router.post('/:userId/on/:trailId', Auth.hasAuthorization, note.createOrUpdate);

    app.use('/notes', router);
};
