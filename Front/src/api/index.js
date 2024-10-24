import axios from "axios"

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
                const response = await axios.post(url, object)
                resolve(response.data)
            } catch (err) {
                reject(err)
            }



    })
}
const patch = async (url, object) => {

    return new Promise(async (resolve, reject) => {

            try {
                const response = await axios.patch(url, object)
                resolve(response.data)
            } catch (err) {
                reject(err)
            }

    })
}



export {
    get,
    post
}
