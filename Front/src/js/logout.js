import * as msal from 'https://cdn.jsdelivr.net/npm/@azure/msal-browser@3.23.0/+esm';
import { userTokenStore } from '../store/token';

export async function sendLogoutRequest(){
    return new Promise ( async (resolve,reject) => {
        try {
        const token = userTokenStore()
        const homeAccountId = token.getHomeAccountId()
        const config = {
            auth: {
              clientId: "4dec3746-1b03-4956-8380-00b68a1d755a",
            },
          };
          
          const myMsal = new msal.PublicClientApplication(config);
          await myMsal.initialize()
          console.log(myMsal.getAllAccounts());
          
          // you can select which account application should sign out
          const logoutRequest = {
            account: myMsal.getAccountByHomeId(homeAccountId),
          };
          
           myMsal.logoutPopup(logoutRequest).then(() => {
          const accounts = myMsal.getAllAccounts();
          console.log("ACCOUNTS: "+accounts);
          
            resolve(true)
           }).catch((error) => {
                console.error("ERROR: ", error);
                reject(false)
           });
        } catch(e){
            console.log("ERROR W LOGOUT: ",e);
            reject(false)
            
        }
              })

}