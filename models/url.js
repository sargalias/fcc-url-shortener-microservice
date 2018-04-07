const mongoose = require('mongoose');
const shortid = require('shortid');


const urlSchema = new mongoose.Schema({
    originalUrl: {type: String, required: true, unique: true},
    shortenedUrl: {type: String, default: shortid.generate, unique: true}
});


const UrlModel = mongoose.model('URL', urlSchema);

module.exports = UrlModel;
