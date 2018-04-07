const express = require('express');
const path = require('path');
const validUrl = require('valid-url');
const mongoose = require('mongoose');
const DATABASE_URI = require('./config/database').DATABASE_URI;
const autoIncrement = require('mongoose-auto-increment');

// Run Express
const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));


// Mongoose / MongoDB
mongoose.connect(DATABASE_URI);
const db = mongoose.connection;
mongoose.Promise = global.Promise;
db.on('error', console.error.bind(console, 'connection error:'));
autoIncrement.initialize(db);


// Model
const urlSchema = new mongoose.Schema({
    originalUrl: {type: String, required: true},
});

urlSchema.plugin(autoIncrement.plugin, {
    model: 'URL',
    field: 'shortened',
    startAt: 101
});

const UrlModel = mongoose.model('URL', urlSchema);



app.get('/', (req, res) => {
    res.send('Home page');
});

app.get('/api/new/:url(*)', (req, res) => {
    if (validUrl.isUri(req.params.url)) {
        UrlModel.create({
            originalUrl: req.params.url
        }, (err, data) => {
            if (err) {
                return res.send(err);
            }
            return res.send(data);
        });
    } else {
        res.json({error: "Wrong URL format. Please make sure you have a valid protocol and real site."});
    }
});


const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log('Server started on port ' + port);
});