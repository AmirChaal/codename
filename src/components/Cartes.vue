<template>
  <div class="cartes-container">
    <transition name="filtretrans">
      <div v-if="cartesInactives" class="filtre"></div>
    </transition>
    <div :class="`cartes ${cartesInactives}`">
      <div class="carte-wrapper" v-for="(carte, index) in apiData.cartes" :key="index" @click="CarteClique(index)" :class="`${grilleActive[index]['colo']} ${carte.etat}`">
        <div class="carte">
          <transition name="jetontrans"><img v-if="carte.etat === 'jeton'" src="../assets/cross.png" alt="Jeton" class="jeton"/></transition>
          <transition name="decouverttrans"><div v-if="carte.etat === 'decouvert'" class="decouvert"><img src="../assets/check.png" alt=""/></div></transition>
          <h3 @click="test"> {{ carte.mot }} </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
let id = 0
export default {
  name: "Cartes.vue",
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
    FinDeTour: {
      required: true,
      type: Function
    }
  },
  methods: {
    test() {
      console.log(this.apiData.etatPartie)
    },
    CarteClique(index) {
      // Découvrir la carte si elle est verte puis update la base de données
      if (this.grilleInactive[index].colo === 'vert') {
        this.apiData.cartes[index].etat = 'decouvert'
      }
      if (this.grilleInactive[index].colo === 'neutre' && !(this.apiData.cartes[index].etat === 'decouvert')) {
        this.apiData.cartes[index].etat = 'jeton'
        this.FinDeTour()
      }
      if (this.grilleInactive[index].colo === 'noir' && !(this.apiData.cartes[index].etat === 'decouvert')) {
        this.apiData.cartes[index].etat = 'jeton'
        this.apiData.etatPartie = 'Perdue'
      }
      axios.patch(`http://localhost:8088/sae401/index.php/api/parties/${this.idpartie}`, this.apiData, {headers: {'Content-Type': 'application/merge-patch+json'}})
          .then(response => {console.log(response.data);})
          .catch(error => {console.error(error)})
    },
  },
  watch: {
    apiData: {
      handler(newVal) {
        // Vérifier si toutes les cartes qui sont verte chez l'user ou chez son co-équipier sont découvertes
        const cartesVertes = []
        newVal.cartes.forEach((carte, ind) => {
          if (this.grilleActive[ind].colo !== 'vert' && this.grilleInactive[ind].colo !== 'vert') return
          cartesVertes.push(carte)
        })

        // Si oui, la partie est finie
        if (cartesVertes.every(carte => carte.etat === 'decouvert') && this.apiData.etatPartie === 'En cours') this.apiData.etatPartie = "Gagnée"
      },
      deep: true
    }
  },
  computed: {
    grilleActive() {
      return this.iduser == 1
          ? this.apiData.grilleJ1
          : this.apiData.grilleJ2
    },
    grilleInactive() {
      return this.iduser == 2
          ? this.apiData.grilleJ1
          : this.apiData.grilleJ2
    },
    motIndiceDefini() {
      return !(this.apiData.motIndice === undefined || this.apiData.motIndice === '' || this.apiData.motIndice === null);
    },
    cartesInactives() {
      if (!(this.motIndiceDefini && this.iduser != this.apiData.quiInput)) return 'cartes-inactives'
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

  .cartes-container{
    position: relative;
    height: 100%;
    width: 100%;

    display: flex;
    justify-content: center;
    align-items: center;

    .filtre{
      position: absolute;
      top: 0;
      left: 0;

      height: 100%;
      width: 100%;
      z-index: 1;

      border-radius: 0.8em;
      background: rgba(0,0,0,0.5);
    }
    .filtretrans-enter-active, .filtretrans-leave-active {
      transition: 500ms cubic-bezier(.0, .8, .45, 1);
    }
    .filtretrans-enter-from, .filtretrans-leave-to {
      height: 0 !important;
    }

    .cartes {
      height: 100%;
      width: 100%;

      display: grid;
      gap: 0.5em;
      grid-template-columns: repeat(5, 1fr);
      grid-template-rows: repeat(5, 1fr);
      transition: 500ms cubic-bezier(.0, .8, .45, 1);

      &.cartes-inactives{
        height: calc(100% - 2em) !important;
        width: calc(100% - 2em) !important;
        pointer-events: none;
      }

      .carte-wrapper{
        position: relative;
        border-radius: 0.8em;

        .carte{
          height: 100%;
          width: 100%;

          padding: 1em;

          background-size: 2.8vmin 2.8vmin;
          background-position: 0 0;

          display: flex;
          justify-content: center;
          align-items: end;

          .jeton{
            position: absolute;
            top: 0.5em;
            right: 0.5em;
          }
          .jetontrans-enter-active{
            transition: 500ms cubic-bezier(.35,2,.20,1);
          }
          .jetontrans-leave-active{
            transition: 500ms cubic-bezier(0,.8,.45,1);
          }
          .jetontrans-enter-from, .jetontrans-leave-to {
            transform: rotate(-420deg) scale(0);
          }

          .decouvert{
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            width: 100%;

            display: flex;
            justify-content: center;
            align-items: center;

            border-radius: 0.8em;
            background: white;
            border: 3px solid $vert1;
          }
          .decouverttrans-enter-active, .decouverttrans-leave-active {
            transition: 500ms cubic-bezier(.0, .8, .45, 1);
          }
          .decouverttrans-enter-from, .decouverttrans-leave-to {
            transform: scale(0) !important;
          }

          h3{
            padding: 0.1em 0.5em;
            border-radius: 0.3em;
          }
        }

        &:hover {
          cursor: pointer;
          transform: scale(1.03);
        }

        &:hover .carte {background-position: -30% 0%;}

        &, .carte {
          transition: 300ms cubic-bezier(0,.8,.45,1);
        }
      }
    }

    /* COULEURS DES CARTES */
    .carte-wrapper:not(.noir){
      h3{
        color: black;
        border: 3px solid black;
      }
    }
    .vert{
      background: linear-gradient(150deg, $vert1 0%, $vert1 33.3%, $vert2 100%);
    }
    .neutre:not(.decouvert){
      border: solid 3px rgba(0,0,0);
    }
    .noir{
      background: linear-gradient(150deg, $noir1 0%, $noir1 33.3%, $noir2 100%);

      h3{
        color: white;
        border: 3px solid white;
      }
    }
    .vert, .gris, .noir{
      background-size: 300% 300%;
      background-position: 0 0;
      &:hover{
        background-position: 100% 100%;
      }
    }
  }
</style>