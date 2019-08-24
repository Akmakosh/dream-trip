var mongoose = require('mongoose');

// alias to Schema.
var Schema = mongoose.Schema;

var recosSchema = new Schema({
    "title": String,
    "picture": String,
    "city": String,
});

module.exports = mongoose.model("recommendations", recosSchema);