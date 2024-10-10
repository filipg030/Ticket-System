<script>
export default {
  
  data() {
    return {
    }
  },
  methods:{

  },


}
</script>

<template>
  <div class="w-full h-20 flex flex-row justify-between bg-slate-200 p-2 items-center footer">
    <div class="w-128 h-16 flex flex-row justify-between">
      <p style="width:200px; font-size: larger; text-align: center; display: flex; align-items: center; justify-content: center;">ZSŁ Ticket System</p>
    </div>
    <p style="font-size: larger; text-align: end; display: flex; align-items: center; justify-content: center;">Stronę zaprojektowali: Adrian Dusik, Dominik Mincberger, Daniel Sidorowicz, Mikołaj Mikołajczyk i Filip Grudziecki</p>

    
  </div>
</template>

<style scoped>

.footer {
  background-color: rgba(52,58,64,255);
  color:rgba(124,140,154,255) ;
  overflow: hidden;
}


.logoutBt:hover {
    color: white;
}

.sideBarBtn{
  @apply rounded-sm hover:bg-slate-400 transition-all duration-100 p-2
}

</style>
