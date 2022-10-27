<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <Inicio msg="Bienvenido a la página de la RPT"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Inicio from '@/components/Inicio.vue'

export default {
  name: 'Home',
  components: {
    Inicio
  }
}
</script>
