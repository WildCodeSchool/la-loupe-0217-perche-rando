import jsonwebtoken from 'jsonwebtoken';
import token from '../token.js';
import Trail from '../models/trail.js';

export default {

    hasAuthorization: (req, res, next) => {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, token, (err, decoded) => {
                if (err) {
                    return res.sendStatus(403);
                } else {
                    next();
                }
            });
        } else {
            return res.sendStatus(403);
        }
    },

    isAdministrator: (req, res, next) => {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, token, (err, decoded) => {
                if (decoded._doc && decoded._doc.isAdmin) {
                    next();
                } else {
                    return res.sendStatus(403);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    },

    isAuthor: (req, res, next) => {
        if (req.headers.authorization) {
            jsonwebtoken.verify(req.headers.authorization, token, (err, decoded) => {
                if (decoded._doc) {
                    let trail = new Trail();
                    trail.findByIdForAuth(req.params.id, (err, trail) => {
                        if (trail.author._id.toString() === decoded._doc._id) {
                            next();
                        } else {
                            return res.status(403).json({
                                success: false,
                                message: "You are not the author of this trail"
                            });
                        }
                    });
                } else {
                    return res.sendStatus(403);
                }
            });
        } else {
            return res.sendStatus(401);
        }
    }
};
