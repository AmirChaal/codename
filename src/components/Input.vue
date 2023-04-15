<template>
  <!-- EN ATTENTE DU JOUEUR 2 --------------------------------------------- -->
  <div v-if="apiData.etatPartie === 'En attente'" class="bas">
    <div class="indice">
      <h3>Attendons que le joueur 2</h3>
      <h2>Rejoigne la partie</h2>
    </div>
  </div>

  <!-- PARTIE GAGNÉE --------------------------------------------- -->
  <div v-else-if="apiData.etatPartie === 'Gagnée'" class="bas">
    <div class="indice">
      <h3>Bravo !!!!</h3>
      <h2>:D :D :D :D :D :D :D :D :D :D :D :D :D</h2>
    </div>
  </div>

  <!-- PARTIE PERDUE --------------------------------------------- -->
  <div v-else-if="apiData.etatPartie === 'Perdue'" class="bas">
    <div class="indice">
      <h3>Vous pouvez toujours</h3>
      <h2>Réinitialiser !</h2>
    </div>
  </div>

  <!-- A VOUS DE DONNER UN MOT --------------------------------------------- -->
  <div v-else-if="!motIndiceDefini && apiData.quiInput == iduser && (apiData.etatPartie === 'En cours' || apiData.etatPartie === 'Gagnée')" class="bas">
    <div class="indice">
      <h3>C'est à vous de</h3>
      <h2>Donner un indice !</h2>
    </div>
    <div class="input">
      <input v-model="mot" class="mot" type="text">
      <input v-model="nb" class="nombre" type="number">
      <div @click="SubmitMotIndice" class="envoyer">Envoyer</div>
    </div>
  </div>

  <!-- L'AUTRE JOUEUR DONNE UN MOT --------------------------------------------- -->
  <div v-else-if="!motIndiceDefini && apiData.quiInput != iduser && (apiData.etatPartie === 'En cours' || apiData.etatPartie === 'Gagnée')" class="bas">
    <div class="indice">
      <h3>Votre co-équipier</h3>
      <h2>Donne un indice...</h2>
    </div>
  </div>

  <!-- L'AUTRE JOUEUR DEVINE --------------------------------------------- -->
  <div v-else-if="motIndiceDefini && apiData.quiInput == iduser && (apiData.etatPartie === 'En cours' || apiData.etatPartie === 'Gagnée')" class="bas">
    <div class="indice">
      <h3>Indice en cours</h3>
      <h2>{{ apiData.motIndice }} - {{ apiData.nbMotsADecouvrir }}</h2>
    </div>
    <div class="input">
      <h2>Votre co-équipier devine vos cartes vertes...</h2>
    </div>
  </div>

  <!-- A VOUS DE DEVINER -->
  <div v-else-if="motIndiceDefini && apiData.quiInput != iduser && (apiData.etatPartie === 'En cours' || apiData.etatPartie === 'Gagnée')" class="bas">
    <div class="indice">
      <h3>Indice en cours</h3>
      <h2>{{ apiData.motIndice }} - {{ apiData.nbMotsADecouvrir }} </h2>
    </div>
    <div class="input">
      <div @click="FinDeTour()" class="fini">Fini de deviner</div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import {ref} from "vue";
export default {
  name: "Input.vue",
  data() {
    return {
      mot: '',
      nb: ''
    }
  },
  props: {
    apiData: Object,
    iduser: {
      required: true
    },
    idpartie: {
      required: true
    },
    FinDeTour: {
      required: true,
      type: Function
    }
  },
  methods: {
    async SubmitMotIndice() {
      this.apiData.motIndice = this.mot.toUpperCase();
      this.apiData.nbMotsADecouvrir = parseInt(this.nb);
      if (this.apiData.historique) {
        this.apiData.historique.push({"joueur":this.iduser,"mot":this.mot.toUpperCase(),"nb":this.nb});
      } else {
        this.apiData.historique = [{"joueur":this.iduser,"mot":this.mot.toUpperCase(),"nb":this.nb}]
        console.log(this.apiData.historique)
      }
      axios.patch(`http://localhost:8088/sae401/index.php/api/parties/${this.idpartie}`, this.apiData, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {console.log(response.data);})
          .catch(error => {console.error(error)})
    },
  },
  computed: {
    motIndiceDefini() {
      return !(this.apiData.motIndice === undefined || this.apiData.motIndice === '' || this.apiData.motIndice === null);
    }
  }
}
</script>

<style scoped lang="scss">
$vert1: #22f153;
$vert2: #00e7c7;

$gris1: #a9a9a9;
$gris2: #c7c7c7;

$noir1: #171717;
$noir2: #7c0024;

.bas {
  display: flex;
  gap: 1em;

  .indice{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5em;

    flex-grow: 1;
    background: rgba(0,0,0,0.1);
    border-radius: 0.8em;

    h2{
      text-transform: uppercase;
    }
  }

  .input{
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.8em 1em;
    gap: 1em;

    border-radius: 0.8em;
    background: rgba(0,0,0,0.1)
  }

  input, .envoyer, .fini{
    font-size: 1.5rem;
    height: 2.5em;
    padding: 0.5em 1em;
    font-family: 'Karla', sans-serif;
    font-weight: bolder;
    text-transform: uppercase;
    border-radius: 0.3em;
  }

  input:nth-child(2) {
    aspect-ratio: 1.2;
    padding: 0.5em 0.5em;
  }

  .envoyer, .fini {
    display: flex;
    align-items: center;

    background: linear-gradient(150deg, $gris1 0%, $gris1 33.3%, $gris2 100%);
    background-size: 300% 300%;
    background-position: 0 0;
    transition: 500ms cubic-bezier(.0, .8, .45, 1);

    &:hover {
      background-position: 100% 100%;
      transform: scale(1.03);
    }
  }
}
</style>