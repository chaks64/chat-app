const { sendMessage, getAllMessage } = require("../controllers/messageController");

const router = require("express").Router();

router.post('/sendMessage', sendMessage);
router.get('/getMessage', getAllMessage);

module.exports = router;