<script setup>
  // Imports Vue
  import {computed, onMounted, ref, watch} from 'vue'
  import axios from 'axios'

  // Components
  import Header from '../components/Header.vue'
  import Cartes from '../components/Cartes.vue'
  import Input from '../components/Input.vue'
  import Aside from '../components/Aside.vue'

  // Router
  import {useRoute, RouterLink, RouterView} from 'vue-router'
  const route = useRoute()

  // Refs
  let apiData = ref({})
  let idpartie = ref()
  let iduser = ref()

  onMounted(async () => {
    // ----- Initialisation des params d'URL -----
    idpartie.value = route.params.idpartie
    console.log(idpartie.value)
    iduser.value = route.params.iduser
    console.log(iduser.value)

    // ----- Fonction FetchApi -----
    async function fetchApi() {
      let response = await axios.get(`http://localhost:8088/sae401/index.php/api/parties/${idpartie.value}`)
      console.log(response.data)
      return response.data
    }

    // ----- Execute FetchApi at start + every 1.5s -----
    apiData.value = await fetchApi()
    setInterval(async () => {
      apiData.value = await fetchApi()
    }, 1500)
  })

  async function FinDeTour() {
    // DELETE MOT INDICE
    delete this.apiData.motIndice
    delete this.apiData.nbMotsADecouvrir

    let newApiData = this.apiData
    newApiData.nbMotsADecouvrir = null
    newApiData.motIndice = null
    axios.patch(`http://localhost:8088/sae401/index.php/api/parties/${this.idpartie}`, newApiData, {headers: {'Content-Type': 'application/merge-patch+json'}})
        .then(response => {console.log(response.data);})
        .catch(error => {console.error(error)});

    // CHANGEMENT QUI INPUT
    if (this.apiData.quiInput == 1) this.apiData.quiInput = 2
    else this.apiData.quiInput = 1;

    axios.patch(`http://localhost:8088/sae401/index.php/api/parties/${this.idpartie}`, this.apiData, {headers: {'Content-Type': 'application/merge-patch+json'}})
        .then(response => {console.log(response.data);})
        .catch(error => {console.error(error);});
  }
  async function JoinPartie() {
    console.log('bit')
    apiData.value.etatPartie = "En cours"
    axios.patch(`http://localhost:8088/sae401/index.php/api/parties/${idpartie.value}`, apiData.value, {headers: {'Content-Type': 'application/merge-patch+json'}})
        .then(response => {console.log(response.data);})
        .catch(error => {console.error(error)})
  }
</script>


<template>
  <div class="wrapper">
    <Header :apiData="apiData" :idpartie="idpartie" :iduser="iduser"/>

    <!-- IF PARTIE PERDUE -->
    <div v-if="apiData.etatPartie === 'Perdue'" class="victoire-container">
      <transition name="victoiretrans">
        <div class="victoire">
          <h1>Vous avez perdu !</h1>
          <h2>Vous avez cliqué sur une carte noire :(</h2>
        </div>
      </transition>
      <div class="masque"></div>
    </div>

    <!-- IF PERSO 2 VIENT DE JOIN -->
    <div v-if="apiData.etatPartie === 'En attente' && iduser == 2" class="victoire-container">
      <transition name="victoiretrans">
        <div class="victoire">
          <h1>Rejoindre cette partie ?</h1>
          <h2>Ceci lancera la partie</h2>
          <h3 @click="JoinPartie"> Rejoindre</h3>
        </div>
      </transition>
      <div class="masque"></div>
    </div>

    <!-- IF PARTIE GAGNÉE -->
    <div v-if="apiData.etatPartie === 'Gagnée'" class="victoire-container">
      <transition name="victoire">
        <div class="victoire">
          <h1>Victoire</h1>
          <h2>Bravo, Vous avez gagné la partie !</h2>
        </div>
      </transition>
      <div class="masque"></div>
    </div>

    <section class="interface-wrapper">
      <div class="interface">
        <Cartes :apiData="apiData" :idpartie="idpartie" :iduser="iduser" :FinDeTour="FinDeTour"/>
        <Input :apiData="apiData" :idpartie="idpartie" :iduser="iduser" :FinDeTour="FinDeTour"/>
        <Aside :apiData="apiData"/>
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

  .victoire-container{
    position: absolute;
    height: 100%;
    width: 100%;
    background: rgba(0,0,0,0.25);
    z-index: 2;

    .victoire{
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      padding: 1em;
      height: fit-content;
      width: fit-content;
      z-index: 10;

      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      background: white;
      border-radius: 1em;
      border: 3px solid black;
    }
  }

  .victoire-enter-active, .victoire-leave-active {
    transition: 500ms cubic-bezier(.0, .8, .45, 1);
  }
  .victoire-enter-from, .victoire-leave-to {
    top: 100%;
    transform: translate(-50%, 0%);
  }

  .interface-wrapper {
    width: 100%;
    height: calc(100% - 5em);

    display: flex;
    justify-content: center;
    align-items: center;

    .interface {
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
