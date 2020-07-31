const fs = require("fs")
const express = require("express")
const app = express()
const port = 9000;

var clienthtml = fs.readFileSync("client.html")

app.get("/", (req, res) => {
    res.send(clienthtml.toString())
})

app.listen(port, () => {console.log("Listening on port 9000.")})
