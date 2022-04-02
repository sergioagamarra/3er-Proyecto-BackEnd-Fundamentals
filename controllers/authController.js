const db = require("../models/index")

class AuthController{

    getLoginView(req,res){
        // const token = req.csrfToken()
        // const status = req.flash("status")
        return res.render("login",
        // {
        //     status:{
        //         show:status.length>0,
        //         messages:status
        //     },
        //     csrfToken:token
        //     // isError:false
        // }
        )
    }

    getSignUpView(req,res){
        return res.render("signup",{isError:false})
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async signUp(req, res){
        const newUser = await db.User.create(req.body);
        console.log(newUser);
        return res.redirect("/");
    }

    async logIn(req, res){
        const credentials = req.body;
        const userData = await db.User.findOne({
            where:{
                email: credentials.email,
                // password: credentials.password
            }
        })
        if(userData){
            const user = userData.dataValues
            if(user.password===credentials.password){
                req.session.loggedIn = true
                req.session.username = user.username
                req.session.idUser = user.id
                return res.redirect("/")
            }
            
        }

        return res.render("login",{
            isError:true,
            errors:["Credenciales incorrectas, favor de verificar"]
        })
    }

}

module.exports = AuthController