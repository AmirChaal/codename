<template>
  <div class="aside">
    <div class="etat">
      <div class="premier">
        <h3>Nombre de cartes à découvrir</h3>
        <div class="carte verte"><h3>Verte</h3></div>
      </div>
      <div class="second">
        <h3>Nombre de tours restants</h3>
        <div class="carte neutre"><h3>5</h3></div>
      </div>
    </div>
    <div class="historique">
      <h2>Historique</h2>
      <div class="entries" v-if="apiData.historique">
        <div class="entry" v-for="entry in apiData.historique"><b>JOUEUR {{ entry.joueur }} : {{ entry.mot }} - {{ entry.nb }}</b></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside.vue",
  props: {
    apiData: Object,
  }
}
</script>

<style scoped lang="scss">
$vert1: #22f153;
$vert2: #00e7c7;

.aside{
  grid-row: 1/3;
  grid-column: 2;

  display: flex;
  flex-direction: column;
  gap: 1em;

  .etat{
    padding: 1em;
    border-radius: 0.8em;
    background: rgb(0,0,0,0.1);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5em;

    .carte{
      width: 10em;
      padding: 1em;

      display: flex;
      justify-content: center;
      align-items: end;

      border-radius: 0.8em;

      &.verte{
        background: linear-gradient(150deg, $vert1 0%, $vert1 33.3%, $vert2 100%);
        background-size: 2.8vmin 2.8vmin;
        background-size: 300% 300%;
        background-position: 0 0;
        background-position: 0 0;
      }
      &.neutre{
        background: white;
        background-size: 2.8vmin 2.8vmin;
        background-size: 300% 300%;
        background-position: 0 0;
        background-position: 0 0;
        border: 3px black solid;
      }

      h3{
        padding: 0.1em 0.5em;
        border-radius: 0.3em;
        color: black;
        border: 3px solid black;
      }

    }
  }

  .historique{
    flex-grow: 1;
    background: rgb(0,0,0,0.1);
    border-radius: 0.8em;

    display: flex;
    align-items: center;
    flex-direction: column;

    gap: 1em;
    padding: 0.8em;

    overflow-y: auto;

    .entries{
      background: rgb(0,0,0,0.1);
      width: 100%;
      border-radius: 0.8em;

      display: flex;
      flex-direction: column;
      gap: 0.5em;
      padding: 0.8em;

      overflow-y: auto;

      .entry{
        width: 100%;
        border-radius: 0.6em;
        background: rgb(0,0,0,0.1);
        padding: 0.7em;
        font-size: 1.2em;
      }
    }
  }
}
</style>