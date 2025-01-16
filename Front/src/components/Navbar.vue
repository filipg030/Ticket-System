<script>
import { userTokenStore } from "../store/token.js"
import router from '../router';
import { sendLogoutRequest } from "../js/logout.js";
import { postArchive } from "../api/index.js";

export default {
  
  data() {
    return {
      admin: false,
      panel: null
    }
  },
  methods:{
    showDownloadArchiveModal(){
      this.$refs.downloadArchive.showModal()
    },
    cancelDownloadArchive(){
      this.$refs.downloadArchive.close();

    },
    async downloadArchiveConfirm(){
      let year = document.getElementById("yearChosen").value
      let getArchive = await postArchive("http://localhost:3001/make_table/" + year)
      console.log(getArchive)
    },
    async logout() {
      

       let boolean_redirect = await sendLogoutRequest()
       console.log("REDIRECDT: "+boolean_redirect);
       
        if (boolean_redirect){
          alert("RESOLVE")
          // userTokenStore().clear()
          // router.push("/")
        } else {
          alert("REJECT")
        }


    },
    changePanel(panel){
      window.location.href = panel;
    }
  },

  mounted() {
    const currentTimeP = document.getElementById("currentTime")
    setInterval(()=>{
      let date = new Date()
      let time = ''
      time += date.getHours()
      if(date.getMinutes() < 10){
        time += ':0' + date.getMinutes()
      } else {
        time += ':' + date.getMinutes()
      }
      
      if(date.getSeconds() < 10){
        time += ':0' + date.getSeconds()
      } else {
        time += ':' + date.getSeconds()
      }
      currentTimeP.innerHTML = time
    },1000)

    let token = userTokenStore()
    this.panel = location.pathname
    if(token.getRole() == "admin"){
      this.admin = true
    } else {
      this.admin = false
    }
  }
}
</script>

<template>
  <div class="w-full h-24 flex flex-row justify-between bg-slate-200 p-2 items-center navbar">
    <div class="w-128 h-16 flex flex-row justify-between">
      <img src="../assets/logo-zsl-white.png" alt="Logo" >
      <p style="width:200px; font-size: larger; text-align: center; display: flex; align-items: center; justify-content: center;">ZSŁ Ticket System</p>
    </div>

    <p id="currentTime" style="display: flex; align-items: center; justify-content: center; font-size: x-large; color:white;"></p>
    
    <div class="gap-4 w-128 h-16 flex justify-end align-middle mr-4">
      <button v-if="panel=='/admin' && admin" style="display: flex; justify-content: center; align-items: center;" class="w-auto flex justify-center align-middle text-center text-zslblue-200 hover:text-white" @click="changePanel('admin-archive')">
        Pokaż Archiwum <i class="pl-1 pi pi-book"></i>
      </button>
      <button v-if="panel=='/admin-archive' && admin" style="display: flex; justify-content: center; align-items: center;" class="w-auto flex justify-center align-middle text-center text-zslblue-200 hover:text-white" @click="changePanel('admin')">
        Pokaż Aktywne <i class="pl-1 pi pi-list"></i>
      </button>
      <button v-if="(panel=='/admin' || panel=='/admin-archive') && admin" style="display: flex; justify-content: center; align-items: center;" class="w-auto flex justify-center align-middle text-center text-green-400 hover:text-white" @click="changePanel('user')">
        Dodaj Ticket <i class="pl-1 pi pi-plus-circle"></i>
      </button>
      <button v-if="(panel=='/admin-archive') && admin" style="display: flex; justify-content: center; align-items: center;" class="w-auto flex justify-center align-middle text-center text-blue-400 hover:text-white" @click="showDownloadArchiveModal()">
        Pobierz Archwium <i class="pl-1 pi pi-arrow-down"></i>
      </button>
      <button v-if="panel=='/user' && admin" style="display: flex; justify-content: center; align-items: center;" class="w-auto flex justify-center align-middle text-center text-green-400 hover:text-white" @click="changePanel('admin')">
        Panel Admina <i class="pl-1 pi pi-bookmark-fill"></i>
      </button>
      <button style="display: flex; justify-content: center; align-items: center;" class="logoutBt border-l-2 border-zslblue-500  pl-4 w-auto flex justify-center align-middle text-center text-red-400 hover:text-white" @click="logout">
        Wyloguj <i class="pl-1 pi pi-sign-out"></i>
      </button>
    </div>
    
  </div>
  <dialog ref="downloadArchive" class="downloadArchiveModal" >
    <p>Z którego roku pobrać archiwum? (n.p "2024-2025")</p>
    <input type="text" id="yearChosen" name="yearChosen" class="yearInput" placeholder="2024-2025">
    <div class="absolute bottom-2 right-2 flex flex-row gap-2">
      <button class="zslblueBtn" @click="cancelDownloadArchive">anuluj</button>
      <button class="zslorangeBtn" @click="downloadArchiveConfirm">wyślij</button>
    </div>
  </dialog>
</template>

<style scoped>

.navbar {
  @apply bg-zslblue-700 text-zslblue-200
}

.logoutBt:hover {
    @apply text-white
}

.sideBarBtn{
  @apply rounded-sm hover:bg-slate-400 transition-all duration-100 p-2
}

.downloadArchiveModal {
  position: absolute;
  left: 50% - 150px;
  top: 50% - 100px;
  width: 300px;
  height: 200px;
  padding: 30px;
  border-radius: 10px;
}

.yearInput{
  margin-top: 20px;
  border: 1px solid black;
}
</style>
