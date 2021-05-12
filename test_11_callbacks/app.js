
const request = require('request')
const logMessage = require('../test_5_chalk/app.js')
const access_key = '4e4027884721853570aa035ddc9c1d7d'
const geocode = (address, callback) => setTimeout(()=>{
    var url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + address
    request({url:url}, (error, response) => {
        if(error) {
            callback('Not connect to weather service!')
        } else {
            const data = JSON.parse( response.body )
            if( data.error ){
                callback('Enable find location!')
            } else {
                callback( data )
            }
        }
    })
})

const forecast = (lat, long, callback) => setTimeout(()=>{
    var url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + lat + ',' + long +'&units=f'
    request({url:url}, (error, response) => {
        if(error) {
            callback('Not connect to weather service!')
        } else {
            const data = JSON.parse( response.body )
            if( data.error ){
                callback('Enable find location!')
            } else {
                callback( data )
            }
        }
    })
})

geocode('nicoya', (data) => {
    console.log(data)
    if(data.location) {
        forecast(data.location.lat, data.location.lon, (forecastData) => {
            console.log(forecastData)
        })
    }
})


