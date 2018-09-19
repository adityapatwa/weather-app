const request = require('request');

let getWeather = (lat, lng, callback) => {
    const url = 'https://api.darksky.net/forecast';
    const key = '41f891aab12f2f31a038da09ab0d8506';
    const urlStr = `${url}/${key}/${lat},${lng}`;

    request({
        url: urlStr,
        json: true
    }, (error, response, body) => {
        if (!error && response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                apparentTemperature: body.currently.apparentTemperature,
            });
        } else {
            callback('Unable to connect to the Fetch.io server');
        }
    });
};

module.exports = {
    getWeather
};