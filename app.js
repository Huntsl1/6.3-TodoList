const express = require('express');
const models = require("./models");
const mustacheExpress = require('mustache-express');
const bodyParser = require('body-parser');

const app = express();
const urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.engine('mustache', mustacheExpress());
app.set('view engine', 'mustache');
app.set('views','./views');


app.get('/', function(req,res){
  models.Todo.findAll().then(function(todos){
    res.render('index', {todos:todos});
});
});


app.post('/new', urlencodedParser,function(req, res){
  console.log(JSON.stringify(req.body));
  let newItem = req.body.addnew;
  let assignee = req.body.assignee;

models.Todo.create(
  {
    item: newItem, assignee: assignee
  }).then(function(){
  models.Todo.findAll().then(function(todos){
    res.render('index', {todos:todos})
  });
});
});


app.post('/done', urlencodedParser, function(req, res){
  let comleteId = req.body.id;


models.Todo.update(
  {completed: new Date()},
  {where: {id: comleteId}})
  .then(function(){
    models.Todo.findAll().then(function(todos){
      res.render('index', {todos:todos})
    });
  })
  });




app.listen(3000, function(){
  console.log("Listening...");
});
