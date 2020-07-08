const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Set up handlebars engine and view location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Set up static directory to serve
app.use(express.static(publicDirectoryPath))

const author = 'Rupen Bandyopadhyay'

getWeather = (location, callback) => {
    geocode(location, (error, {latitude, longitude, location} = {}) => {
        if (error)
        {
            return callback({error})
        }
        // const {latitude, longitude, location} = response
        forecast(longitude, latitude, (error, forecastData) => {
            if (error)
            {
                return callback({error})
            }
            return callback({
                error: undefined,
                location,
                forecast: forecastData
            })
        })
    })
}

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        author
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        author
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        author,
        message: 'Use this guide to navigate this application and use it effectively'
    })
})

app.get('/weather', (req, res) => {
    if (! req.query.address)
    {
        return res.send({
            error: 'You must provide an address!'
        })
    }
    getWeather(req.query.address, ({error, forecast, location} = {}) => {
        if (error)
        {
            return res.send({error})
        }
        res.send({forecast, location, address: req.query.address})
    })
})

app.get('/products', (req, res) => {
    console.log(req.query)
    if (! req.query.search)
    {
        res.send({
            error: 'You must provide a search term!'
        })
        return
    }
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help article not found!',
        author
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!',
        author
    })
})

app.listen(port, () => {
    console.log('Server is up on port %d', port)
})
