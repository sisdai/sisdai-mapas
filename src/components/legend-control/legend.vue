<template>
    <div>
        <div class="header-legend">
            <p class="title">{{title}}</p>
            <button class="toggle-all" v-if="showButtonToggleAll" @click="toogleAll">{{labelToogleAll}}</button>
        </div>
        
        <legend-item v-for="leg in VM_legends" :key="leg" :layerId="leg"></legend-item>
    </div>
</template>

<script>
import control from "../../mixins/control"
import LegendItem from "./legend-item.vue"
export default {
    name:"DaiMapLegend",
    mixins:[control],
    props:{
        for:{
            type:[Array,String],
            default:function(){
                return []
            }
        },
        title:{
            type:String,
            default:""
        },
        /**
         * Asignar alguna accion para este boton desde las propiedades
         */
        showButtonToggleAll:{
            type:Boolean,
            default:false
        }
    },
    components:{
        LegendItem
    },
    data:function(){
        return{
            VM_legends:[],
            labelToogleAll:"Quitar todos",  
        }
    },
    mounted:function(){
        //console.log(this.cmpMap)
        this.cmpMap.$on("add-layer",()=>{
            this._draw_legends_from_layers()
        })
        this.cmpMap.$on("remove-layer",()=>{
            //console.log("removiendo layer....")
            this._draw_legends_from_layers()
        })
        this._draw_legends_from_layers()
    },
    methods:{
        _draw_legends_from_layers:function(){
            let layers_in_map = Object.keys( this.cmpMap.cmpLayers)
            let layers_in_params = Array.isArray( this.for ) ? this.for : [this.for];

            let interseccion_layers = layers_in_params.filter(value=>layers_in_map.includes(value))
            this.VM_legends = []
            interseccion_layers.forEach(layer_name => {
                
                this.VM_legends.push(layer_name)
            });
        },
        toogleAll:function(){
            let legendas = this.$children;
            //console.log(legendas)
            if(legendas.length==1 && legendas[0].$children[0].hasSubfilters){
                //solo aplicar el apagar prender a la leyenda de esa capa
                this._toogle_all_subfilters(legendas[0].$children[0])
                return
            }

            //aplicar a todas las leyendas


        },
        _toogle_all_subfilters:function(children_legend){
            children_legend.toggle_allSubFilters()
            //console.log(children_legend)
        }
    }
}
</script>

<style lang="scss" scoped>
    p.title{
        font-size: 12px;
        font-weight: 600;
        margin-block-end: .5em;
    }

    .header-legend{
        display: flex;
        justify-content: space-between;
        align-items: center;
        button.toggle-all{
            height: 1.6em;
            border: 1px solid var(--control-color);
            background-color: var(--control-bg-color);
            color: var(--control-color);
            text-align: center;
            white-space: nowrap;
            border-radius: 4px;
            cursor: pointer;
            font-size: 11px;
        }
    }
    
</style>