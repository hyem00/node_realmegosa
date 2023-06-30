const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js");
const cors = require("cors");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use("/api", [usersRouter, postRouter]);
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/templates/home.html");
});

app.get("/main.html", (req, res) => {
  res.sendFile(__dirname + "/public/templates/main.html");
});

app.get("/post.html", (req, res) => {
  res.sendFile(__dirname + "/public/templates/post.html");
});

app.get("/user.html", (req, res) => {
  res.sendFile(__dirname + "/public/templates/user.html");
});

// app.get("/detailpost.html", (req, res) => {
//   res.sendFile(__dirname + "/public/templates/detailpost.html");
// });

app.get("/detailpost/:post_id", (req, res) => {
  console.log("test");
  res.sendFile(__dirname + "/public/templates/detailpost.html");
});

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
