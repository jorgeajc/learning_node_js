const request = require('request')
const {access_key} = require('./globlal-variables')
const geocode = (address, callback) => {
    var url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=' + address
    request({url:url}, (error, response) => {
        if(error) {
            callback('Not connect to weather service!')
        } else {
            const data = JSON.parse( response.body )
            if( data.error ){
                callback('Enable find location. Try another search!')
            } else {
                callback( data )
            }
        }
    })
}

module.exports = geocode 

