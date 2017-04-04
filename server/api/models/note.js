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
    }
});

let model = mongoose.model('Note', noteSchema);

export default class Note {
    // TODO add functions here
}
