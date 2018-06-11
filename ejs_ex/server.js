var express = require('express');
var app = express();
var ejs = require('ejs');
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

// respond with "hello world" when a GET request is made to the homepage
//console.log(data);
app.get('/', function (req, res) {
  res.render('pages/index',{
    g1:data.groceries[0],
    g2:data.groceries[1]
  });
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
