const db = require('./models')

db.Subject.findOne({where: {id:3}})
.then(subject => )
