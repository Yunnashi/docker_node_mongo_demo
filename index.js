const express = require("express");
const mongoose = require("mongoose");
const PORT = 3000;

const app = express();
const path = require("path");
const methodOverride = require("method-override");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// // 今回はDEMOのため、初期データをここで宣言する
// let comments = [
//   {
//     id: uuid(),
//     username: "Tarou",
//     comment: "Happy Day!!!!!!",
//   },
//   {
//     id: uuid(),
//     username: "Yuki",
//     comment: "I like chicken.",
//   },
//   {
//     id: uuid(),
//     username: "Risa",
//     comment: "hooooooooooo!!",
//   },
//   {
//     id: uuid(),
//     username: "cat",
//     comment: "MeowMeow",
//   },
// ];

// Connect to MongoDB
mongoose
  .connect("mongodb://mongo:27017/docker-node-mongo", {
    useNewUrlParser: true,
    userUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

//const Item = require("./models/Item");

//create Schema
const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  score: Number,
  rating: String,
});

//create model ※modelのMovieというクラスが出来上がる
const Movie = mongoose.model("Movie", movieSchema);

//modelのインスタンス化
const amadeus = new Movie({
  title: "Amadeus",
  year: 1986,
  score: 9.2,
  rating: "R",
});

console.log("amadeus→→", amadeus);
amadeus.save();

// app.get("/", (req, res) => {
//   Item.find()
//     .then((items) => res.render("index", { items }))
//     .catch((err) => res.status(404).json({ msg: "No items found" }));
// });

// app.post("/item/add", (req, res) => {
//   const newItem = new Item({
//     name: req.body.name,
//   });

//   newItem.save().then((item) => res.redirect("/"));
// });

// app.get("/comments", (req, res) => {
//   res.render("comments/index", { comments });
// });

// app.get("/comments/new", (req, res) => {
//   res.render("comments/new");
// });

// app.post("/comments", (req, res) => {
//   const { username, comment } = req.body;
//   comments.push({ username, comment, id: uuid() });
//   res.redirect("/comments");
// });

// app.get("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   const comment = comments.find((c) => c.id === id);
//   res.render("comments/show", { comment });
// });

// app.get("/comments/:id/edit", (req, res) => {
//   const { id } = req.params;
//   const comment = comments.find((c) => c.id === id);
//   res.render("comments/edit", { comment });
// });

// app.patch("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   const newCommentText = req.body.comment;
//   const foundComment = comments.find((c) => c.id === id);
//   foundComment.comment = newCommentText;
//   res.redirect("/comments");
// });

// app.delete("/comments/:id", (req, res) => {
//   const { id } = req.params;
//   comments = comments.filter((c) => c.id !== id);
//   res.redirect("/comments");
// });

app.get("*", (req, res) => {
  res.send("404 Not found!");
});

app.listen(PORT, () => {
  console.log(`リクエストをポート${PORT}で待機中...`);
});
