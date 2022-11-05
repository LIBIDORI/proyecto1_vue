import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

import About from '../components/About.vue'
import Contact from '../components/Contact.vue'

import Login from '../components/Login.vue'
//import Logout from '../components/Logout.vue'
import Register from '../components/Register.vue'

import Listar from '../components/Listar_DIR3.vue'
import Consultar from '../components/Consultar_DIR3.vue'
import Listar_puestos from '../components/Listar_puestos.vue'
import Listar_unidades from '../components/Listar_unidades.vue'
import Listar_procedimientos_provision from '../components/Listar_procedimientos_provision.vue'
import Listar_procesos_selectivos from '../components/Listar_procesos_selectivos.vue'
import Listar_preguntas from '../components/Listar_preguntas.vue'
import Consultar_puesto from '../components/Consultar_puesto.vue'
import Consultar_unidad from '../components/Consultar_unidad.vue'
import Consultar_procedimiento_provision from '../components/Consultar_procedimiento_provision.vue'
import Consultar_proceso_selectivo from '../components/Consultar_proceso_selectivo.vue'
import Consultar_disposicion from '../components/Consultar_disposicion.vue'
import Crear_proceso_selectivo from '../components/Crear_proceso_selectivo.vue'
import Crear_procedimiento_provision from '../components/Crear_procedimiento_provision.vue'
import Editar_proceso_selectivo from '../components/Editar_proceso_selectivo.vue'
import Editar_procedimiento_provision from '../components/Editar_procedimiento_provision.vue'

import auth from "@/logic/auth";

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  //{
  //  path: '/logout',
  //  name: 'Logout',
  //  component: Logout
  //},
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/listar_DIR3',
    name: 'Listar_DIR3',
    component: Listar
  },
  {
    path: '/consultar_DIR3/:id',
    name: 'Consultar_DIR3',
    component: Consultar
  },
  {
    path: '/listar_unidades',
    name: 'Listar_unidades',
    component: Listar_unidades
  },
  {
    path: '/listar_puestos',
    name: 'Listar_puestos',
    component: Listar_puestos
  },
  {
    path: '/listar_procedimientos_provision',
    name: 'Listar_procedimientos_provision',
    component: Listar_procedimientos_provision
  },
  {
    path: '/listar_procesos_selectivos',
    name: 'Listar_procesos_selectivos',
    component: Listar_procesos_selectivos
  },
  {
    path: '/listar_preguntas',
    name: 'Listar_preguntas',
    component: Listar_preguntas
  },
  {
    path: '/consultar_unidad/:id',
    name: 'Consultar_unidad',
    component: Consultar_unidad
  },
  {
    path: '/consultar_puesto/:id',
    name: 'Consultar_puesto',
    component: Consultar_puesto
  },
  {
    path: '/consultar_procedimiento_provision/:id',
    name: 'Consultar_procedimiento_provision',
    component: Consultar_procedimiento_provision
  },
  {
    path: '/consultar_proceso_selectivo/:id',
    name: 'Consultar_proceso_selectivo',
    component: Consultar_proceso_selectivo
  },
  {
    path: '/consultar_disposicion/:id',
    name: 'Consultar_disposicion',
    component: Consultar_disposicion
  },
  {
    path: '/crear_proceso_selectivo/:id',
    name: 'Crear_proceso_selectivo',
    component: Crear_proceso_selectivo
  },
  {
    path: '/editar_proceso_selectivo/:id',
    name: 'Editar_proceso_selectivo',
    component: Editar_proceso_selectivo
  },
  {
    path: '/crear_procedimiento_provision/:id',
    name: 'Crear_procedimiento_provision',
    component: Crear_procedimiento_provision
  },
  {
    path: '/editar_procedimiento_provision/:id',
    name: 'Editar_procedimiento_provision',
    component: Editar_procedimiento_provision
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // ...
  //    if (to.path != '/login' && existToken()) {
  //    if (existToken()) {
  const token = JSON.parse(auth.getUserLogged())['token']
  if (to.path != '/' && to.path != '/login' && to.path != '/register' && !token) {
    if (token) {
      next();
    }else{
      if (to.path == '/'){
        next('/');
      }else{
        if (to.path == '/register'){
          next('register');
        }else{
          next('login');
        }
    }
  }
  }else{
    next();
  }
})

export default router
