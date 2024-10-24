import { defineStore } from 'pinia'

export const userTokenStore = defineStore("token", {
    state: () => {
        return {
            token: null
        }
    },
    actions: {
        change(newToken){
            this.token = newToken
        }
     }
})