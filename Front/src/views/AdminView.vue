<script>
import Navbar from "../components/Navbar.vue"
import TicketComponent from '../components/TicketComponent.vue';
import Footer from "../components/Footer.vue";
import Ticket from "../js/Ticket";
import sampleTickets from "../assets/sampleTickets.json"
import { get } from "../api";

export default {

  data() {
    return {
      tickets: [],
      sortColumn: "",
      sortDirection: false // false - desc, true - asc
    }
  },
  components: {
    Navbar,
    Footer,
    TicketComponent
  },
  methods: {
    
    toggleSort(column) {
      if (column == this.sortColumn) { this.sortDirection = !this.sortDirection }
      else {
        this.sortColumn = column;
        this.sortDirection = true;
      }

      this.sortColumnFunc(this.sortColumn)
    },
    chevronDirection(column) {
      if (column == this.sortColumn) {
        if (this.sortDirection) return "pi pi-chevron-up"
        else return "pi pi-chevron-down"
      }
      else {
        return "pi pi-code rotate-90"
      }
    },

    sortColumnFunc(byWhat) {
      console.log(this.tickets);

      
      if(byWhat == "id" || byWhat == "powaga"){
        this.tickets.sort((a, b) => a[byWhat] - b[byWhat]);
      }
       else {
        this.tickets.sort((a, b) => a[byWhat].localeCompare(b[byWhat]))
      }
      console.log(this.tickets[0].powaga);
      
      if(!this.sortDirection) this.tickets.reverse();

    }
  },
  computed: {

  },
  async mounted() {
    let ticketsFromDB
    

    if(location.pathname == "/admin"){
      ticketsFromDB = await get("http://localhost:3001/api/get")
    } else if(location.pathname == "/admin-archive") {
      ticketsFromDB = await get("http://localhost:3001/api/get_archive")
    }
    
    console.log('pathname: ' + location.pathname + ticketsFromDB);



    for (let i = 0; i < ticketsFromDB.length; i++) {
      const ticketData = ticketsFromDB[i];

      let ticket = new Ticket(
        ticketData.name,
        ticketData.surname,
        ticketData.floor,
        ticketData.room,
        ticketData.desc,
        ticketData.level
      );

      ticket.done = ticketData.status
      ticket.id = ticketData._id;

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
        <div class="w-1/10 columnHeader" id="ticketID">
          <h2>ID</h2>
          <i @click="toggleSort('id')" :class="chevronDirection('id')"></i>
        </div>
        <div class="w-1/10 columnHeader" id="ticketRoom">
          <h2>Sala</h2>
          <i @click="toggleSort('sala')" :class="chevronDirection('sala')"></i>
        </div>
        <div class="w-1/10 columnHeader" id="ticketLastName">
          <h2>surname</h2>
          <i @click="toggleSort('surname')" :class="chevronDirection('surname')"></i>
        </div>
        <div class="w-1/10 columnHeader" id="ticketFirstName">
          <h2>name</h2>
          <i @click="toggleSort('name')" :class="chevronDirection('name')"></i>
        </div>
        <div class="w-2/5 columnHeader" id="ticketProblemDesc">
          <h2>Opis problemu</h2>
          <i @click="toggleSort('problem')" :class="chevronDirection('problem')"></i>
        </div>
        <div class="w-1/10 columnHeader" id="ticketSeverity">
          <h2>Stopień problemu</h2>
          <i @click="toggleSort('powaga')" :class="chevronDirection('powaga')"></i>
        </div>
        <div class="w-1/10 columnHeader" id="ticketResolution">
          <h2>Status</h2>
          <!-- <i @click="toggleSort('done')" :class="chevronDirection('done')"></i> -->
        </div>
      </div>

      <TicketComponent v-for="ticket in tickets" v-bind="ticket" />
    </div>
    <Footer></Footer>


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
  @apply font-bold w-auto;
}

i{
  @apply text-black z-50 cursor-pointer
}

.columnHeader{
  @apply relative flex flex-row items-center justify-between
}
</style>
