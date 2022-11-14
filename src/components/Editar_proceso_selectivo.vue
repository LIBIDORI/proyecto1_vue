<template>
    <div class="container">
        <div class="card">
            <form v-on:submit.prevent="actualizar">
                <div class="card-header">
                    Editar Proceso Selectivo
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="entidad" class="control-label">Entidad</label>
                                <input type="text" class="form-control" readonly name="entidad" v-model="proceso_selectivo.entidad.C_ID_UD_ORGANICA" id="entidad" aria-describedby="helpId">
                            </div>
                            <div class="col-sm-5">
                                <label for="C_DNM_UD_ORGANICA" class="control-label"></label>
                                <input type="text" class="form-control" readonly name="C_DNM_UD_ORGANICA" id="C_DNM_UD_ORGANICA" aria-describedby="helpId" :value="proceso_selectivo.entidad.C_DNM_UD_ORGANICA">
                            </div>
                            <div class="col-sm-5">
                                <label for="cuerpo" class="control-label">Cuerpo</label>
                                <input type="text" class="form-control" required name="cuerpo" v-model="proceso_selectivo.cuerpo" id="cuerpo" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['cuerpo'].lenght != 0">{{errores['cuerpo'][0]}}</small>
                            </div>                            
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-3">
                                <label for="escala" class="control-label">Escala</label>
                                <select class="form-control" name="escala" id="escala" v-model="proceso_selectivo.escala.codigo">
                                    <option v-for="opcion in codigos['escala']" :key="opcion.codigo" v-bind:value="opcion.codigo">
                                        {{ opcion.descripcion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['escala'].lenght != 0">{{errores['escala'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="subescala" class="control-label">Subescala</label>
                                <select class="form-control" name="subescala" id="subescala" v-model="proceso_selectivo.subescala.codigo">
                                    <option v-for="opcion in codigos['subescala']" :key="opcion.codigo" v-bind:value="opcion.codigo">
                                        {{ opcion.descripcion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['subescala'].lenght != 0">{{errores['subescala'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="clase" class="control-label">Clase</label>
                                <input type="text" class="form-control" name="clase" v-model="proceso_selectivo.clase" id="clase" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['clase'].lenght != 0">{{errores['clase'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="categoria" class="control-label">Categoría</label>
                                <input type="text" class="form-control" name="categoria" v-model="proceso_selectivo.categoria" id="categoria" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['categoria'].lenght != 0">{{errores['categoria'][0]}}</small>
                            </div>
                            <div class="col-sm-3">
                                <label for="tipo_de_personal" class="control-label">Tipo de personal</label>
                                <input type="text" class="form-control" name="tipo_de_personal" v-model="proceso_selectivo.tipo_de_personal" id="tipo_de_personal" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['tipo_de_personal'].lenght != 0">{{errores['tipo_de_personal'][0]}}</small>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="gruposubgrupo" class="control-label">Gr. Sgr.</label>
                                <select class="form-control" name="gruposubgrupo" id="gruposubgrupo" v-model="proceso_selectivo.gruposubgrupo.codigo">
                                    <option v-for="opcion in codigos['gruposubgrupo']" :key="opcion.codigo" v-bind:value="opcion.codigo">
                                        {{ opcion.descripcion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['gruposubgrupo'].lenght != 0">{{errores['gruposubgrupo'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="sistema" class="control-label">Sistema</label>
                                <select class="form-control" name="sistema" id="sistema" v-model="proceso_selectivo.sistema.codigo">
                                    <option v-for="opcion in codigos['sistema']" :key="opcion.codigo" v-bind:value="opcion.codigo">
                                        {{ opcion.descripcion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['sistema'].lenght != 0">{{errores['sistema'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="turno" class="control-label">Turno</label>
                                <select class="form-control" name="turno" id="turno" v-model="proceso_selectivo.turno.codigo">
                                    <option v-for="opcion in codigos['turno']" :key="opcion.codigo" v-bind:value="opcion.codigo">
                                        {{ opcion.descripcion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['turno'].lenght != 0">{{errores['turno'][0]}}</small>
                            </div>
                            <div class="col-sm-1">
                                <label for="npuestos" class="control-label">N. puestos</label>
                                <input type="text" class="form-control" required name="npuestos" v-model="proceso_selectivo.npuestos" id="npuestos" aria-describedby="helpId">
                            </div>
                            <div class="col-sm-2">
                                <label for="finicio" class="control-label">Fecha de inicio</label>
                                <input type="date-local" class="form-control" required name="finicio" v-model="proceso_selectivo.finicio" id="finicio" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['finicio'].lenght != 0">{{errores['finicio'][0]}}</small>
                            </div>
                            <div class="col-sm-4">
                                <label for="web" class="control-label">Web</label>
                                <input type="text" class="form-control" required name="web" v-model="proceso_selectivo.web" id="web" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['web'].lenght != 0">{{errores['web'][0]}}</small>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn-toolbar justify-content-center" aria-label="">
                        <router-link :to="{name:'Consultar_proceso_selectivo',params:{id:proceso_selectivo.id}}" class="btn btn-warning col-sm-2">Cancelar</router-link>
                        <p class="col-sm-3"></p>
                        <button type="submit" class="btn btn-success col-sm-2">Actualizar</button>
                    </div>
                </div>
            </form>
        </div>
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
                'subescala': "",
                'clase': "",
                'categoria': "",
                'tipo_de_personal': "",
                'gruposubgrupo': "",
                'sistema': "",
                'turno': "",
                'npuestos': null,
                'finicio': "",
                'web': null
            },
            url_DIR3: url_proyecto + 'DIR3/',
            url_codigos_por_tabla: url_proyecto + 'codigos/tabla/',
            url : url_proyecto + 'procesos_selectivos/',
            codigos: {
                'escala' : [],
                'subescala' : [],
                'gruposubgrupo' : [],
                'sistema' : [],
                'turno' : [],
            },
            errores: {
                'entidad': [],
                'cuerpo': [],
                'escala': [],
                'subescala': [],
                'clase': [],
                'categoria': [],
                'tipo_de_personal': [],
                'gruposubgrupo': [],
                'sistema': [],
                'turno': [],
                'npuestos': [],
                'finicio': [],
                'web':[],
            },
        }       
    },

    mounted(){
        var item;
        for (item in this.codigos){
            console.log('item ', item)
            this.get_codigos(item);
        }
    },

    created:function(){
        this.consultar()
    },

    methods:{

        clear: function(){
            this.errores = {
                'entidad': [],
                'cuerpo': [],
                'escala': [],
                'subescala': [],
                'clase': [],
                'categoria': [],
                'tipo_de_personal': [],
                'gruposubgrupo': [],
                'sistema': [],
                'turno': [],
                'npuestos': [],
                'finicio': [],
                'web': [],
            }
        },

        consultar(){
            const headers = { "Authorization" : 'Token ' + localStorage.token };
            fetch(this.url+this.$route.params.id,{headers})
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                console.log(datosRespuesta);
                this.proceso_selectivo=datosRespuesta;
            })
            .catch(console.log)
        },

        get_codigos(campo){

            console.log(this.url_codigos_por_tabla+campo);

            fetch(this.url_codigos_por_tabla+campo)
            .then(respuesta=>respuesta.json())
            .then(datosRespuesta=>{
                this.codigos[campo]=datosRespuesta;
            })
            .catch(console.log)
        },

        actualizar(){
            var datosEnviar={id: this.proceso_selectivo.id,
                            entidad: this.proceso_selectivo.entidad.id,
                            cuerpo: this.proceso_selectivo.cuerpo,
                            escala: this.proceso_selectivo.escala.codigo,
                            subescala: this.proceso_selectivo.subescala.codigo,
                            clase: this.proceso_selectivo.clase,
                            categoria: this.proceso_selectivo.categoria,
                            tipo_de_personal: this.proceso_selectivo.tipo_de_personal,
                            gruposubgrupo: this.proceso_selectivo.gruposubgrupo.codigo,
                            sistema: this.proceso_selectivo.sistema.codigo,
                            turno: this.proceso_selectivo.turno.codigo,
                            npuestos: this.proceso_selectivo.npuestos,
                            finicio: this.proceso_selectivo.finicio,
                            web: this.proceso_selectivo.web}

            console.log('fetch ',this.url+this.$route.params.id+'/');

            fetch(this.url+this.$route.params.id+'/',{
                method:'PUT',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(datosEnviar)
            })
            .then((respuesta) => {
                console.log(respuesta.status);
                console.log(respuesta.ok);
                if(respuesta.ok) {
                    respuesta.json().then((datosRespuesta)=> {
                    console.log(datosRespuesta);
                    window.location.href='../consultar_proceso_selectivo/'+this.$route.params.id
                    })
                }else{
                    respuesta.json().then((datosRespuesta)=>{
                    console.log("datosRespuesta: ",datosRespuesta);
                    this.clear();
                    var field=[];
                    for (field in datosRespuesta){
                        console.log("Clave: ", field);
                        console.log("Valor:", datosRespuesta[field]);
                        this.errores[field]=datosRespuesta[field];
                        console.log("this.errores: ",this.errores[field][0])
                        }
                    })
                }
            })
        }
    }
}
</script>

<style scoped>
    label {
        font-size: 12px;
    }

    .left{
        text-align: left;
    }
    .disabled{
        opacity: 0.5;
        pointer-events: none;
    }
</style>