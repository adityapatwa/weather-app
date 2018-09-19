const request = require('request');

let geocodeAddress = (address, callback) => {
    const url = 'http://www.mapquestapi.com/geocoding/v1/address?';
    const key = '09jiKAxod7j3yPUWJxUZDwG2503Z4sJJ';
    const urlStr = `${url}key=${key}&location=${encodeURIComponent(address)}`;

    request({
        url: urlStr,
        json: true
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to mapquest.api');
        } else {
            try {
                if (body.results[0].locations[0].street === '') {
                    callback('No Result Found');
                } else {
                    callback(undefined, {
                        address: body.results[0].locations[0].street,
                        lat: body.results[0].locations[0].latLng.lat,
                        lng: body.results[0].locations[0].latLng.lng
                    });
                }
            } catch (e) {
                console.log(JSON.stringify(body, undefined, 2))
            }
        }
    });
};

module.exports = {
    geocodeAddress
};