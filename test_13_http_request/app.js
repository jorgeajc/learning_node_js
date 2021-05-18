const http = require('http')
const access_key = '4e4027884721853570aa035ddc9c1d7d'
var url = 'http://api.weatherstack.com/current?access_key=' + access_key + '&query=nicoya'

const request = http.request(url, (response)=>{
    let data = ''

    response.on('data', (chuck) => {
        data = data + chuck.toString()
    })

    response.on('end', () => {
        const body = JSON.parse(data)
        console.log(body)
    })
})

request.on('error', (error)=> {
    console.log('An error', error)
})

request.end()


