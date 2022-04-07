const express = require("express")
const ChatController = require("../controllers/chatController")
const { verifySession, verifyAdmin } = require("../middleware/verifySession")


const router = express.Router()
const chatController = new ChatController()

router.get("/",chatController.getChatsView)
router.get("/create", chatController.createMessage)
router.get("/conversations", chatController.getConversationsView)

module.exports = router