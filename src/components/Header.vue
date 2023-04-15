<template>
  <section class="header">
    <h1>CODENAMES DUO</h1>
    <nav>
      <h3 @click="Reinitialiser">Reinitialiser</h3>
      <h3>Quitter</h3>
      <h3>Règles</h3>
    </nav>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "Header.vue",
  props: {
    apiData: {
      type: Object,
      required: true
    },
    idpartie: {
      required: true
    },
    iduser: {
      required: true
    },
  },
  methods: {
    Reinitialiser(){
      this.apiData.cartes.forEach((carte) => {
        carte.etat = 'libre';
      });
      this.apiData.quiInput = 1
      this.apiData.etatPartie = 'En attente'
      delete this.apiData.motIndice
      delete this.apiData.nbMotsADecouvrir
      delete this.apiData.historique

      let newApiData = this.apiData
      newApiData.nbMotsADecouvrir = null
      newApiData.motIndice = null
      newApiData.historique = null
      axios.patch(`http://localhost:8088/sae401/index.php/api/parties/${this.idpartie}`, newApiData, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {console.log(response.data);})
          .catch(error => {console.error(error)});
    }
  }
}
</script>

<style scoped lang="scss">
.header{
  height: 5em;
  padding: 0 3em;

  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 4;
  background: rgb(0,0,0,0.1);

  h1{
    width: fit-content;
    display: block;
  }

  nav{
    display: flex;
    gap: 2em;

    h3{
      background: rgb(0,0,0,0.1);
      padding: 0.5em 1.2em;
      border-radius: 0.4em;
    }
  }
}
</style>