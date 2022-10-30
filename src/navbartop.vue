<template>
<div>
  <nav class="navbar navbar-expand-md navbar-light" style="background-color: #e3f2fd;">
      <a class="navbar-brand" href="#">AGE</a>
      <button class="navbar-toggler d-lg-none" 
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#collapsibleNavId"
              aria-controls="collapsibleNavId"
              aria-expanded="false"
              aria-label="Toggle navigation">
      </button>
      <div class="collapse navbar-collapse" id="collapsibleNavId">
          <ul v-if="userLogged.user" class="navbar-nav me-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                  <router-link to="/" class="nav-link">Inicio</router-link> 
              </li>
              <li class="nav-item">
                  <router-link to="/listar_DIR3" class="nav-link">DIR3</router-link> 
              </li>
              <li class="nav-item">
                  <router-link to="/listar_unidades" class="nav-link">Unidades</router-link> 
              </li>
              <li class="nav-item">
                  <router-link to="/listar_puestos" class="nav-link">RPT</router-link> 
              </li>
              <li class="nav-item">
                  <router-link to="/listar_procedimientos_provision" class="nav-link">Procedimientos de provisión</router-link> 
              </li>
              <li class="nav-item">
                  <router-link to="/listar_procesos_selectivos" class="nav-link">Procesos selectivos</router-link> 
              </li>
              <li class="nav-item">
                  <router-link to="/listar_preguntas" class="nav-link">Preguntas</router-link> 
              </li>
          </ul>
          <router-link v-if="userLogged.user.username" to="/" class="nav-link">{{userLogged.user.username}}</router-link>
          <router-link v-else to="/login" class="nav-link">Identificarse</router-link>
          <button v-if="userLogged.user.username" v-on:click.prevent="Logout" class="btn btn-success">Salir</button>
          <router-link to="/about" class="nav-link">About us</router-link>
          <router-link to="/contact" class="nav-link">Contacta</router-link>
      </div>
  </nav>
</div>
</template>

<script>
import auth from "@/logic/auth";
export default {

    name: 'navbartop',

    data(){
        return{
            username: "",
            password: "",
            error:false,
            error_msg:"",
        }
    },

    computed:{
        userLogged(){
            var userLogged=JSON.parse(auth.getUserLogged())
            console.log ('Usuario logueado ', userLogged)
            return userLogged;
        },
    },

    methods:{
        async Logout(){
            try {
                const token = { 'token': this.userLogged.token};
                console.log('token' ,token)
                await auth.logout(token);
                auth.limpiarCookie();
                this.$router.go(this.$router.push("/login"))
            } catch (error) {
                this.error=true;
                this.error_msg=error;
                console.log('error, ', error)
                if (error.response) {
                  // The request was made and the server responded with a status code
                  // that falls out of the range of 2xx
                    this.error_msg=error.response.data['error'];
                    console.log('error.response.data, ', error.response.data)
                } else if (error.request) {
                  // The request was made but no response was received
                  // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                  // http.ClientRequest in node.js
                    console.log(error.request);
                } else {
                  // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
                console.log(error.config);
              }     
      }
    }
}
</script>

<style scoped>

</style>
