const express = require('express')
const app = express()
const port = 4000
const bodyParser = require('body-parser')

const index = require('./routes')

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

app.set('view engine', 'ejs');

app.listen(port, log => {
    console.log(`Apps is running on port "${port}"`)
})

app.use('/', index)