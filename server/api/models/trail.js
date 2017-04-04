import geojson from 'mongoose-geojson-schema';
import mongoose from 'mongoose';
import Commune from './commune.js';
import Note from './note.js';
import operationOnTrails from '../lib/operation-on-trails.js';
import imageDownloader from '../lib/download-image.js';

let commune = new Commune();
let note = new Note();

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
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
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

const buildQueryWithFilters = (req) => {

    console.log('URL', req.originalUrl);
    console.log('Get Params:', req.query);
    let query = {};
    let limit = Number(req.query.limit) || 10;
    let offset = Number(req.query.offset);

    if (req.query.commune) {
        query.commune = req.query.commune;
    }
    if (req.query.distance) {
        let distance = JSON.parse(req.query.distance);
        query.distance = {
            $gte: distance[0],
            $lte: distance[1]
        };
    }

    console.log('query', query, '| limit', limit, '| offset', offset);
    return query;
};

function getAverage(trail) {
    let notes = note.findAllForTrail(trail._id);
    let avg = notes.lenght > 0 ? notes.reduce( (note, sum) => {
        return sum + note.note;
    }) / notes.length : -1;
    return avg;
}

function filterByAverageNote(trails, callback) {
    trails = trails.map((trail) => {

    })

    trails = trails.filter(trail => {
        let avg = getAverage(trail, );
        return noteMin < avg && avg <= noteMax;
    });
    console.log(trails, 'trails found after filtering');
}


export default class Trail {

    findAll(req, res) {
        let query = buildQueryWithFilters(req);
        let limit = Number(req.query.limit) || 10;
        let offset = Number(req.query.offset);
        let noteMin = req.query.note !== undefined ? req.query.note[0] : -2;
        let noteMax = req.query.note !== undefined ? req.query.note[1] :  5;


        model.find(query)
            .populate('commune')
            .populate('author')
            .limit(limit)
            .skip(offset)
            .exec((err, trails) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(403).send({
                        err
                    });
                } else {
                    console.log(trails.length, 'trails found before filtering');
                    if (trails) {
                        if (req.query.note) {
                            filterByAverageNote(trails, function(trails) {
                                res.json({
                                    trails: trails
                                });
                            });
                        }
                        res.json({
                            trails: trails
                        });
                    } else {
                        res.json({
                            message: 'No trails found'
                        });
                    }
                }
            });
    }

    findById(req, res) {
        model.findById(req.params.id)
            .populate('commune')
            .populate('author')
            .exec((err, trail) => {
                if (err || !trail) {
                    res.sendStatus(403);
                } else {
                    res.json(trail);
                }
            });
    }

    count(req, res) {
        let query = buildQueryWithFilters(req);
        let limit = Number(req.query.limit) || 10;
        let offset = Number(req.query.offset);
        let noteMin = req.query.note !== undefined ? req.query.note[0] : -2;
        let noteMax = req.query.note !== undefined ? req.query.note[1] :  5;

        model.count(query, (err, count) => {
            console.log('COUNT', count);
            if (err || count === undefined || count === null) {
                res.sendStatus(403);
            } else {
                let pages = Math.ceil(count / req.params.trailsPerPages);
                console.log(count, 'trails founds | this gives us:', pages);
                res.json({
                    total: count,
                    pages: pages,
                    trailsPerPages: req.params.trailsPerPages
                });
            }
        });
    }

    // TODO include the bits about the image url
    create(req, res) {
        let trail = req.body;

        // trail.previewUrl = 'img/default.png';
        trail = operationOnTrails.process(trail);

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
