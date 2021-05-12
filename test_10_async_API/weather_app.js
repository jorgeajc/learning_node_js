const request = require('request')
const logMessage = require('../test_5_chalk/app.js')

// https://weatherstack.com/dashboard
const access_key = '4e4027884721853570aa035ddc9c1d7d'
var url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query='
const requestFunct = (query) => {
    url+=query
    return request({url:url}, (error, response) => {
        if(error) {
            logMessage.messageRedInverse('Not connect to weather service!')
            return error
        } else {
            const data = JSON.parse( response.body )
            if( data.error ){
                logMessage.messageRedInverse('Enable find location!')
                return data.error
            } else {
                console.log( data )
                return data
            }
        }
    })
}
requestFunct('nicoya')

