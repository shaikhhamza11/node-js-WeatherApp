
const request = require('request')
const geoCode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoic2hhaWtoaGFtemEiLCJhIjoiY2todWViZXF4MWJ3YjJ4cGIwZjF6cmhkMyJ9.PKw7vK4vF-kage_yz_pxfQ';
    request({ url, json: true }, (error, { body } = {}) => {
        if (error) {
            callback("Unable to Connect weather  service", undefined)
        }

        else if (body.features.length === 0) {
            callback("cannot get longitutde and latitude", undefined)
        }
        else {

            callback(undefined, {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}


module.exports = geoCode;