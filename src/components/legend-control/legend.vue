<template>
    <div>
        <p class="title">{{title}}</p>
        <legend-item v-for="leg in VM_legends" :key="leg" :layerId="leg"></legend-item>
    </div>
</template>

<script>
import control from "../../mixins/control"
import LegendItem from "./legend-item.vue"
export default {
    name:"DaiLegend",
    mixins:[control],
    props:{
        for:{
            type:Array,
            default:function(){
                return []
            }
        },
        title:{
            type:String,
            default:""
        }
    },
    components:{
        LegendItem
    },
    data:function(){
        return{
            VM_legends:[]
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
            let layers_in_params = this.for;

            let interseccion_layers = layers_in_params.filter(value=>layers_in_map.includes(value))
            this.VM_legends = []
            interseccion_layers.forEach(layer_name => {
                
                this.VM_legends.push(layer_name)
            });
        }
    }
}
</script>

<style lang="scss" scoped>
    p.title{
        font-size: 1.2em;
        font-weight: 600;
        margin-block-end: .5em;
    }
</style>