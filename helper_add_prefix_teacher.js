const model = require('./models');

function addPrefix(str){
    return 'Mr. / Mrs. ' + str
}

module.exports = addPrefix;