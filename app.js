const express = require('express');
const path = require('path');
const validUrl = require('valid-url');
const UrlModel = require('./models/url');


// Run Express
const app = express();

// Public directory
app.use(express.static(path.join(__dirname, 'public')));




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