function verifySession(req, res, next){
    if(!req.session.loggedIn){
        return res.redirect("/")
    }
    next()

}

function verifyNoSession(req, res, next){
    if(req.session.loggedIn){
        return res.redirect("/")
    }
    next()

}

function verifyAdmin(res, res, next){
    if(req.session.role!=="admin"){
        return res.redirect("/")
    }
    next()
}

module.exports = {verifySession, verifyNoSession, verifyAdmin}