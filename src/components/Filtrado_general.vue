<template>
    <div>
        <div class="form-control">
            <h4>
                Búsqueda por 
            </h4>
        </div>
        <div v-for="criterio, index in criterios_de_busqueda" :key="index">
            <br>
            <div class="form-control">
                <h5>
                    Filtro {{index+1}} 
                </h5>
                <div class="form-group row">
                    <div class="col-sm-4">
                        <label for="buscar_por" class="col-form-label">Campo</label>
                        <select class="form-control" 
                                name="buscar_por" 
                                id="buscar_por" 
                                v-model="criterios_de_busqueda[index].buscar_por" 
                                placeholder="Campo de búsqueda"
                                v-on:change="comprobarCamposInformados">
                            <option value=""></option>
                            <option v-for="campo in camposDeBusqueda" :key="campo['value']" v-bind:value="campo['value']">
                                    {{campo['descripcion']}}
                            </option>

                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label for="operador_busqueda" class="col-form-label">Operador</label>
                        <select class="form-control" 
                                name="operador_busqueda" 
                                id="operador_busqueda" 
                                v-model="criterios_de_busqueda[index].operador_busqueda"
                                v-on:change="comprobarCamposInformados">
                            <option value="=">Igual</option>
                            <option value="__icontains">Contiene</option>
                            <option value="__gt">Mayor que</option>
                            <option value="__gte">Mayor o igual que</option>
                            <option value="__lt">Menor que</option>
                            <option value="__lte">Menor o igual que</option>
                            <option value="__startswith">Comienza por</option>
                            <option value="__endswith">Termina en</option>
                            <option value="__isnull">Es nulo</option>
                        </select>
                    </div>
                    <div class="col-sm-4">
                        <label for="valor_busqueda" class="col-form-label">Valor</label>
                        <input  type="text" 
                                class="form-control" 
                                name="valor_busqueda" 
                                id="valor_busqueda" 
                                v-model="criterios_de_busqueda[index].valor_busqueda" 
                                aria-describedby="helpId" 
                                placeholder="Valor de busqueda"
                                v-on:change="comprobarCamposInformados">
                    </div>
                </div>
            </div>
        </div>
        <br>
        <div class="form-control col-sm-1">
            <div class="btn-toolbar justify-content-between" aria-label="">
                <button 
                    type="button" 
                    class="btn btn-outline-success"
                    @click="filtrarPuestos"
                    id="show-modal"
                    v-show="isCamposInformados">
                    Buscar
                </button>
                <button 
                    type="button" 
                    class="btn btn-outline-success"
                    @click="addInput"
                    id="show-modal"
                    v-show="isCamposInformados">
                    Añadir
                </button>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Filtrado_general',
    props: {
        camposDeBusqueda: Array
    },
    emits: ["close"],
    data(){
        return{
            criterios_de_busqueda: [{
                buscar_por: "",
                operador_busqueda: "",
                valor_busqueda: "",
            }],
            isCamposInformados: false
        }
    },

    methods:{

        comprobarCamposInformados(){
            var index
            this.isCamposInformados = false;
            for (index in this.criterios_de_busqueda){
                if (this.criterios_de_busqueda[index].buscar_por &&
                    this.criterios_de_busqueda[index].valor_busqueda &&
                    this.criterios_de_busqueda[index].operador_busqueda)
                
                    this.isCamposInformados = true;
            }
        },

        addInput() {
            this.criterios_de_busqueda.push({
                                            buscar_por: "",
                                            operador_busqueda: "",
                                            valor_busqueda: "",
                                            })
        },

        filtrarPuestos(){
            const response = {
                'criterios_de_busqueda' : this.criterios_de_busqueda
            }
          this.$emit('close', response)
        },
    },

    computed: {
        buttonText() {
            return this.showInput ? 'Hide input' : 'Show input'
        }
    }

}
</script>
