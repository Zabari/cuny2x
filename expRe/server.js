var express = require('express');
var app = express();
var Database = require('better-sqlite3');
var db = new Database('todo.db');
// var router = express.Router();
var pug = require('pug');
app.set('view engine', 'pug');



app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded({ extended: true })); // to support URL-encoded bodies



app.post('/api/save', function (req, res) {
  var todo=req.body.todo;
  var finished=req.body.finished;
  db.prepare("DROP TABLE IF EXISTS todo").run();
  db.prepare("CREATE TABLE IF NOT EXISTS todo(items BLOB, finished BLOB)").run();
  var stmt=db.prepare("INSERT INTO todo VALUES(?,?)")
  stmt.run(JSON.stringify(todo),JSON.stringify(finished));
  res.send();
});
app.post('/api/load', function (req, res) {
  // console.log(req.body);
  // db.prepare("DROP TABLE todo").run();
  var stmt = db.prepare("SELECT * FROM todo");
  var json=stmt.get();
  res.send(json);

});


var port = 3001;
app.listen(port);
console.log('listening on Port ' + port + '....');
