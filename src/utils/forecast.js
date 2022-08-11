const request = require('request');


const forecast = (latitude, longitude, callback) => {
    const forecastURL = `http://api.weatherstack.com/current?access_key=05bcf4cee06fb09b48bf2b74e9d9b592&query=${longitude},${latitude}&units=m`;


    request({
        url: forecastURL,
        json: true
    }, (error, {body} ) => {

        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out ')
        }
    })

}





module.exports = forecast;