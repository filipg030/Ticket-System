<script>
import Navbar from '../components/Navbar.vue';
export default {

  data() {
    return {
      severity: 0,
      imie: null,
      nazwisko:null,
      sala:null,
      problem:null,
      pietro: null,
    }
  },
  components: {
    Navbar
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
  <div style="width: 100%;">
    <Navbar ></Navbar>

  </div>
  <div class="w-full h-full flex justify-center">
    <div class="m-4 w-2/3 flex flex-col gap-1">
      <div class="flex flex-row justify-between gap-2">
        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Imie</label>
          <input class="slateTextInput w-full" type="text" id="imieInput">
        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Nazwisko</label>
          <input class="slateTextInput w-full" type="text" id="nazwiskoInput">
        </div>
      </div>

      <label for="pietroInput">Piętro</label>
      <div class="rounded-xl p-0 overflow-hidden flex flex-row">
        <select v-model="pietro" name="pietro" class="w-full bg-slate-600 p-2 text-slate-100 font-semibold focus:outline-none" id="pietroInput">
          <option value="szatnie">Szatnie</option>
          <option value="parter">Parter</option>
          <option value="1">Piętro 1</option>
          <option value="2">Piętro 2</option>
          <option value="pracParter">Pracownia parter</option>
          <option value="prac1">Pracownia piętro 1</option>
          <option value="int2">Internat piętro 2</option>
          
        </select>
      </div>


      <label for="salaInput">Sala</label>
      <div class="rounded-xl p-0 overflow-hidden flex flex-row">
        <select v-model="sala" name="sala" class="w-full bg-slate-600 p-2 text-slate-100 font-semibold focus:outline-none" id="salaInput">

        </select>
      </div>



      <label for="problemInput">Problem</label>
      <textarea class="slateTextArea" id="problemInput" rows="10"></textarea>

      <label for="problemInput">Powaga</label>
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