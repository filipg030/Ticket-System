import axios from "axios"
import { userTokenStore } from "../store/token"


const get = async (url) => {

    return new Promise(async (resolve, reject) => {
        setTimeout(async () => {
            try {
                const response = await axios.get(url)
                resolve(response.data)
            } catch (err) {
                reject(err)
            }


        })
    })
}



const getAuth = async (url, token) => {

        if (token == null) {
            resolve("Not logged in")
        }
        setTimeout(async () => {
            try {
                const response = await axios.get(url, { headers: { 'Authorization': `Bearer ${token}` } })
                resolve(response.data)
            } catch (err) {
                reject(err)
            }


    })
}


const post = async (url, object) => {

    return new Promise(async (resolve, reject) => {

            try {
                const token = userTokenStore()
                let headers = {}
                if(token.token != null){
                    headers = {
                        "Authorization": `Bearer: ${token.token}`
                    }
                }
                const response = await axios.post(url, object, {
                    headers: headers
                })
                
                resolve(response.data)
            } catch (err) {
                reject(err)
            }



    })
}
const postArchive = async (url, object) => {

    return new Promise(async (resolve, reject) => {

            try {
                const token = userTokenStore()
                let headers = {}
                if(token.token != null){
                    headers = {
                        "Authorization": `Bearer: ${token.token}`
                    }
                }
                const response = await axios.post(url, object, {
                    headers: headers,
                    responseType: "arraybuffer"
                })
                const fileURL = window.URL.createObjectURL(new Blob([response.data]));
                const link = document.createElement("a");
                link.href = fileURL;
                link.setAttribute("download", "archiwum.xlsx");
                document.body.appendChild(link);
                link.click();
                resolve(response.data)
            } catch (err) {
                reject(err)
            }



    })
}
const patch = async (url, object) => {

    return new Promise(async (resolve, reject) => {
            try {
                const token = userTokenStore()
                let headers = {}
                if(token.token != null){
                    headers = {
                        "Authorization": `Bearer: ${token.token}`
                    }
                }
                const response = await axios.patch(url, object, {
                    headers: headers
                })
                resolve(response.data)
            } catch (err) {
                reject(err)
            }

    })
}



export {
    get,
    post,
    patch,
    postArchive
}