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
                        {{count}} Entidades
                    </h3>
                    <button type="button" class="btn btn-outline-success col-sm-1" v-show="!isOpcionesBusquedaVisible" @click="showOpcionesBusqueda" id="show-opciones-busqueda">Buscar</button>
                </div>
                <div class="card-body">
                    <table class="table">
                        <thead>
                            <tr class="text-center">
                                <th class="col-sm-2" id="ministerio">Ministerio</th>
                                <th class="col-sm-2" id="centro_directivo">Centro Directivo</th>
                                <th class="col-sm-1" id="codigo">Código</th>
                                <th class="col-sm-2" id="denominacion">Denominación</th>
                                <th class="col-sm-2" id="codigo_DIR3">DIR3</th>
                                <th class="col-sm-1" id="numero_de_puestos">Puestos</th>
                                <th class="col-sm-1" >Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
    <!--                        <tr class="align-middle" v-for="unidad in unidades" :key="unidad.codigo" v-on:click="consultar(unidad.codigo)">-->
                            <tr class="align-middle" v-for="unidad in resultados" :key="unidad.codigo">
                                <td class="col-sm-2" id="ministerio">{{unidad.ministerio['denominacion']}}</td>
                                <td class="col-sm-2" id="centro_directivo">{{unidad.centro_directivo['denominacion']}}</td>
                                <td class="col-sm-1" id="codigo">{{unidad.codigo}}</td>
                                <td class="col-sm-2" id="denominacion">{{unidad.denominacion}}</td>
                                <td class="col-sm-2" id="codigo_DIR3">{{unidad.codigo_DIR3}}</td>
                                <td class="col-sm-1 text-center" id="numero_de_puestos">{{unidad.numero_de_puestos}}</td>
                                <td class="col-sm-1">
                                    <div class="btn-group" role="group" aria-label="">
                                        <router-link :to="{name:'Consultar_unidad',params:{id:unidad.codigo}}" class="btn btn-info">Consultar</router-link>
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

//const url_proyecto = 'https://serene-chamber-49517.herokuapp.com/proyecto1/';
//const url_proyecto = 'http://localhost:8000/proyecto1/';
const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';
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
            operador_busqueda:"__contains",
            url: url_proyecto + 'unidades/?',
            url_base : url_proyecto + 'unidades/?',
            isModalVisible: false,
            isOpcionesBusquedaVisible: false,
            camposDeBusqueda: [
                {value: "codigo", descripcion: "Código"},
                {value: "ministerio__denominacion", descripcion: "Ministerio"},
                {value: "centro_directivo__denominacion", descripcion: "Centro Directivo"},
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

            console.log ("fetch ", url)
            fetch(url)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.resultados=[]
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
    #centro_directivo{
        width:200px;
    }
    #codigo{
        width:75px;
    }
    #denominacion{
        width:275px;
    }
    #codigo_DIR3{
        width:75px;
    }
    #numero_de_puestos{
        width:75px;
        text-align:center;
    }
</style>
