<template>
  <Transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">

                <div id="panel_filtrado" class="card-body">
                    <div class="form-check" v-for="ministerio in formatearMinisterios" :key="ministerio['codigo']">
                        <input class="form-check-input" id="ministerioCheck" @change="filtrar_ministerio(ministerio['codigo'])" v-model="ministerios_checked" v-bind:value="ministerio['codigo']" type="checkbox">
                        <label class="form-check-label small" for="ministerioCheck">{{ministerio['codigo']}} {{ministerio['denominacion']}} ({{ministerio['numero_de_unidades']}})</label>
                        <div v-if="this.ministerios_checked.includes(ministerio['codigo'])">
                            <div class="form-check" v-for="centro_directivo in formatearCentros_Directivos(ministerio['codigo'])" :key="centro_directivo['codigo']">
                                <input @change="filtrar_centro_directivo(centro_directivo['codigo'])" v-model="centros_directivos_checked" v-bind:value="centro_directivo['codigo']" type="checkbox" class="form-check-input" id="centro_directivoCheck">
                                <label class="form-check-label small" for="centro_directivoCheck">{{centro_directivo['codigo']}} {{centro_directivo['denominacion']}} ({{centro_directivo['numero_de_unidades']}})</label>
                                <div v-if="this.centros_directivos_checked.includes(centro_directivo['codigo'])">
                                    <div class="form-check" v-for="unidad in formatearUnidades(centro_directivo['codigo'])" :key="unidad['codigo']">
                                        <input @change="filtrar_unidad" v-model="unidades_checked" v-bind:value="unidad['codigo']" type="checkbox" class="form-check-input" id="unidadCheck">
                                        <label class="form-check-label small" for="unidadCheck">{{unidad['codigo']}} {{unidad['denominacion']}} ({{unidad['numero_de_puestos']}})</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button 
                type="button" 
                class="modal-default-button btn btn-outline-success"
                @click="filtrarUnidades"
                id="show-modal">Ok
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
const url_proyecto = 'http://localhost:8000/proyecto1/';
//const url_proyecto = 'http://192.168.1.34:8000/proyecto1/';
//const url_proyecto = 'https://serene-chamber-49517.herokuapp.com/proyecto1/';

export default{

    props: {
        show: Boolean,
    },

    data(){
        return{
            puestos:[],
            count:0,
            next:'',
            previous:'',
            currentPage: 1,
            numPaginas: 0,
            ordenar_por: "codigo",
            operador_busqueda:"__contains",
            url_ministerios: url_proyecto + 'ministerio/list/',
            url_centros_directivos_base: url_proyecto + 'centro_directivo/list/?',
            url_centros_directivos: url_proyecto + 'centro_directivo/list/?',
            url_unidades_base : url_proyecto + 'unidad/list/?',
            url_unidades : url_proyecto + 'unidad/list/?',
            ministerios:{},
            ministerios_checked:[],
            ministerios_devueltos: [],
            centros_directivos:[],
            centros_directivos_checked:[],
            centros_directivos_filtrado: [],
            centros_directivos_devueltos: [],
            unidades:[],
            unidades_filtrado:[],
            unidades_checked:[],
            unidades_devueltas: [],
        }
    },

    mounted(){
        this.getMinisterios();
    },

    computed:{
        formatearMinisterios(){
            return Object.values(this.ministerios);
        },
    },

    methods:{

        filtrarUnidades(){

          var ministerio_seleccionado = []
          this.ministerios_devueltos =[]
          for (ministerio_seleccionado in this.ministerios_checked){
            if (!this.ministerios_devueltos.includes(this.ministerios_checked[ministerio_seleccionado])){
              this.ministerios_devueltos.push(this.ministerios_checked[ministerio_seleccionado])
            }
          }

          var centro_directivo_seleccionado = []
          var ministerio_a_eliminar=''

          this.centros_directivos_devueltos = []
          for (centro_directivo_seleccionado in this.centros_directivos_checked){

            ministerio_a_eliminar = this.unidades_filtrado[centro_directivo_seleccionado]['ministerio'].codigo
            index = this.ministerios_devueltos.indexOf(ministerio_a_eliminar)
            if (index>=0){
              this.ministerios_devueltos.splice(index,1)
            }

            if (!this.centros_directivos_devueltos.includes(this.centros_directivos_checked[centro_directivo_seleccionado])){
              this.centros_directivos_devueltos.push(this.centros_directivos_checked[centro_directivo_seleccionado])
            }
          }          

          var centro_directivo_a_eliminar=''
          var index
          var unidad_seleccionada = []
          this.unidades_devueltas = []
          for (unidad_seleccionada in this.unidades_checked){

            centro_directivo_a_eliminar = this.unidades_filtrado[unidad_seleccionada]['centro_directivo'].codigo
            index = this.centros_directivos_devueltos.indexOf(centro_directivo_a_eliminar)
            if (index>=0){
              this.centros_directivos_devueltos.splice(index,1)
            }

            if (!this.unidades_devueltas.includes(this.unidades_checked[unidad_seleccionada])){
              this.unidades_devueltas.push(this.unidades_checked[unidad_seleccionada])
            }

          }

          const response = {
            'ministerios_filtro' : this.ministerios_devueltos,
            'centros_directivos_filtro': this.centros_directivos_devueltos,
            'unidades_filtro': this.unidades_checked
          }

          this.$emit('close', response)
        },

        formatearCentros_Directivos(ministerio){
            return this.centros_directivos.filter(o=>o.ministerio==ministerio);
        },
        formatearUnidades(centro_directivo){
            return this.unidades.filter(o=>o.centro_directivo.codigo==centro_directivo);
        },

        filtrar_ministerio(){

            if (this.ministerios_checked['0']){
              this.url_centros_directivos = this.url_centros_directivos_base +'ministerio='+ this.ministerios_checked
              this.getCentros_Directivos()
            }
        },

        filtrar_centro_directivo(){

            if (this.centros_directivos_checked['0']){
              this.url_unidades = this.url_unidades_base +'centro_directivo='+ this.centros_directivos_checked
              console.log('this.getUnidades',this.getUnidades())
            }
        },

        getMinisterios(){

            fetch(this.url_ministerios)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                localStorage.setItem("ministerios",JSON.stringify(datosRespuesta));
                this.ministerios=datosRespuesta;
            })
            .catch(console.log)
        },

        getCentros_Directivos(){

            fetch(this.url_centros_directivos)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.centros_directivos=datosRespuesta;
            })
            .catch(console.log)
        },

        getUnidades(){

            fetch(this.url_unidades)
            .then(respuesta=>respuesta.json())
            .then((datosRespuesta)=>{
                this.unidades=datosRespuesta;
                this.unidades_filtrado = this.unidades;
            })
            .catch(console.log)
        },
    }
}
</script>

<style>

    #panel_filtrado{
        overflow:scroll;
        height:400px;
        width:950px;
    }

.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 1000px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>