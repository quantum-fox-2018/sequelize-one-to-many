const express = require('express');
const app = express();
const ejs = require('ejs');
const routes = require('./routes');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false}));
app.set('view engine', 'ejs');
app.use('/', routes);

app.listen(3000, () => {
  console.log('Connected to port:3000...');
})
