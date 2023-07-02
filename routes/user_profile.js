const express = require("express");
const router = express.Router();
const { Users_profiles } = require("../models");
const { Users } = require("../models");
const { Posts } = require("../models");
const upload = require("../middlewares/upload-middleware");
const authMiddleware = require("../middlewares/auth-middleware");
// 사용자 조회
router.get("/myuser", authMiddleware, async (req, res) => {
  const { user_id } = res.locals.user;
  // 사용자 테이블과 사용자 정보 테이블에 있는 데이터를 가지고 와야함.
  const user = await Users_profiles.findOne({
    where: { user_id },
  });
  if (!user) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 유저가 없습니다.",
    });
  }
  return res.status(200).json(user);
});
// 내가 쓴 게시글 조회
router.get("/posts/myuser", authMiddleware, async (req, res) => {
  const { user_id } = res.locals.user;
  const userPosts = await Posts.findAll({
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    where: { user_id: user_id },
    attributes: [
      "post_id",
      "user_id",
      "title",
      "content",
      "category",
      "pimage_url",
      "createdAt",
      "updatedAt",
    ],
    order: [["updatedAt", "ASC"]],
  });
  if (!userPosts.length) {
    return res.status(404).json({
      errorMessage: "작성된 게시글이 없습니다.",
    });
  }
  return res.status(200).json(userPosts);
});
router.put("/myuser", authMiddleware, async (req, res) => {
  console.log(req);
  const { user_id } = res.locals.user;
  const { nickname, comment } = req.body;
  await Users_profiles.update(
    {
      nickname,
      comment,
    },
    { where: { user_id: user_id } }
  );
  await Users.update(
    {
      nickname,
      comment,
    },
    { where: { user_id: user_id } }
  );
  return res.status(200).json({
    success: true,
    message: "나의 정보가 수정되었습니다.",
  });
});
// DELETE /api/user_profile/:id
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Users_profiles.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "프로필을 찾을 수 없습니다." });
    }
    await profile.destroy();
    res.status(204).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
});
module.exports = router;
