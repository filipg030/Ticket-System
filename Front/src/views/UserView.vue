<script>
import Navbar from '../components/Navbar.vue';
import Footer from '../components/Footer.vue';

import Ticket from '../js/Ticket';

import { userTokenStore } from "../store/token.js"

import { post } from '../api';

import * as Token from "../js/Token.js";


export default {

  data() {
    return {
      powaga: 0,
      name: null,

      surname: null,
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

    showSendTicketModal(){
      this.$refs.acceptTicketModal.showModal();
    },

    async sendTicket() {
      //check if all values are set



      this.ticket = new Ticket(this.name,this.surname,this.pietro,this.sala,this.problem,this.powaga);

      console.log(JSON.stringify(this.ticket));

      let isValid = this.ticket.isValid();
      if(!isValid){
        // obraź użytkownika słownie

        console.error("nnn");
        alert("niepoprawnie wypełnione pola")
      }
      else{
        // wyślij

        let sendTicket = await post("http://localhost:3001/api/add", {room: this.ticket.sala, desc: this.ticket.problem, floor: this.ticket.pietro, level: this.ticket.powaga, status: "pending", name: this.ticket.name, surname: this.ticket.surname })

        console.log(sendTicket);

        window.location.reload();

      }

      // handle modal logic
      this.$refs.acceptTicketModal.close();
    },

    cancelTicketSend(){
      // handle modal logic
      this.$refs.acceptTicketModal.close();
    },
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
    let token = userTokenStore()
    console.log(token.token)
    console.log(Token.jwtDecode(token.token));
    let decodedToken = Token.jwtDecode(token.token)

    let name = decodedToken.name.split(" ")
    
    this.name = name[0]
    this.surname = name[1]

    console.log(this.name, this.surname);
    
    

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
          <label for="salaInput">name</label>

          <p class="zslblueTextInput w-full" type="text" id="nameInput" v-text="name"></p>
        </div>

        <div class="w-1/2 flex flex-col">
          <label for="salaInput">surname</label>

          <p class="zslblueTextInput w-full" type="text" id="surnameInput" v-text="surname"></p>
        </div>
      </div>

      <label for="pietroInput">Piętro</label>

      <div class="p-0 overflow-hidden flex flex-row">
        <select v-model="pietro" nazwa="pietro"
          class="w-full bg-zslblue-600 p-2 text-zslblue-100 font-semibold focus:outline-none" id="pietroInput">

          <option v-for="pietro in pietra" :value=pietro.nazwa>{{ pietro.nazwa }}</option>
        </select>
      </div>


      <label for="salaInput">Sala</label>
      <div class="p-0 overflow-hidden flex flex-row">
        <select v-model="sala" nazwa="sala"
          class="w-full bg-zslblue-600 p-2 text-zslblue-100 font-semibold focus:outline-none" id="salaInput">
          <option v-for="sala in validSale" :value=sala>{{ sala }}</option>


          
        </select>

      </div>



      <label for="problemInput">Problem</label>
      <textarea class="zslblueTextArea" id="problemInput" rows="10" v-model="problem"></textarea>

      <label for="problemInput">Powaga</label>
      <div class="flex flex-row gap-2">
        <button class="pointer p-2  bg-red-500 hover:bg-red-600 w-full"
          :class="{ 'inactiveBtn': powaga != 2 }" @click="powaga = 2">Ważne!</button>
        <button class="pointer p-2  bg-yellow-500 hover:bg-yellow-600 w-full"
          :class="{ 'inactiveBtn': powaga != 1 }" @click="powaga = 1">Troche ważne</button>
        <button class="pointer p-2  bg-zslblue-500 hover:bg-zslblue-600 w-full"
          :class="{ 'inactiveBtn': powaga != 0 }" @click="powaga = 0">Nie pali sie</button>
      </div>
      <div class="w-full h-0 border-b-2 my-4 border-zslblue-500"></div>
      <button @click=showSendTicketModal class="zslblueBtn">Wyślij <i class="text-xl uil uil-envelope-upload"></i></button>
    </div>
  </div>
  <div style="width: 100%; position: absolute; bottom: 0;">
    <Footer></Footer>
  </div>

  <dialog ref="acceptTicketModal" class="ticketConfirmModal">
    <p>Czy na pewno chcesz wysłać ten ticket?</p>
    <div class="absolute bottom-2 right-2 flex flex-row gap-2">
      <button class="zslblueBtn" @click="cancelTicketSend">anuluj</button>
      <button class="zslorangeBtn" @click="sendTicket">wyślij</button>
    </div>
  </dialog>
</template>

<style scoped>
label {
  @apply mt-2;
}

.inactiveBtn {
  filter: grayscale(75%);
  opacity: 75%;
}

.ticketConfirmModal{
  @apply relative bg-white z-50 p-4 ;
}

.ticketConfirmModal{
  width: 300px;
  height: 150px;
}

.ticketConfirmModal::backdrop{
  @apply bg-black/50;
}

</style>