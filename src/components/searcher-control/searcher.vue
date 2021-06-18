<template>
<div class="map-searcher">
    <input type="text" v-bind="$attrs" :value="value" :list="id+'_list'">
    <datalist :id="id+'_list'">
        
        
        <option value="angel">angel</option>
    </datalist>
</div>
    
</template>

<script>
import control from "../../mixins/control" 
export default {
    name:"DaiMapSearcher",
    mixins:[control],
    data:function(){
        return{
            value_:null,
            id:"",
            options:[],
            VM_searchers:[],
            VM_layer:undefined
        }
    },
    created:function(){
        this.id = Math.random().toString(36).substring(7)
        this.value_ = this.value!=undefined ? this.value : this.options[0]
    },
    props:{
        value:{
            type: String,
            default:""
        },
        /**
         * lista de arrays a los que se les aplicara el buscador
         */
        for:{
            type:[Array,String],
            default:function(){
                return []
            }
        },
        /**
         * las opciones a llenar en el datalist, asegurarse de que son unicas, eso lo debe hacer quien implementa la lib
         */
        templateOption:{
            type:[Function,Array,String],
            default:"none"
        }
        
    },
    mounted:function(){
        this.cmpMap._getMap(olmap=>{
            console.log("llego",olmap)
        })
        /*
        //console.log(this.cmpMap)
        this.cmpMap.$on("add-layer",()=>{
            this._register_layers()
        })
        this.cmpMap.$on("remove-layer",()=>{
            //console.log("removiendo layer....")
            this._register_layers()
        })
        this._register_layers()
        */
    },
    methods:{
        _register_layers:function(){
            let layers_in_map = Object.keys( this.cmpMap.cmpLayers)
            let layers_in_params = Array.isArray( this.for ) ? this.for : [this.for];

            let interseccion_layers = layers_in_params.filter(value=>layers_in_map.includes(value))
            this.searchers = []
            interseccion_layers.forEach(layer_name => {
                
                this.searchers.push(layer_name)
            });
            this._fill_options()
        },
        _fill_options:function(){
            this.options=[]
            this.searchers.forEach((layerid)=>{
                let layer=this.cmpLayers.cmpLayers[layerid]
                layer.olLayer.getSource().forEachFeature(feature=>{
                    console.log(feature)
                })
                
            })
        },
        _register_layer:function(){
            this.VM_layer = undefined;
            let layers_in_map = Object.keys( this.cmpMap.cmpLayers)
            if(layers_in_map.includes(this.layerId)){
                this.VM_layer = this.cmpMap.cmpLayers[this.layerId]
            }
        }
    }

    
}
</script>

<style lang="scss" scoped>
    .map-searcher{
        font-size: 13px;
        position: relative;
        height: 2.5em;
        input{
            width: stretch;
            //width: fill-available;
            //width: -webkit-fill-available;
            //width: -moz-available;
            //width: calc(100% - 1.2rem);
            padding-bottom: calc(.5em - 1px);
            padding-top: calc(.5em - 1px);
            line-height: 1.5;
            padding-left: .75em;
            padding-right: .75em;
            border: none;
            border-radius: .375em;
            box-shadow:1px 1px 8px 3px #00000026;
            //position: absolute;
            //top: 0px;
            //left: 0px;
            //right: 0px;

        }
    }
</style>