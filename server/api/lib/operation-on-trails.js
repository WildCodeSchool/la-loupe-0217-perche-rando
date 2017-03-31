const turf = require('@turf/turf'),
    fs = require('fs');

function addCenterOfMass(trail) {
    trail.center = turf.centerOfMass(trail.nodes).geometry;
    return trail;
}

function addDistance(trail) {
    let lineFeature = {
      "type": "Feature",
      "properties": {},
      "geometry": trail.nodes
    };

    console.log('distance', turf.lineDistance(lineFeature, 'kilometers'));
    trail.distance = turf.lineDistance(lineFeature, 'kilometers');
    return trail;
}

function convertNodes(trail) {
    trail.nodes = turf.lineString(
        trail.nodes.map( point => [point[1], point[0]] )
    ).geometry;
    return trail;
}

module.exports = {
    process: function(trail) {
        return addDistance(addCenterOfMass(convertNodes(trail)));
    }
};
