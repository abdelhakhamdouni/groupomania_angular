require('dotenv').config()
const app = require('../app')
const http = require('http')
const port = process.env.PORT || 8000

app.set('port', port)

const server = http.createServer(app)
server.listen(port, ()=>{
    console.log(port)
})


