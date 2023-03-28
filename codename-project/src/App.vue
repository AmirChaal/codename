<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import axios from 'axios'

// Components
import Header from './components/Header.vue'
import Cartes from './components/Cartes.vue'
import Input from './components/Input.vue'
import Aside from './components/Aside.vue'

// Router
import { useRoute, RouterLink, RouterView } from 'vue-router'
const route = useRoute()

// ---------------------------------------------------------------------------

// Fetch API data every 1.5s
let apiData = ref({})
let gameid = ref()
onMounted(async () => {
  watch(() => route.params.id, async (id) => {
    console.log(id)
    gameid.value = id
    async function fetchApi() {
      let response = await axios.get(`http://localhost:8088/sae401/index.php/api/parties/${id}`)
      console.log(response.data)
      return response.data
    }
    apiData.value = await fetchApi()
    setInterval(async () => {
      apiData.value = await fetchApi()
    }, 1500)
  })
})
console.log(gameid)

let userid = ref()
if (route.params.user) {
  userid.value = route.params.user
}
console.log(userid)

</script>

<template>
  <div class="wrapper">
    <Header />

    <section class="interface-wrapper">
      <div class="interface">
        <Cartes :apiData="apiData" />
        <Input :apiData="apiData" />
        <Aside />
      </div>
    </section>
  </div>
</template>


<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  position: absolute;
  height: 100%;
  width: 100%;

  .interface-wrapper{
    width: 100%;
    height: calc(100% - 5em);

    display: flex;
    justify-content: center;
    align-items: center;

    .interface{
      height: fit-content;
      width: fit-content;
      padding: 1em;

      display: grid;
      grid-template-columns: 67em 25em;
      grid-template-rows: 42em 6em;
      grid-gap: 1em;
    }
  }
}
</style>
