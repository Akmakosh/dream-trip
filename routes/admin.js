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

var CitiesModel = require("../model/cities");
var FlatsModel = require("../model/flat");

/* POST cities. */
router.get('/', function(req, res) {
    CitiesModel.find(function(err, cityfromMongo) {
        if (err) {
            console.log("Unable to retrieve recommendations!");
            res.sendStatus(500);
        } else {

            res.render('admin/list', {
                cities: JSON.stringify(cityfromMongo)
            });
        }
    });
});
router.get('/city/form', function(req, res) {
    res.render('admin/form', {});
});
router.get('/flat/form', function(req, res) {
    res.render('admin/flat/flatform', {});
});

router.post('/city/add', function(req, res) {
    CitiesModel.findOne({ city: req.body.city }).exec(function(err, city) {
        if (!city) {
            const newCity = new CitiesModel({
                title: req.body.title,
                pictureUrl: req.body.pictureUrl,
                city: req.body.city,
                description: req.body.description
            });
            newCity.save(function(err, city) {
                if (err) console.log("unable to save!");
                else console.log(city);
                res.json({
                    result: true
                });
            });
        } else {
            city.title = req.body.title;
            city.pictureUrl = req.body.pictureUrl;
            city.city = req.body.city;
            city.description = req.body.description;
            city.save(function(err, city) {
                if (err) console.log("unable to save!");
                else console.log(city);
                res.json({
                    result: true
                });
            });
        }
    });
});



router.post('/flat/add', function(req, res) {
    FlatsModel.findOne({ flat: req.body.flat }).exec(function(err, flat) {
        if (!flat) {
            const newFlat = new FlatsModel({
                title: req.body.title,
                picture1: req.body.picture1,
                picture2: req.body.picture2,
                picture3: req.body.picture3,
                picture4: req.body.picture4,
                city: req.body.city,
                description: req.body.description,
                price: req.body.price
            });
            newFlat.save(function(err, flat) {
                if (err) console.log("unable to save!");
                else console.log(flat);
                res.json({
                    result: true
                });
            });
        } else {
            flat.title = req.body.title;
            flat.picture1 = req.body.picture1;
            flat.picture2 = req.body.picture2;
            flat.picture3 = req.body.picture3;
            flat.picture4 = req.body.picture4;
            flat.city = req.body.city;
            flat.description = req.body.description;
            flat.price = req.body.price;
            flat.save(function(err, flat) {
                if (err) console.log("unable to save!");
                else console.log(flat);
                res.json({
                    result: true
                });
            });
        }
    });
});

module.exports = router;