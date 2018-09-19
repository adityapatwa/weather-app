const request = require('request');
const yargs = require('yargs');

const argv = yargs
    .options({
        address : {
            demand: true,
            describe: "Fetch weather for the address",
            alias: "a",
            string: true
        }
    })
    .help()
    .alias('help', 'h')
    .argv;


const url = 'http://www.mapquestapi.com/geocoding/v1/address?';
const key = '09jiKAxod7j3yPUWJxUZDwG2503Z4sJJ';
const address = encodeURIComponent(argv.address);
const urlStr = `${url}key=${key}&location=${address}`;

request({
    url: urlStr,
    json: true
}, (error, response, body) => {
    if (error) {
        console.log('Unable to connect to mapquest.api')
    } else {
        try {
            if (body.results[0].locations[0].street === '') {
                console.log('No Result Found')
            } else {
                console.log(`Address: ${body.results[0].locations[0].street}`);
                console.log(`Latitude: ${body.results[0].locations[0].latLng.lat}`);
                console.log(`Longitude: ${body.results[0].locations[0].latLng.lng}`);
            }
        } catch (e) {
            console.log(JSON.stringify(body, undefined, 2))
        }
    }
});