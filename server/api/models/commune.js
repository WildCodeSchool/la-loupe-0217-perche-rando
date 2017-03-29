import geojson from 'mongoose-geojson-schema';
import mongoose from 'mongoose';

const communeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

let model = mongoose.model('Commune', communeSchema);

export default class Commune {

    findAll(req, res) {
        model.find({},
            (err, communes) => {
                if (err || !communes) {
                    res.sendStatus(403);
                } else {
                    res.json(communes);
                }
            });
    }

    findById(req, res) {
        model.findById(req.params.id,
            (err, commune) => {
                if (err || !commune) {
                    res.sendStatus(403);
                } else {
                    res.json(commune);
                }
            });
    }

    // TODO create actual function
    create(req, res) {
        model.create(req.body,
            (err, commune) => {
                res.status(500);
            });
    }
}
