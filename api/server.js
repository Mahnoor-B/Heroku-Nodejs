// call the packages we need
const express = require('express'); // call express
const bodyParser = require('body-parser'); // define our app using express
const fs = require('fs') //require file
const url = require('url');
const indexRoute = require('./route/indexRoute')
require('dotenv').config();

const port = process.env.PORT || 3030;     // set our port
const hostname = process.env.HOST;

const http = require('http');
// create express app
const app = express();

const server = http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  var q = url.parse(req.url, true);
  var filename = '.' + q.pathname;
  fs.readFile(filename, null, function (error, data) {
    if (error) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
    } else {
        res.write(data);
    }
    res.end(filename);
});
});


server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('public'))
// ROUTES FOR OUR API
// =============================================================================


app.use('/',indexRoute);

app.use(function(req, res) {
  res.status(404).send({url: req.originalUrl + ' not found'})
});

// REGISTER OUR ROUTES ----
//app.use('/api', router);


// START THE SERVER
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
