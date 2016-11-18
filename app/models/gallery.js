// app/models/gallery.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var gallerySchema   = new Schema({
    Name: String,
    Image: String,
    Style: String
});

module.exports = mongoose.model('artists', gallerySchema);