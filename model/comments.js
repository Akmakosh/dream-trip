var mongoose = require('mongoose');

// alias to Schema.
var Schema = mongoose.Schema;

var commentsSchema = new Schema({
    "comBody": String,
    "email": String,
    "flat_id": { type: Schema.Types.ObjectId, ref: 'flats' },
});

module.exports = mongoose.model("comments", commentsSchema);