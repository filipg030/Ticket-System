import * as msal from 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.23.0/+esm';
import jwtDecode from './utils.js';

const config = {
    auth: {
        clientId: "58cae846-cb25-41bf-b0ce-138ec5de6e06",
        authority: "https://login.microsoftonline.com/b4fbc398-16ac-4774-b3d1-ba22bdd66fd2",
        redirectUri: "http://localhost:3001/api/microsoft_auth"
    },
    cache: {
        cacheLocation: "localStorage"
    }
};

const loginRequest = {
    scopes: ["User.ReadWrite"] // added openid for ID token
};

// Event listener for the login button
document.getElementById("bt").addEventListener("click", async function () {
    console.log("Login button clicked");
    const myMsal = new msal.PublicClientApplication(config);
await myMsal.initialize()
let msal_token = await myMsal.loginPopup(loginRequest)

console.log("---------- ACCESS TOKEN ---------------");

// console.log(msal_token.accessToken);

// console.log("---------- ID TOKEN ---------------");

// console.log(msal_token.idToken)

let decoded_access_token = await jwtDecode(msal_token.accessToken)

console.log(decoded_access_token);

});