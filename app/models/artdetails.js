// app/models/artdetails.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var artdetailsSchema   = new Schema({
    Image: String,
    Class1: String,
    Class2: String,
    Class3: String,
    Artist: String,
    Title: String
});

module.exports = mongoose.model('artdetails', artdetailsSchema);
