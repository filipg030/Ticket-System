<script>
import SideBar from '../components/Navbar.vue'

export default {

  data() {
    return {
      powaga: 0,
      name: null,
      surname:null,
      sala:null,
      problem:null,
    }
  },
  components: {
    SideBar
  },
  methods: {
    sendTicket(){
      //check if all values are set
    }
  },

  mounted() {

  }
}
</script>

<template>
  <SideBar style="float: left;" />
  <div class="w-auto h-screen flex  justify-center">
    <div class="m-4 w-2/3 flex flex-col gap-1">
        <div class="w-1/2 flex flex-col">
          <label for="salaInput">name</label>
          <input class="zslblueTextInput w-full" type="text" id="nameInput">
        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">surname</label>
          <input class="zslblueTextInput w-full" type="text" id="surnameInput">
        </div>

        <div class="w-full h-0 border-b-2 my-4 border-slate-500"></div>


        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Stare hasło</label>
          <input class="zslblueTextInput w-full" type="password" id="stareHasloInput">
        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Nowe hasło</label>
          <input class="zslblueTextInput w-full" type="password" id="noweHasloInput">
        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Potwierdź nowe hasło</label>
          <input class="zslblueTextInput w-full" type="password" id="noweHasloConfirmInput">
        </div>



<div class="w-full h-0 border-b-2 my-4 border-slate-500"></div>
      <button class="zslblueBtn">Zapisz <i class="uil uil-save"></i></button>
    </div>
  </div>
</template>

<style scoped>
label {
  @apply mt-2;
}

.inactiveBtn {
  filter: grayscale(75%);
  opacity: 75%;
}
</style>