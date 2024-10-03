<script>
export default {
  
  data() {
    return {
    }
  },
  methods:{

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
    
    <div style="width: 281px;" class="w-128 h-16 flex justify-end align-middle">
      <RouterLink style="display: flex; justify-content: center; align-items: center;" class="logoutBt w-24 flex justify-center align-middle text-center" to="/">
        Wyloguj
      </RouterLink></div>
    
  </div>
</template>

<style scoped>

.navbar {
  background-color: rgba(52,58,64,255);
  color:rgba(124,140,154,255) ;
}


.logoutBt:hover {
    color: white;
}

.sideBarBtn{
  @apply rounded-sm hover:bg-slate-400 transition-all duration-100 p-2
}

</style>
