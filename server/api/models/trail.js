import geojson from 'mongoose-geojson-schema';
import mongoose from 'mongoose';
import Commune from './commune.js';
import operationOnTrails from '../lib/operation-on-trails.js';
import imageDownloader from '../lib/download-image.js';

let commune = new Commune();

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
    },
    previewUrl: {
        type: String
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

    // TODO include the bits about downloading the image
    create(req, res) {
        let trail = req.body;
        console.log(trail);
        console.log('');
        // trail.previewUrl = 'img/default.png';
        trail = operationOnTrails.process(trail);
        console.log(trail);
        console.log('');

        commune.findOrCreateByName(trail.commune,
            (err, commune) => {
                trail.commune = commune._id;
                model.create(trail,
                    (err, trail) => {
                        if (err) {
                            console.error(err);
                            res.status(500).send({
                                err
                            });
                        } else {
                            imageDownloader(trail, __dirname + '/../public/img');
                            res.json({
                                success: true,
                                created: trail
                            });
                        }
                    });
            });
    }
}
