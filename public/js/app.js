console.log('Client side javascript file is loaded..')

fetch('http://puzzle.mead.io/puzzle').then((response) => {
    response.json().then((data) => {
        console.log(data)
    })
})

const fetchForecast = (address) => {
    url = '/weather?address=' + address
    fetch(url).then((response) => {
        response.json().then((ret) => {
            clearAll()
            if (ret.error)
            {
                messageElement.textContent = ret.error
                console.log("Error: " + ret.error)
                return
            }
            console.log("Forecast: " + ret.forecast)
            console.log("Location: " + ret.location)
            locationElement.textContent = ret.location
            forecast.textContent = ret.forecast
        })
    })
}

// fetchForecast('Boston')

const weatherForm = document.querySelector('form')
const searchElement = document.querySelector('input')

const messageElement = document.querySelector("#message")
const locationElement = document.querySelector("#location")
const forecastElement = document.querySelector("#forecast")

const clearAll = () => {
    messageElement.textContent = ''
    locationElement.textContent = ''
    forecastElement.textContent = ''
}

const beforeSearch = () => {
    clearAll()
    messageElement.textContent = "Loading forecast..."
}

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = searchElement.value
    beforeSearch()
    console.log('Weather Search Submitted for location: ' + location)
    fetchForecast(location)
})
