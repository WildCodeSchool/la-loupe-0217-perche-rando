function encodeSignedNumber(num) {
    let sgn_num = num << 1;

    if (num < 0) {
        sgn_num = ~(sgn_num);
    }

    return (encodeNumber(sgn_num));
}

function encodeNumber(num) {
    let encodeString = "";

    while (num >= 0x20) {
        encodeString += (String.fromCharCode((0x20 | (num & 0x1f)) + 63));
        num >>= 5;
    }

    encodeString += (String.fromCharCode(num + 63));
    return encodeString;
}

function encodePoint(plat, plng, lat, lng) {
    let late5 = Math.round(lat * 1e5);
    let plate5 = Math.round(plat * 1e5);

    let lnge5 = Math.round(lng * 1e5);
    let plnge5 = Math.round(plng * 1e5);

    dlng = lnge5 - plnge5;
    dlat = late5 - plate5;

    return encodeSignedNumber(dlat) + encodeSignedNumber(dlng);
}

module.exports = {
    createEncodings: function(coords) {
        let i = 0;

        let plat = 0;
        let plng = 0;

        let encoded_points = "";

        for (i = 0; i < coords.length; ++i) {
            let lat = coords[i][0];
            let lng = coords[i][1];

            encoded_points += encodePoint(plat, plng, lat, lng);

            plat = lat;
            plng = lng;
        }

        // close polyline
        encoded_points += encodePoint(plat, plng, coords[0][0], coords[0][1]);

        return encoded_points;
    }
};
