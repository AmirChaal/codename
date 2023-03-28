<template>
  <section class="header">
    <h1>CODENAMES DUO</h1>
    <nav>
      <h3>Reinitialiser</h3>
      <h3>Quitter</h3>
      <h3>Règles</h3>
    </nav>
  </section>
</template>

<script>
export default {
  name: "Header.vue"
}
</script>

<style scoped lang="scss">
.header{
  height: 5em;
  padding: 0 3em;

  display: flex;
  justify-content: space-between;
  align-items: center;

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