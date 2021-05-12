const request = require('request')


// https://weatherstack.com/dashboard
const url = 'http://api.weatherstack.com/current?access_key=4e4027884721853570aa035ddc9c1d7d&query=nicoya'
request({url:url}, (error, response) => {
    const data = JSON.parse( response.body )
    console.log( data )
})

