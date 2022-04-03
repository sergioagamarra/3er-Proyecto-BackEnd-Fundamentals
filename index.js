const path = require("path")
const express = require("express")
const morgan = require("morgan")
const expressLayouts = require("express-ejs-layouts")
const { port, secret } = require("./config");
const {connection, sequelize} = require("./config/database");
const session = require("express-session")
const flash = require("connect-flash")

// Importando rutas
const authRouter = require("./routes/authRoutes")

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

//TEST DE CONEXIÓN
connection()

// Utilizando rutas
app.use("/auth", authRouter)

app.get("/", async (req, res) => {
    console.log(req.session)
    res.render("index", {
        saludo: "HOLA SERGIO"
    })
})

app.listen(port, () => {
    console.log("Funcionando... http://localhost:" + port)
})