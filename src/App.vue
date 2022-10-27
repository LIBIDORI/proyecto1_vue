<template>
  <div id="nav">
  <navbartop></navbartop>

  <section class="section">
    <router-view/>
  </section>
  <footer class="footer">
    <p class="has-text-centered">Francis</p>
  </footer>
  </div>
</template>
<style scoped>
  footer {
      position: center;
      height: 50px;
      bottom: 0;
      width: 100%;
      background-color: black;
      color:blanchedalmond;
  }
</style>

<script>
import auth from "@/logic/auth";
import navbartop from './navbartop.vue'

export default{

    name:'App',
    components: {
      navbartop,
    },

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
        var userLogged=auth.getUserLogged()
        if (userLogged == undefined){
          auth.limpiarCookie();
        }else{
          userLogged = JSON.parse(auth.getUserLogged())
        }
        return userLogged;
      },
    },

    methods:{
        async Logout(){
            try {
              const token = { 'token': this.userLogged.token};
              await auth.logout(token);
              auth.limpiarCookie();
              this.$router.go(this.$router.push("/login"))
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