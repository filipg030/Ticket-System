import express, { Express, Request, Response } from "express";
import BodyParser from "body-parser"
import DataStore from "nedb"
import cors from 'cors'
import { verify, decode } from 'jsonwebtoken'
import { JwksClient } from "jwks-rsa";
import {utils, write, writeFile} from 'xlsx'

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
    docs = docs.sort((a, b) => b._id - a._id);
    if (docs[0]) {
        idCounter = docs[0]._id
    } else {
        idCounter = 0
    }
})

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
    // console.log("PRZEKAZYWANY MAIL: ",email);
    
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
    console.log("URL: ",base64Url);
    
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(Buffer.from(base64, 'base64').toString('utf8'));
}


//funkcja sprawdza, czy token jest w ogole z azure.
async function verify_jwt(t_id: string, access_token: string, k_id: string) {
    try {

    const client = new JwksClient({
        jwksUri: `https://login.microsoftonline.com/${t_id}/discovery/v2.0/keys` // JWKS URI skad biore klucze
    });
    // console.log("TID: "+t_id);
    // console.log("KID: "+k_id);
    // console.log("ACCESS_TOKEN: "+access_token);
    
    const key = await client.getSigningKey(k_id); // funkcja ktora bierze klucze 
    const signing_key = key.getPublicKey(); // funkcja zwracajaca klucz potrzebny do weryfikacji
    // console.log("SIGNING_KEY: "+signing_key);
    
        const verified_status = verify(access_token, signing_key);
        // console.log("WERYFIKACJA UDANA");
        return true

    } catch (e) {
        console.error('WERYFIKACJA NIE UDANA: ' + e)
        return false
    }


}

async function verify_request(req){
    try {
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
} catch (e){
    console.log("BLAD W WERYFIKACJI REQUESTU! " + e);
    return
}
}

// dane ticketa:
// obecne: sala, opis, poziom problemu, status, name, surname
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
// obecne: sala, opis, poziom problemu, status, name, surname


// jeżeli wywołamy np. w lutym 2025r. to 2024/2025
// jeżeli wywołamy np. w listopadzie 2025r. to 2025/2026
function setDate(): string {
    let date: Date = new Date()
    let year: number = date.getFullYear()
    let month: number = date.getMonth()
    let return_year : string
    if(month < 8) {
        return_year = `${year-1}-${year}`
    }
    if (month >= 8) {
        return_year = `${year}-${year+1}`        
    }
    return return_year
}

app.post("/api/add", async (req: Request, res: Response) => {

    if (!verify_request(req)){
        res.send("verification failed")
        return
    }

    try {
        let ticket = {
            _id: ++idCounter,
            room: req.body.room,
            desc: req.body.desc,
            level: req.body.level,
            floor: req.body.floor,
            status: req.body.status,
            name: req.body.name,
            surname: req.body.surname,
            date: setDate()
        }
        db.insert(ticket, () => {
            // console.log("dodano ticket!")
            res.send("dodano ticket!")
        })
    } catch (err) {
        // console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/get", async (req: Request, res: Response) => {
    try {
        db.find({}, (err: Error, docs: [any]) => {
            // console.log(docs)
            res.send(docs)
        })
    } catch (err) {
        // console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/get/:id", (req: Request, res: Response) => {
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
        // console.log(err)
        res.send("wystąpił błąd")
    }
});

app.get("/api/get_archive", async (req: Request, res: Response) => {
    try {
        archive_db.find({}, (err: Error, docs: [any]) => {
            // console.log(docs)
            res.send(docs)
        })
    } catch (err) {
        // console.log(err)
        res.send("wystąpił błąd")
    }
});

app.delete("/api/remove/:id", async (req: Request, res: Response) => {

    if (!verify_request(req)){
        res.send("verification failed")
        return
    }

    let token = checkToken(req)
    console.log("TOKEN:",token);
    let split_token = token.split(".")
    let token_body = split_token[1]
    let decoded_body = decodeBase64Url(token_body)
    let email = decoded_body.preferred_username
    let userType: string = verifyTokenUser(email)
    if (userType == "user") {
        res.send("not permitted")
        return
    }

    try {
        let id: number = parseInt(req.params.id)
        db.remove({ _id: id }, (err: Error, docs: number) => {
            if (docs == 0) {
                res.send("nie znaleziono ticketa")
            }
            else {
                res.send("usunięto ticket!")
            }
        })
    } catch (err) {
        // console.log(err)
        res.send("wystąpił błąd")
    }
});

app.patch("/api/archive/:id", async (req: Request, res: Response) => {

    try {
    if (!verify_request(req)){
        res.send("verification failed")
        return
    }
    } catch (e){
        res.send("problem with verification of the request")
        res.end()
        console.error("PROBLEM Z WERYFIKACJA: ",e)
        return
    }
    try {
    let token = checkToken(req)
    console.log("TOKEN:",token);
    let split_token = token.split(".")
    let token_body = split_token[1]
    let decoded_body = decodeBase64Url(token_body)
    let email = decoded_body.preferred_username
    let userType: string = verifyTokenUser(email)
    if (userType == "user") {
        res.send("not permitted")
        return
    }
    } catch(e){
        res.send("problem with the token, or insufficient permissions")
        res.end()
        console.error("PROBLEM Z TOKENEM LUB UPRAWNIENIAMI:",e)
        return
    }
    try {
        let id: number = parseInt(req.params.id)
        db.findOne({ _id: id }, (err: Error, doc: any) => {
            if (doc == null) {
                res.send("nie znaleziono ticketa")
                return
            }
            doc.status = "closed"
            archive_db.insert(doc)
            db.remove({ _id: id })
            res.send("przeniesiono ticket do archiwum")
        })
    } catch (err) {
        // console.log(err)
        res.send("wystąpił błąd")
    }

});


app.post("/user_check", async (req: Request, res: Response) => {
    try {
        const email: string = req.body.email

        if (!verify_request(req)){
            res.send("verification failed")
            return
        }
        if (admin_users.includes(email))  { // byl load_admin do celow testowych, komentarz po to zeby front tez usunal.
            res.json({ role: "admin" })
            res.end()
        } else {
            res.json({ role: "user" })
            res.end()
        }
    } catch (e) {
        // console.log(e);
        res.sendStatus(500)
        res.end()
    }
})

app.post("/make_table/:year", async (req: Request, res: Response) => {
try{
    try {
        if (!verify_request(req)){
            res.send("verification failed")
            return
        }
        } catch (e){
            res.send("problem with verification of the request")
            res.end()
            console.error("PROBLEM Z WERYFIKACJA: ",e)
            return
        }
    try {
    let token = checkToken(req)
    console.log("TOKEN:",token);
    let split_token = token.split(".")
    let token_body = split_token[1]
    let decoded_body = decodeBase64Url(token_body)
    let email = decoded_body.preferred_username
    let userType: string = verifyTokenUser(email)
    if (userType == "user") {
        res.send("not permitted")
        return
    }
    } catch(e){
        console.log("ERROR Z TOKENEM: ",e);
        res.send("PROBLEM Z TOKENEM, BRAK TOKENU LUB ZLY TOKEN")
        res.end()
        return
    }
    try {
    let year: String = req.params.year
    // console.log(year == "2024-2025" ? "TAK" : "NIE");
    
    archive_db.find({date:year}, (err: Error, docs: [any]) => {
    const workbook = utils.book_new();
    // console.log("[FKOEWFKOPEKOEW")
    // console.log(docs);
    
    const worksheet = utils.json_to_sheet(docs)
    utils.book_append_sheet(workbook,worksheet, "Archiwum")
    const excelBuffer = write(workbook, { bookType: 'xlsx', type: 'buffer' });
    res.setHeader('Content-Disposition', `attachment; filename=archiwum${year}.xlsx`);
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.send(excelBuffer);
    })
} catch(e){
    res.send("There was a problem with creating the spreadsheet")
    res.end()
    console.error("PROBLEM Z TWORZENIEM/WYSYLANIEM TABELKI: ",e);
    return

}
} catch(e){
    res.send("UNKNOWN ERROR")
    res.end()
    console.log("ERROR: ",e);
    return
}


})

app.listen(port, () => {
    console.log("port: " + port)

})