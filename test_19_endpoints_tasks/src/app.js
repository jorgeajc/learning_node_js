const app = require('./config-app.js')

const port = process.env.PORT || 3000 

app.listen(port, ()=>{
    console.log('server is up on port ' + port)
})