function addSession(req,res,next){
    res.locals.session = req.session
    next()
}

module.exports = addSession