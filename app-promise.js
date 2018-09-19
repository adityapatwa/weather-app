const yargs = require('yargs');
const axios = require('axios');

const argv = yargs.options({
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

const urlStr = `http://www.mapquestapi.com/geocoding/v1/address?key=09jiKAxod7j3yPUWJxUZDwG2503Z4sJJ&location=${encodeURIComponent(argv.address)}`;

axios.get(urlStr).then((response) => {
    if (response.data.results[0].locations[0].street === '') {
        throw new Error('No Result Found');
    }

    let lat = response.data.results[0].locations[0].latLng.lat;
    let lng = response.data.results[0].locations[0].latLng.lng;
    const weatherStr = `https://api.darksky.net/forecast/41f891aab12f2f31a038da09ab0d8506/${lat},${lng}`;

    console.log(`Address: ${response.data.results[0].providedLocation.location}`);
    axios.get(weatherStr).then((response) => {
        let temperature = response.data.currently.temperature;
        let apparentTemp = response.data.currently.apparentTemperature;
        console.log(`It is currently ${temperature}. It feels like ${apparentTemp}`);
    });
}).catch((error) => {
    if (error.code === 'ENOTFOUND') {
        console.log('Unable to connect to the API servers');
    } else {
        console.log(error);
    }

});