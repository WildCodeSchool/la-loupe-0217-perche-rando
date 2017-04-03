import mongoose from 'mongoose';
import trail from './trail.js';
import user from './user.js';

const noteSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    trail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Trail'
    },
    note: {
        type: Number,
        required:true,
        default: 2
    }
});

let model = mongoose.model('Note', noteSchema);

export default class Note {
    // TODO add functions here
}
