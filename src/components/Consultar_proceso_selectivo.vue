<template>

    <div class="container">
        <div class="card">
            <div class="card-header text-uppercase text-center">
                <h5>
                    Consulta de Proceso Selectivo
                </h5>
            </div>
            <div v-if="proceso_selectivo.entidad" class="card-body">
                <table class="table">
                    <tr>
                        <th class="col-sm-5" colspan="2">Entidad (Código DIR3)</th>
                        <th class="col-sm-5" colspan="3">Cuerpo</th>
                    </tr>
                    <tr>
                        <td class="col-sm-5" colspan="2">{{this.proceso_selectivo.entidad.C_DNM_UD_ORGANICA}} ({{this.proceso_selectivo.entidad.C_ID_UD_ORGANICA}})</td>
                        <td class="col-sm-5" colspan="3"><a :href="this.proceso_selectivo.web" target="_blank" rel="noopener">{{this.proceso_selectivo.cuerpo}}</a></td>
                    </tr>
                    <br>
                    <tr>
                        <th class="col-sm-2">Escala</th>
                        <th class="col-sm-2">Subescala</th>
                        <th class="col-sm-2">Clase</th>
                        <th class="col-sm-2">Categoría</th>
                        <th class="col-sm-2">Tipo de personal</th>
                    </tr>
                    <tr>
                        <td class="col-sm-2">{{this.proceso_selectivo.get_escala_display}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.get_subescala_display}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.clase}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.categoria}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.tipo_de_personal}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th class="col-sm-2">Grupo Subgrupo</th>
                        <th class="col-sm-2">Sistema</th>
                        <th class="col-sm-2">Turno</th>
                        <th class="col-sm-2">N. de puestos</th>
                        <th class="col-sm-2">Fecha inicio</th>
                    </tr>
                    <tr>
                        <td class="col-sm-2">{{this.proceso_selectivo.get_gruposubgrupo_display}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.get_sistema_display}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.get_turno_display}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.npuestos}}</td>
                        <td class="col-sm-2">{{this.proceso_selectivo.finicio}}</td>
                    </tr>
                    <br>
                </table>
            </div>
            <div class="card-footer">
                <div class="btn-toolbar justify-content-center" role="group" aria-label="">
                    <button class="btn btn-warning col-sm-2" @click="$router.go(-1)">Cancelar</button>
                    <p class="col-sm-3"></p>
                    <router-link :to="{name:'Editar_proceso_selectivo'}" class="btn btn-success col-sm-2">Editar</router-link>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header text-uppercase text-center">
                <h5 v-if="this.count">
                    Disposiciones ({{count}})
                </h5>
                <h5 v-if="!this.count">
                    No tiene disposiciones asociadas
                </h5>
            </div>
            <div class="card-body" v-if="this.count">
                <table class="table">
                    <thead>
                        <tr>
                            <th class="col-sm-3">Tipo</th>
                            <th class="col-sm-3">Órgano</th>
                            <th class="col-sm-1">Fecha Publicación</th>
                            <th class="col-sm-1">Fecha</th>
                            <th class="col-sm-3">Medio</th>
                            <th class="col-sm-1">Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="disposicion in disposiciones" :key="disposicion.id">
                            <td class="col-sm-3"><a :href="disposicion.disposicion.url_publicacion" target="_blank" rel="noopener">{{disposicion.tipo}}</a></td>
                            <td class="col-sm-3">{{disposicion.disposicion.organoDIR3.C_DNM_UD_ORGANICA}}</td>
                            <td class="col-sm-1">{{disposicion.disposicion.fecha_publicacion}}</td>
                            <td class="col-sm-1">{{disposicion.disposicion.fecha}}</td>
                            <td class="col-sm-3">{{disposicion.disposicion.medio_publicacion}}</td>
                            <td class="col-sm-1">
                            <!--    <router-link :to="{name:'Consultar_disposicion',params:{id:disposicion.id}}" class="btn btn-info">Consultar</router-link>-->
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" v-on:click="consultarDisposicion(disposicion.id)" class="btn btn-info">Consultar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="card-foot">
                <div class="btn-group text-center" role="group" aria-label="">
                    <button type="button" class="page-link" v-if="previous != null" @click="iraPagina(1)">Primera  </button>
                    <button type="button" class="page-link" v-if="previous != null" @click="iraPagina(currentPage-1)">Anterior </button>
                    <button type="button" class="page-link" v-if="next != null" @click="iraPagina(currentPage+1)">Siguiente</button>
                    <button type="button" class="page-link" v-if="next != null" @click="iraPagina(numPaginas)">Última   </button>
                </div>
            </div>
        </div>

        <br>
    </div>
</template>

<script>
//const url_proyecto = 'http://localhost:8000/proyecto1/';
const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';

export default{
    data(){
        return{
            proceso_selectivo:{
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
                'cuerpo': null,
                'escala': "",
                'get_escala_display': "",
                'subescala': "",
                'get_subescala_display': "",
                'clase': "",
                'categoria': "",
                'tipo_de_personal': "",
                'gruposubgrupo': "",
                'get_gruposubgrupo_display': "",
                'sistema': "",
                'get_sistema_display': "",
                'turno': "",
                'get_turno_display': "",
                'npuestos': null,
                'finicio': null
            },
            disposiciones:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            unidad_codigo:'',
            dato_a_consultar: this.$route.params.id,
            url: url_proyecto + 'procesos_selectivos/',
            url_base : url_proyecto + 'procesos_selectivos/',
        }
    },

    created:function(){
        this.consultar(this.url + this.dato_a_consultar);
        this.url_disposiciones = url_proyecto + 'disposiciones/?proceso_selectivo='+this.dato_a_consultar;
        this.consultarDisposiciones(this.url_disposiciones);
    },

    methods:{

        consultar(url){
            console.log ("fetch : ", url)
            fetch(url)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log("Consultar: ", datosRespuesta);
                this.proceso_selectivo=datosRespuesta;
            })
            .catch(console.log)
        },

        consultarDisposiciones(url_disposiciones){
            console.log ("fetch disposiciones: ", url_disposiciones)
            fetch(url_disposiciones)

            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.disposiciones=datosRespuesta.results;
                this.count=datosRespuesta.count;
                console.log("Disposiciones: ", datosRespuesta);
                this.next=datosRespuesta.next;
                this.previous=datosRespuesta.previous;
                this.numPaginas = Math.trunc(this.count / 10);
            })
            .catch(console.log)
        },

        consultarDisposicion(id){
            this.$router.push('/consultar_disposicion/'+id);
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