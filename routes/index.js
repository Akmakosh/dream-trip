var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var ObjectId = require('mongoose').Types.ObjectId;

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
var CommentsModel = require("../model/comments");
var BasketModel = require("../model/basket");


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


/* GET city(view) page. */
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



/* GET flat page. */
router.get('/flat/:id', function(req, res) {
    FlatsModel.findOne({ _id: req.params.id }).exec(function(err, flat) {
        if (flat) {
            CommentsModel.find({ flat_id: flat._id }).exec(function(err, commentsFromMongo) {
                if (err) {
                    console.log("Unable to retrieve flats!");
                    res.sendStatus(500);
                } else {
                    console.log(commentsFromMongo.length);
                    res.render('flat', {
                        title: flat.title,
                        picture1: flat.picture1,
                        picture2: flat.picture2,
                        picture3: flat.picture3,
                        picture4: flat.picture4,
                        city: flat.city,
                        description: flat.description,
                        price: flat.price,
                        flatId: flat._id,
                        comments: JSON.stringify(commentsFromMongo)
                    });
                }
            });

        } else {
            res.render('error', {
                message: "Flat not found",
            });
        }
    });
});


// *write to database*/
router.post('/basket/add', function(req, res) {
    const newBasket = new BasketModel({
        trip_start: req.body.trip_start,
        trip_end: req.body.trip_end,
        flat_id: req.body.flatid,

    });
    newBasket.save(function(err, basketItem) {
        res.setHeader("Content-Type", "application/json");
        if (err) {
            console.log("unable to save!");
            res.json({ result: false });
        } else {
            console.log(basketItem);
            res.json({ result: true });
        }
    });
});

/* GET basket page. */
router.get('/basket', function(req, res) {
    BasketModel.find(function(err, basketItemsfromMongo) {
        if (err) {
            console.log("Unable to retrieve basket!");
            res.sendStatus(500);
        } else {
            res.render('basket', {
                basketItems: JSON.stringify(basketItemsfromMongo),

            });
        }
    }).populate('flat_id');
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


// save comment to database
router.post('/comment/add', function(req, res) {
    const newComment = new CommentsModel({
        comBody: req.body.comBody,
        email: req.body.email,
        flat_id: req.body.flatId,

    });
    newComment.save(function(err, comment) {
        if (err) console.log("unable to save!");
        else console.log(comment);
        res.redirect('/flat/' + req.body.flatId);
    });
});

module.exports = router;