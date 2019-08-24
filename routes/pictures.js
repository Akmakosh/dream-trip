require('es6-promise').polyfill();
require('isomorphic-fetch');

var express = require('express');
var router = express.Router();

// require syntax
const Unsplash = require('unsplash-js').default;

const unsplashObj = new Unsplash({
    applicationId: "5f71f3342cea20fafb6469124ceebd9d2171b3269f88ec76476b60219e52b949",
    secret: "531bb314e6f77d991f1da5cd51bda3a3d161151ddae12fe471b01de98b5fb14d"
});

function toJson(res) {
    return typeof res.json === "function" ? res.json() : res;
}

router.get('/', function(req, res, next) {

    unsplashObj.collections.getCollection(8368440)
        .then(toJson)
        .then(json => {
            console.log(res.render("picture", {
                json: JSON.stringify(json.results),
                title: "here-we-go"
            }));
        });
});
module.exports = router;