import mongoose from 'mongoose';
import trail from './trail.js';
import user from './user.js';
import findOrCreate from 'mongoose-findorcreate';


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
noteSchema.plugin(findOrCreate);

let model = mongoose.model('Note', noteSchema);

export default class Note {
    createOrUpdate(req, res) {
        console.log(req.originalUrl);
        console.log(req.body);
        model.findOrCreate({
            user: req.params.userId,
            trail: req.params.trailId
        }, {
            note: req.body.note
        }, (err, note) => {
            if (err || !note) {
                res.sendStatus(403);
            } else {
                res.json({
                    success:"true",
                    note
                });
            }
        });
    }

    findAllForTrail(trailId, callback) {
        model.find({
            trail:trailId
        }, callback);
    }
}
