var express = require('express');
var app = express();
var ejs = require('ejs');
const fs = require('fs');
app.set('view engine', 'ejs');


var data = {
    groceries: [{
    store: 'Acme',
    list: [
        'strawberries',
        'blueberries',
        'yogurt'
    ]
    }, {
    store: 'Corner Market',
    list: [
        'baguette',
        'basil',
        'tomatoes'
    ]
    }]
};
app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies

// respond with "hello world" when a GET request is made to the homepage
//console.log(data);
app.get('/', function (req, res) {
  res.render('pages/index');
});
app.post('/write', function (req, res) {
  let rawdata=fs.readFileSync("data.json");
  let newdata=[];
  if (rawdata){
    newdata=JSON.parse(rawdata);
  }
  newdata.push(req.body);
  fs.writeFileSync("data.json",JSON.stringify(newdata,null,2));
  res.send("Hey there "+ req.body.firstname+"!");
});
app.get('/view', function (req, res) {
  let rawdata = fs.readFileSync('data.json');
  res.send(JSON.parse(rawdata));
});
// app.get('/who{1,}a{1,}', function (req, res) {
//   res.send('I know right?');
// });
// app.get('/a(pp)?le', function (req, res) {
//   res.send('Apple or ale?');
// });
//
//
// app.get('/:name/:lastname', function(request,response){
//      console.log('got request');
//      response.send(`the name is ${request.params.lastname}, ${request.params.name} ${request.params.lastname}`);
// });


var port = 3000;
app.listen(port);
console.log('listening on Port ' + port + '....');
