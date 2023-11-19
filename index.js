const express = require("express");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const AppError = require("./AppError");
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

app.get("/todos", async (req, res, next) => {
  try {
    const { category } = req.query;
    if (category) {
      const todos = await Todo.find({ category });
      res.render("todos/index", { todos });
    } else {
      const todos = await Todo.find({});
      res.render("todos/index", { todos });
    }
  } catch (e) {
    next(e);
  }
});

app.get("/todos/new", (req, res) => {
  res.render("todos/new", { categories });
});

app.post("/todos", async (req, res, next) => {
  try {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    console.log(newTodo);
    res.redirect(`/todos/${newTodo._id}`);
  } catch (e) {
    next(e);
  }
});

app.get("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new AppError("ToDoが見つかりません", 404);
    }
    res.render("todos/show", { todo });
  } catch (e) {
    next(e);
  }
});

app.get("/todos/:id/edit", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
    if (!todo) {
      throw new AppError("ToDoが見つかりません", 404);
    }
    res.render("todos/edit", { todo, categories });
  } catch (e) {
    next(e);
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findByIdAndUpdate(id, req.body, {
      runValidators: true,
      new: true,
    });
    res.redirect(`/todos/${todo._id}`);
  } catch (e) {
    next(e);
  }
});

app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  await Todo.findByIdAndDelete(id);
  res.redirect("/todos");
});

app.get("*", (req, res) => {
  res.status(404).json({ msg: "404 Not found!" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "問題が発生しました" } = err;
  res.status(status).send(message);
});

app.listen(PORT, () => {
  console.log(`リクエストをポート${PORT}で待機中...`);
});
