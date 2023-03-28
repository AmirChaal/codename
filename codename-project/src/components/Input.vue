<template>
  <div class="bas" v-if="apiData.motIndice !== undefined">
    <div class="indice">
      <h3>Indice en cours</h3>
      <h2>{{ apiData.motIndice }} - {{ apiData.nbMotADecouvrir }} </h2>
    </div>
    <div class="input">
      <div class="fini">Fini de deviner</div>
    </div>
  </div>



  <div class="bas" v-else>
    <div class="indice">
      <h3>C'est à vous de</h3>
      <h2>Donner un indice !</h2>
    </div>
    <div class="input">
      <input class="mot" type="text">
      <input class="nombre" type="text">
      <div class="envoyer">Envoyer</div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Input.vue",
  props: {
    apiData: Object
  },
  methods: {
    AnimationMotSubmit() {
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
    aspect-ratio: 1;
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