import { defineStore } from 'pinia'

export const userTokenStore = defineStore("token", {
    state: () => {
        return {
            token: null,
            homeAccountId: null,
            role: null
        }
    },
    actions: {
        changeToken(newToken){
            this.token = newToken
        },
        changeHomeAccountId(newId){
            this.homeAccountId = newId
        },
        clear(){
            this.token = null;
            this.homeAccountId = null;
        },
        getHomeAccountId(){
            return this.homeAccountId
        },
        getToken(){
            return this.token
        },
        getRole(){
            return this.role
        },
        changeRole(role){
            this.role = role
        }

     },
     persist: true,
})