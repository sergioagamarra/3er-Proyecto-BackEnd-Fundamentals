const path = require("path")
const express = require("express")
const morgan = require("morgan")
const expressLayouts = require("express-ejs-layouts")
const { port } = require("./config");

const app = express()

// Usando registros con morgan
app.use(morgan("dev"))

// Definiendo middleware layouts
app.use(expressLayouts)

// Archivos estáticos
app.use(express.static(path.join(__dirname,"static")))

// Usando view engine
app.set("view engine", "ejs")
app.set("layout", "./layouts/base")

app.get("/", (req, res) => {
    res.render("index", {
        saludo: "HOLA SERGIO"
    })
})

app.listen(port, () => {
    console.log("Funcionando... http://localhost:" + port)
})