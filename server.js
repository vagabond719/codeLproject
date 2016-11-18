// server.js

// BASE SETUP
// =============================================================================
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/gallery');

var Gallery = require('./app/models/gallery');
var Classes = require('./app/models/classes');
var ArtDetails = require('./app/models/artdetails');

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// on routes that end in /artists
// ----------------------------------------------------
router.route('/artists')

// create a artist (accessed at POST http://localhost:8080/api/artists)
.post(function (req, res) {

    var artist = new Gallery(); // create a new instance of the Gallery model
    artist.Name = req.body.Name; // set the artists Name (comes from the request)

    // save the artist and check for errors
    artist.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Artist created!'
        });
    });

})

// get all the artists (accessed at GET http://localhost:8080/api/artists)
.get(function (req, res) {
    Gallery.find(function (err, artists) {
        if (err)
            res.send(err);

        res.json(artists);
    });
})

// on routes that end in /artists
// ----------------------------------------------------
router.route('/art')

// create an art (accessed at POST http://localhost:8080/api/art)
.post(function (req, res) {

    var artdetails = new ArtDetails(); // create a new instance of the ArtDetails model
    artdetails.Title = req.body.Title;
    artdetails.Artist = req.body.Artist;
    artdetails.Class1 = req.body.Class1;
    artdetails.Class2 = req.body.Class2;
    artdetails.Class3 = req.body.Class3;
    artdetails.Image = req.body.Image;
    console.log(artdetails.Title)
        // save the art and check for errors
    artdetails.save(function (err) {
        if (err)
            res.send(err);

        res.json({
            message: 'Art created!'
        });
    });

});


// Find art based on search criteria
// ----------------------------------------------------
router.route('/art/:cls1/:cls2/:cls3/:skp/')
    .get(function (req, res) {
        var searchString = {};
        if (req.params.cls1 !== "null") {
            searchString.Class1 = req.params.cls1
        }
        if (req.params.cls2 !== "null") {
            searchString.Class2 = req.params.cls2
        }
        if (req.params.cls3 !== "null") {
            searchString.Class3 = req.params.cls3
        }

        ArtDetails.find(searchString, "", {
            skip: req.params.skp,
            limit: 16
        }, function (err, art) {
            if (err)
                res.send(err);
            res.json(art);
        });
    });

// Find distinct classes based on search criteria and available art
// ----------------------------------------------------
router.route('/art2/:cls1/:cls2/:cls3/:dist')
    .get(function (req, res) {
        var searchString = {};
        var distString = {};
        if (req.params.cls1 !== "null") {
            searchString.Class1 = req.params.cls1;
        }
        if (req.params.cls2 !== "null") {
            searchString.Class2 = req.params.cls2;
        }
        if (req.params.cls3 !== "null") {
            searchString.Class3 = req.params.cls3;
        }
        if (req.params.dist === "Class 1") {
            distString = {
                Class1: 1
            }
        } else if (req.params.dist === "Class 2") {
            distString = {
                Class2: 1
            }
        } else if (req.params.dist === "Class 3") {
            distString = {
                Class3: 1
            }
        }

        console.log(searchString);

        ArtDetails.distinct(req.params.dist.replace(" ", ""), {
            $and: [searchString]
        }, function (err, classes) {
            if (err)
                res.send(err);
            res.json(classes);
        }).sort(distString)
    });


// Find distinct classes based on search criteria and all classes
// ----------------------------------------------------
router.route('/class/:cls1/:cls2/:cls3/:dist')
    .get(function (req, res) {
        var searchString = {};
        var distString = {};
        if (req.params.cls1 !== "null") {
            searchString.Class1 = req.params.cls1;
        }
        if (req.params.cls2 !== "null") {
            searchString.Class2 = req.params.cls2;
        }
        if (req.params.cls3 !== "null") {
            searchString.Class3 = req.params.cls3;
        }
        if (req.params.dist === "Class 1") {
            distString = {
                Class1: 1
            }
        } else if (req.params.dist === "Class 2") {
            distString = {
                Class2: 1
            }
        } else if (req.params.dist === "Class 3") {
            distString = {
                Class3: 1
            }
        }

        Classes.distinct(req.params.dist.replace("%20", ""), {
            $and: [searchString]
        }, function (err, classes) {
            if (err)
                res.send(err);
            res.json(classes);
        }).sort(distString)
    });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);


// API path for uploading files and writing to art table
// ----------------------------------------------------
app.post('/upload', function (req, res) {

    // create an incoming form object
    var form = new formidable.IncomingForm();

    // specify that we want to allow the user to upload multiple files in a single request
    form.multiples = true;

    // store all uploads in the /uploads directory
    form.uploadDir = path.join(__dirname, '/public/Images');

    // every time a file has been uploaded successfully,
    // rename it to it's orignal name
    form.on('file', function (field, file) {
        fs.rename(file.path, path.join(form.uploadDir, file.name));
    });

    // log any errors that occur
    form.on('error', function (err) {
        console.log('An error has occured: \n' + err);
    });

    // once all the files have been uploaded, send a response to the client
    form.on('end', function () {
        res.end('success');
    });

    // parse the incoming request containing the form data
    form.parse(req);

});

// server static files
//app.use('/', express.static("public"));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public/Home.html'));
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);