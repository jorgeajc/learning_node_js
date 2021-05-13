const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../resources/views')
const partialsPath = path.join(__dirname, '../resources/partials')

const port = process.env.PORT || 3000

// setup handlersbars engine ande vies location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup statis directoy to server
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Jorge'
    })
})
app.get('/weather', (req, res) => {
    if( !req.query.address ) {
        res.send({
            errorMsg: 'You must provide an address',
        })
    }
    geocode(req.query.address, ({location}={})=>{
        if(location) {
            forecast(location.lat, location.lon, (forecastData) => {
                res.send({
                    location: forecastData
                })
            })
        }
    }) 
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Jorge'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'help',
        helpText: 'This is some helpful text.',
        name: 'Jorge'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'jorge',
        errorMsg: 'This Article Not Found'
    })
})
app.get('/products', (req, res) => {
    if( !req.query.search ){
        res.render('products',{
            title: 'Products',
            name: 'Jorge',
            errorMsg: 'You must provide a search term'
        })
    }
    res.render('products',{
        title: 'Products',
        name: 'Jorge',
        products: []
    })
})
app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'jorge',
        errorMsg: 'This Page Not Found'
    })
})
app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})