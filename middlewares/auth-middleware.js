const jwt = require("jsonwebtoken");
const { Users } = require("../models");
//s3 이미지 업로드
// const upload = require('../modules/multer')

// Single Image 처리
// router.put('/post/modify', authUtil, upload.single('productImg'), exchangeController.modifyPost);

// 사용자 인증 미들웨어
module.exports = async (req, res, next) => {
  const { Authorization } = req.cookies;

  const [authType, authToken] = (Authorization ?? "").split(" ");

  if (!authToken || authType !== "Bearer") {
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능1입니다.",
    });
    return;
  }

  try {
    const { user_id } = jwt.verify(authToken, "customized_secret_key");
    const user = await Users.findOne({ where: { user_id: user_id } });
    res.locals.user = user;
    next();
  } catch (err) {
    console.error(err);
    res.status(401).send({
      errorMessage: "로그인 후 이용 가능한 기능2입니다.",
    });
  }
};
