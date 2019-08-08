var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Dream Trips' });
});

/* GET Paris page. */
router.get('/paris', function(req, res, next) {
    console.log(res.render('paris', { title: 'Paris' }));

});

/* GET London page. */
router.get('/london', function(req, res, next) {
    console.log(res.render('london', { title: 'London' }));

});
/* GET Barca page. */
router.get('/barca', function(req, res, next) {
    console.log(res.render('barca', { title: 'Barcelona' }));

});

/* GET Berlin page. */
router.get('/berlin', function(req, res, next) {
    console.log(res.render('berlin', { title: 'Berlin' }));

});




module.exports = router;