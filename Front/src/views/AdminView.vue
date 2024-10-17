<script>
import Navbar from "../components/Navbar.vue"
import TicketComponent from '../components/TicketComponent.vue';
import Ticket from "../js/Ticket";
import sampleTickets from "../assets/sampleTickets.json"
import { get } from "../api";

export default {

  data() {
    return {
      tickets: []
    }
  },
  components: {
    Navbar,
    TicketComponent
  },
  methods: {

  },

  async mounted() {
    let ticketsFromDB = await get("http://localhost:3001/api/get")
    // console.log(ticketsFromDB);
    

    for (let i = 0; i < ticketsFromDB.length; i++) {
      const ticketData = ticketsFromDB[i];

      let ticket = new Ticket(
        ticketData.imie,
        ticketData.nazwisko,
        ticketData.floor,
        ticketData.room,
        ticketData.desc,
        ticketData.level
      );

      ticket.done = ticketData.status
      ticket.id = ticketData.id;

      console.log(i, ticket)

      this.tickets.push(ticket);
    }
  }
}
</script>

<template>

  <div class="all">
    <Navbar></Navbar>
    <div class="main" style="min-width: 840px;">
      <div class="descriptionBar">
        <div class="w-1/10" id="ticketID">
          <h2>ID</h2>
        </div>
        <div class="w-1/10" id="ticketRoom">
          <h2>Sala</h2>
        </div>
        <div class="w-1/10" id="ticketLastName">
          <h2>Nazwisko</h2>
        </div>
        <div class="w-1/10" id="ticketFirstName">
          <h2>Imie</h2>
        </div>
        <div class="w-2/5" id="ticketProblemDesc">
          <h2>Opis problemu</h2>
        </div>
        <div class="w-1/10" id="ticketSeverity">
          <h2>Stopień problemu</h2>
        </div>
        <div class="w-1/10" id="ticketResolution">
          <h2>Status</h2>
        </div>
      </div>

      <TicketComponent v-for="ticket in tickets" v-bind="ticket" />
    </div>
  </div>


</template>

<style scoped>
label {
  @apply mt-2;
}

.all {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
}

.inactiveBtn {
  filter: grayscale(75%);
  opacity: 75%;
}

.main {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
}

.descriptionBar {
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  border-bottom: 1px solid lightgray;
}

h2 {
  @apply font-bold;
}
</style>
