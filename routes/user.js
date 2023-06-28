const express = require("express");
const router = express.Router();
const { Users } = require("../models");
const jwt = require("jsonwebtoken");

// 회원 가입
router.post("/users", async (req, res) => {
    const { login_id, login_password, confirm } = req.body;
    const searchStr = /[^a-zA-Z0-9]/;
  
    try {
      if (
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
      
      const existsUsers = await Users.findOne({ where: { login_id : login_id } });
      if (existsUsers) {
        res.status(400).json({
          errorMessage: "이미 존재하는 닉네임입니다.",
        });
        return;
      }
      
      const user = await Users.create({ login_id, login_password });
      if (!user) {
        res.status(401).json({Message: "create false"});
      }
  
      res.status(201).json({ message: "회원가입이 완료되었습니다." });
    } catch (error) {
      res.status(400).json({ errorMessage: "회원가입이 실패하였습니다." });
      console.log(error);
    }
  });
module.exports = router;