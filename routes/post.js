const express = require("express");
const router = express.Router();

const { Posts } = require("../models");

const authMiddleware = require("../middlewares/auth-middleware.js");

// 최신 게시글 조회
router.get("/posts", async (req, res) => {
  const allPosts = await Posts.findAll({
    attributes: [
      "post_id",
      "user_id",
      "title",
      "content",
      "category",
      "foodtype",
      //   "nickname",
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

  const post = await Posts.findOne({ where: { post_id: post_id } });

  if (!post) {
    return res.status(404).json({
      errorMessage: "해당 게시글을 찾을 수 없습니다..",
    });
  } else {
    const result = {
      post_id: post.post_id,
      title: post.title,
      content: post.content,
      category: post.category,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      //   nickname: post.nickname
    };

    return res.status(200).json(result);
  }
});

// 게시글 작성
router.post("/posts", async (req, res) => {
  // const { user_id } = res.locals.user;
  //   const user = await Users_profiles.findOne({ where: { user_id: user_id } });
  const { title, content, category, foodtype } = req.body;

  const post = await Posts.create({
    // user_id: user_id,
    title,
    content,
    category,
    foodtype,
    // nickname: user.nickname,
  });

  return res.status(201).json({ data: post });
});

// 게시글 수정
router.put("/posts/:post_id", async (req, res) => {
  const { post_id } = req.params;
  // const { user_id } = res.locals.user;
  //   const user = await Users_profiles.findOne({ where: { user_id: user_id } });
  const { title, content } = req.body;

  const post = await Posts.findOne({ where: { post_id: post_id } });

  if (!post) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 게시글을 찾을 수 없습니다.",
    });
  }
  // } else if (post.user_id !== user_id) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "권한이 없습니다.",
  //   });
  // }
  await Posts.update(
    {
      title: title,
      content: content,
      //   nickname: user.nickname,
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
router.delete("/posts/:post_id", async (req, res) => {
  const { post_id } = req.params;
  // const { user_id } = res.locals.user;

  const post = await Posts.findOne({ where: { post_id: post_id } });

  if (!post) {
    return res.status(404).json({
      success: false,
      errorMessage: "해당 게시글을 찾을 수 없습니다.",
    });
  }
  // } else if (post.user_id !== user_id) {
  //   return res.status(401).json({
  //     success: false,
  //     message: "권한이 없습니다.",
  //   });
  // }
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
      "foodtype",
      //   "nickname",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "DESC"]],
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

// 내가 쓴 게시글 조회
router.get("/posts/users/:user_id", async (req, res) => {
  const { user_id } = req.params;
  const user_idPost = await Posts.findAll({
    where: { user_id: user_id },
    attributes: [
      "post_id",
      "user_id",
      "title",
      "content",
      "category",
      "foodtype",
      //   "nickname",
      "createdAt",
      "updatedAt",
    ],
    order: [["createdAt", "DESC"]],
  });

  if (!user_idPost.length) {
    return res.status(404).json({
      errorMessage: "작성된 게시글이 없습니다.",
    });
  } else {
    return res.status(200).json({
      success: true,
      posts: categorypost,
    });
  }
});

// // foodtype 게시글 조회
// router.get("/post/:foodtype", async (req, res) => {
//   const { foodtype } = req.params;
//   const foodtypePost = await Posts.findAll({
//     where: { foodtype: foodtype },
//     attributes: [
//       "post_id",
//       "user_id",
//       "title",
//       "content",
//       "category",
//       "foodtype",
//       "nickname",
//       "createdAt",
//       "updatedAt",
//     ],
//     order: [["createdAt", "DESC"]],
//   });

//   if (!foodtypePost.length) {
//     return res.status(404).json({
//       errorMessage: "작성된 게시글이 없습니다.",
//     });
//   } else {
//     return res.status(200).json({
//       success: true,
//       posts: categoryPost,
//     });
//   }
// });

// // 내 정보 작성
// router.post("/users/Users_profiles", authMiddleware, async (req, res) => {
//   const { user_id } = res.locals.user;
//   const { nickname, comment, image_url } = req.body;

//   const user = await Users_profiles.create({
//     user_id: user_id,
//     nickname: nickname,
//     comment: comment,
//     image_url: image_url,
//   });

//   return res.status(201).json({ data: user });
// });

// // 내 정보 수정
// router.put("/user/Users_profiles/:profile_id", authMiddleware, async (req, res) => {
//   const { profile_id } = req.params;
//   const { user_id } = res.locals.user;
//   const { nickname, comment, image_url } = req.body;

//   const user = await Users_profiles.findOne({
//     where: { profile_id: profile_id },
//   });
//   console.log(user.user_id);
//   console.log(user_id);
//   if (user.user_id !== user_id) {
//     return res.status(401).json({
//       success: false,
//       message: "권한이 없습니다.",
//     });
//   } else if (user) {
//     await Users_profiles.update(
//       {
//         nickname: nickname,
//         comment: comment,
//         image_url: image_url,
//       },
//       {
//         where: { profile_id: profile_id },
//       }
//     );
//     return res.status(200).json({
//       success: true,
//       message: "정보가 수정되었습니다.",
//     });
//   }
// });

module.exports = router;
