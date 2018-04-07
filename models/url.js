const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');


const urlSchema = new mongoose.Schema({
    originalUrl: {type: String, required: true},
});

// urlSchema.plugin(autoIncrement.plugin, {
//     model: 'URL',
//     field: 'shortened',
//     startAt: 101
// });

const UrlModel = mongoose.model('URL', urlSchema);

module.exports = UrlModel;
