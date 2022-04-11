const db = require("../models/index")
const { Op, QueryTypes } = require("sequelize");
const { DateTime } = require("luxon");


class ChatController{
    async getChatsView(req,res){
        const token = req.csrfToken()
        const status = req.flash("status")
        const idUserSession = req.session.idUser
        const userSession = await db.User.findByPk(idUserSession)
        const users = await db.User.findAll({
            where: {
                id: {[Op.ne]: idUserSession}
            }
        })
        return res.render("chats",{
            userSession: userSession,
            users: users,
            status:{
                show:status.length>0,
                messages:status
            },
            csrfToken:token
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

    async getMyChatsView(req, res){
        const idUserSession = req.session.idUser
        const userSession = await db.User.findByPk(idUserSession)
        const query = "SELECT (M.idSender + M.idReceiver) as Conversacion, M.idSender, M.idReceiver, U1.name as NameSender, U1.profilePic as PicSender, U2.name as NameReceiver , U2.profilePic as PicReceiver FROM messages as M, users as U1, users as U2 WHERE (M.idSender = " + idUserSession + " OR M.idReceiver = " + idUserSession + ") AND M.idSender = U1.id AND M.idReceiver = U2.id GROUP BY Conversacion;"
        const messages = await db.sequelize.query(query, { type: QueryTypes.SELECT });
        console.log(messages);
        return res.render("my_chats",{
            userSession: userSession,
            messages: messages
        })
    }

    async getNewMessagesView(req, res){
        const idUserSession = req.session.idUser
        const idUser = req.params.id
        const query = "SELECT * FROM messages WHERE (messages.idSender = " + idUserSession + " AND messages.idReceiver = " + idUser + ") OR (messages.idSender = " + idUser + " AND messages.idReceiver = " + idUserSession + ") ORDER BY messages.fecha"
        const messages = await db.sequelize.query(query, {
            model: db.Message,
            mapToModel: true 
          });
         messages.forEach(message => {
            let newDate = message.fecha;
            message.dataValues.dateFormated = formatDateMessage(newDate)
            console.log(message.fecha);
            console.log(message.dataValues.dateFormated);

          });
        return res.json(messages)
    }

    async getConversationView(req, res){
        const token = req.csrfToken()
        const idUser = req.params.id
        const idUserSession = req.session.idUser
        const query = "SELECT * FROM messages WHERE (messages.idSender = " + idUserSession + " AND messages.idReceiver = " + idUser + ") OR (messages.idSender = " + idUser + " AND messages.idReceiver = " + idUserSession + ") ORDER BY messages.fecha"
        const messages = await db.sequelize.query(query, {
            model: db.Message,
            mapToModel: true 
          });

        const user = await db.User.findByPk(idUser)
        const userSession = await db.User.findByPk(idUserSession)

        return res.render("conversation", {
            messages: messages,
            user: user,
            userSession: userSession,
            helper: require('../helpers/helpers'),
            csrfToken: token,
        })
    }

    async getUserSearchView(req, res){
        const user = req.body
        const idUserSession = req.session.idUser
        const userSession = await db.User.findByPk(idUserSession)
        const users = await db.User.findAll({
            where: {
                [Op.and]: [{
                        id: {[Op.ne]: idUserSession}
                    }, { 
                        name: {
                            [Op.substring]: user.nameUser
                        }
                    }]
            }
        })
        return res.render("chats",{
            userSession: userSession,
            users: users,
            csrfToken: req.csrfToken()
        })
    }

    async getEditUserView(req, res){
        const id = req.params.id
        const user = await db.User.findByPk(id)
        return res.render("editUser",{
            user: user,
            csrfToken: req.csrfToken()
        })
    }

    async getPerfilView(req,res){
        const idUserSession = req.session.idUser
        const userSession = await db.User.findByPk(idUserSession)
        return res.render("perfil",{
            userSession: userSession,
            helper: require('../helpers/helpers'),
        })
    }

    async editUser(req, res){
        const user = req.body
        const id = req.params.id
        const updateUser = await db.User.update(user, {
            where: {
              id: id
            }
        });
        return res.redirect("/chats/perfil")
    }

    async deleteUser(req, res){
        const id = req.params.id
        try{
            const deleteUser = await db.User.destroy({
                where: {
                  id: id
                }
            });
            return res.redirect("/chats/")
        }
        catch(e){
            console.log(e);
            req.flash("status", "Error al eliminar usuario")
            return res.redirect("/chats/")
        }
        
    }
    
}

function formatDateMessage(date){
    const newDate = DateTime.fromJSDate(date);
    return newDate.toFormat("HH:mm'hs' dd/MM/yyyy", { zone: "America/Argentina/Jujuy" });
  }

module.exports = ChatController