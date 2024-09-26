<script>
export default {
  
  data() {
    return {
    }
  },
  methods:{

  },

  mounted() {

  }
}
</script>

<template>
  <div class="w-full flex gap-2.5" style="border-bottom: 1px solid lightgray;">
    <div class="w-1/10 flex items-center" id="ticketID">
        <p>1</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketRoom">
        <p>508</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketLastName">
        <p>Sidorowicz</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketFirstName">
        <p>Daniel</p>
    </div>
    <div class="w-2/5 flex items-center" id="ticketProblemDesc"> 
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptates laborum, sit necessitatibus optio quasi quod aliquid delectus explicabo vel numquam molestias nulla minima ducimus eos suscipit est magni. Sint, cumque!</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketSeverity">
        <p>Pali się</p>
    </div>
    <div class="w-1/10 flex items-center" id="ticketResolution">
        <p>Do zrobienia</p>
    </div>
  </div>
</template>

<style scoped>

p {
    height: fit-content;
}


</style>
