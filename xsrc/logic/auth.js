import axios from "axios";
import Cookies from "js-cookie";

//const ENDPOINT_PATH = "http://localhost:8000/";
//const ENDPOINT_PATH = "http://192.168.1.34:8000/";
//const ENDPOINT_PATH = "http://127.0.0.1:8000/";
//const ENDPOINT_PATH = "https://serene-chamber-49517.herokuapp.com/";
const ENDPOINT_PATH = "https://proyecto1libi.herokuapp.com/";

export default {

  setUserLogged(userLogged) {
      Cookies.set("user", userLogged);
  },

  getUserLogged() {
      var user = Cookies.get("user");
      if (user == undefined){
        return this.limpiarCookie()
      }
      return user;
  },

  setToken(token) {
      Cookies.set("token", token);
  },

  getToken() {
      return Cookies.get("token");
  },

  deleteUserLogged() {
      Cookies.remove("user");
  },

  limpiarCookie() {
      var datosCookie= {'token': '',
                        'user' : 
                          {'username':'',
                           'email':'',
                           'name':'',
                           'last_name':''},
                        'message': ''}

      this.setUserLogged(JSON.stringify(datosCookie));
      return Cookies.get("user");
  },

  register(name, last_name, email, username, password, password2) {
      const user = { name, last_name, email, username, password, password2 };
      return axios.post(ENDPOINT_PATH + "usuario/", user);
  },

  login(username, password) {
    const user = { username, password };
    return axios.post(ENDPOINT_PATH + "login/", user);
  },

  logout(token) {
    return axios.post(ENDPOINT_PATH + "logout/", token);
  },

  consulta(objeto_de_la_consulta) {
    return axios.get(ENDPOINT_PATH + objeto_de_la_consulta);
  }

};