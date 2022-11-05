<template>
  <div>
    <div class="hello">
      <h1 v-if="userLogged">Hola {{userLogged}} {{ msg }}</h1>
      <h1 v-else>{{ msg }}</h1>
    </div>
    <User/>
  </div>
</template>

<script>
import auth from "@/logic/auth";
import User from "./User.vue";

export default {
  name: 'Inicio',
  components: {
    User
  },
  props: {
    msg: String
  },

  computed:{
    userLogged(){
      const userLogged = JSON.parse(auth.getUserLogged())
      return userLogged.user.username;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
