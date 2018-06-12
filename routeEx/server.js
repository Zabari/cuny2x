var express = require('express');
var app = express();
var pug = require('pug');
app.set('view engine', 'pug');


var data = {
  red:"Red is the color of blood and the red sun and fire and other things.",
  blue: "Blue is the color of the ocean and the sky.",
  green: "Green is the color of grass."
};

app.get('/', function (req, res) {
  res.render('index',{
    list:Object.keys(data)
  });
});
app.get('/:color', function (req, res) {
  if (!(req.params.color in data)){
    res.send("Sorry, this link is invalid!");
  }
  res.render('color',{
    colorname:req.params.color,
    colortext:data[req.params.color]
  });
});



var port = 3000;
app.listen(port);
console.log('listening on Port ' + port + '....');
