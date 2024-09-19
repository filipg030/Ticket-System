<script>
export default {
  data() {
    return {
        adminUser:0
    }
  },
  methods:{

  },

  mounted() {

  }
}
</script>

<template>
  <div class="w-full h-full flex items-center justify-center gradient">
    <div class="z-0 absolute top-10 h-1/2 items-center justify-center flex flex-col text-9xl text-slate-200">
        ZSŁ
    </div>
    <div class="z-10 w-64 h-fit border rounded-lg p-2 bg-slate-100 shadow-lg shadow-black/50 text-slate-100">
        <div v-if="adminUser == 0" class="flex flex-row gap-2 justify-stretch">
        <button class="rounded-md w-full h-16 p-2 bg-seagull-500" @click="adminUser=1">Nauczyciel</button>
        <button class="rounded-md w-full h-16 p-2 bg-rose-500" @click="adminUser=2">Admin</button>
        </div>
    <div class="flex flex-col gap-2" v-if="adminUser == 1">
        <p class="mb-2 text-slate-950/75">Nauczyciel</p>
        <input class="seagullTextInput" placeholder="login" type="text"  name="username" id="username">
        <input class="seagullTextInput" placeholder="hasło" type="password" name="passwd" id="passwd">
        <button class="backBtn" @click="adminUser=0">wróć</button>
    </div>
    <div class="flex flex-col gap-2" v-if="adminUser == 2">
        <p class="mb-2 text-slate-950/75">Admin</p>
        <input class="roseTextInput" type="text" placeholder="login" name="username" id="username">
        <input class="roseTextInput" type="password" placeholder="hasło" name="passwd" id="passwd">
        <button class="backBtn" @click="adminUser=0">wróć</button>
    </div>
    </div>
  </div>
</template>

<style scoped>

.backBtn{
    @apply bg-slate-600 hover:bg-slate-800 transition-all duration-100 rounded-md p-1 text-slate-200
}

.gradient{
    background: rgb(2,0,36);
background: linear-gradient(43deg, rgba(2,0,36,1) 0%, rgba(9,9,121,1) 35%, rgba(0,212,255,1) 100%);
}

</style>