<template>
    <div class="container">
        <div class="card" style="width: 40rem;">
            <div class="card-header">
                Identifíquese introduciendo usuario y contraseña
            </div>
            <div class="card-body">

                <form v-on:submit.prevent="Identificarse">
                  <div class="form-group row justify-content-center" >
                    <label for="username" class="col-sm-3 col-form-label">Usuario:</label>
                    <div class="col-sm-5">
                      <input type="text" class="form-control" required name="username" id="username" aria-describedby="helpId" placeholder="Usuario" v-model="username">
                    </div>
                  </div>
                  <br>
                  <div class="form-group row justify-content-center">
                    <label for="password" class="col-sm-3 col-form-label">Contraseña:</label>
                    <div class="col-sm-5">
                      <input type="password" class="form-control" required name="password" id="password" aria-describedby="helpId" placeholder="Contraseña" v-model="password">
                    </div>
                  </div>
                  <br>
                  <div class="btn-toolbar justify-content-center" aria-label="">
                      <router-link :to="{name:'Home'}" class="btn btn-warning col-sm-3">Cancelar</router-link>
                      <p class="col-sm-3"></p>
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
              const user = response.data["user"];
              const token= response.data["token"];
              auth.setUserLogged(JSON.stringify(user));
              auth.setToken(token);
              this.$router.push("/")
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