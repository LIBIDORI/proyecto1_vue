<template>
    <div class="container">
        <div class="card">
            <form v-on:submit.prevent="actualizar">
                <div class="card-header">
                    Editar Procedimiento de Provisión
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="entidad" class="control-label">Entidad</label>
                                <input type="text" class="form-control" readonly name="entidad" v-model="procedimiento_provision.entidad.C_ID_UD_ORGANICA" id="entidad" aria-describedby="helpId">
                            </div>
                            <div class="col-sm-5">
                                <label for="C_DNM_UD_ORGANICA" class="control-label"></label>
                                <input type="text" class="form-control" readonly name="C_DNM_UD_ORGANICA" id="C_DNM_UD_ORGANICA" aria-describedby="helpId" :value="procedimiento_provision.entidad.C_DNM_UD_ORGANICA">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-12">
                                <label for="resolucion_inicio" class="control-label">Resolución de inicio</label>
                                <select class="form-control" name="resolucion_inicio" id="resolucion_inicio" v-model="procedimiento_provision.resolucion_inicio.id" placeholder="Resolucion Inicio">
                                    <option v-for="disposicion in disposiciones" :key="disposicion.id" v-bind:value="disposicion.id">
                                        {{ disposicion.codigo }} {{ disposicion.denominacion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['resolucion_inicio'].lenght != 0">{{errores['resolucion_inicio'][0]}}</small>
                            </div>
                            <br>
                            <div class="col-sm-12">
                                <label for="resolucion_fin" class="control-label">Resolución de fin</label>
                                <select class="form-control" name="resolucion_fin" id="resolucion_fin" v-model="procedimiento_provision.resolucion_fin.id" placeholder="Resolucion Fin">
                                    <option v-for="disposicion in disposiciones" :key="disposicion.id" v-bind:value="disposicion.id">
                                        {{ disposicion.codigo }} {{ disposicion.denominacion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['resolucion_inicio'].lenght != 0">{{errores['resolucion_inicio'][0]}}</small>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-footer">
                    <div class="btn-toolbar justify-content-center" aria-label="">
                        <router-link :to="{name:'Consultar_procedimiento_provision',params:{id:procedimiento_provision.id}}" class="btn btn-warning col-sm-2">Cancelar</router-link>
                        <p class="col-sm-3"></p>
                        <button type="submit" class="btn btn-success col-sm-2">Actualizar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
//const url_proyecto = 'http://localhost:8000/proyecto1/';
const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';
export default{

    data(){
        return{
            procedimiento_provision:{
                'id': this.$route.params.id,
                'entidad': {
                    'C_ID_UD_ORGANICA': null,
                    'C_DNM_UD_ORGANICA': null,
                },
                'resolucion_inicio': {
                    'id': null
                },
                'resolucion_fin': {
                    'id':null
                }
            },
            disposiciones:[],
            errores: {
                'entidad': [],
                'resolucion_inicio': [],
                'resolucion_fin': [],
            },
            url : url_proyecto + 'procedimientos_provision/',
            url_DIR3 : url_proyecto + 'DIR3/',
        }       
    },

    created:function(){
        this.consultar();
    },

    mounted(){
        this.consultar();
    },

    methods:{

        clear: function(){
            this.errores = {
                'entidad': [],
                'resolucion_inicio': [],
                'resolucion_fin': [],
            }
        },

        consultar(){
            const headers = { "Authorization" : 'Token ' + localStorage.token };
            fetch(this.url+this.$route.params.id,{headers})
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.procedimiento_provision=datosRespuesta;
                this.getDisposiciones();
            })
            .catch(console.log)
        },

        getDisposiciones(){

            this.url_disposicion = this.url_DIR3 + this.procedimiento_provision.entidad.C_ID_UD_ORGANICA+'/disposiciones/',

            fetch(this.url_disposicion)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.disposiciones=datosRespuesta;
            })
            .catch(console.log)
        },

        actualizar(){
            var datosEnviar={id: this.procedimiento_provision.id,
                            entidad: this.procedimiento_provision.entidad,
                            resolucion_inicio: this.procedimiento_provision.resolucion_inicio,
                            resolucion_fin: this.procedimiento_provision.resolucion_fin}

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
                    window.location.href='../consultar_procedimiento_provision/'+this.$route.params.id
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