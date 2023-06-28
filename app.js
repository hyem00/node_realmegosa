const express = require("express");
const cookieParser = require("cookie-parser");
const usersRouter = require("./routes/user.js");
const postRouter = require("./routes/post.js");
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use("/api", [usersRouter, postRouter]);

app.listen(PORT, () => {
  console.log(PORT, "포트 번호로 서버가 실행되었습니다.");
});
