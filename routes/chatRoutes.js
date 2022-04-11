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
router.get("/perfil", chatController.getPerfilView)
router.get("/editUser/:id", chatController.getEditUserView)
router.post("/editUser/:id", chatController.editUser)
router.get("/deleteUser/:id", chatController.deleteUser)

module.exports = router