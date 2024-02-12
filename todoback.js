const express = require("express");
const bodyparser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());

let todo = [];
app.use(bodyparser.json());

function todoFind(todoId) {
  for (var i = 0; i < todo.length; i++) {
    if (todo[i].todoId === todoId) return i;
  }
  return -1;
}

function deleteTodo(todoId) {
  let newTodos = [];
  for (var i = 0; i < todo.length; i++) {
    if (i !== todoId) newTodos.push(todo[i]);
  }
  return newTodos;
}

app.post("/todo", (req, res) => {
  const newTodo = {
    todoId: Math.floor(Math.random() * 1000),
    todoName: req.body.todoName,
    todoDescription: req.body.todoDescription,
  };
  todo.push(newTodo);
  console.log("Pushed Successfully");
  res.send("Pushed");
});

app.get("/todo", (req, res) => {
  res.send(todo);
});

app.get("/todo/:id", (req, res) => {
  //   console.log(req.query.id);
  //   res.send(req.query.id);
  //   console.log(req.params.id);
  const ind = todoFind(parseInt(req.params.id));
  if (ind === -1) res.send("The todo doesnot exist");
  else res.send(todo[ind]);
});

app.delete("/todo/:id", (req, res) => {
  const todoInd = todoFind(parseInt(req.params.id));
  if (todoInd === -1) res.status(404).send("The todo doesnot exist!");
  else {
    todo = deleteTodo(todoInd);
    res.status(200).send("Todo got deleted");
  }
});

app.listen(3001, () => {
  console.log("Listening on port 3000");
});
