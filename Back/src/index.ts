import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser"
import DataStore from "nedb"
import path from 'path'
import cors from 'cors'
import { spawn, exec } from 'child_process'
import { verify, decode } from 'jsonwebtoken'
import { JwksClient } from "jwks-rsa";

const app: Express = express();
const port: number = 3001;
const db: DataStore = new DataStore({ filename: "./db/tickets.db", autoload: true })
const archive_db: DataStore = new DataStore({ filename: "./db/archive.db", autoload: true })
const body_parser = BodyParser
const admin_users = ["dsidorowicz65@tlkrakowpl.onmicrosoft.com", "dmincberger42@tlkrakowpl.onmicrosoft.com", "adusik61@tlkrakowpl.onmicrosoft.com", "mmikolajczyk69@tlkrakowpl.onmicrosoft.com", "fgrudziecki25@tlkrakowpl.onmicrosoft.com"]

app.use(body_parser.json())
app.use(express.static("static"))
app.use(cors());

let idCounter: number
db.find({}, (err: Error, docs: [any]) => {
    docs = docs.sort((a, b) => b.id - a.id);
    if (docs[0]) {
        idCounter = docs[0].id
    } else {
        idCounter = 0
    }
})
// funkcja nie potrzeba, verify_jwt automatycznie sprawdza czy token jest wygasniety.
function verifyTokenDate(exp: number): boolean { // bezuzyteczne
    if (Date.now() >= exp * 1000) {
        return false
    }
    return true
}
// funkcja sprawdza czy token w ogole przyszedl w naglowkach autoryzacji danego requesta
function checkToken(req: Request): string | any { 
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        let token: string = req.headers.authorization.split(":")[1].trim()
        return token
    }
    return "no token"
}
// funkcja zwraca czy dashboard powinien byc admina czy usera
function verifyTokenUser(email: string): string {
    if (admin_users.includes(email)) {
        return "admin"
    }
    else {
        return "user"
    }
}
// nalezy zmienic ta funkcje, jako iz powstala funkcja verify_jwt, ktora sprawdza od razu verify + autentycznosc tokenu.




// token jwt od azure jest po prostu podzielony na 3 czesci, oddzielone kropkami, zakodowane w base64
function decodeBase64Url(base64Url) {
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
}


//funkcja sprawdza, czy token jest w ogole z azure.
async function verify_jwt(t_id: string, access_token: string, k_id: string) {
    const client = new JwksClient({
        jwksUri: `https://login.microsoftonline.com/${t_id}/discovery/v2.0/keys` // JWKS URI skad biore klucze
    });
    console.log("TID: "+t_id);
    console.log("KID: "+k_id);
    console.log("ACCESS_TOKEN: "+access_token);
    
    const key = await client.getSigningKey(k_id); // funkcja ktora bierze klucze 
    const signing_key = key.getPublicKey(); // funkcja zwracajaca klucz potrzebny do weryfikacji
    console.log("SIGNING_KEY: "+signing_key);
    
    try {
        const verified_status = verify(access_token, signing_key);
        console.log("WERYFIKACJA UDANA");
        return true

    } catch (e) {
        console.error('WERYFIKACJA NIE UDANA: ' + e)
        return false
    }


}

async function verify_request(req){
    let token = checkToken(req);
    if (token == "no token"){
        console.log("REQUEST DOES NOT CONTAIN A TOKEN");
        
        return false
    }
    const split_token: Array<string> = token.split(".");
    const token_header = decodeBase64Url(split_token[0]);
    const token_body = decodeBase64Url(split_token[1])

    const k_id = token_header.kid
    const t_id = token_body.tid
    const verified_status = await verify_jwt(t_id,token,k_id)
    return verified_status
}



app.get("/test", async (req: Request, res: Response) => {

let idCounter: number
db.find({}, (err: Error, docs: [any]) => {
    docs = docs.sort((a,b) => b.id - a.id);
    if(docs[0]) {
        idCounter = docs[0].id
    } else {
        idCounter = 0
    }
})


});

// let verification: any = tokenCheckPoint(req)
// if (!verification){
//     res.send("token verification failed")
//     return
// }    
// let userType: string = verifyTokenUser(decoded_token.upn)
// if (userType == "user"){
// res.send("user signed in")
// return
// }
// if (userType == "admin"){
// res.send("admin signed in")
// return
// }

// dane ticketa:
// obecne: sala, opis, poziom problemu, status, imie, nazwisko
/* 
sprawdzanie czy token istnieje
sprawdzanie czy wygasł
jeśli weryfikacja jest ok to kontynuuj
jeśli nie to return
*/

/* 
sprawdzanie typu usera
osobne rzeczy dla admina i usera
*/

// dane ticketa:
// obecne: sala, opis, poziom problemu, status, imie, nazwisko




app.post("/api/add", async (req: Request, res: Response) => {

    if (!verify_request(req)){
        res.send("verification failed")
        return
    }

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

app.get("/api/get/:id", (req: Request, res: Response) => {
    try {
        let id: string = req.params.id
        db.findOne({ id: id }, (err: Error, doc: any) => {
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

app.delete("/api/remove/:id", async (req: Request, res: Response) => {

    if (!verify_request(req)){
        res.send("verification failed")
        return
    }

    let token = checkToken(req)
    let email = token.preferred_username

    let userType: string = verifyTokenUser(email)
    if (userType == "user") {
        res.send("not permitted")
        return
    }

    try {
        let id: string = req.params.id
        db.remove({ id: id }, (err: Error, docs: number) => {
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

app.patch("/api/archive/:id", async (req: Request, res: Response) => {

    // if (!verify_request(req)){
    //     res.send("verification failed")
    //     return
    // }

    // let token = checkToken(req)
    // let email = token.preferred_username

    // let userType: string = verifyTokenUser(email)
    // if (userType == "user") {
    //     res.send("not permitted")
    //     return
    // }

    try {
        let id: number = parseInt(req.params.id)
        db.findOne({ id: id }, (err: Error, doc: any) => {
            if (doc == null) {
                res.send("nie znaleziono ticketa")
                return
            }
            doc.status = "closed"
            archive_db.insert(doc)
            db.remove({ id: id })
            res.send("przeniesiono ticket do archiwum")
        })
    } catch (err) {
        console.log(err)
        res.send("wystąpił błąd")
    }

});


app.post("/user_check", async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email
        const load_admin: boolean = req.body.load_admin

        if (!verify_request(req)){
            res.send("verification failed")
            return
        }
        if (admin_users.includes(email) && load_admin) {
            res.json({ role: "admin" })
            res.end()
        } else {
            res.json({ role: "user" })
            res.end()
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(500)
        res.end()
    }
})

app.get("/make_table", async (req: Request, res: Response) => {

    if (!verify_request(req)){
        res.send("verification failed")
        return
    }

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

})
