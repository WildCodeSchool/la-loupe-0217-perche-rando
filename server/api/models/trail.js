import geojson from 'mongoose-geojson-schema';
import mongoose from 'mongoose';
import commune from './commune.js';

const trailSchema = new mongoose.Schema({
    zoom: {
        type: Number,
        required: true
    },
    commune: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Commune'
    },
    distance: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        default: "Circuit"
    },
    center: {
        type: mongoose.Schema.Types.Point,
        required: true
    },
    nodes: {
        type: mongoose.Schema.Types.LineString,
        required: true
    }
});

let model = mongoose.model('Trail', trailSchema);

export default class Trail {

    findAll(req, res) {
        model.find({})
            .populate('commune')
            .exec((err, trails) => {
                if (err || !trails) {
                    res.sendStatus(403);
                } else {
                    res.json(trails);
                }
            });
    }

    findById(req, res) {
        model.findById(req.params.id)
            .populate('commune')
            .exec((err, trail) => {
                if (err || !trail) {
                    res.sendStatus(403);
                } else {
                    res.json(trail);
                }
            });
    }

    // TODO create actual function
    // TODO include the bits about downloading the image, finding the center and converting to geojson (if needed)
    create(req, res) {
        model.create(req.body,
            (err, trail) => {
                res.status(500);
            });
    }
}
