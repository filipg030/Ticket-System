<script>
export default {
  
  data() {
    return {
    }
  },
  methods:{

  },

  mounted() {

  }
}
</script>

<template>
  <div class="w-32 h-full flex flex-col justify-items gap-2 bg-slate-200 p-2">
    <RouterLink class="sideBarBtn flex justify-center" to="/user">
    <button class="sideBarBtn">Zgłoś</button>
    </RouterLink>
    <RouterLink class="sideBarBtn flex justify-center" to="/konto/test">
    <button class="sideBarBtn">Konto</button>
    </RouterLink>
    <RouterLink class="roseBtn mt-auto flex justify-center" to="/">
    <button>Wyloguj</button>
    </RouterLink>
  </div>
</template>

<style scoped>

.sideBarBtn{
  @apply rounded-sm hover:bg-slate-400 transition-all duration-100 p-2
}

</style>
