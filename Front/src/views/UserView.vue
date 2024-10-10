<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import Ticket from '../js/Ticket';

export default {

  data() {
    return {
      powaga: 0,
      imie: null,

      nazwisko: null,
      sala: null,
      problem: null,
      pietro: null,

      pietra: [
        { nazwa: 'Szatnie', sale: [1,2,3,4,5,6,7,11] },
        { nazwa: 'Parter', sale: [1,2,3,4,5,6,7,8,13,14,15,19,21,22,23] },
        { nazwa: 'Piętro 1', sale: [104,"104a",105,106,107,108,109,110,111,112,113,114,115,119,120,121,122,123,124,125,126] },
        { nazwa: 'Piętro 2', sale: [203,204,205,206,207,209,210,211,212,213,214,"214a",215,219,220,221,222,223] },
        { nazwa: 'Pracownie parter', sale: [401,402,403,404,405,406,407,408,412,413,414,415,416,417,] },
        { nazwa: 'Pracownie piętro 1', sale: [501,502,"503K", "503k", 504,505,507,"507i", 508, 509,"510i", "511i", '512i', 514,515]},
        { nazwa: 'Internat piętro 2', sale: [301,304,305,307,308,310,317,319,] },
      ],

      ticket:null

    }
  },
  components: {
    Navbar,
    Footer
  },
  methods: {
    sendTicket() {
      //check if all values are set



      this.ticket = new Ticket(this.imie,this.nazwisko,this.pietro,this.sala,this.problem,this.powaga);

      console.log(JSON.stringify(this.ticket));

      let isValid = this.ticket.isValid();
      if(!isValid){
        // obraź użytkownika słownie

        console.error("nnn");
      }
      else{
        // wyślij

        console.log("wyslane");

      }


    }
  },
  computed: {
    validSale() {
      let sale = [];

      for (let i = 0; i < this.pietra.length; i++) {
        const pietro = this.pietra[i];
        if (pietro.nazwa == this.pietro) {
          sale = pietro.sale;
          return sale;
        }
      }

      return null;
    }
  },
  mounted() {

  }
}
</script>

<template>
  <div style="width: 100%;">
    <Navbar></Navbar>

  </div>
  <div class="w-full h-max flex justify-center">
    <div class="m-4 w-2/3 flex flex-col gap-1">
      <div class="flex flex-row justify-between gap-2">
        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Imie</label>

          <input class="slateTextInput w-full" type="text" id="imieInput" v-model="imie">

        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">Nazwisko</label>

          <input class="slateTextInput w-full" type="text" id="nazwiskoInput" v-model="nazwisko">

        </div>
      </div>

      <label for="pietroInput">Piętro</label>

      <div class="rounded-xl p-0 overflow-hidden flex flex-row">
        <select v-model="pietro" nazwa="pietro"
          class="w-full bg-slate-600 p-2 text-slate-100 font-semibold focus:outline-none" id="pietroInput">

          <option v-for="pietro in pietra" :value=pietro.nazwa>{{ pietro.nazwa }}</option>
        </select>
      </div>


      <label for="salaInput">Sala</label>
      <div class="rounded-xl p-0 overflow-hidden flex flex-row">
        <select v-model="sala" nazwa="sala"
          class="w-full bg-slate-600 p-2 text-slate-100 font-semibold focus:outline-none" id="salaInput">
          <option v-for="sala in validSale" :value=sala>{{ sala }}</option>


          
        </select>

      </div>



      <label for="problemInput">Problem</label>
      <textarea class="slateTextArea" id="problemInput" rows="10" v-model="problem"></textarea>

      <label for="problemInput">Powaga</label>
      <div class="flex flex-row gap-2">
        <button class="pointer p-2 rounded-md bg-red-500 hover:bg-red-600 w-full"
          :class="{ 'inactiveBtn': powaga != 2 }" @click="powaga = 2">Ważne!</button>
        <button class="pointer p-2 rounded-md bg-yellow-500 hover:bg-yellow-600 w-full"
          :class="{ 'inactiveBtn': powaga != 1 }" @click="powaga = 1">Troche ważne</button>
        <button class="pointer p-2 rounded-md bg-caribbean-500 hover:bg-caribbean-600 w-full"
          :class="{ 'inactiveBtn': powaga != 0 }" @click="powaga = 0">Nie pali sie</button>
      </div>
      <div class="w-full h-0 border-b-2 my-4 border-slate-500"></div>
      <button @click=sendTicket class="caribbeanBtn">Wyślij <i class="text-xl uil uil-envelope-upload"></i></button>
    </div>
  </div>
  <div style="width: 100%; position: absolute; bottom: 0;">
    <Footer></Footer>

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