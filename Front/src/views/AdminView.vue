<script>
import SideBar from '../components/SideBar.vue'
import Ticket from '../components/TicketComponent.vue';

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
    SideBar,
    Ticket
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
  <div class="all">
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

      <Ticket />
    </div>
  </div>
  

</template>

<style scoped>
label {
  @apply mt-2;
}

.all {
  display: flex;
  flex-direction: row;
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