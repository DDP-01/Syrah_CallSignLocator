var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var path = require('path');
var childProcess = require('child_process');
var phantomjs = require('phantomjs');
var binPath = phantomjs.path;

var childArgs = [
  path.join(__dirname, '/phantomScript.js'),
  'http://status.aprs2.net'
];

childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
  //handle results;
  if (err) {
    console.log(err);
  }
  if (stderr) {
    console.log(stderr);
  }
  if (stdout) {
    console.log(stdout);
    //dealwith .html file of "status.apr2.net"
  }

});

var app = express();

app.use(bodyParser.json());
app.set('port', process.env.port || 3000);
app.listen(app.get('port'), function() {
  console.log('Server started on http://localhost:3000');
});

app.get('/', function(req, res) {
  console.log(req.url);
  res.type('text/html');
  res.sendFile(__dirname + '/public/homepage.html');
});

app.get('/public/*.*', function(req, res) {
  console.log(req.url);
  res.sendFile(__dirname + req.url);
});

app.post('/searchCallSign', function(req, res) {
  console.log(req.url);
  console.log(req.body);

  res.json({
    succ: true
  });

  http.get('http://status.aprs2.net', function(res) {
    console.log('shit received');
    console.log(res.statusCode);
    var body = "";
    res.on('data', function(data) {
      body += data;
      console.log(body);
    });
  }).on('error', function(err) {
    console.log(err);
  });

  //deal with body
  //Retrive links to T2 Servers
  //Enter T2 Servers to search

});

//error handler

app.use(function(req, res) {
  console.log(req.url);
  res.type('text/plain');
  res.status(404);
  res.send('4:04 sleep not found');
});

app.use(function(err, req, res, next) {
  console.log(req.url);
  res.type('text/plain');
  res.status(500);
  res.send('500-Server Error');
})
