<script>
import * as msal from 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.23.0/+esm';
import { post } from '../api';



export default {
  data() {
    return {
        adminUser:0,
        config: {
          auth: {
              clientId: "4dec3746-1b03-4956-8380-00b68a1d755a",
              authority: "https://login.microsoftonline.com/476832f9-ffac-4834-83a6-fbb4d2cd0960",
          },
          // cache: {
          //     cacheLocation: "localStorage"
          // }
        },
        loginRequest: {
          scopes: ["User.ReadWrite"] // added openid for ID token
        }
    }
  },
  methods:{
    base64UrlDecode(str) {
        let output = str.replace(/-/g, "+").replace(/_/g, "/");
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += "==";
                break;
            case 3:
                output += "=";
                break;
            default:
                throw new Error("base64 string is not of the correct length");
        }
        try {
            return b64DecodeUnicode(output);
        }
        catch (err) {
            return atob(output);
        }
    },

    jwtDecode(token, options) {
        if (typeof token !== "string") {

        }
        options || (options = {});
        const pos = options.header === true ? 0 : 1;
        const part = token.split(".")[pos];
        if (typeof part !== "string") {
            console.log("ERROR: "+e);
            
        }
        let decoded;
        try {
            decoded = base64UrlDecode(part);
        }
        catch (e) {

        }
        try {
            console.log(decoded);
            
            return JSON.parse(decoded);
        }
        catch (e) {

        }
    },

    b64DecodeUnicode(str) {
      return decodeURIComponent(atob(str).replace(/(.)/g, (m, p) => {
          let code = p.charCodeAt(0).toString(16).toUpperCase();
          if (code.length < 2) {
              code = "0" + code;
          }
          return "%" + code;
        }))
    },

    async loginClicked() {
      this.adminUser = 1
      try {
        console.log("Login button clicked");
        const myMsal = new msal.PublicClientApplication(this.config);
        await myMsal.initialize()
        let msal_token = await myMsal.loginPopup(this.loginRequest)

        console.log(msal_token);
        

        console.log(msal_token.account.username);
        let username = msal_token.account.username

        let usernameResponse = await post("http://localhost:3001/user_check" ,{email: username})

        console.log(usernameResponse);
        

      } catch (error) {
        console.log(error);
        
        console.log("Cancelled slay");
        
        console.log(this.adminUser)
        this.adminUser = 0
    
      }
    }
  }
}


// console.log("---------- ACCESS TOKEN ---------------");

// // console.log(msal_token.accessToken);

// // console.log("---------- ID TOKEN ---------------");

// // console.log(msal_token.idToken)

// let decoded_access_token = await jwtDecode(msal_token.accessToken)

// console.log(decoded_access_token);
</script>

<template>
  <div class="w-full h-full flex items-center justify-center gradient">
    <div class="z-0 absolute top-10 h-1/2 items-center justify-center flex flex-col text-9xl text-slate-200">
        ZSŁ Ticket System
    </div>
    <div class="z-10 w-64 h-fit border rounded-lg p-2 bg-slate-100 shadow-lg shadow-black/50 text-slate-100">
        <div v-if="adminUser == 0" class="flex flex-row gap-2 justify-stretch">
        <button id="loginBt"class="rounded-md w-full h-16 p-2 bg-slate-500" @click="loginClicked"><i class="text-xl uil uil-microsoft"></i>  Zaloguj z Microsoft</button>
        <!-- <button class="rounded-md w-full h-16 p-2 bg-rose-500" @click="adminUser=2">Admin</button> -->
        </div>
    <div class="flex flex-col gap-2 text-center" v-if="adminUser == 1">
        <p class="mb-2 text-slate-950/75">Zaloguj się w oknie Microsoft...</p>
    </div>
    <!--
    <div class="flex flex-col gap-2" v-if="adminUser == 2">
        <p class="mb-2 text-slate-950/75">Admin</p>
        <input class="roseTextInput" type="text" placeholder="login" name="username" id="username">
        <input class="roseTextInput" type="password" placeholder="hasło" name="passwd" id="passwd">
        <button class="backBtn" @click="adminUser=0">wróć</button>
    </div> -->
    </div>
  </div>
</template>

<style scoped>

.backBtn{
    @apply bg-slate-600 hover:bg-slate-800 transition-all duration-100 rounded-md p-1 text-slate-200
}

.gradient{
    background: rgb(2,0,36);
background: linear-gradient(43deg, rgba(65,83,117,255) 0%, rgba(56,73,102,255) 35%, rgba(50,65,92,255) 100%);
}

</style>
