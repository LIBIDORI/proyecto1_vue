<template>
    <div class="container">
        <div class="card">
            <form v-on:submit.prevent="crear">
                <div class="card-header">
                    Nuevo Proceso Selectivo
                </div>
                <div class="card-body">
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-2">
                                <label for="entidad" class="control-label">Entidad</label>
                                <input type="text" class="form-control" readonly name="entidad" v-model="proceso_selectivo.entidad" id="entidad" aria-describedby="helpId" placeholder="Entidad">
                            </div>
                            <div class="col-sm-5">
                                <label for="C_DNM_UD_ORGANICA" class="control-label"></label>
                                <input type="text" class="form-control" readonly name="C_DNM_UD_ORGANICA" id="C_DNM_UD_ORGANICA" aria-describedby="helpId" placeholder="Entidad" :value="entidad.C_DNM_UD_ORGANICA">
                            </div>
                            <div class="col-sm-5">
                                <label for="cuerpo" class="control-label">Cuerpo</label>
                                <input type="text" class="form-control" required name="cuerpo" v-model="proceso_selectivo.cuerpo" id="cuerpo" aria-describedby="helpId" placeholder="Cuerpo">
                                <small id="helpId" class="form-text text-danger" v-if="errores['cuerpo'].lenght != 0">{{errores['cuerpo'][0]}}</small>
                            </div>                            
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-3">
                                <label for="escala" class="control-label">Escala</label>
                                <select class="form-control" name="escala" id="escala" v-model="proceso_selectivo.escala" placeholder="Escala">
                                    <option v-for="opcion in escala_opciones" :key="opcion.valor" v-bind:value="opcion.valor">
                                        {{ opcion.texto }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['escala'].lenght != 0">{{errores['escala'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="subescala" class="control-label">Subescala</label>
                                <select class="form-control" name="subescala" id="subescala" v-model="proceso_selectivo.subescala">
                                    <option v-for="opcion in subescala_opciones" :key="opcion.valor" v-bind:value="opcion.valor">
                                        {{ opcion.texto }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['subescala'].lenght != 0">{{errores['subescala'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="clase" class="control-label">Clase</label>
                                <input type="text" class="form-control" name="clase" v-model="proceso_selectivo.clase" id="clase" aria-describedby="helpId" placeholder="Clase">
                                <small id="helpId" class="form-text text-danger" v-if="errores['clase'].lenght != 0">{{errores['clase'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="categoria" class="control-label">Categoría</label>
                                <input type="text" class="form-control" name="categoria" v-model="proceso_selectivo.categoria" id="categoria" aria-describedby="helpId" placeholder="Categoría">
                                <small id="helpId" class="form-text text-danger" v-if="errores['categoria'].lenght != 0">{{errores['categoria'][0]}}</small>
                            </div>
                            <div class="col-sm-3">
                                <label for="tipo_de_personal" class="control-label">Tipo de personal</label>
                                <input type="text" class="form-control" name="tipo_de_personal" v-model="proceso_selectivo.tipo_de_personal" id="tipo_de_personal" aria-describedby="helpId" placeholder="Tipo de personal">
                                <small id="helpId" class="form-text text-danger" v-if="errores['tipo_de_personal'].lenght != 0">{{errores['tipo_de_personal'][0]}}</small>
                            </div>
                        </div>
                    </div>
                    <br>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-sm-1">
                                <label for="gruposubgrupo" class="control-label">Gr. Sgr.</label>
                                <select class="form-control" name="gruposubgrupo" id="gruposubgrupo" v-model="proceso_selectivo.gruposubgrupo">
                                    <option v-for="opcion in gruposubgrupo_opciones" :key="opcion.valor" v-bind:value="opcion.valor">
                                        {{ opcion.texto }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['gruposubgrupo'].lenght != 0">{{errores['gruposubgrupo'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="sistema" class="control-label">Sistema</label>
                                <select class="form-control" name="sistema" id="sistema" v-model="proceso_selectivo.sistema">
                                    <option v-for="opcion in sistema_opciones" :key="opcion.valor" v-bind:value="opcion.valor">
                                        {{ opcion.texto }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['sistema'].lenght != 0">{{errores['sistema'][0]}}</small>
                            </div>
                            <div class="col-sm-2">
                                <label for="turno" class="control-label">Turno</label>
                                <select class="form-control" name="turno" id="turno" v-model="proceso_selectivo.turno">
                                    <option v-for="opcion in turno_opciones" :key="opcion.valor" v-bind:value="opcion.valor">
                                        {{ opcion.texto }}
                                    </option>
                                </select> 
                                <small id="helpId" class="form-text text-danger" v-if="errores['turno'].lenght != 0">{{errores['turno'][0]}}</small>
                            </div>
                            <div class="col-sm-1">
                                <label for="npuestos" class="control-label">N. puestos</label>
                                <input type="text" class="form-control" required name="npuestos" v-model="proceso_selectivo.npuestos" id="npuestos" aria-describedby="helpId" placeholder="Número de puestos">
                            </div>
                            <div class="col-sm-2">
                                <label for="finicio" class="control-label">Fecha de inicio</label>
                                <input type="date" class="form-control" required name="finicio" v-model="proceso_selectivo.finicio" id="finicio" aria-describedby="helpId" placeholder="Fecha de inicio">
                                <small id="helpId" class="form-text text-danger" v-if="errores['finicio'].lenght != 0">{{errores['finicio'][0]}}</small>
                            </div>
                            <div class="col-sm-4">
                                <label for="web" class="control-label">Web</label>
                                <input type="text" class="form-control" required name="web" v-model="proceso_selectivo.web" id="web" aria-describedby="helpId">
                                <small id="helpId" class="form-text text-danger" v-if="errores['web'].lenght != 0">{{errores['web'][0]}}</small>
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
            proceso_selectivo:{
                'entidad': this.$route.params.id,
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
                'finicio': null,
                'web': null
            },
            entidad:[],
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
            url_DIR3: url_proyecto + 'DIR3/',
            url : url_proyecto + 'procesos_selectivos/',
            escala_opciones:[
                {valor: '01', texto:'Administración General'},
                {valor: '02', texto:'Administración Especial'},
            ],
            subescala_opciones:[
                {valor: '0101', texto:'Técnica'},
                {valor: '0102', texto:'De gestión'},
                {valor: '0103', texto:'Administrativa'},
                {valor: '0104', texto:'Auxiliar'},
                {valor: '0105', texto:'Subalterna'},
                {valor: '0201', texto:'Técnica'},
                {valor: '0202', texto:'Servicios especiales'},
            ],
            gruposubgrupo_opciones:[
                {valor: '1', texto:'A1'},
                {valor: '2', texto:'A2'},
                {valor: '3', texto:'B'},
                {valor: '4', texto:'C1'},
                {valor: '5', texto:'C2'},
            ],
            sistema_opciones:[
                {valor: '1', texto:'Oposición'},
                {valor: '2', texto:'Concurso-oposición'},
                {valor: '3', texto:'Concurso'},
            ],
            turno_opciones:[
                {valor: '1', texto:'Libre'},
                {valor: '2', texto:'Promoción interna'},
                {valor: '3', texto:'Estabilización'},
                {valor: '4', texto:'Movilidad sin ascenso'},
            ],
        }
    },

    mounted(){
        this.getEntidad();
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

        getEntidad(){

            console.log(this.url_DIR3+this.proceso_selectivo.entidad);

            fetch(this.url_DIR3+this.proceso_selectivo.entidad)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.entidad=datosRespuesta;
                console.log ('Entidad ', this.entidad)
            })
            .catch(console.log)
        },

        crear(){
            var datosEnviar={entidad: this.proceso_selectivo.entidad,
                            cuerpo: this.proceso_selectivo.cuerpo,
                            escala: this.proceso_selectivo.escala,
                            subescala: this.proceso_selectivo.subescala,
                            clase: this.proceso_selectivo.clase,
                            categoria: this.proceso_selectivo.categoria,
                            tipo_de_personal: this.proceso_selectivo.tipo_de_personal,
                            gruposubgrupo: this.proceso_selectivo.gruposubgrupo,
                            sistema: this.proceso_selectivo.sistema,
                            turno: this.proceso_selectivo.turno,
                            npuestos: this.proceso_selectivo.npuestos,
                            finicio: this.proceso_selectivo.finicio,
                            web: this.proceso_selectivo.web}

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
//                    this.$router.push('../Listar_procesos_selectivos')
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