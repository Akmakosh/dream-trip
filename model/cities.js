var mongoose = require('mongoose');

// alias to Schema.
var Schema = mongoose.Schema;

var citySchema = new Schema({
    "title": String,
    "pictureUrl": String,
    "city": String,
    "description": String
});

citySchema.index({ title: 'text', description: 'text', city: 'text' });

module.exports = mongoose.model("cities", citySchema);