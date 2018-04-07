const express = require('express');
const path = require('path');
const validUrl = require('valid-url');
const mongoose = require('mongoose');
const DATABASE_URI = require('./config/database').DATABASE_URI;

// Run Express
const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));


// Mongoose / MongoDB
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));


app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/api/new/:url(*)', (req, res) => {
    if (validUrl.isUri(req.params.url)) {
        console.log('valid uri');
        res.send('API home');
    } else {
        res.json({error: "Wrong URL format. Please make sure you have a valid protocol and real site."});
    }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});