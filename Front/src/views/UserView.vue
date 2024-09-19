<script>
import SideBar from '../components/SideBar.vue'

export default {

  data() {
    return {
      severity: 0,
      imie: null,
      nazwisko:null,
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
      <div class="flex flex-row justify-between gap-2">
        <div class="w-1/2 flex flex-col">
          <label for="salaInput">imie</label>
          <input class="seagullTextInput w-full" type="text" id="imieInput">
        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">nazwisko</label>
          <input class="seagullTextInput w-full" type="text" id="nazwiskoInput">
        </div>
      </div>

      <label for="salaInput">sala</label>
      <div class="rounded-xl p-0 overflow-hidden flex flex-row">
        <input class="w-full bg-seagull-500 p-2 text-slate-100 font-semibold focus:outline-none" type="text" id="salaInput">
        <button class="cursor-pointer aspect-square w-8 bg-seagull-700 hover:bg-seagull-900 text-seagull-100"><i class="uil uil-angle-down"></i></button>
      </div>

      <label for="problemInput">problem</label>
      <textarea class="seagullTextArea" id="problemInput" rows="10"></textarea>

      <label for="problemInput">powaga</label>
      <div class="flex flex-row gap-2">
        <button class="pointer p-2 rounded-md bg-red-500 hover:bg-red-600 w-full"
          :class="{ 'inactiveBtn': severity != 2 }" @click="severity = 2">Ważne!</button>
        <button class="pointer p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 w-full"
          :class="{ 'inactiveBtn': severity != 1 }" @click="severity = 1">Troche ważne</button>
        <button class="pointer p-2 rounded-md bg-caribbean-500 hover:bg-caribbean-600 w-full"
          :class="{ 'inactiveBtn': severity != 0 }" @click="severity = 0">Nie pali sie</button>
      </div>
<div class="w-full h-0 border-b-2 my-4 border-slate-500"></div>
      <button class="caribbeanBtn">Wyślij <i class="text-xl uil uil-envelope-upload"></i></button>
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