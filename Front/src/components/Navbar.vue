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
  <div class="w-full h-16 flex flex-row justify-between bg-slate-200 p-2 items-center">
    <p style="width:200px; display: flex; align-items: center; font-size: larger;">ZSŁ Ticket System</p>
    <p id="currentTime" style="display: flex; align-items: center; justify-content: center; font-size: x-large;"></p>
    
    <div style="width:200px;" class="flex justify-end align-middle">
      <RouterLink class="w-24 roseBtn mt-auto flex justify-center" to="/">
        Wyloguj
      </RouterLink></div>
    
  </div>
</template>

<style scoped>

.sideBarBtn{
  @apply rounded-sm hover:bg-slate-400 transition-all duration-100 p-2
}

</style>
