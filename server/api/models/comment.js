import mongoose from 'mongoose';
import trail from './trail.js';
import user from './user.js';

const commentSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    trail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trail'
    },
    content: {
        type: String,
        required: true
    },
    date: {
        type: Date
    }
});

let model = mongoose.model('Comment', commentSchema);

export default class Comment {

    create(req, res) {
        let comment = req.body;
        console.log('req.body', req.body);
        comment.date = new Date().toISOString();
        model.create(comment, (err, comment) => {
                if (err) {
                    res.status(500).send({
                      error: err
                    });
                } else {
                    res.json({
                        success: true,
                        comment: comment
                    });
                }
            });
    }

    findByTrailId(req, res) {
        model.find({
                trail: req.params.idTrail
            })
            .populate('author')
            .exec((err, comment) => {
                if (err || !comment) {
                    res.sendStatus(403);
                } else {
                    res.json(comment);
                }
            });
    }
}
