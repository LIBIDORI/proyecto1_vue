<template>
    <div>
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
                        {{count}} Procesos selectivos
                    </h3>
                    <button type="button" class="btn btn-outline-success col-sm-1" v-show="!isOpcionesBusquedaVisible" @click="showOpcionesBusqueda" id="show-opciones-busqueda">Buscar</button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr>
                                <th class="col-sm-4">
                                    <p class="cabecera">Entidad</p>
                                    <p class="cabecera">Cuerpo</p>
                                    <p class="cabecera">Fecha de inicio</p>
                                </th>
                                <th class="col-sm-4">
                                    <p class="cabecera">Escala</p>
                                    <p class="cabecera">Subescala</p>
                                    <p class="cabecera">Gr./Subgr.</p>
                                </th>
                                <th class="col-sm-3">
                                    <p class="cabecera">Sistema</p>
                                    <p class="cabecera">Turno</p>
                                    <p class="cabecera">Núm. puestos</p>
                                </th>
                                <th class="col-sm-1 text-center">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="align-middle" v-for="proceso_selectivo in resultados" :key="proceso_selectivo.id">
                                <td class="col-sm-4">
                                    <p>{{proceso_selectivo.entidad.C_DNM_UD_ORGANICA}}</p>
                                    <p>{{proceso_selectivo.cuerpo}}</p>
                                    <p>{{proceso_selectivo.finicio}}</p>
                                </td>
                                <td class="col-sm-4">
                                    <p>{{proceso_selectivo.get_escala_display}}</p>
                                    <p>{{proceso_selectivo.get_subescala_display}}</p>
                                    <p>{{proceso_selectivo.get_gruposubgrupo_display}}</p>
                                </td>
                                <td class="col-sm-3">
                                    <p>{{proceso_selectivo.get_sistema_display}}</p>
                                    <p>{{proceso_selectivo.get_turno_display}}</p>
                                    <p>{{proceso_selectivo.npuestos}}</p>
                                </td>
                                <td class="col-sm-1 text-center" id="acciones">
                                    <div class="btn-group" role="group" aria-label="">
                                        <router-link :to="{name:'Consultar_proceso_selectivo',params:{id:proceso_selectivo.id}}" class="btn btn-info">Consultar</router-link>
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
    </div>
</template>

<script>
import Filtrado_unidades from "./Filtrado_unidades.vue";
import Filtrado_general from "./Filtrado_general.vue";

//const url_proyecto = 'http://localhost:8000/proyecto1/';
const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';
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
            url: url_proyecto + 'procesos_selectivos/?',
            url_base : url_proyecto + 'procesos_selectivos/?',
            isModalVisible: false,
            isOpcionesBusquedaVisible: false,
            camposDeBusqueda: [
                {value: "entidad", descripcion: "Código de Entidad"},
                {value: "entidad__C_DNM_UD_ORGANICA", descripcion: "Nombre de Entidad"},
                {value: "cuerpo", descripcion: "Cuerpo"}
            ]
        }
    },

    created:function(){
//            this.consultarUnidades('http://localhost:8000/proyecto1/unidad/list/-__contains-/codigo/?page=1');
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
