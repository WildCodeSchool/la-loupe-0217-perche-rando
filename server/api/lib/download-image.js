var fs = require('fs'),
    request = require('request'),
    polyline = require('@mapbox/polyline');

const BASE_URL = "https://maps.googleapis.com/maps/api/staticmap";
const API_KEY = "AIzaSyAJ5qO1thP2uICtSzhHzqJPYA-f-3JgPGM"; // static map api key
const SETTINGS = {
    color: '0xe73664',
    weight: '2',
    size: '400x400',
    map_type: 'roadmap'
};

/*
 * Module use to download a static preview of a trail from google maps
 */
export default function(trail, folder) {
    console.log('encoding path...');
    let encodedPath = polyline.fromGeoJSON(trail.nodes);
    console.log('path encoded :', encodedPath);
    let url = `${BASE_URL}?center=${trail.center.coordinates[1]},${trail.center.coordinates[0]}&zoom=${trail.zoom}&size=${SETTINGS.size}&key=${API_KEY}&maptype=${SETTINGS.map_type}&path=color:${SETTINGS.color}|weight:${SETTINGS.weight}|enc:${encodedPath}`;
    url = encodeURI(url);
    console.log(url);

    let download = function(uri, filename, callback) {
        console.log("downloading image...");
        request.head(uri, function(err, res, body) {
            console.log('content-type:', res.headers['content-type']);
            console.log('content-length:', res.headers['content-length'], 'bytes');

            request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
        });
    };

    download(url, `${folder}/trail-${trail._id}.png`, function() {
        console.log('done');
    });
}
