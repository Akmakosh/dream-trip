var mongoose = require('mongoose');

// alias to Schema.
var Schema = mongoose.Schema;

var flatSchema = new Schema({
    "title": String,
    "picture1": String,
    "picture2": String,
    "picture3": String,
    "picture4": String,
    "city": String,
    "description": String,
    "price": Number,
});

module.exports = mongoose.model("flats", flatSchema);