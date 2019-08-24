var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// Add database information
const options = {
    connectTimeoutMS: 5000,
    useNewUrlParser: true
}

mongoose.connect('mongodb://localhost:27017/dream_trip', options,
    function(err) {
        if (err) console.log(err);
    }
);

var RecosModel = require("../model/reco");

RecosModel.findOne({ city: 'paris' }).exec(function(err, city) {
    if (!city) {
        var reco = new RecosModel({
            title: "Paris",
            picture: "https://images.unsplash.com/photo-1431274172761-fca41d930114?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            city: "paris",
        });
        reco.save(function(err, city) {
            if (err) console.log("unable to save!");
            else console.log(city);
        });
    }
});

RecosModel.findOne({ city: 'berlin' }).exec(function(err, city) {
    if (!city) {
        var reco = new RecosModel({
            title: "Berlin",
            picture: "https://images.unsplash.com/photo-1509136561942-7d8663edaaa2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            city: "berlin"
        });
        reco.save(function(err, city) {
            if (err) console.log("unable to save!");
            else console.log(city);
        });
    }
});

RecosModel.findOne({ city: 'san-fran' }).exec(function(err, city) {
    if (!city) {
        var reco = new RecosModel({
            title: "San Francisco",
            picture: "https://images.unsplash.com/photo-1445294812422-0bb9cb94c286?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
            city: "san-fran"
        });
        reco.save(function(err, city) {
            if (err) console.log("unable to save!");
            else console.log(city);
        });
    }
});

var DestsModel = require("../model/dest");

DestsModel.findOne({ city: 'sidney' }).exec(function(err, city) {
    if (!city) {
        var dest = new DestsModel({
            title: "Sidney",
            picture: "https://images.unsplash.com/photo-1548565495-a692bd1c1d1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=882&q=80",
            city: "sidney"
        });
        dest.save(function(err, city) {
            if (err) console.log("unable to save!");
            else console.log(city);
        });
    }
});

DestsModel.findOne({ city: 'la' }).exec(function(err, city) {
    if (!city) {
        var dest = new DestsModel({
            title: "LA",
            picture: "https://images.unsplash.com/photo-1503891450247-ee5f8ec46dc3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2000&q=80",
            city: "la"
        });
        dest.save(function(err, city) {
            if (err) console.log("unable to save!");
            else console.log(city);
        });
    }
});

router.get('/', function(req, res) {
    console.log("I'm being called.");
});

module.exports = router;