<template>

    <div class="container">
        <div class="card">
            <div class="card-header text-uppercase text-center">
                <h5>
                    Consulta de Entidad
                </h5>
            </div>
            <div class="card-body">
                <table class="table">
                    <tr>
                        <th>Código</th>
                        <th>Denominación</th>
                        <th>NIF/CIF</th>
                    </tr>
                    <tr>
                        <td>{{this.entidad.C_ID_UD_ORGANICA}}</td>
                        <td><a :href="this.entidad.sede_electronica" target="_blank" rel="noopener">{{this.entidad.C_DNM_UD_ORGANICA}}</a></td>
                        <td>{{this.entidad.NIF_CIF}}</td>
                    </tr>
                    <br>
                    <tr>
                        <th>Nivel</th>
                        <th>Tipo</th>
                        <th>Nivel Jerárquico</th>
                        <th>Estado</th>
                        <th>Fecha de Creación Oficial</th>
                    </tr>
                    <tr>
                        <td>{{this.entidad.get_C_ID_NIVEL_ADMON_display}} {{this.entidad.C_ID_AMB_PROVINCIA}}</td>
                        <td>{{this.entidad.get_C_ID_TIPO_ENT_PUBLICA_display}}</td>
                        <td>{{this.entidad.N_NIVEL_JERARQUICO}}</td>
                        <td>{{this.entidad.C_ID_ESTADO}}</td>
                        <td>{{this.entidad.D_VIG_ALTA_OFICIAL}}  </td>
                    </tr>
                    <br>
                    <tr>
                        <th>Unidad Superior Jerárquica</th>
                        <th>Unidad Orgánica Raíz</th>
                        <th>Indicador de EDP</th>
                        <th>Unidad Raíz de la EDP asociada</th>
                    </tr>
                    <tr>
                        <td>{{this.entidad_superior}}
                            <div class="btn-group" role="group" aria-label="">
                                <button type="button" v-on:click="consultar(this.entidad.C_ID_DEP_UD_SUPERIOR['C_ID_UD_ORGANICA'])" class="btn btn-primary">Consultar</button>
                            </div>
                        </td>

                        <td>{{this.entidad_principal}}
                            <div class="btn-group" role="group" aria-label="">
                                <button type="button" v-on:click="consultar(this.entidad.C_ID_DEP_UD_PRINCIPAL['C_ID_UD_ORGANICA'])" class="btn btn-primary">Consultar</button>
                            </div>
                        </td>

                        <td>{{this.entidad.B_SW_DEP_EDP_PRINCIPAL}}</td>
                        <td>{{this.entidad.C_ID_DEP_EDP_PRINCIPAL}}</td>
                    </tr>
                </table>
            </div>
            <div class="card-footer">
                <div class="btn-group" role="group" aria-label="">
<!--                    <router-link :to="{name:'Listar_DIR3'}" class="btn btn-primary">Volver</router-link>-->
                    <button type="button" class="close btn btn-primary" @click="$router.back()" aria-label="Close">
                        Volver
                    </button>
                </div>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-header text-uppercase text-center">
                <div class="row row align-items-center">
                    <div v-if="this.entidades_dependientes.length">
                        <h5>Entidades Dependientes ({{entidades_dependientes.length}})</h5>
                    </div>
                    <div v-if="!this.entidades_dependientes.length">
                        <h5>No tiene Entidades Dependientes</h5>
                    </div>
                </div>
            </div>
            <div class="card-body" v-if="this.entidades_dependientes.length">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Código</th>
                            <th>Denominación</th>
                            <th>NIF/CIF</th>
                            <th>Nivel</th>
                            <th>Tipo</th>
                            <th>Nivel Jerárquico</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="align-middle" v-for="entidad_dependiente in entidades_dependientes" :key="entidad_dependiente.C_ID_UD_ORGANICA" v-on:click="consultar(entidad_dependiente.C_ID_UD_ORGANICA)">
                            <td>{{entidad_dependiente.C_ID_UD_ORGANICA}}</td>
                            <td>{{entidad_dependiente.C_DNM_UD_ORGANICA}}</td>
                            <td>{{entidad_dependiente.NIF_CIF}}</td>
                            <td>{{entidad_dependiente.C_ID_NIVEL_ADMON}}</td>
                            <td>{{entidad_dependiente.C_ID_TIPO_ENT_PUBLICA}}</td>
                            <td>{{entidad_dependiente.N_NIVEL_JERARQUICO}}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" v-on:click="consultarEntidad(entidad_dependiente.C_ID_UD_ORGANICA)" class="btn btn-primary">Consultar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-header">
                <div class="row row align-items-center">
                    <div class="col-sm-3" v-if="this.procesos_selectivos.length">
                        Procesos selectivos ({{procesos_selectivos.length}})
                    </div>
                    <div class="col-sm-3" v-if="!this.procesos_selectivos.length">
                        No tiene procesos selectivos
                    </div>
                    <div class="btn-group col-sm-1" role="group" aria-label="">
                        <button type="button" v-on:click="crearProcesoSelectivo(entidad.C_ID_UD_ORGANICA)" class="btn btn-primary">Nuevo</button>
                    </div>
                </div>
            </div>
            <div class="card-body" v-if="this.procesos_selectivos.length">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Cuerpo</th>
                            <th>Escala</th>
                            <th>Subescala</th>
                            <th>Tipo de personal</th>
                            <th>Gr./Subgr.</th>
                            <th>Sistema</th>
                            <th>Turno</th>
                            <th>Número de puestos</th>
                            <th>Fecha inicio</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="align-middle" v-for="proceso_selectivo in procesos_selectivos" :key="proceso_selectivo.id">
                            <td>{{proceso_selectivo.cuerpo}}</td>
                            <td>{{proceso_selectivo.get_escala_display}}</td>
                            <td>{{proceso_selectivo.get_subescala_display}}</td>
                            <td>{{proceso_selectivo.tipo_de_personal}}</td>
                            <td>{{proceso_selectivo.get_gruposubgrupo_display}}</td>
                            <td>{{proceso_selectivo.get_sistema_display}}</td>
                            <td>{{proceso_selectivo.get_turno_display}}</td>
                            <td>{{proceso_selectivo.npuestos}}</td>
                            <td>{{proceso_selectivo.finicio}}</td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" v-on:click="consultarProcesoSelectivo(proceso_selectivo.id)" class="btn btn-primary">Consultar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <br>
        <div class="card">
            <div class="card-header">
                <div class="row row align-items-center">
                    <div class="col-sm-3" v-if="this.procedimientos_provision.length">
                        Procedimientos de provision ({{procedimientos_provision.length}})
                    </div>
                    <div class="col-sm-3" v-if="!this.procedimientos_provision.length">
                        No tiene procedimientos de provision
                    </div>
                    <div class="btn-group col-sm-1" role="group" aria-label="">
                        <button type="button" v-on:click="crearProcedimientoProvision(entidad.C_ID_UD_ORGANICA)" class="btn btn-primary">Nuevo</button>
                    </div>
                </div>
            </div>
            <div class="card-body" v-if="this.procedimientos_provision.length">
                <table class="table">
                    <thead>
                        <tr>
                            <th>Convocatoria</th>
                            <th>Fecha</th>
                            <th>Fecha publicación</th>
                            <th>Fecha resolución</th>
                            <th>Fecha publicación resolución</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody >
                        <tr class="align-middle" v-for="procedimiento_provision in procedimientos_provision" :key="procedimiento_provision.id">
                            <td>{{procedimiento_provision.resolucion_inicio.denominacion}}</td>
                            <td>{{procedimiento_provision.resolucion_inicio.fecha}}</td>
                            <td>{{procedimiento_provision.resolucion_inicio.fecha_publicacion}}</td>
                            <td>
                                <div v-if="this.procedimientos_provision.resolucion_fin">
                                    {{procedimiento_provision.resolucion_fin.fecha}}
                                </div>
                                <div v-else></div>
                            </td>
                            <td>
                                <div v-if="this.procedimientos_provision.resolucion_fin">
                                    {{procedimiento_provision.resolucion_fin.fecha_publicacion}}
                                </div>
                                <div v-else></div>
                            </td>
                            <td>
                                <div class="btn-group" role="group" aria-label="">
                                    <button type="button" v-on:click="consultarProcedimientoProvision(procedimiento_provision.id)" class="btn btn-primary">Consultar</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
<script>
//const url_proyecto = 'http://localhost:8000/proyecto1/';
const url_proyecto = 'https://proyecto1libi.herokuapp.com/proyecto1/';

export default{

        data(){
            return{
                entidad:[],
                entidad_superior:[],
                entidad_principal:[],
                entidades_dependientes:[],
                entidad_C_ID_UD_ORGANICA:'',
                entidad_a_consultar: this.$route.params.id,
                procesos_selectivos:[],
                procedimientos_provision:[],
                url: url_proyecto + 'DIR3/',
                url_base : url_proyecto + 'DIR3/',
            }
        },

        created:function(){
            this.consultar(this.url+ this.entidad_a_consultar);
        },

        beforeRouteUpdate(){
            console.log("beforeRouteUpdate");
            this.consultar(this.url+ this.entidad_a_consultar);
        },

        methods:{

            consultar(url){
                fetch(url)
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                    this.entidad=datosRespuesta;
                    this.entidad_superior=this.entidad.C_ID_DEP_UD_SUPERIOR['C_DNM_UD_ORGANICA']
                    this.entidad_principal=this.entidad.C_ID_DEP_UD_PRINCIPAL['C_DNM_UD_ORGANICA']
                    this.entidad_C_ID_UD_ORGANICA = this.entidad.C_ID_UD_ORGANICA
                })
                .catch(console.log)

                fetch(url+'/entidades_dependientes')
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                    this.entidades_dependientes=datosRespuesta;
                })
                .catch(console.log)

                fetch(url+'/procesos_selectivos')
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                    this.procesos_selectivos=datosRespuesta;
                })
                .catch(console.log)

                console.log('Fetch procedimientos provision ', url+'/procedimientos_provision')
                fetch(url+'/procedimientos_provision')
                .then(respuesta=>respuesta.json())
                .then((datosRespuesta)=>{
                    this.procedimientos_provision=datosRespuesta;
                console.log('Procedimientos provision ', this.procedimientos_provision)
                })
                .catch(console.log)

            },

            consultarEntidad(id){
                this.entidad_a_consultar = id;
                this.$router.push('/consultar_DIR3/'+id);
            },

            consultarProcesoSelectivo(id){
                this.$router.push('/consultar_proceso_selectivo/'+id);
            },

            crearProcesoSelectivo(id){
                this.$router.push('/crear_proceso_selectivo/'+id);
            },

            consultarProcedimientoProvision(id){
                this.$router.push('/consultar_procedimiento_provision/'+id);
            },

            crearProcedimientoProvision(id){
                this.$router.push('/crear_procedimiento_provision/'+id);
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