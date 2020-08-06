const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=cea2847ffb85532caefdb4d1dac1e075&query=' + latitude + ',' + longitude +'&units=f'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
         callback(undefined, body.current.weather_descriptions + ' It is currently ' + body.current.temperature + ' degress out. There is a ' + body.current.precip+ '% chance of rain.')
            // callback(undefined,  ' It is currently '+ response.body.current.weather_descriptions+ ' but actualyy it is '+response.body.current.precip)
        }
    })
}

module.exports = forecast