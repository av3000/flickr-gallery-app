const express    = require("express"),
      app        = express(),
      bodyParser = require("body-parser"),
      PORT = process.env.PORT || 8081;

const flckrApiKey = "00ac5f70d662304b87e7da585bbdef9d";
const flckrApiSecret = "aff70630a261a66a";
const flickrSdk = require('flickr-sdk');
const flickrClient = new flickrSdk(process.env.FLICKR_API_KEY || flckrApiKey);

app.use(bodyParser.json());

app.get("/api/photos", async function(req, res, next) {
    try {
        const results = await flickrClient.photos.getRecent()
        
        let { page, pages, perpage, total, photo } = results.body.photos;
        let photos = photo;

        return res.status(200).json({
            page, pages, perpage, total, photos
        });
    } catch(error) {
        error.message = "Not found";
        error.status = 404;
        return res.status(400).json({message: error.message, status: error.status});
    }
});

app.post("/api/photos/search", async function(req, res, next) {
    try {
        const results = await flickrClient.photos.search({
            text: req.body.keyword
        });
        console.log(results);
        let { page, pages, perpage, total, photo } = results.body.photos;
        let photos = photo;

        return res.status(200).json({
            page, pages, perpage, total, photos
        });
    } catch(error) {
        return next(error);
    }
});


app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
});