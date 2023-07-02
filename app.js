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

// home 페이지
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/templates/home.html");
});

// main 페이지
app.get("/main", (req, res) => {
  res.sendFile(__dirname + "/public/templates/main.html");
});

// 글 작성
app.get("/post", (req, res) => {
  res.sendFile(__dirname + "/public/templates/post.html");
});

// 로그인
app.get("/user", (req, res) => {
  res.sendFile(__dirname + "/public/templates/user.html");
});

// 해당 게시글 조회
app.get("/posts", (req, res) => {
  res.sendFile(__dirname + "/public/templates/detailpost.html");
});

// 수정 페이지
app.get("/posts/update", (req, res) => {
  res.sendFile(__dirname + "/public/templates/update.html");
});

// 마이페이지;
app.get("/mypage", (req, res) => {
  res.sendFile(__dirname + "/public/templates/mypage.html");
});

// 홈쿡 카테고리 조회
app.get("/category", (req, res) => {
  res.sendFile(__dirname + "/public/templates/category.html");
});

// 맛집 카테고리 조회
// app.get("/category/matjib", (req, res) => {
//   res.sendFile(__dirname + "/public/templates/category.html");
// });

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
