const db = require("../models/index")
const { Op } = require("sequelize");
const { redirect } = require("express/lib/response");

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

    async sendMessage(req, res){
        const message = req.body
        const newMessage = await db.Message.create(message);
        console.log(newMessage);
        return res.redirect("/chats/conversation/" + message.idReceiver)
    }

    async getConversationsView(req, res){
        // const user = await db.User.findByPk(1)
        // console.log(user);
        // const chats = await user.getMessages()
        const chats = await db.User.findAll({
            include: ["sender", "receiver"]
        })
        // console.log(chats);
        return res.json(chats)
    }

    async getNewMessagesView(req, res){
        const idUserSession = req.session.idUser
        const idUser = req.params.id
        const query = "SELECT * FROM messages WHERE (messages.idSender = " + idUserSession + " AND messages.idReceiver = " + idUser + ") OR (messages.idSender = " + idUser + " AND messages.idReceiver = " + idUserSession + ") ORDER BY messages.fecha"
        const messages = await db.sequelize.query(query, {
            model: db.Message,
            mapToModel: true // pass true here if you have any mapped fields
          });
        console.log(messages);
        return res.json(messages)
    }

    async getConversationView(req, res){
        const token = req.csrfToken()
        const idUser = req.params.id
        const idUserSession = req.session.idUser
        const query = "SELECT * FROM messages WHERE (messages.idSender = " + idUserSession + " AND messages.idReceiver = " + idUser + ") OR (messages.idSender = " + idUser + " AND messages.idReceiver = " + idUserSession + ") ORDER BY messages.fecha"
        const messages = await db.sequelize.query(query, {
            model: db.Message,
            mapToModel: true // pass true here if you have any mapped fields
          });

        const user = await db.User.findByPk(idUser)
        const userSession = await db.User.findByPk(idUserSession)

        return res.render("conversation", {
            messages: messages,
            user: user,
            userSession: userSession,
            helper: require('../helpers/helpers'),
            csrfToken: token
            // title: 'Express'
        })
    }
}
module.exports = ChatController