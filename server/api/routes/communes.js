import express from 'express';
import Commune from '../models/commune.js';
import Auth from '../middlewares/authorization.js';

let router = express.Router();

// TODO add authorization so that only loggedin users can access the trails
module.exports = (app) => {

    var commune = new Commune();

    router.get('/', Auth.hasAuthorization, commune.findAll);

    app.use('/communes', router);
};
