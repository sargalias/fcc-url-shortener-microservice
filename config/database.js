const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
let DATABASE_URI;


if (process.env.NODE_ENV === "prod") {
    DATABASE_URI = require('./database-prod').DATABASE_URI;
} else {
    DATABASE_URI = require('./database-dev').DATABASE_URI;
}


// Mongoose / MongoDB
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
autoIncrement.initialize(db);


module.exports = {
    mongoose: mongoose,
    db: db,
    autoIncrement: autoIncrement
};
