var mongoose = require('mongoose');

// alias to Schema.
var Schema = mongoose.Schema;

var basketSchema = new Schema({
    "trip_start": String,
    "trip_end": String,
    "flat_id": { type: Schema.Types.ObjectId, ref: 'flats' },
});

module.exports = mongoose.model("basketItems", basketSchema);