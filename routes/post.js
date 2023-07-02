const express = require("express");
const router = express.Router();
const { Users, Posts } = require("../models");
const upload = require("../middlewares/upload-middleware");
const authMiddleware = require("../middlewares/auth-middleware.js");
// 전체 게시글 조회
router.get("/posts", async (req, res) => {
  const allPosts = await Posts.findAll({
    attributes: [
      "post_id",
      "user_id",
      "title",
      "content",
      "category",
      "pimage_url",
      "nickname",
      "createdAt",
      "updatedAt",
    ],
    order: [["updatedAt", "ASC"]],
  });
  if (!allPosts.length) {
    return res.status(404).json({
      errorMessage: "작성된 게시글이 없습니다.",
    });
  } else {
    return res.status(200).json(allPosts);
  }
});
// 게시글 상세 조회
router.get("/posts/:post_id", async (req, res) => {
  const { post_id } = req.params;
  const post = await Posts.findOne({
    include: [
      {
        model: Users,
        attributes: ["nickname"],
      },
    ],
    where: { post_id: post_id },
  });
  if (!post) {
    return res.status(404).json({
      errorMessage: "해당 게시글을 찾을 수 없습니다..",
    });
  }
  return res.status(200).json(post);
});
// 게시글 작성
router.post(
  "/posts",
  authMiddleware,
  upload.single("image"),
  async (req, res) => {
    const { user_id } = res.locals.user;
    const imageUrl = req.file.location;
    const user = await Users.findOne({ where: { user_id: user_id } });
    const { title, content, category } = req.body;
    const post = await Posts.create({
      user_id: user.user_id,
      title,
      content,
      category,
      nickname: user.nickname,
      pimage_url: imageUrl,
    });
    return res.status(201).json(post);
  }
);
// 게시글 수정
router.put("/posts/:post_id", authMiddleware, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;
  const { title, content } = req.body;
  console.log();
  const post = await Posts.findOne({ where: { post_id: post_id } });
  if (!post) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 게시글을 찾을 수 없습니다.",
    });
  } else if (post.user_id !== user_id) {
    return res.status(401).json({
      success: false,
      message: "권한이 없습니다.",
    });
  }
  await Posts.update(
    {
      title: title,
      content: content,
    },
    {
      where: { post_id: post_id },
    }
  );
  return res.status(200).json({
    success: true,
    message: "해당 게시글이 수정되었습니다.",
  });
});
// 게시글 삭제
router.delete("/posts/:post_id", authMiddleware, async (req, res) => {
  const { post_id } = req.params;
  const { user_id } = res.locals.user;
  const post = await Posts.findOne({ where: { post_id: post_id } });
  if (!post) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 게시글을 찾을 수 없습니다.",
    });
  } else if (post.user_id !== user_id) {
    return res.status(401).json({ message: "권한이 없습니다." });
  }
  await Posts.destroy({ where: { post_id: post_id } });
  return res.status(200).json({
    success: true,
    message: "해당 게시글이 삭제되었습니다.",
  });
});
// 룰렛 게시글 조회
router.get("/post/:category", async (req, res) => {
  const { category } = req.params;
  const categoryPost = await Posts.findAll({
    where: { category: category },
    attributes: [
      "post_id",
      "user_id",
      "title",
      "content",
      "category",
      "createdAt",
      "updatedAt",
    ],
    order: [["updatedAt", "ASC"]],
  });
  if (!categoryPost.length) {
    return res.status(404).json({
      errorMessage: "작성된 게시글이 없습니다.",
    });
  } else {
    return res.status(200).json({
      success: true,
      posts: categoryPost,
    });
  }
});
router.get("/:post_id", authMiddleware, async (req, res) => {
  const { user_id } = res.locals.user;
  const { post_id } = req.params;
  const post = await Posts.findOne({ where: { post_id: post_id } });
  if (post.user_id !== user_id) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 권한이 없습니다",
    });
  }
  if (!user_id) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 권한이 없습니다",
    });
  }
});
module.exports = router;
