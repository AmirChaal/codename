<template>
  <div class="aside">
    <div class="tour">
      <h3>C'est au tour de <span>JOUEUR 1</span></h3>
      <div class="photos">
        <div data-actif="true" class="joueur j1"></div>
        <div data-actif="false" class="joueur j2"></div>
      </div>
      <h3>Veuillez DONNER UN INDICE !</h3>
    </div>
    <div class="historique">
      <h2>Historique</h2>
      <div class="entries">
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text</div>
        <div class="entry">Dummy text dummy text dummy text dummy text</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Aside.vue"
}
</script>

<style scoped lang="scss">
.aside{
  grid-row: 1/3;
  grid-column: 2;

  display: flex;
  flex-direction: column;
  gap: 1em;


  .tour{
    padding: 1em;
    border-radius: 0.8em;
    background: rgb(0,0,0,0.1);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 1.5em;

    span{
      border-bottom: 3px solid black;
    }

    .photos{
      display: flex;
      gap: 1em;

      .joueur{
        height: 8em;
        aspect-ratio: 1;
        background: rgb(0,0,0,0.1);
        border-radius: 0.8em;
      }

      .joueur[data-actif="false"]{
        transform: scale(0.7);
      }
      .joueur[data-actif="true"]{
        border: 4px solid rgb(0,0,0,0.5)
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
      flex-grow: 1;
      gap: 0.5em;
      padding: 0.8em;

      overflow-y: auto;

      .entry{
        width: 100%;
        border-radius: 0.8em;
        background: rgb(0,0,0,0.1);
        padding: 0.5em;
      }
    }
  }
}
</style>