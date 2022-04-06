const express = require("express")
const ChatController = require("../controllers/chatController")


const router = express.Router()
const chatController = new ChatController()

router.get("/",chatController.getChatsView)
router.get("/create", chatController.createMessage)

module.exports = router