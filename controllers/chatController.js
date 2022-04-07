const db = require("../models/index")
const { Op } = require("sequelize");

class ChatController{
    async getChatsView(req,res){
        const idUserSession = req.session.idUser
        const userSession = await db.User.findByPk(idUserSession)
        const users = await db.User.findAll({
            where: {
                id: {[Op.ne]: idUserSession}
                // [Op.ne]: [{id: idUserSession}]
            }
        })
        return res.render("chats",{
            userSession: userSession,
            users: users
        })
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

    async getConversationsView(req, res){
        const chats = await db.User.findAll({
            include: [{
                model: db.User,    
                as: "sender"
            },
            {
                model: db.User,    
                as: "receiver",
            }]
        })
        // console.log(chats);
        return res.json(chats)
    }
}
module.exports = ChatController