if (process.env.NODE_ENV === "prod") {
    module.exports = require('./database-prod');
} else {
    module.exports = require('./database-dev');
}
