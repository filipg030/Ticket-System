import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser"
import DataStore from "nedb"
import path from 'path'
import { spawn, exec } from 'child_process'

const app: Express = express();
const port: number = 3001;
const db: DataStore = new DataStore({ filename: "./db/tickets.db", autoload: true })
const body_parser = BodyParser

app.use(body_parser.json())
app.use(express.static("static"))

app.get("/", async (req: Request, res: Response) => {
    res.sendFile("test.html", { root: path.join(__dirname, "static") })
});



// dane ticketa:
// obecne: sala, opis, poziom problemu, status, imie, nazwisko

app.post("/api/add", async (req: Request, res: Response) => {
    try {
        let ticket = {
            room: req.body.room,
            desc: req.body.desc,
            level: req.body.level,
            status: req.body.status
        }
        db.insert(ticket, () => {
            console.log("dodano ticket!")
            res.send("dodano ticket!")
        })
    } catch (err) {
        console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/get", async (req: Request, res: Response) => {
    try {
        db.find({}, (err: Error, docs: [any]) => {
            console.log(docs)
            res.send(docs)
        })
    } catch (err) {
        console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/get/:id", async (req: Request, res: Response) => {
    try {
        let id: string = req.params.id
        db.findOne({ _id: id }, (err: Error, doc: any) => {
            if (doc == null) {
                res.send("nie znaleziono ticketa")
            }
            else {
                res.send(doc)
            }
        })
    } catch (err) {
        console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/remove/:id", async (req: Request, res: Response) => {
    try {
        let id: string = req.params.id
        db.remove({ _id: id }, (err: Error, docs: number) => {
            if (docs == 0) {
                res.send("nie znaleziono ticketa")
            }
            else {
                res.send("usunięto ticket!")
            }
        })
    } catch (err) {
        console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/microsoft_auth", async (req: Request, res: Response) => {
    res.send("zalogowano!")
})

app.get("/make_table", async (req: Request, res: Response) => {
    const pythonProcess = spawn('../../venv/Scripts/python.exe', ['./static/excel_script.py']);
    let responseSent = false;


    pythonProcess.stderr.on("data", (data) => {
        if (!responseSent) {
            responseSent = true;
            console.error(`Error from Python script: ${data.toString()}`);
            res.status(500).send("Coś poszło nie tak");
        }
    });


    pythonProcess.on("exit", (code) => {
        if (!responseSent) {
            responseSent = true;
            if (code === 0) {
                res.status(200).send("Proces zakończony sukcesem!");
            } else {
                res.status(500).send(`Proces zakończył się z kodem: ${code}`);
            }
        }
    });


    pythonProcess.on("error", (err) => {
        if (!responseSent) {
            responseSent = true;
            console.error(`Failed to start subprocess: ${err}`);
            res.status(500).send(`Błąd uruchamiania subprocessu: ${err.message}`);
        }
    });
})

app.listen(port, () => {
    console.log("port: " + port)
});