const express    = require("express"),
      app        = express(),
      cors       = require("cors"),
      bodyParser = require("body-parser"),
      PORT = process.env.PORT || 8081;

const flckrApiKey = "00ac5f70d662304b87e7da585bbdef9d";
const flckrApiSecret = "aff70630a261a66a";
const flickrSdk = require('flickr-sdk');
const flickrClient = new flickrSdk(process.env.FLICKR_API_KEY || flckrApiKey);

app.use(cors());
app.use(bodyParser.json());

app.get("/api/photos", async function(req, res) {
    try {
        const results = await flickrClient.photos.getRecent({
            page: req.query.page,
            per_page: req.query.perpage
        })

        let { page, pages, perpage, total, photo } = results.body.photos;
        let allPhotos = photo

        let photos = [];

        let requests = allPhotos.map(image => {
            return new Promise((resolve, reject) => {
                let singleImage = flickrClient.photos.getInfo({
                    photo_id: image.id,
                    safety_level: 1
                })
                .then(function (res) {
                    resolve(res.body.photo);
                }).catch(function (err) {
                    console.error('bonk', err);
                    reject(err);
                });
            })
         })
         Promise.all(requests).then((photo) => { 
            photo.forEach(res => {
            if (res)
                photos.push({
                    id: res.id,
                    safety_level: res.safety_level,
                    visibility: res.visibility,
                    title: res.title._content ? res.title._content : "Untitled",
                    urls: res.urls,
                    description: res.description,
                    secret: res.secret,
                    server: res.server,
                    farm: res.farm
                });
            })
         })
         .then(() => {
             console.log("photos-length")
             console.log(photos.length);
            return res.status(200).json({
                page, pages, perpage, total, photos
            });
         })
         .catch(err => console.log(err.error))
        
    } catch(error) {
        error.message = "Not found";
        error.status = 404;
        return res.status(400).json({message: error.message, status: error.status});
    }
});

app.get('/api/photos/:photo_id', async function(req, res) {
    try {
        const results = await flickrClient.photos.getInfo({
            photo_id: req.params.photo_id
        });

        return res.status(200).json(results);
    } catch(error) {
        error.message = "Not found";
        error.status = 404;
        return res.status(400).json({message: error.message, status: error.status});
    }
})

app.post("/api/photos/search", async function(req, res, next) {
    try {
        const results = await flickrClient.photos.search({
            text: req.body.keyword
        });
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