const request = require('request')
const access_key = '4e4027884721853570aa035ddc9c1d7d'
const forecast = (lat, long, callback) => setTimeout(()=>{
    var url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + lat + ',' + long
    request({url:url}, (error, response) => {
        if(error) {
            callback({error: 'Not connect to weather service!'})
        } else {
            const data = JSON.parse( response.body )
            if( data.error ){
                callback({error: 'Enable find location!'})
            } else {
                callback( data )
            }
        }
    })
})
module.exports = forecast