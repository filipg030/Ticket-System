<script>
import { patch } from '../api';

export default {

  data() {
    return {

    }
  },
  props: {
    id: Number,
    done: String,
    name: String,
    surname: String,
    pietro: String,
    sala: String,
    problem: String,
    powaga: Number,
  },
  methods: {
    async closeTicket(id) {
      if (confirm("Czy na pewno zamknąć ticket?") == true) {
        // console.log("tak");

        let sendTicketClose = await patch(`http://localhost:3001/api/archive/${id}`, {})
        console.log(sendTicketClose);
        location.reload()
        
        
      }
    }
  },

  computed: {
    powagaText() {
      if (this.powaga == 0) return "Nie pali sie"
      else if (this.powaga == 1) return "Troche ważne"
      else if (this.powaga == 2) return "Ważne!"
      else return "---";
    },
    powagaClass() {
      if (this.powaga == 0) return "bg-green-400"
      else if (this.powaga == 1) return "bg-yellow-400"
      else if (this.powaga == 2) return "bg-red-400"
    }
  },

  mounted() {

  }
}
</script>

<template>
  <div class="w-full flex gap-2.5 min-h-16 h-fit" style="border-bottom: 1px solid lightgray;">
    <div class="w-1/10 flex items-center" id="ticketID">
      <p>{{ id }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketRoom">
      <p>{{ sala }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketLastName">
      <p>{{ surname }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketFirstName">
      <p>{{ name }}</p>
    </div>
    <div class="w-2/5 flex items-center" id="ticketProblemDesc">
      <textarea readonly class="w-full min-h-12" :value="problem"></textarea>
    </div>
    <div class="w-1/10 flex items-center" id="ticketSeverity">
      <p :class=[powagaClass] class="p-2 ">{{ powagaText }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketDone">
      <button v-if="done == 'pending'" class="p-2 bg-red-400 hover:bg-white" @click="closeTicket(id)">
        Oczekujący
      </button>
      <div v-else class="p-2 bg-green-400 ">
        Rozwiązany
      </div>
      <!-- <p>{{ done == "pending" ? "Oczekujący" : "Rozwiązany" }}</p> -->
    </div>
  </div>
</template>

<style scoped>
p {
  height: fit-content;
}
</style>
