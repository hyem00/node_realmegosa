const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const { Users_profiles } = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// 회원 가입
router.post("/users", async (req, res) => {
  const { login_id, nickname, login_password, confirm } = req.body;
  const searchStr = /[^a-zA-Z0-9]/;
  try {
    if (
      // !login_id ||
      login_id.length < 2 ||
      login_id.length > 16 ||
      login_id.search(searchStr) != -1
    ) {
      res.status(400).json({
        errorMessage:
          "닉네임에는 2글자 이상 16글자 이하이며 특수문자는 불가능합니다.",
      });
      return;
    }
    if (login_password !== confirm) {
      res.status(400).json({
        errorMessage: "패스워드가 패스워드 확인란과 다릅니다.",
      });
      return;
    }

    const existsUsers = await Users.findOne({ where: { login_id: login_id } });
    if (existsUsers) {
      res.status(400).json({
        errorMessage: "이미 존재하는 아이디입니다.",
      });
      return;
    }

    const hashPassword = await bcrypt.hash(req.body.login_password, 5);
    const user = await Users.create({
      login_id,
      login_password: hashPassword,
      nickname,
    });
    if (!user) {
      res.status(401).json({ Message: "create false" });
    }
    if (user) {
      await Users_profiles.create({
        user_id: user.user_id,
        //image_url,
        nickname: user.nickname,
        //comment
      });
    }

    res.status(201).json({ message: "회원가입이 완료되었습니다." });
  } catch (error) {
    res.status(400).json({ errorMessage: "회원가입이 실패하였습니다." });
    console.log(error);
  }
});

// 로그인
router.post("/login", async (req, res) => {
  const { login_id, login_password } = req.body;
  const user = await Users.findOne({ where: { login_id } });
  // 1. 해당하는 사용자가 존재하는가
  // 2. 해당하는 사용자의 비밀번호가 존재하는가.
  if (!user) {
    return res.status(401).json({ message: "존재하지 않는 아이디입니다." });
  }
  const match = await bcrypt.compare(login_password, user.login_password);
  if (!match) {
    return res.status(401).json({ message: "비밀번호가 일치하지 않습니다." });
  }
  // jwt를 생성
  const token = jwt.sign(
    {
      user_id: user.user_id,
    },
    "customized_secret_key"
  );
  // 쿠키를 발급
  res.cookie("Authorization", `Bearer ${token}`);
  // response 할당
  return res.status(200).json({ token });
});

//로그아웃
router.get("/logout", (req, res) => {
  try {
    return res
      .clearCookie("Authorization")
      .json({ message: "로그아웃 성공하였습니다." });
  } catch (err) {
    return res.status(400).json({ errorMessage: "로그아웃 실패하였습니다." });
  }
});

// 사용자 조회
router.get("/users/:user_id", async (req, res) => {
  const { user_id } = req.params;

  // 사용자 테이블과 사용자 정보 테이블에 있는 데이터를 가지고 와야함.
  const user = await Users.findOne({
    attributes: ["user_id", "login_id"],
    include: [
      {
        model: Users_profiles, // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
        attributes: ["user_id", "image_url", "nickname", "comment"],
      },
    ],
    where: { user_id },
  });

  return res.status(200).json({ data: user });
});

module.exports = router;
