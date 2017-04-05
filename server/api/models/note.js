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

    averageOfTrail(req, res) {
        console.log('Received request for the average rating of', req.params.trailId);
        model.aggregate([{
            $match: {
                trail: new mongoose.Types.ObjectId(req.params.trailId)
            }
        }, {
            $group: {
                "_id": null,
                "average": {
                    "$avg": "$note"
                }
            }
        }], (err, averages) => {
            console.log('average', averages);
            if (err || averages === undefined) {
                res.sendStatus(403);
            } else {
                res.json({
                    average:averages[0].average
                });
            }
        });
    }
}
