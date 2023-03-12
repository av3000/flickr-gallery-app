# Flicrk API app

Built using [flickr API](https://www.flickr.com/services/api/) npm module [flickr-sdk](https://www.npmjs.com/package/flickr-sdk).

[Node.js](https://nodejs.org/en/) framework [Express.js](https://expressjs.com/) as a backend and vanilla JavaScript, HTML/5 CSS/3 for the front-end.
[Parcel](https://parceljs.org/) for code bundle.

# Installation pre-requisites

For running this project we need and npm installed on our machine. These are some tutorials to install node in different operating systems:

_Its important to install the latest version of Node_

- [Install Node and NPM on Windows](https://www.youtube.com/watch?v=8ODS6RM6x7g)
- [Install Node and NPM on Linux](https://www.youtube.com/watch?v=yUdHk-Dk_BY)
- [Install Node and NPM on Mac](https://www.youtube.com/watch?v=Imj8PgG3bZU)

# Setup

## Docker

Make sure you have [docker](https://docs.docker.com/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed on you machine.

```bash
# all you need is run to automatically build containers with needed libraries/modules and settings
docker-compose up --build
```

# depending on your setup you may need to use sudo

```bash
sudo docker-compose up
```

Thats it, the node api is visible at port 8081 - [http://localhost:8081](http://localhost:8081)
and the javascript app is visible at port 1234 - [http://localhost:1234](http://localhost:1234)

## Local environment

```bash
# download the repository
git clone https://github.com/av3000/flickr-gallery-app

# go to backend folder
cd flickr-gallery-app/backend

# install modules
npm install

# run watch server
nodemon

# go to the frontend folder
cd ../frontend

# install modules
npm install

# bundle js files with parcel library and run
npm start
```

Thats it, the application is open on port 1234 - [http://localhost:1234](http://localhost:1234)
