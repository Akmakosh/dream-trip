var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');

// Add database information
const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
}
mongoose.connect('mongodb://localhost:27017/dream_trip', options,
    function(err) {
        if (err) console.log(err);
    });

var RecosModel = require("../model/reco");
var DestsModel = require("../model/dest");
var CitiesModel = require("../model/cities");
var FlatsModel = require("../model/flat")
    /* POST recommendations. */
router.get('/reco-fetch', function(req, res) {
    CitiesModel.find(function(err, recos) {
        if (err) {
            console.log("Unable to retrieve recommendations!");
            res.sendStatus(500);
        } else {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(recos));
            console.log(recos);
        }
    }).limit(5);
});

/* POST destinations. */
router.get('/dest-fetch', function(req, res) {
    CitiesModel.find(function(err, dests) {
        if (err) {
            console.log("Unable to retrieve destiations!");
            res.sendStatus(500);
        } else {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(dests));
        }
    }).limit(18);
});


/* POST flats. */
router.get('/flats-fetch', function(req, res) {
    FlatsModel.find(function(err, flats) {
        if (err) {
            console.log("Unable to retrieve destiations!");
            res.sendStatus(500);
        } else {
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(flats));
        }
    }).limit(4);
});

module.exports = router;