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


request({
    url: `http://www.mapquestapi.com/geocoding/v1/address?key=09jiKAxod7j3yPUWJxUZDwG2503Z4sJJ&location=${encodeURI(argv.address)}`,
    json: true
}, (error, response, body) => {
    console.log(`Address: ${body.results[0].providedLocation.location}`);
    console.log(`Latitude: ${body.results[0].locations[0].displayLatLng.lat}`);
    console.log(`Longitude: ${body.results[0].locations[0].displayLatLng.lng}`);
});