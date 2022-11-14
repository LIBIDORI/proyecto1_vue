<template>

    <div class="container">
        <div class="card">
            <div class="card-header row">
                <div class="text-align-bottom">
                <h4 class="text-uppercase text-center ">
                    Consulta de Unidad
                </h4>
                </div>
            </div>
            <div v-if="unidad.ministerio" class="card-body">
                <table class="table">
                    <tr>
                        <th>Código</th>
                        <th>Denominación</th>
                        <th>Código DIR</th>
                    </tr>
                    <tr>
                        <td>{{this.unidad.codigo}}</td>
                        <td>{{this.unidad.denominacion}}</td>
                        <td>{{this.unidad.codigo_DIR3}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>Ministerio</th>
                        <th>Centro Directivo</th>
                    </tr>
                    <tr>
                        <td>{{this.unidad.ministerio.denominacion}}</td>
                        <td>{{this.unidad.centro_directivo.denominacion}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>País</th>
                        <th>Provincia</th>
                        <th>Localidad</th>
                    </tr>
                    <tr>
                        <td>{{this.unidad.pais.denominacion}}</td>
                        <td>{{this.unidad.provincia.nombrecastellano}}</td>
                        <td>{{this.unidad.municipio.nombrecastellano}}</td>
                    </tr>
                </table>
            </div>
            <div class="card-footer">
                <div class="btn-group" role="group" aria-label="">
                    <router-link :to="{name:'Listar_unidades'}" class="btn btn-primary">Volver</router-link>
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
                            <th @click="this.ordenar_por='codigo';filtrar()">Código</th>
                            <th @click="this.ordenar_por='descripcion_larga';filtrar()">Descripción</th>
                            <th @click="this.ordenar_por='nivel';filtrar()">Nivel</th>
                            <th @click="this.ordenar_por='cespecifico';filtrar()">C.Esp.</th>
                            <th @click="this.ordenar_por='gruposubgrupo';filtrar()">Gr./Subgr.</th>
                            <th @click="this.ordenar_por='estado';filtrar()">Estado</th>
                            <th @click="this.ordenar_por='provis';filtrar()">Provisión</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr v-for="puesto in puestos" :key="puesto.codigo">
                            <td>{{puesto.codigo}}</td>
                            <td>{{puesto.descripcion_larga}}</td>
                            <td>{{puesto.nivel}}</td>
                            <td>{{puesto.cespecifico}}</td>
                            <td>{{puesto.gruposubgrupo}}</td>
                            <td>{{puesto.estado}}</td>
                            <td>{{puesto.provis}}</td>
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
//const url_proyecto = 'https://serene-chamber-49517.herokuapp.com/proyecto1/';
//const url_proyecto = 'http://localhost:8000/proyecto1/';
//const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';

export default{

    data(){
        return{
            unidad:[],
            puestos:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            unidad_a_consultar: this.$route.params.id,
            url : url_proyecto,
        }
    },

    created(){
        this.consultar();
        //this.url_puestos = this.url + 'puesto/list/unidad-__exact-'+this.unidad_a_consultar+'/codigo/';
        this.url_puestos = this.url + 'puestos/?unidad='+this.unidad_a_consultar;
        this.consultarPuestos(this.url_puestos);
    },

    beforeRouteUpdate(){
        console.log("beforeRouteUpdate");
        this.consultar();
    },

    methods:{

        iraPagina(pagina){
            this.currentPage = pagina;
            this.url_puestos = this.url + 'puesto/list/unidad-__exact-'+this.unidad_a_consultar+'/codigo/?page='+this.currentPage;
            this.consultarPuestos(this.url_puestos);
        },

        consultar(){
//                fetch('http://localhost:8000/proyecto1/unidades/'+ this.unidad_a_consultar)
            fetch(this.url + 'unidades/' + this.unidad_a_consultar)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.unidad=datosRespuesta;
            })
            .catch(console.log)

        },

        consultarPuestos(url_puestos){
            fetch(url_puestos)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.puestos=datosRespuesta.results;
                this.count=datosRespuesta.count;
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
</style>
