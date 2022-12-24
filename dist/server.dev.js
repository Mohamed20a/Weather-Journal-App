"use strict";

var projectData = {}; // Require Express to run server and routes

var express = require('express'); // Start up an instance of app


var app = express();
/* Dependencies */

var bodyParser = require('body-parser');

var cors = require('cors');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.


app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json()); // Cors for cross origin allowance

app.use(cors()); // Initialize the main project folder

app.use(express["static"]('website')); // Setup Server

var port = 3030;
var server = app.listen(port, listening);

function listening() {
  console.log("Server is running on port ".concat(port));
} // GET route


app.get('/retrieve', getData);

function getData(request, response) {
  response.send(projectData);
} // POST route


app.post('/add', postData);

function postData(request, response) {
  projectData = request.body;
  response.send({
    message: "Post received"
  });
  console.log(projectData);
}
//# sourceMappingURL=server.dev.js.map
