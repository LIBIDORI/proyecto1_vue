<template>
    <div class="container">
        <div class="card">
            <form v-on:submit.prevent="crear">
                <div class="card-header">
                    Nuevo Procedimiento de Provision
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="entidad" class="control-label">Entidad</label>
                                <input type="text" class="form-control" readonly name="entidad" v-model="procedimiento_provision.entidad" id="entidad" aria-describedby="helpId" placeholder="Entidad">
                            </div>
                            <div class="col-sm-5">
                                <label for="C_DNM_UD_ORGANICA" class="control-label"></label>
                                <input type="text" class="form-control" readonly name="C_DNM_UD_ORGANICA" id="C_DNM_UD_ORGANICA" aria-describedby="helpId" placeholder="Entidad" :value="entidad.C_DNM_UD_ORGANICA">
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-12">
                                <label for="resolucion_inicio" class="control-label">Resolución de inicio</label>
                                <select class="form-control" name="resolucion_inicio" id="resolucion_inicio" v-model="procedimiento_provision.resolucion_inicio" placeholder="Resolucion Inicio">
                                    <option v-for="disposicion in disposiciones" :key="disposicion.id" v-bind:value="disposicion.id">
                                        {{ disposicion.codigo }} {{ disposicion.denominacion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['resolucion_inicio'].lenght != 0">{{errores['resolucion_inicio'][0]}}</small>
                            </div>
                            <br>
                            <div class="col-sm-12">
                                <label for="resolucion_fin" class="control-label">Resolución de fin</label>
                                <select class="form-control" name="resolucion_fin" id="resolucion_fin" v-model="procedimiento_provision.resolucion_fin" placeholder="Resolucion Fin">
                                    <option v-for="disposicion in disposiciones" :key="disposicion.id" v-bind:value="disposicion.id">
                                        {{ disposicion.codigo }} {{ disposicion.denominacion }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['resolucion_inicio'].lenght != 0">{{errores['resolucion_inicio'][0]}}</small>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="btn-toolbar justify-content-center" aria-label="">
                        <router-link :to="{name:'Consultar_DIR3'}" class="btn btn-warning col-sm-2">Cancelar</router-link>
                        <p class="col-sm-3"></p>
                        <button type="submit" class="btn btn-success col-sm-2">Crear</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</template>
<script>
const url_proyecto = 'http://localhost:8000/proyecto1/';
export default{
    data(){
        return{
            procedimiento_provision:{
                'entidad': this.$route.params.id,
                'resolucion_inicio': null,
                'resolucion_fin': null
            },
            entidad:[],
            disposiciones:[],
            errores: {
                'entidad': [],
                'resolucion_inicio': [],
                'resolucion_fin': [],
            },
            url_DIR3: url_proyecto + 'DIR3/',
            url : url_proyecto + 'procedimientos_provision/',
            url_disposicion : url_proyecto + 'DIR3/'+this.$route.params.id+'/disposiciones/',
        }
    },

    mounted(){
        this.getEntidad();
        this.getDisposiciones();
    },

    methods:{

        clear: function(){
            this.errores = {
                'entidad': [],
                'resolucion_inicio': [],
                'resolucion_fin': [],
            }
        },

        getEntidad(){

            console.log(this.url_DIR3+this.procedimiento_provision.entidad);

            fetch(this.url_DIR3+this.procedimiento_provision.entidad)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.entidad=datosRespuesta;
                console.log ('Entidad ', this.entidad)
            })
            .catch(console.log)
        },

        getDisposiciones(){

            console.log(this.url_disposicion);

            fetch(this.url_disposicion)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.disposiciones=datosRespuesta;
                console.log ('Disposiciones ', this.disposiciones)
            })
            .catch(console.log)
        },

        crear(){
            var datosEnviar={entidad: this.procedimiento_provision.entidad,
                            resolucion_inicio: this.procedimiento_provision.resolucion_inicio,
                            resolucion_fin: this.procedimiento_provision.resolucion_fin}

            console.log('url ',this.url);
            console.log('datosEnviar ',datosEnviar);

            fetch(this.url,{
                method:'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(datosEnviar)
            })
            .then((respuesta) => {
                console.log(respuesta.status);
                console.log(respuesta.ok);
                if(respuesta.ok) {
                    respuesta.json().then((datosRespuesta)=> {
                    console.log(datosRespuesta);
                    this.$router.back()
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