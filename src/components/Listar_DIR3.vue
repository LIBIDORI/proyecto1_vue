<template>

    <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <Filtrado_unidades v-show="isModalVisible" @close="closeModal">
        <template #header>
            <h3>Se han encontrado {{count}} unidades</h3>
        </template>
        </Filtrado_unidades>
    </Teleport>

    <div class="form-group row">
        <div class="card col-sm-3" v-show="isOpcionesBusquedaVisible">
            <div class="card-header btn-toolbar justify-content-between align-items-center" role="group" aria-label="">
                <br/>
                <h4>
                    Opciones de búsqueda
                </h4>
                <button type="button" class="close btn btn-outline-success" @click="showOpcionesBusqueda" aria-label="Close">
                    <span aria-hidden="true">x</span>
                </button>
            </div>
            <br>
            <div class="form-group">
                <div class="form-control">
                    <button type="button" class="btn btn-outline-success" @click="showModal" id="show-modal">Seleccionar unidades</button>
                </div>
                <br>
                <Filtrado_general :camposDeBusqueda="camposDeBusqueda" @close="filtrar"></Filtrado_general>
            </div>
        </div>

        <div class="card col-sm-9">
            <div class="card-header btn-toolbar row justify-content-between" role="group" aria-label="">
                <h3 class="col-sm-6">
                    {{respuesta.count}} Entidades DIR3
                </h3>
                <button type="button" class="btn btn-outline-success col-sm-1" v-show="!isOpcionesBusquedaVisible" @click="showOpcionesBusqueda" id="show-opciones-busqueda">Buscar</button>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr class="text-center">
                            <th class="col-sm-1" id="C_ID_UD_ORGANICA">Código</th>
                            <th class="col-sm-5" id="C_DNM_UD_ORGANICA">Denominación</th>
                            <th class="col-sm-2" id="NIF_CIF">NIF/CIF</th>
                            <th class="col-sm-1" id="C_ID_NIVEL_ADMON">Nivel</th>
                            <th class="col-sm-1" id="C_ID_TIPO_ENT_PUBLICA">Tipo</th>
                            <th class="col-sm-3" id="N_NIVEL_JERARQUICO">Nivel Jerárquico</th>
                            <th class="col-sm-1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
<!--                        <tr class="align-middle" v-for="unidad in unidades" :key="unidad.codigo" v-on:click="consultar(unidad.codigo)">-->
                        <tr class="align-middle" v-for="entidad in respuesta.results" :key="entidad.C_ID_UD_ORGANICA">
                            <td class="col-sm-1 text-center" id="C_ID_UD_ORGANICA">{{entidad.C_ID_UD_ORGANICA}}</td>
                            <td class="col-sm-5" id="C_DNM_UD_ORGANICA">{{entidad.C_DNM_UD_ORGANICA}}</td>
                            <td class="col-sm-2 text-center" id="NIF_CIF">{{entidad.NIF_CIF}}</td>
                            <td class="col-sm-1 text-center" id="C_ID_NIVEL_ADMON">{{entidad.C_ID_NIVEL_ADMON}}</td>
                            <td class="col-sm-1 text-center" id="C_ID_TIPO_ENT_PUBLICA">{{entidad.C_ID_TIPO_ENT_PUBLICA}}</td>
                            <td class="col-sm-3 text-center" id="N_NIVEL_JERARQUICO">{{entidad.N_NIVEL_JERARQUICO}}</td>
                            <td>
                                <div class="btn-group col-sm-1" role="group" aria-label="">
                                    <router-link :to="{name:'Consultar_DIR3',params:{id:entidad.C_ID_UD_ORGANICA}}" class="btn btn-info">Consultar</router-link>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-foot ">
                <div class="btn-toolbar row justify-content-between" role="group" aria-label="">
                    <div class="form-group row align-items-center justify-content-center">
                        <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="previous == null" @click="iraPagina(1)">Primera  </button>
                        </div>
                        <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="previous == null" @click="iraPagina(currentPage-1)">Anterior </button>
                        </div>
                        <div class="form-group row col-sm-4 align-items-center justify-content-center" role="group">
                            <div class="col-sm-3">Página</div>
                            <div class="col-sm-3">
                                <input type="text" class="form-control" name="num_pagina" id="num_pagina" v-model="currentPage" aria-describedby="helpId" placeholder="Número de página">
                            </div>
                            <div class="col-sm-3">de {{numPaginas}}</div>
                             <div class="btn-group col-sm-1" role="group">
                                <button type="button" class="page-link" :disabled="next == null" @click="iraPagina(currentPage)">Ir</button>
                            </div>
                         </div>
                         <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="next == null" @click="iraPagina(currentPage+1)">Siguiente</button>
                        </div>
                         <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="next == null" @click="iraPagina(numPaginas)">Última</button>
                        </div>
                    </div>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
import Filtrado_unidades from "./Filtrado_unidades.vue";
import Filtrado_general from "./Filtrado_general.vue";
import auth from "@/logic/auth";

const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';
//const url_proyecto = 'http://localhost:8000/proyecto1/';
//const url_proyecto = 'http://192.168.1.34:8000/proyecto1/';

export default{

    components: {
        Filtrado_unidades,
        Filtrado_general,
    },

    data(){
        return{
            respuesta: {
                count:0,
                next:'',
                previous:'',
                results:[],
            },
            resultados:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            numPaginas: 0,
            operador_busqueda:"__contains",
//            url: url_proyecto + 'DIR3/?',
            url_base : url_proyecto + 'DIR3/?',
            listado: 'proyecto1/DIR3/?',
            isModalVisible: false,
            isOpcionesBusquedaVisible: false,
            camposDeBusqueda: [
                {value: "C_ID_UD_ORGANICA", descripcion: "Código"},
                {value: "C_DNM_UD_ORGANICA", descripcion: "Denominación"},
            ]
        }
    },

    created:function(){
        this.obtener_datos_listado(this.listado);
    },

    methods:{
        showOpcionesBusqueda(){
            this.isOpcionesBusquedaVisible = !this.isOpcionesBusquedaVisible;
        },

        showModal() {
            this.isModalVisible = true;
        },

        closeModal($event) {
            this.isModalVisible = false;

            this.ministerios_filtro = $event['ministerios_filtro']
            this.centros_directivos_filtro = $event['centros_directivos_filtro']
            this.unidades_filtro = $event['unidades_filtro']

            this.url = this.url_base

            if (this.ministerios_filtro['0']){
                this.url += 'ministerio=' + this.ministerios_filtro + '&'
            }

            if (this.centros_directivos_filtro['0']){
                this.url += 'centro_directivo=' + this.centros_directivos_filtro + '&'
            }

            if (this.unidades_filtro['0']){
                this.url += 'codigo=' + this.unidades_filtro + '&'
            }

            var index
            for (index in this.criterios_de_busqueda){
                this.buscar_por = this.criterios_de_busqueda[index].buscar_por
                this.operador_busqueda = this.criterios_de_busqueda[index].operador_busqueda
                if (this.operador_busqueda=="="){
                    this.operador_busqueda="";
                }
                this.valor_busqueda = this.criterios_de_busqueda[index].valor_busqueda
                this.url += this.buscar_por  + this.operador_busqueda + '=' + this.valor_busqueda + '&'
            }

            this.iraPagina(1)
        },

        filtrar($event) {

            this.criterios_de_busqueda = $event['criterios_de_busqueda']

            this.url = this.url_base

            var index
            for (index in this.criterios_de_busqueda){
                this.buscar_por = this.criterios_de_busqueda[index].buscar_por
                this.operador_busqueda = this.criterios_de_busqueda[index].operador_busqueda
                if (this.operador_busqueda=="="){
                    this.operador_busqueda="";
                }
                this.valor_busqueda = this.criterios_de_busqueda[index].valor_busqueda
                this.url += this.buscar_por  + this.operador_busqueda + '=' + this.valor_busqueda + '&'
            }

            this.iraPagina(1)
        },

        iraPagina(pagina){
            this.currentPage = pagina;
//          this.obtener_datos_listado(this.url+'page='+this.currentPage);
            this.obtener_datos_listado(this.listado+'page='+pagina);
        },

        async obtener_datos_listado(listado){

            try {
                const respuesta = await auth.consulta(listado);
                this.respuesta=respuesta.data;
                this.numPaginas = Math.trunc(this.respuesta.count / 20)+1;
            } 
            catch (error) {
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

        },

        obtener_datos_listado2(url){

            console.log ("fetch ", url)
            fetch(url)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
//                    console.log(datosRespuesta)
                this.resultados=[]
                if (typeof datosRespuesta.success==='undefined')
                {
                    this.resultados=datosRespuesta.results;
                    console.log("results: ", datosRespuesta.results)
                    console.log("count: ", datosRespuesta.count)
                    console.log("next: ", datosRespuesta.next)
                    console.log("previous: ", datosRespuesta.previous)
                    this.count=datosRespuesta.count;
                    this.next=datosRespuesta.next;
                    this.previous=datosRespuesta.previous;
                    this.numPaginas = Math.trunc(this.count / 20)+1;

                }
            })
            .catch(console.log)
        },

    }

}
</script>