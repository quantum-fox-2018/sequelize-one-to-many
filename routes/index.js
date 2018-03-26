const routes = require('express').Router()

const teacher = require('./teacher')

routes.get('/', (req, res) => {
    res.render('home')
})

routes.get('/home', (req, res) => {
    res.render('home')
})

routes.use('/teacher', teacher)

module.exports = routes