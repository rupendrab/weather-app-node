const request = require('request')
const sprintf = require('sprintf-js').sprintf,
    vsprintf = require('sprintf-js').vsprintf

const forecast = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/forecast?access_key=7ff8ab4bc21e9de16bbada4ca1821fd3&query=' 
        + lat + ',' + lon + '&units=f'
    
    request({url, json: true}, (error, {body}) => {
        if (error)
        {
            callback('Unable to connect to weather service', undefined)
            return
        }
        if (body.error)
        {
            callback(body.error.info, undefined)
            return
        }
        const {current: {temperature, feelslike, humidity, weather_descriptions: [description, ...rest]}, location: {name:locationName, region, country}} = body
        /*
        current = response.body.current
        location = response.body.location
        */
        callback(undefined, 
            vsprintf('%s, %s, %s is currently %s. It is currently %d degrees out, It feels like %d degrees out. Humidity is %d%%.', 
                    [
                        locationName,
                        region,
                        country,
                        description,
                        temperature,
                        feelslike,
                        humidity
                    ])
                )
    })
}

module.exports = forecast
