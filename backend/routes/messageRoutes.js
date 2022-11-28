const {
  sendMessage,
  getAllMessage,
} = require("../controllers/messageController");

const router = require("express").Router();

router.post("/sendMessage", sendMessage);
router.post("/getMessage", getAllMessage);

module.exports = router;
