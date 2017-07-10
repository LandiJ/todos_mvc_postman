const fs = require("fs");
const path = require("path");
const bodyParser = require("body-parser");
const express = require("express");
const models = require("./models");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/static", express.static("static"));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/static/index.html");
});

// put routes here

app.get("/todos", function(req, res) {
  models.Todo.findAll().then(function(foundTodos) {
    res.send(foundTodos);
  });
});

app.get("/todos/:id", function(req, res) {
  models.Todo.find({ where: { id: req.params.id } }).then(function(foundTodo) {
    res.send(foundTodo);
  });
});

app.put("/todos/:id", function(req, res) {
  models.Todo
    .update(req.body, { where: { id: req.params.id } })
    .then(function(updatedTodo) {
      res.send(updatedTodo);
    });
});

app.delete("/todos/:id", function(req, res) {
  models.Todo
    .destroy({ where: { id: req.params.id } })
    .then(function(DeletedTodo) {
      res.send("Todo has been deleted");
    });
});

app.patch("/todos/:id", function(req, res) {
  models.Todo
    .update({ completed: req.body.completed }, { where: { id: req.params.id } })
    .then(function(updatedTodo) {
      res.send(updatedTodo);
    });
});

app.post("/todos", function(req, res) {
  var newTodo = models.Todo.build(req.body);
  newTodo.save().then(function(savedTodo) {
    res.send(savedTodo);
  });
});

app.listen(3000, function() {
  console.log("Express running on http://localhost:3000/.");
});
