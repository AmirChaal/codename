<template>
    <div class="cartes">
      <div class="carte-wrapper" v-for="(carte, index) in apiData.cartes" :key="index" :class="apiData.grilleJ1[index]['colo']">
        <div class="carte">
          <h3 @click="test()"> {{ carte.mot }} </h3>
        </div>
      </div>
    </div>
</template>

<script>
let id = 0
export default {
  name: "Cartes.vue",
  props: {
    apiData: {
      type: Object,
      required: true
    }
  },
  methods: {
    test() {
      console.log(this.gameid)
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

  .cartes {
    display: grid;
    gap: 0.5em;
    grid-template-columns: repeat(5, 1fr);
    grid-template-rows: repeat(5, 1fr);

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
  .gris{
    background: linear-gradient(150deg, $gris1 0%, $gris1 33.3%, $gris2 100%);
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
  .decouvert{
    &:before{
      content: '';
      position: absolute;
      height: 100%;
      width: 100%;

      border-radius: inherit;
      background: rgb(115, 238, 32)
    }
  }
</style>