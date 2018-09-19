const request = require('request');

let geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const url = 'http://www.mapquestapi.com/geocoding/v1/address?';
        const key = '09jiKAxod7j3yPUWJxUZDwG2503Z4sJJ';
        const urlStr = `${url}key=${key}&location=${encodeURIComponent(address)}`;

        request({
            url: urlStr,
            json: true
        }, (error, response, body) => {
            if (error) {
                reject('Unable to connect to mapquest.api');
            } else {
                try {
                    if (body.results[0].locations[0].street === '') {
                        reject('No Result Found');
                    } else {
                        resolve({
                            address: body.results[0].providedLocation.location,
                            lat: body.results[0].locations[0].latLng.lat,
                            lng: body.results[0].locations[0].latLng.lng
                        });
                    }
                } catch (e) {
                    reject(JSON.stringify(body, undefined, 2))
                }
            }
        });
    });
};

geocodeAddress('65 N 34th Street Philadelphia').then((location) => {
    console.log(JSON.stringify(location, undefined, 2));
}, (errorMessage) => {
    console.log(errorMessage)
});