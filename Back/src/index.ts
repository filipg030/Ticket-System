import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser"
import DataStore from "nedb"
const app: Express = express();
const port: number = 3000;
const db: DataStore = new DataStore({filename: "./db/testdb.db", autoload: true})
const body_parser = BodyParser

app.use(body_parser.json())

app.get("/", async (req: Request, res: Response) => {
    res.sendFile("./test.html")
});

app.post("/api/add", async (req: Request, res: Response) => {
    console.log(req.body.id)
    db.insert({a: 1, b: 2}, () => {
        console.log("dodano rzecz!")
        res.send("dodano rzecz!")
    })
});

app.get("/api/get", async (req: Request, res: Response) => {
    db.find({}, (err: Error, docs: [any]) => {
        console.log(docs)
        res.send(docs)
    })
});

app.get("/api/get/:id", async (req: Request, res: Response) => {
    let id: string = req.params.id
    db.findOne({_id: id}, (err: Error, doc: any) => {
        if(doc == null) {
            res.send("nie znaleziono wpisu")
        }
        else {
            res.send(doc)
        }
    })
});

app.get("/api/remove/:id", async (req: Request, res: Response) => {
    let id: string = req.params.id
    db.remove({_id: id}, (err: Error, docs: number) => {
        if(docs == 0) {
            res.send("nie znaleziono wpisu")
        }
        else {
            res.send("usunięto rzecz!")   
        }
    })
});

app.listen(port, () => {
    console.log("port: " + port)
});