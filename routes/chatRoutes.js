const express = require("express")
const ChatController = require("../controllers/chatController")
const { verifySession, verifyAdmin } = require("../middleware/verifySession")


const router = express.Router()
const chatController = new ChatController()

router.get("/",chatController.getChatsView)
router.get("/create", chatController.createMessage)
router.get("/conversations", chatController.getConversationsView)
router.get("/conversation/:id", chatController.getConversationView)
router.get("/newMessages/:id", chatController.getNewMessagesView)
router.post("/send", chatController.sendMessage)

module.exports = router