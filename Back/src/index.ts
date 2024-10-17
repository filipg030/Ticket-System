import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser"
import DataStore from "nedb"
import path from 'path'
import cors from 'cors'
import { spawn, exec } from 'child_process'

const app: Express = express();
const port: number = 3001;
const db: DataStore = new DataStore({ filename: "./db/tickets.db", autoload: true })
const body_parser = BodyParser
const admin_users = ["dsidorowicz65@tlkrakowpl.onmicrosoft.com", "dmincberger42@tlkrakowpl.onmicrosoft.com", "adusik61@tlkrakowpl.onmicrosoft.com", "mmikolajczyk69@tlkrakowpl.onmicrosoft.com", "fgrudziecki25@tlkrakowpl.onmicrosoft.com"]


app.use(body_parser.json())
app.use(express.static("static"))
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
    res.sendFile("test.html", { root: path.join(__dirname, "static") })
});

let idCounter: number
db.find({}, (err: Error, docs: [any]) => {
    docs = docs.sort((a,b) => b.id - a.id);
    idCounter = docs[0].id
})


// dane ticketa:
// obecne: sala, opis, poziom problemu, status, imie, nazwisko

app.post("/api/add", async (req: Request, res: Response) => {
    try {
        let ticket = {
            id: ++idCounter,
            room: req.body.room,
            desc: req.body.desc,
            level: req.body.level,
            floor: req.body.floor,
            status: req.body.status,
            imie: req.body.name,
            nazwisko: req.body.surname
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

app.post("/user_check", async(req:Request, res:Response) => {
    console.log(req.body)
    try {
        const email:string = req.body.email
        const load_admin:boolean = req.body.load_admin
        console.log(load_admin);
        
        if (admin_users.includes(email) && load_admin){
            res.json({role:"admin"})
            res.end()
        } else {
            res.json({role:"user"})
            res.end()
        }
    } catch(e) {
            console.log("ERROR CHECK");
            res.sendStatus(500)
            res.end()
    }
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


async function make_spreadsheet() {

}
