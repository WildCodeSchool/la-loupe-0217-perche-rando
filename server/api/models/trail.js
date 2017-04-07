import geojson from 'mongoose-geojson-schema';
import mongoose from 'mongoose';
import Commune from './commune.js';
import Note from './note.js';
import operationOnTrails from '../lib/operation-on-trails.js';
import imageDownloader from '../lib/download-image.js';
import round from 'mongo-round';

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
    date: {
        type: Date
    }
});

let model = mongoose.model('Trail', trailSchema);

const buildQueryWithFilters = (req) => {

    console.log('URL', req.originalUrl);
    console.log('Get Params:', req.query);
    let match = {};
    let limit = Number(req.query.limit);
    let skip = Number(req.query.offset);

    if (req.query.commune) {
        match.commune = mongoose.Types.ObjectId(req.query.commune);
    }
    if (req.query.distance) {
        let distance = JSON.parse(req.query.distance);
        match.distance = {
            $gte: distance[0],
            $lte: distance[1]
        };
    }
    if (req.query.note) {
        let note = JSON.parse(req.query.note);
        match.average = {
            $gt: note[0],
            $lte: note[1]
        };
    }

    if(req.query.author) {
        match.author =  mongoose.Types.ObjectId(req.query.author);
    }

    let query = [{
        "$lookup": {
            "from": "notes",
            "localField": "_id",
            "foreignField": "trail",
            "as": "notes"
        }
    }, {
        "$addFields": {
            "average": {
                    "$ifNull": [{
                        "$avg": "$notes.note"
                    }, -1]
            },
        }
    }, {
        "$match": match
    }];

    if (!isNaN(req.query.sort)) {
        query.push({
            "$sort": {
                "average": req.query.sort
            }
        });
    }

    if (!isNaN(limit) && limit > 0) {
        console.log('limit + skip', limit + skip);
        query.push({
            "$limit": limit + skip
        });
    }

    if (!isNaN(skip)) {
        query.push({
            "$skip": skip
        });
    }

    query = query.concat([{
        "$lookup": {
            "from": "communes",
            "localField": "commune",
            "foreignField": "_id",
            "as": "commune"
        }
    }, {
        "$lookup": {
            "from": "users",
            "localField": "author",
            "foreignField": "_id",
            "as": "author"
        }
    }, {
        "$addFields": {
            "author": {
                "$arrayElemAt": ["$author", 0]
            },
            "commune": {
                "$arrayElemAt": ["$commune", 0]
            },
            "average": round("$average", 2)
        }
    }, {
        "$project": {
            "author.password": 0,
            "_v": 0,
            "isAdmin": 0
        }
    }]);
    return query;
};

export default class Trail {

    findAll(req, res) {
        let query = buildQueryWithFilters(req);

        model.aggregate(query, (err, trails) => {
            if (err) {
                console.log(err);
                res.status(500).send({
                    err
                });
            } else {
                console.log(trails.length, 'trails found');
                if (trails) {
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

    findByIdForAuth(id, callback) {
        model.findById(id)
            .populate('author')
            .exec(callback);
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

    top10(req, res) {
        req.query = {
            limit: 10,
            offset: 0,
            sort: -1
        };
        this.findAll(req, res);
    }

    count(req, res) {
        let query = buildQueryWithFilters(req);

        model.aggregate(query, (err, trails) => {
            if (err || trails === undefined) {
                res.status(500).send({
                    err
                });
            } else {
                let length = trails.length;
                let pages = Math.ceil(length / req.params.trailsPerPages);
                res.json({
                    total: length,
                    pages: pages,
                    trailsPerPages: req.params.trailsPerPages
                });
            }
        });
    }

    create(req, res) {
        let trail = req.body;
        trail = operationOnTrails.process(trail);
        trail.date = new Date().toISOString();
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

    delete(req, res) {
        model.findById(req.params.id)
            .remove((err) =>{
                if (err) {
                    res.status(500).send({
                        err
                    });
                } else {
                    res.json({
                        success: true,
                        delete: req.params.id
                    });
                }
            });
    }
}
