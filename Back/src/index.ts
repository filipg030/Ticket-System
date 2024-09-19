import express, { Express, Request, Response } from "express";
import bodyParser, { BodyParser } from "body-parser";
import path from "path"

const app: Express = express()
const PORT: number = 3000

app.use(express.static('static'))
app.use( express.static(__dirname + 'node_modules'));
app.set("view engine", "ejs");

const config = {
    auth: {
        clientId: "58cae846-cb25-41bf-b0ce-138ec5de6e06"
    }
}

const loginRequest = {
    scopes: ["User.ReadWrite"],
  };

app.get("/", (req:Request, res:Response) => {
    res.redirect("/test.html")
})

app.listen(PORT, () => {
    console.log("running")
})