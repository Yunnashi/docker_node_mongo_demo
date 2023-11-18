const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const PORT = 3000;

const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", {
    useNewUrlParser: true,
    userUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const Todo = require("./models/todo");
const categories = ["なし", "低", "中", "高"];

app.get("/todos", async (req, res) => {
  const todos = await Todo.find().catch((e) =>
    res.status(404).json({ msg: "No items found" })
  );
  res.render("todos/index", { todos });
});

app.get("/todos/new", (req, res) => {
  res.render("todos/new", { categories });
});

app.post("/todos", async (req, res) => {
  const newTodo = new Todo(req.body);
  await newTodo.save();
  console.log(newTodo);
  res.redirect(`/todos/${newTodo._id}`);
});

app.get("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/show", { todo });
});

app.get("/todos/:id/edit", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findById(id);
  res.render("todos/edit", { todo, categories });
});

app.put("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const todo = await Todo.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect(`/todos/${todo._id}`);
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
});

app.get("*", (req, res) => {
  res.send("404 Not found!");
});

app.listen(PORT, () => {
  console.log(`リクエストをポート${PORT}で待機中...`);
});
