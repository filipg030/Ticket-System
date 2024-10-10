<script>
export default {

  data() {
    return {

    }
  },
  props: {
    id:Number,
    done:Boolean,
    imie:String,
    nazwisko:String,
    pietro:String,
    sala:String | Number,
    problem:String,
    powaga:Number,
  },
  methods: {

  },

  computed: {
    powagaText() {
      if (this.powaga == 0) return "Nie pali sie"
      else if (this.powaga == 1) return "Troche ważne"
      else if (this.powaga == 2) return "Ważne!"
        else return "---";
      },
    powagaClass(){
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
  <div class="w-full flex gap-2.5 h-16" style="border-bottom: 1px solid lightgray;">
    <div class="w-1/10 flex items-center" id="ticketID">
      <p>{{ id }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketRoom">
      <p>{{ sala }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketLastName">
      <p>{{ nazwisko }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketFirstName">
      <p>{{ imie }}</p>
    </div>
    <div class="w-2/5 flex items-center" id="ticketProblemDesc">
      <p>{{ problem }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketSeverity">
      <p :class=[powagaClass] class="p-2 rounded-md">{{ powagaText }}</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketResolution">
      <p>{{ done ? "Zrobione" : "Do Zrobienia" }}</p>
    </div>
  </div>
</template>

<style scoped>
p {
  height: fit-content;
}
</style>
