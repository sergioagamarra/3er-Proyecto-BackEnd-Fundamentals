const db = require("../models/index")

class AuthController{

    getLoginView(req,res){
        const token = req.csrfToken()
        const status = req.flash("status")
        return res.render("login",{
            status:{
                show:status.length>0,
                messages:status
            },
            csrfToken:token
            // isError:false
        })
    }

    getSignUpView(req,res){
        const token = req.csrfToken()
        return res.render("signup",{
            isError: false,
            csrfToken: token
        })
    }

    logOut(req,res){
        req.session.destroy()
        return res.redirect("/")
    }

    async signUp(req, res){
        const validation = this.validate(req.body)
        if(!validation.isError){
        
            try{
                const newUser = await db.User.create(req.body);
                req.flash("status", "Usuario registrado exitosamente. Por favor inicia sesión")
                return res.redirect("/auth/login");
            }
            catch(error){
                const errors = error.errors.map( e => e.type==="unique violation"?
                `El ${e.path} '${e.value}' ya esta en uso`:
                e.message
            )
            //Entra aquí si se lanza una excepcion
            return res.render("signup",{
                isError: true,
                errors: errors,
                csrfToken: req.csrfToken()
                })
            }
        
        }
        else{
            return res.render("signup",{
                isError: validation.isError,
                errors: validation.errors,
                csrfToken: req.csrfToken()
            })
        }
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
                req.session.role = user.role
                // return res.redirect("chats", {user: user})
                return res.redirect("/chats")
            }
            
        }
        return res.render("login",{
            isError: true,
            errors: ["Credenciales incorrectas, favor de verificar"],
            csrfToken: req.csrfToken()
        })
    }

    validate(userData){
        let result = {isError:false,errors:[]}
        if(!(userData.name && userData.username && userData.email && userData.password && userData.passwordRepeated)){
            result.isError = true
            result.errors.push("Rellena todos los campos")
        }
        if(userData.password!==userData.passwordRepeated){
            result.isError = true
            result.errors.push("Las contraseñas no coinciden")
        }
        return result
    }

}

module.exports = AuthController