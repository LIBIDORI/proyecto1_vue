<template>

    <div class="container">
        <div class="card">
            <div class="card-header">
                <div class="col-sm-4">
                    Consulta de Procedimiento de Provisión
                </div>
            </div>
            <div v-if="procedimiento_provision.entidad" class="card-body">
                <table class="table">
                    <tr>
                        <th class="col-sm-5" colspan="2">Entidad (Código DIR3)</th>
                    </tr>
                    <tr>
                        <td class="col-sm-5" colspan="2">{{this.procedimiento_provision.entidad.C_DNM_UD_ORGANICA}} ({{this.procedimiento_provision.entidad.C_ID_UD_ORGANICA}})</td>
                    </tr>
                    <br>
                    <tr>
                        <th class="col-sm-1">Fecha convocatoria</th>
                        <th class="col-sm-1">Fecha publicación convocatoria</th>
                        <th class="col-sm-1">Fecha resolución</th>
                        <th class="col-sm-1">Fecha publicación resolución</th>
                    </tr>
                    <tr>
                        <td class="col-sm-1">{{this.procedimiento_provision.resolucion_inicio.fecha}}</td>
                        <td class="col-sm-1">{{this.procedimiento_provision.resolucion_inicio.fecha_publicacion}}</td>
                        <td v-if="procedimiento_provision.resolucion_fin" class="col-sm-1">{{this.procedimiento_provision.resolucion_fin.fecha}}</td>
                        <td v-if="procedimiento_provision.resolucion_fin" class="col-sm-1">{{this.procedimiento_provision.resolucion_fin.fecha_publicacion}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th class="col-sm-5" colspan="2">Denominacion</th>
                    </tr>
                    <tr>
                        <td class="col-sm-12" colspan="4">
                            <a :href="procedimiento_provision.resolucion_inicio.denominacion" target="_blank" rel="noopener">{{this.procedimiento_provision.resolucion_inicio.denominacion}}</a>
                        </td>
                    </tr>
                    <br>
                </table>
            </div>
            <div class="card-footer">
                <div class="btn-toolbar justify-content-center" role="group" aria-label="">
                    <router-link :to="{name:'Consultar_DIR3'}" class="btn btn-warning col-sm-2">Cancelar</router-link>
                    <p class="col-sm-3"></p>
                    <router-link :to="{name:'Editar_procedimiento_provision'}" class="btn btn-success col-sm-2">Editar</router-link>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header text-uppercase text-center">
                    <h5 v-if="this.count">
                        Puestos ({{count}})
                    </h5>
                    <h5 v-if="!this.count">
                        No tiene puestos consultables
                    </h5>
            </div>
            <div class="card-body" v-if="this.count">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="col-sm-1">Nº</th>
                            <th class="col-sm-1">Código</th>
                            <th class="col-sm-3">Denominación</th>
                            <th class="col-sm-3">Unidad</th>
                            <th class="col-sm-1">Nivel</th>
                            <th class="col-sm-1">Gr.Sb</th>
                            <th class="col-sm-1">CE</th>
                            <th class="col-sm-1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="puesto in puestos" :key="puesto.id">
                            <td class="col-sm-1">{{puesto.numero_orden}}</td>
                            <td class="col-sm-1">{{puesto.puesto}}</td>
                            <td class="col-sm-3">{{puesto.denominacion}}</td>
                            <td class="col-sm-3">{{puesto.unidad}}</td>
                            <td class="col-sm-1">{{puesto.nivel}}</td>
                            <td class="col-sm-1">{{puesto.gruposubgrupo}}</td>
                            <td class="col-sm-1">{{puesto.cespecifico}}</td>
                            <td class="col-sm-1">
<!--                                <router-link :to="{name:'Consultar_puesto',params:{id:puesto.id}}" class="btn btn-info">Consultar</router-link>-->
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" v-on:click="consultarPuesto(puesto.puesto)" class="btn btn-info">Consultar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-foot">
                <div class="btn-toolbar row justify-content-between" role="group" aria-label="">
                    <div class="form-group row align-items-center justify-content-center">
                        <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="previous == null" @click="iraPagina(1)">Primera  </button>
                        </div>
                        <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="previous == null" @click="consultarPuestos(previous)">Anterior </button>
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
                            <button type="button" class="page-link" :disabled="next == null" @click="consultarPuestos(next)">Siguiente</button>
                        </div>
                         <div class="btn-group col-sm-1" role="group">
                            <button type="button" class="page-link" :disabled="next == null" @click="iraPagina(numPaginas)">Última</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <br>
    </div>
</template>

<script>
import auth from "@/logic/auth";

const url_proyecto  = auth.consulta_ENDPOINT_PATH() + 'proyecto1/';
//const url_proyecto = 'http://localhost:8000/proyecto1/';
//const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';

export default{
    data(){
        return{
            procedimiento_provision:{
                'id': this.$route.params.id,
                'entidad': {                    
                    'C_ID_UD_ORGANICA': null,
                    'C_DNM_UD_ORGANICA': null,
                    'NIF_CIF': null,
                    'C_ID_NIVEL_ADMON': null,
                    'get_C_ID_NIVEL_ADMON_display': null,
                    'C_ID_TIPO_ENT_PUBLICA': null,
                    'get_C_ID_TIPO_ENT_PUBLICA_display': null,
                    'N_NIVEL_JERARQUICO': null,
                    'C_ID_DEP_UD_SUPERIOR': null,
                    'C_ID_DEP_UD_PRINCIPAL': null,
                    'B_SW_DEP_EDP_PRINCIPAL': null,
                    'C_ID_DEP_EDP_PRINCIPAL': null,
                    'C_ID_ESTADO': null,
                    'D_VIG_ALTA_OFICIAL': null,
                    'sede_electronica': null,
                    'numero_de_puestos': null
                },
                'resolucion_inicio': {},
                'resolucion_fin': {}
            },
            puestos:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            numPaginas: 0,
            unidad_codigo:'',
            dato_a_consultar: this.$route.params.id,
            url: url_proyecto + 'procedimientos_provision/',
            url_base : url_proyecto + 'procedimientos_provision/',
        }
    },

    created:function(){
        this.consultar(this.url + this.dato_a_consultar);
        this.url_puestos = url_proyecto + 'puestos_provision/?procedimiento_provision='+this.dato_a_consultar;
        this.consultarPuestos(this.url_puestos);
    },

    methods:{

        iraPagina(pagina){
            this.currentPage = pagina;
            this.url_puestos = url_proyecto + 'puestos_provision/?page='+this.currentPage+'&procedimiento_provision='+this.dato_a_consultar;
            this.consultarPuestos(this.url_puestos);
        },

        consultar(url){
            console.log ("fetch: ", url)
            fetch(url)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.procedimiento_provision=datosRespuesta;
                console.log('datosRespuesta ', datosRespuesta)
            })
            .catch(console.log)
        },

        consultarPuestos(url_puestos){
            console.log ("fetch puestos: ", url_puestos)
            fetch(url_puestos)

            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.puestos=datosRespuesta.results;
                this.count=datosRespuesta.count;
                console.log("Puestos: ", datosRespuesta);
                this.next=datosRespuesta.next;
                this.previous=datosRespuesta.previous;
                this.numPaginas = Math.trunc((this.count / 20)+1);
            })
            .catch(console.log)
        },

        consultarPuesto(id){
            this.$router.push('/consultar_puesto/'+id);
        },

    }
}
</script>
<style scoped>
    a {
        padding-left:0;   
    }
    .cabecera{
        margin:0px;
    }
</style>