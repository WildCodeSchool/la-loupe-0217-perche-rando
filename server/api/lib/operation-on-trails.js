const turf = require('@turf/turf'),
    fs = require('fs');

function addCenterOfMass(trail) {
    trail.center = turf.centerOfMass(trail.nodes);
    return trail;
}

function convertNodes(trail) {
    trail.nodes = turf.lineString(
        trail.nodes.map( point => [point[1], point[0]] )
    );
    return trail;
}

module.exports = {
    process: function(trail) {
        return addCenterOfMass(convertNodes(trail));
    }
};
