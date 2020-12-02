const request = require('request')
const forecast = (lon, lat, callback) => {
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=be9cf4b5974aefa2bb1d4ba503cf76dd";
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to Connect weather  service", undefined)
        }
        else if (body.code === 400) {
            callback("cannot get longitutde and latitude", undefined)
        }
        else {

            callback(undefined, {
                city: body.name,
                temp: body.main.temp,
                pressure: body.main.pressure,
                country: body.sys.country,

                foreCastd: body.weather[0].description

            })
        }
    })
}

module.exports = forecast;