const express = require("express");
const router = express.Router();
const { Users_profiles } = require("../models");
const { Users } = require("../models");
const upload = require("../middlewares/upload-middleware");
// GET /api/user_profile 사용자 조회
router.get("/users/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    // 사용자 테이블과 사용자 정보 테이블에 있는 데이터를 가지고 와야함.
    const user = await Users_profiles.findOne({
      attributes: ["user_id", "login_id"],
      include: [
        {
          model: Users_profiles, // 1:1 관계를 맺고있는 UserInfos 테이블을 조회합니다.
          attributes: ["pimage_url", "nickname", "comment"],
        },
      ],
      where: { user_id },
    });
    res.json(profiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// router.post("/users", upload.single("image"), async (req, res) => {
//   const imageUrl = req.file.location;
// });

// POST /api/user_profile
router.post("/user_profile", upload.single("image"), async (req, res) => {
  try {
    const { user_id, nickname, comment } = req.body;
    const imageUrl = req.file.location;
    const profile = await Users_profiles.create({
      user_id,
      image_url: imageUrl,
      nickname,
      comment,
    });
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
});

// PUT /api/user_profile/:id
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { image_url, nickname, comment } = req.body;

    const profile = await Users_profiles.findByPk(id);
    if (!profile) {
      return res.status(404).json({ message: "프로필을 찾을 수 없습니다." });
    }

    profile.image_url = image_url;
    profile.nickname = nickname;
    profile.comment = comment;
    await profile.save();

    res.json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "서버 오류" });
  }
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
