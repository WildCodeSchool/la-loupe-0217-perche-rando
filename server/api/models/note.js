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
communeSchema.plugin(findOrCreate);

let model = mongoose.model('Note', noteSchema);

export default class Note {
    // TODO add functions here
    addNote(req, res) {
        model.findOrCreate({
            user,
            trail
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
}
