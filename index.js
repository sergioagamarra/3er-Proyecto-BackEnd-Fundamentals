const path = require("path")
const express = require("express")
const morgan = require("morgan")
const expressLayouts = require("express-ejs-layouts")
const { port, secret } = require("./config");
const {connection, sequelize} = require("./config/database");
const session = require("express-session")
const flash = require("connect-flash")
const csrf = require("csurf")
const addSession = require("./middleware/addSession");

// Importando rutas
const authRouter = require("./routes/authRoutes")
const chatRouter = require("./routes/chatRoutes")

const app = express()

// Usando registros con morgan
app.use(morgan("dev"))

// Definiendo middleware layouts
app.use(expressLayouts)

//Middleware de urlencoded
app.use(express.urlencoded({
    extended:true
}))


// Definiendo middleware para flash massages
app.use(flash())

// Archivos estáticos
app.use(express.static(path.join(__dirname,"static")))

// Usando view engine
app.set("view engine", "ejs")
app.set("layout", "./layouts/base")

// Definiendo la sesión
app.use(session({
    secret:secret,
    resave:false,
    saveUninitialized:false
}))

//Usando token scrf. Tiene que ir despues de express-session y urlencoded
app.use(csrf())
app.use(addSession);

//TEST DE CONEXIÓN
connection()

// Utilizando rutas
app.use("/auth", authRouter)
app.use("/chats", chatRouter)

app.get("/", async (req, res) => {
    console.log(req.session)
    res.render("index", {
        session:req.session
    })
})

app.listen(port, () => {
    console.log("Funcionando... http://localhost:" + port)
})