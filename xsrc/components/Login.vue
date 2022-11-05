<template>
    <div class="container row col-sm-12">
        <div class="card col-sm-2"></div>
        <div class="card col-sm-8">
            <div class="card-header">
                Identifíquese introduciendo usuario y contraseña
            </div>
            <div class="card-body">

                <form v-on:submit.prevent="Identificarse">
                  <div class="form-group row justify-content-center" >
                    <label for="username" class="col-sm-2 col-form-label">Usuario:</label>
                    <input class="col-form-input col-sm-4" type="text" required name="username" id="username" aria-describedby="helpId" placeholder="Usuario" v-model="username">
                  </div>
                  <br>
                  <div class="form-group row justify-content-center">
                    <label for="password" class="col-sm-2 col-form-label">Contraseña:</label>
                    <input type="password" class="col-form-input col-sm-4" required name="password" id="password" aria-describedby="helpId" placeholder="Contraseña" v-model="password">
                  </div>
                  <br>
                  <div class="form-group row justify-content-center">
                      <p class="text-center">¿Aún no estás registrado? Regístrese <a href="/register">aquí</a></p>
                  </div>
                  <br>
                  <div class="btn-toolbar justify-content-center" aria-label="">
                      <router-link :to="{name:'Home'}" class="btn btn-warning col-sm-3">Cancelar</router-link>
                      <p class="col-sm-5"></p>
                      <!-- <button type="button" class="btn btn-warning">Cancelar</button> -->
                      <button type="submit" class="btn btn-success col-sm-3">Enviar</button>
                  </div>
                  <br>
                  <div class="alert alert-danger" role="alert" v-if="error">
                  {{error_msg}}
                  </div>                
                </form>
            </div>
        </div>
        <div class="card col-sm-2"></div>
    </div>
</template>
<script>
import auth from "@/logic/auth";
export default{
    data(){
        return{
            username: "",
            password: "",
            error:false,
            error_msg:"",
        }
    },
    methods:{
        async Identificarse(){
            try {
                const response = await auth.login(this.username,this.password);
                const user = response.data;
                auth.setUserLogged(JSON.stringify(user));
                this.$router.go(this.$router.push('/'))
//              this.$router.go(this.$router.currentRoute)
            } catch (error) {
                this.error=true;
                this.error_msg=error;
                if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    this.error_msg=error.response.data['error'];
                } else if (error.request) {
                    // The request was made but no response was received
                    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                    // http.ClientRequest in node.js
                } else {
                    // Something happened in setting up the request that triggered an Error
                }
                console.log(error.config);
              }     
      }
    }  
}
</script>