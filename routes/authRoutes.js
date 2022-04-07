const express = require("express")
const AuthController = require("../controllers/authController")
const { verifySession, verifyAdmin } = require("../middleware/verifySession")


const router = express.Router()
const authController = new AuthController()

router.get("/login",authController.getLoginView)
router.post("/login",authController.logIn)
router.get("/signup",authController.getSignUpView)
router.post("/signup",(req,res)=>{
    authController.signUp(req,res)
})
router.get("/logout",authController.logOut)

module.exports = router