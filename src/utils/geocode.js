const request = require('request')

const geocode = (address, callback) => {
    const geourl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoicnVwZW5kcmFiIiwiYSI6ImNrYzQ4dWtwbDA1angzMHBtOGxyNTZvNGMifQ.5IexIS91X7OdKoWnSYbZ_A&limit=1'
    request({url: geourl, json: true}, (error, response) => {
        if (error)
        {
            callback('Unable to connect to the geolocation service', undefined)
            return
        }
        const {body: {features}} = response
        if (! features || features.length == 0 )
        {
            callback('Please enter a valid location', undefined)
            return
        }
        const [{center: [longitude, latitude], place_name:location}, ...rest] = features
        /*
        center = features[0].center
        lon = center[0]
        lat = center[1]
        */
        // console.log(lat, lon, place_name)
        callback(undefined, {
            latitude,
            longitude,
            location
        })
    })
}

module.exports = geocode
