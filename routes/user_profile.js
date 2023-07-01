const express = require("express");
const router = express.Router();
const { Users_profiles } = require("../models");

// GET /api/user_profile
router.get("/", async (req, res) => {
  try {
    const profiles = await Users_profiles.findAll();
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
