<script>
import * as msal from 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.23.0/+esm';
import { post } from '../api';
import router from '../router';
import { userTokenStore } from '../store/token.js'


export default {
  data() {
    return {
        adminUser:0,
        config: {
          auth: {
              clientId: "4dec3746-1b03-4956-8380-00b68a1d755a",
              authority: "https://login.microsoftonline.com/476832f9-ffac-4834-83a6-fbb4d2cd0960",
          },
          cache: {
              cacheLocation: "localStorage"
          }
        },
        loginRequest: {
          scopes: ["User.ReadWrite"] // added openid for ID token
        }
    }
  },
  methods:{

    async loginClicked() {
      this.adminUser = 1
      try {
        const myMsal = new msal.PublicClientApplication(this.config);
        await myMsal.initialize()
        let msal_token = await myMsal.loginPopup(this.loginRequest)



        let username = msal_token.account.username
        let load_admin = false     // tylko do testow usunac potem

        let usernameResponse = await post("http://localhost:3001/user_check" ,{email: username, load_admin: load_admin, token: msal_token.idToken})

        // console.log(usernameResponse);
        
        console.log("TOKEN: \n");
        
        console.log(msal_token)

        const token = userTokenStore()
        token.changeToken(msal_token.idToken)
        

        console.log("ID: "+msal_token.account.homeAccountId);
        

        token.changeHomeAccountId(msal_token.account.homeAccountId)

        console.log(usernameResponse);

        if(usernameResponse.role == "admin"){
          token.changeRole("admin")
          router.push({ path: 'admin' })
        } else {
          token.changeRole("user")
          router.push({ path: 'user' })
        }
        


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
        <!-- <button class="rounded-md w-full h-16 p-2 bg-zslorange-500" @click="adminUser=2">Admin</button> -->
        </div>
    <div class="flex flex-col gap-2 text-center" v-if="adminUser == 1">
        <p class="mb-2 text-slate-950/75">Zaloguj się w oknie Microsoft...</p>
    </div>
    <!--
    <div class="flex flex-col gap-2" v-if="adminUser == 2">
        <p class="mb-2 text-slate-950/75">Admin</p>
        <input class="zslorangeTextInput" type="text" placeholder="login" name="username" id="username">
        <input class="zslorangeTextInput" type="password" placeholder="hasło" name="passwd" id="passwd">
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