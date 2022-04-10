const express = require("express")
const ChatController = require("../controllers/chatController")
const { verifySession, verifyAdmin } = require("../middleware/verifySession")


const router = express.Router()
const chatController = new ChatController()

router.get("/",chatController.getChatsView)
router.post("/", chatController.getUserSearchView)
router.get("/create", chatController.createMessage)
router.get("/my_chats", chatController.getMyChatsView)
router.get("/conversation/:id", chatController.getConversationView)
router.get("/newMessages/:id", chatController.getNewMessagesView)
router.post("/send", chatController.sendMessage)

module.exports = router