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
  <div class="w-full h-14 flex flex-row justify-between bg-slate-200 p-2 items-center footer">
    <div class="w-128 h-auto flex flex-row justify-between ">
      <p class="w-auto text-lg text-center flex items-center content-center" >Stronę zaprojektowali: Dominik Mincberger, Daniel Sidorowicz, Mikołaj Mikołajczyk i Filip Grudziecki i</p>
    </div>
    <p class="overflow-visible" style="font-size: smaller; text-align: end; display: flex; align-items: center; justify-content: center;">Adrian Dusik</p>

    
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
