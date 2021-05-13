const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()
const publicPath = path.join(__dirname, './public')
const viewsPath = path.join(__dirname, './resources/views')
const partialsPath = path.join(__dirname, './resources/partials')

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

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'jorge',
        errorMsg: 'This Page Not Found'
    })
})

app.listen(3000, ()=>{
    console.log('server is up on port 3000')
})