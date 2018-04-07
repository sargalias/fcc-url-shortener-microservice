const express = require('express');
const path = require('path');
const validUrl = require('valid-url');
const mongoose = require('mongoose');
const {DATABASE_URI} = require('./config/database');
const UrlModel = require('./models/url');


// Mongoose / MongoDB
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));

const DOMAIN = 'http://localhost:8080/';


// Run Express
const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/api/new/:url(*)', (req, res) => {
    if (validUrl.isUri(req.params.url)) {
        UrlModel.findOne({originalUrl: req.params.url}, (err, data) => {
            if (err) {
                return res.send(err);
            }
            if (data !== null) {
                return res.json(parseUrlData(data));
            }
            UrlModel.create({originalUrl: req.params.url}, (err, data) => {
                if (err) {
                    return res.send(err);
                }
                return res.json(parseUrlData(data));
            });
        });
    } else {
        return res.json({error: "Wrong URL format. Please make sure you have a valid protocol and real site."});
    }
});



const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});


// Utility
function prependDomainUrl(url) {
    return DOMAIN + url;
}

function parseUrlData(data) {
    let shortenedUrl = prependDomainUrl(data.shortenedUrl);
    let originalUrl = data.originalUrl;
    return {shortenedUrl: shortenedUrl, originalUrl: originalUrl};
}