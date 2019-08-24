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
    });

var CitiesModel = require("../model/cities")
var FlatsModel = require("../model/flat");

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Travel' });
});


router.get('/help', function(req, res, next) {
    res.render('help', { title: 'Travel' });
});



// 1) get the name of the city
// 2) make a query to mongo and retrieve information about the city
// 3) create view.ejs and template html that will display the information
// 4) get the city information and pass it to the template.


/* GET city page. */
router.get('/city/:name', function(req, res) {
    CitiesModel.findOne({ city: req.params.name }).exec(function(err, city) {
        if (city) {
            FlatsModel.find({ city: city.city }).exec(function(err, flatsFromMongo) {
                if (err) {
                    console.log("Unable to retrieve flats!");
                    res.sendStatus(500);
                } else {

                    res.render('view', {
                        title: city.title,
                        description: city.description,
                        pictureUrl: city.pictureUrl,
                        city: city.city,
                        flats: JSON.stringify(flatsFromMongo)
                    });
                }
            });

        } else {
            res.render('error', {
                message: "City not found",
            });
        }
    });
});
//router.post('/city/add', function(req, res) {


/* GET flat page. */
router.get('/flat/:id', function(req, res) {
    FlatsModel.findOne({ _id: req.params.id }).exec(function(err, flat) {
        if (flat) {
            res.render('flat', {
                title: flat.title,
                picture1: flat.picture1,
                picture2: flat.picture2,
                picture3: flat.picture3,
                picture4: flat.picture4,
                city: flat.city,
                description: flat.description,
                price: flat.price
            });
        } else {
            res.render('error', {
                message: "Flat not found",
            });
        }
    });
});



/* GET search page. */
router.get('/search', function(req, res) {
    var token = req.query.token;
    CitiesModel.find({ $text: { $search: token } }).exec(function(err, cityfromMongo) {
        if (err) console.log("unable to find results");
        res.render('search', {
            cities: JSON.stringify(cityfromMongo),
            query: token
        });
    });
});


module.exports = router;