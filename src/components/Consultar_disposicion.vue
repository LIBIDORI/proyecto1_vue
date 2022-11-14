<template>

    <div class="container">
        <div class="card">
            <div class="card-header">
                <div class="col-sm-3">
                    Consulta de Puesto
                </div>
            </div>
            <div v-if="puesto.unidad" class="card-body">
                <table class="table">
                    <tr>
                        <th>Código</th>
                        <th>Descripción corta</th>
                        <th>Descripción larga</th>
                    </tr>
                    <tr>
                        <td>{{this.puesto.codigo}}</td>
                        <td>{{this.puesto.descripcion_corta}}</td>
                        <td>{{this.puesto.descripcion_larga}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>Unidad</th>
                        <th>Denominación Unidad</th>
                        <th>Ministerio</th>
                        <th>Centro Directivo</th>
                    </tr>
                    <tr>
                        <td>{{this.puesto.unidad.codigo}}</td>
                        <td>{{this.puesto.unidad.denominacion}}</td>
                        <td>{{this.puesto.unidad.ministerio.denominacion}}</td>
                        <td>{{this.puesto.unidad.centro_directivo.denominacion}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>Grupo/Subgrupo</th>
                        <th>Nivel</th>
                        <th>Complemento Específico</th>
                        <th>Forma de provisión</th>
                        <th>Estado</th>
                    </tr>
                    <tr>
                        <td>{{this.puesto.gruposubgrupo}}</td>
                        <td>{{this.puesto.nivel}}</td>
                        <td>{{this.puesto.cespecifico}}</td>
                        <td>{{this.puesto.provis}}</td>
                        <td>{{this.puesto.estado}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>Administración Pública</th>
                        <th>Tipo de puesto</th>
                        <th>País</th>
                        <th>Provincia</th>
                        <th>Municipio</th>
                    </tr>
                    <tr>
                        <td>{{this.puesto.adpu}}</td>
                        <td>{{this.puesto.tpto}}</td>
                        <td>{{this.puesto.pais}}</td>
                        <td>{{this.puesto.provincia.nombrecastellano}}</td>
                        <td>{{this.puesto.municipio.nombrecastellano}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>Observaciones</th>
                    </tr>
                    <tr>
                        <td>{{this.puesto.observaciones}}</td>
                    </tr>
                </table>
            </div>
            <div class="card-footer">
                <div class="btn-group" role="group" aria-label="">
<!--                    <router-link :to="{name:'Listar_puestos'}" class="btn btn-primary">Volver</router-link>-->
                    <button type="button" class="close btn btn-primary" @click="$router.back()" aria-label="Close">
                        Volver
                    </button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-header text-uppercase text-center">
                    <h5 v-if="this.count">
                        Puestos ({{count}})
                    </h5>
                    <h5 v-if="!this.count">
                        No tiene puestos adscritos
                    </h5>
            </div>
            <div class="card-body" v-if="this.count">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Convocatoria</th>
                            <th class="col-sm-5">
                                <p class="cabecera">Centro Directivo 1</p>
                                <p class="cabecera">Centro Directivo 2</p>
                                <p class="cabecera">Unidad</p>
                            </th>
                            <th>Número de orden</th>
                            <th>Número de plazas</th>
                            <th>Denominación</th>
                            <th>Localidad</th>
                            <th>Nivel</th>
                            <th>Complemento Específico</th>
                            <th>Grupo/Subgrupo</th>
                            <th>Ad.Pu.</th>
                            <th>Adscripción a cuerpo</th>
                            <th>Titulación requerida</th>
                            <th>Observaciones</th>
                            <th>Descripción</th>
                            <th>Cursos de formación</th>
                            <th>Méritos específicos</th>
                            <th>Máximo méritos específicos</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="provision in provisiones" :key="provision.codigo">
                            <td>{{provision.procedimiento_provision}}</td>
                            <td class="col-sm-5">
                                <p>{{provision.centro_directivo1}}</p>
                                <p>{{provision.centro_directivo1}}</p>
                                <p>{{provision.unidad}}</p>
                            </td>
                            <td>{{provision.numero_orden}}</td>
                            <td>{{provision.numero_plazas}}</td>
                            <td>{{provision.denominacion}}</td>
                            <td>{{provision.localidad}}</td>
                            <td>{{provision.nivel}}</td>
                            <td>{{provision.cespecifico}}</td>
                            <td>{{provision.gruposubgrupo}}</td>
                            <td>{{provision.adpu}}</td>
                            <td>{{provision.adscripcion_a_cuerpo}}</td>
                            <td>{{provision.titulacion_requerida}}</td>
                            <td>{{provision.observaciones}}</td>
                            <td>{{provision.descripcion}}</td>
                            <td>{{provision.cursos_de_formacion}}</td>
                            <td>{{provision.meritos_especificos}}</td>
                            <td>{{provision.maximo_me}}</td>
                            <td>
                                <router-link :to="{name:'Consultar_puesto',params:{id:puesto.codigo}}" class="btn btn-info">Consultar</router-link>
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
import auth from "@/logic/auth";

const url_proyecto  = auth.consulta_ENDPOINT_PATH() + 'proyecto1/';
//const url_proyecto = 'http://localhost:8000/proyecto1/';
//const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';

export default{

    data(){
        return{
            puesto:[],
            provisiones:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            unidad_codigo:'',
            puesto_a_consultar: this.$route.params.id,
            url : url_proyecto
        }
    },

    created:function(){
        this.consultar();
        this.url_provisiones = this.url + 'provisiones/?puesto='+this.puesto_a_consultar;
        this.consultarProvisiones(this.url_provisiones);
    },

    methods:{

        consultar(){
            fetch(url_proyecto + 'puestos/'+ this.puesto_a_consultar)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.puesto=datosRespuesta;
            })
            .catch(console.log)
        },

        consultarProvisiones(url_provisiones){
            console.log ("fetch provisiones: ", url_provisiones)
            fetch(url_provisiones)

            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.provisiones=datosRespuesta.results;
                this.count=datosRespuesta.count;
                console.log("Provisiones: ", datosRespuesta.count);
                this.next=datosRespuesta.next;
                this.previous=datosRespuesta.previous;
                this.numPaginas = Math.trunc(this.count / 10);
            })
            .catch(console.log)
        },

    }
}
</script>
<style scoped>
    .cabecera{
        margin:0px;
    }
</style>