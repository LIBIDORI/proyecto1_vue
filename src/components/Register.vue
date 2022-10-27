<template>
    <div class="container">
        <div class="card" style="width: 40rem;">
            <div class="card-header">
                Formulario de registro
            </div>
            <div class="card-body">

                <form v-on:submit.prevent="Registrarse">
                    <div class="form-group row justify-content-left" >
                      <label for="name" class="col-sm-4 col-form-label">Nombre:</label>
                      <div class="col-sm-5">
                        <input type="text" class="form-control" required name="name" id="name" aria-describedby="helpId" placeholder="Nombre" v-model="name">
                      </div>
                      <small id="helpId" class="form-text text-danger" v-if="errores['name'].lenght != 0">{{errores['name'][0]}}</small>
                    </div>
                    <br>
                    <div class="form-group row justify-content-left" >
                      <label for="last_name" class="col-sm-4 col-form-label">Apellidos:</label>
                      <div class="col-sm-7">
                        <input type="text" class="form-control" required name="last_name" id="last_name" aria-describedby="helpId" placeholder="Apellidos" v-model="last_name">
                      </div>
                    </div>
                    <br>
                    <div class="form-group row justify-content-left" >
                      <label for="email" class="col-sm-4 col-form-label">Correo Electrónico:</label>
                      <div class="col-sm-7">
                        <input type="text" class="form-control" required name="email" id="email" aria-describedby="helpId" placeholder="Correo electrónico" v-model="email">
                      </div>
                    </div>
                    <br>
                    <div class="form-group row justify-content-left" >
                      <label for="username" class="col-sm-4 col-form-label">Usuario:</label>
                      <div class="col-sm-5">
                        <input type="text" class="form-control" required name="username" id="username" aria-describedby="helpId" placeholder="Usuario" v-model="username">
                      </div>
                      <small id="helpId" class="form-text text-danger" v-if="errores['username'].lenght != 0">{{errores['username'][0]}}</small>
                    </div>
                    <br>
                    <div class="form-group row justify-content-left">
                      <label for="password" class="col-sm-4 col-form-label">Contraseña:</label>
                      <div class="col-sm-5">
                        <input type="password" class="form-control" required name="password" id="password" aria-describedby="helpId" placeholder="Contraseña" v-model="password">
                      </div>
                    </div>
                    <br>
                    <div class="form-group row justify-content-left">
                      <label for="password2" class="col-sm-4 col-form-label">Repita su Contraseña:</label>
                      <div class="col-sm-5">
                        <input type="password" class="form-control" required name="password2" id="password2" aria-describedby="helpId" placeholder="Repita su Contraseña" v-model="password2">
                      </div>
                    </div>
                    <br>
                    <div class="btn-toolbar justify-content-center" aria-label="">
                        <router-link :to="{name:'Home'}" class="btn btn-warning col-sm-3">Cancelar</router-link>
                        <p class="col-sm-3"></p>
                        <!-- <button type="button" class="btn btn-warning">Cancelar</button> -->
                        <button type="submit" class="btn btn-success col-sm-3">Enviar</button>
                    </div>
                </form>
                <div class="alert alert-danger" role="alert" v-if="error">
                {{error_msg}}
                </div>                
            </div>
        </div>
    </div>
</template>
<script>
import auth from "@/logic/auth";
export default{
    data(){
        return{
            name: "",
            last_name: "",
            email: "",
            username: "",
            password: "",
            password2: "",
            error:false,
            error_msg:"",
            errores: {
                'name': [],
                'last_name': [],
                'email': [],
                'username': [],
                'password': [],
                'password2': []
            },
        }
    },
    methods:{
        async Registrarse(){
            var datosUsuario=[
              this.name, 
              this.last_name, 
              this.email, 
              this.username, 
              this.password, 
              this.password2
              ];

            console.log(datosUsuario);

            try {
              const response = await auth.register(this.name, 
                                  this.last_name, 
                                  this.email, 
                                  this.username, 
                                  this.password, 
                                  this.password2);
              console.log(response);
              this.$router.go(this.$router.push("/"))
            } catch (error) {
                  console.log(error);
                  this.error=true;
                  this.error_msg=error;
                  if (error.response) {
                    // The request was made and the server responded with a status code
                    // that falls out of the range of 2xx
                    console.log(error.response.data);
                    this.error_msg=error.response.data['message'];
                    console.log(error.response.data['errors']);

                    var field=[];
                    for (field in error.response.data['errors']){
                        console.log("Clave: ", field);
                        console.log("Valor:", error.response.data['errors'][field]);
                        this.errores[field]=error.response.data['errors'][field];
                        console.log("this.errores: ",this.errores[field][0])
                        }
                    console.log(error.response.status);
                    console.log(error.response.headers);
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
};
</script>