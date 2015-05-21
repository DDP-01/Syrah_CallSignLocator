var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

var app=express();

app.use(bodyParser.json());
app.set('port',process.env.port || 3000);
app.listen(app.get('port'),function () {
  console.log('Server started on http://localhost:3000');
});

app.get('/',function (req,res) {
  console.log(req.url);
  res.type('text/html');
  res.sendFile(__dirname+'/public/homepage.html');
});

app.get('/public/*.*',function (req,res) {
  console.log(req.url);
  res.sendFile(__dirname+req.url);
});

app.post('/searchCallSign',function (req,res) {
  console.log(req.url);
  console.log(req.body);

  res.json({succ:true});

  http.get('http://status.aprs2.net',function (res) {
    console.log('shit received');
    console.log(res.statusCode);
    var data_all="";
    res.on('data',function (data) {
      data_all+=data;
      console.log(data_all);
    });
  }).on('error',function (err) {
    console.log(err);
  });

  //deal with data_all
  //Retrive links to T2 Servers
  //Enter T2 Servers to search

});

//error handler

app.use(function (req,res) {
  console.log(req.url);
  res.type('text/plain');
  res.status(404);
  res.send('4:04 sleep not found');
});

app.use(function (err,req,res,next) {
  console.log(req.url);
  res.type('text/plain');
  res.status(500);
  res.send('500-Server Error');
})
