const db = require("../models/index")

class ChatController{
    async getChatsView(req,res){
        const chats = await db.User.findAll({
            include: {
                model: db.User,
                as: 'sender'
              }
        })
        
        // console.log(chats);
        return res.json(chats)
    }

    async createMessage(req, res){
        const message = await db.Message.create({
            idSender: 1,
            idReceiver: 2,
            message: "Hola",
            fecha: new Date(),
            read: false
        })
        return res.json(message)
    }
}
module.exports = ChatController