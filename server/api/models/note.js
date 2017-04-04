import mongoose from 'mongoose';
import trail from './trail.js';
import user from './user.js';


const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    note: {
        type: Number,
        required: true,
        max: [5, 'Une note ne peux être supérieure à 5']
    },
    trail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trail'
    }
});

let model = mongoose.model('Note', noteSchema);

export default class Note {

    createOrUpdate(req, res) {
        model.update({
            user: req.params.userId,
            trail: req.params.trailId
        }, {
            user: req.params.userId,
            trail: req.params.trailId,
            note: req.body.note
        }, {
            upsert: true
        }).exec((err, note) => {
            if (err || !note) {
                res.sendStatus(403);
            } else {
                res.json({
                    success: "true",
                    note
                });
            }
        });
    }

    averageOfTrail(trailId, callback) {
        model.find({
            trail: trailId
        }, callback);
    }
}
