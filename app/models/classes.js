// app/models/classes.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var classSchema   = new Schema({
    Class1: String,
    Class2: String,
    Class3: String
});

module.exports = mongoose.model('classes', classSchema);