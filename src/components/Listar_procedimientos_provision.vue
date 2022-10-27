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
                    {{count}} Procedimientos de Provisión
                </h3>
                <button type="button" class="btn btn-outline-success col-sm-1" v-show="!isOpcionesBusquedaVisible" @click="showOpcionesBusqueda" id="show-opciones-busqueda">Buscar</button>
            </div>
            <div class="card-body">
                <table class="table">
                    <thead>
                        <tr class="text-center">
                            <th class="col-sm-3" id="entidad">Entidad</th>
                            <th class="col-sm-6" id="resolucion_inicio_denominacion">Descripción</th>
                            <th class="col-sm-1" id="resolucion_inicio_fecha_publicacion">Fecha convocatoria</th>
                            <th class="col-sm-1" id="resolucion_fin_fecha_publicacion">Fecha resolución</th>
                            <th class="col-sm-1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="align-middle" v-for="procedimiento_provision in resultados" :key="procedimiento_provision.id">
                            <td class="col-sm-3" id="entidad">{{procedimiento_provision.entidad.C_DNM_UD_ORGANICA}}</td>
                            <td class="col-sm-6" id="resolucion_inicio_denominacion">
                              <a :href="procedimiento_provision.resolucion_inicio.denominacion" target="_blank" rel="noopener">{{procedimiento_provision.resolucion_inicio.denominacion}}</a>
                            </td>
                            <td class="col-sm-1" id="resolucion_inicio_fecha_publicacion">{{procedimiento_provision.resolucion_inicio.fecha_publicacion}}</td>
                            <td v-if="procedimiento_provision.resolucion_fin" class="col-sm-1" id="resolucion_fin">{{procedimiento_provision.resolucion_fin.fecha_publicacion}}</td>
                            <td v-else class="col-sm-1" id="resolucion_fin_fecha_publicacion"></td>
                            <td class="col-sm-1" id="acciones">
                                <div class="btn-group" role="group" aria-label="">
                                    <router-link :to="{name:'Consultar_procedimiento_provision',params:{id:procedimiento_provision.id}}" class="btn btn-info">Consultar</router-link>
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

//const url_proyecto = 'https://serene-chamber-49517.herokuapp.com/proyecto1/';
const url_proyecto = 'http://localhost:8000/proyecto1/';
//const url_proyecto = 'http://192.168.1.34:8000/proyecto1/';
export default{

    components: {
        Filtrado_unidades,
        Filtrado_general,
    },

    data(){
        return{
            resultados:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            numPaginas: 0,
            ordenar_por: "codigo",
            operador_busqueda:"__contains",
            url: url_proyecto + 'procedimientos_provision/?',
            url_base : url_proyecto + 'procedimientos_provision/?',
            isModalVisible: false,
            isOpcionesBusquedaVisible: false,
            camposDeBusqueda: [
                {value: "ministerio__denominacion", descripcion: "Ministerio"},
                {value: "centro_directivo", descripcion: "Centro Directivo"},
                {value: "codigo", descripcion: "Código"},
                {value: "denominacion", descripcion: "Denominación"},                                            
                {value: "codigo_DIR3", descripcion: "DIR3"}
            ]
        }
    },

    created:function(){
        this.obtener_datos_listado(this.url);
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
            this.obtener_datos_listado(this.url+'page='+this.currentPage);
        },

        obtener_datos_listado(url){

            fetch(url)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                if (typeof datosRespuesta.success==='undefined')
                {
                    this.resultados=datosRespuesta.results;
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
<style scoped>

/*    thead, tbody { display: block; }*/

    tbody {
        height: 480px;
        overflow-y: auto;
    }
    #panel_filtrado{
        overflow:scroll;
        height:100px;
        width:300px;
    }
    #panel_principal{
        overflow:scroll;
        height:480px;
    }
    #ministerio{
        width:175px;
    }
    #resolucion_inicio{
        text-align:center;
    }
    #resolucion_fin{
        text-align:center;
    }
    #acciones{
        text-align:center;
    }
</style>
