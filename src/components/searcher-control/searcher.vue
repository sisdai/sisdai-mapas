<template>
<div class="map-searcher">
    <input type="text" v-bind="$attrs" :value="value" :list="id+'_list'" @input="_campo_lleno">
    <datalist :id="id+'_list'">
        <option v-for="opt in options" :key="opt" :value="opt"/>
    </datalist>
</div>
    
</template>

<script>
import control from "../../mixins/control" 

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

export default {
    name:"DaiBuscadorMapa",
    mixins:[control],
    data:function(){
        return{
            value_:null,
            id:"",
            options:[],
            options_values:{},
            VM_searchers:[],
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
        para:{
            type:[Array,String],
            default:function(){
                return []
            }
        },
        /**
         * las opciones a llenar en el datalist, asegurarse de que son unicas, eso lo debe hacer quien implementa la lib
         */
        accesorOptions:{
            type:[Function,Array,String],
            default:"none"
        }
        
    },
    mounted:function(){
        let this_=this
        this.$on("readyCmpMap",function(map){
            map.$on("add-layer",()=>{
                
                this_._register_layers()
            })
            map.$on("remove-layer",()=>{
                //console.log("removiendo layer....")
                this_._register_layers()
            })
            //console.log(this.cmpMap.cmpLayers,"sddddd")
            this_._register_layers()

        })
        /*
        //console.log(this.cmpMap)
        
        */
    },
    methods:{
        _register_layers:function(){
            
            let layers_in_map = Object.keys( this.cmpMap.cmpLayers)
            let layers_in_params = Array.isArray( this.para ) ? this.para : [this.para];
            console.log("registrando layers",layers_in_map,layers_in_params)
            let interseccion_layers = layers_in_params.filter(value=>layers_in_map.includes(value))
            this.searchers = []
            interseccion_layers.forEach(layer_name => {
                
                this.searchers.push(layer_name)
            });
            this._fill_options_all_layers()
        },
        _fill_options_all_layers:function(){
            this.options=[]
            this.searchers.forEach((layerid)=>{
                let layer=this.cmpMap.cmpLayers[layerid]
                if(layer.olLayer instanceof VectorLayer && layer.olLayer.getSource() instanceof VectorSource){
                    console.log( layer.olLayer.getSource().getFeatures(),"todas")
                    if (layer.olLayer.getSource().getFeatures().length==0){
                        console.log("se esperara el evento")
                        layer.olLayer.getSource().on("change",(event)=>{
                            console.log(event)
                            if(layer.olLayer.getSource().getState()=="ready"){
                                this._fill_options_layer(layer)
                                
                            }
                            
                        })
                    }else{
                        this._fill_options_layer(layer)
                    }
                    
                }
                
                
            })
        },
        _fill_options_layer:function(layer){
            layer.olLayer.getSource().forEachFeature(feature=>{
                let opcion = this.accesorOptions( feature.getProperties() );
                if(this.options.indexOf(opcion)==-1){
                    this.options.push(opcion)
                    this.options_values[opcion] = feature;
                }
                
                
                
                        //console.log(opcion)
            })
        },
        
        _campo_lleno:function(e){
            let value =  e.target.value;
            if(this.options.indexOf(value) != -1){
                this.$emit("select",value)
                let feature = this.options_values[value]
                hightlight_on_click(feature,this.cmpMap)
                if(feature.getGeometry().getType()=="Point"){
                    this.cmpMap.map.getView().animate({center:feature.getGeometry().getCoordinates(),zoom:13.5,duration:500})
                }else{
                    this.cmpMap.map.getView().fit(feature.getGeometry(),{duration:500,padding:[25,25,25,25]})
                }
            }
        }
    }

    
}

const hightlight_on_click = (feature,mapComponent) => {
        if (feature !== mapComponent.VM_highlight_feature) {
            if (mapComponent.VM_highlight_feature) {
                mapComponent.VM_highlight_feature.set("_hightlight", false);
            }
            if (feature) {
                feature.set("_hightlight", true);
            }
            mapComponent.VM_highlight_feature = feature;
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
            padding-bottom: calc(.6em - 1px);
            padding-top: calc(.6em - 1px);
            line-height: 1.5;
            padding-left: .75em;
            padding-right: .75em;
            border: none;
            border-radius: .375em;
            box-shadow:1px 1px 8px 3px #00000026;
            font-size: inherit;
            font-weight: 500;
            background-color: var(--control-bg-color);
            color: var(--control-color);

            &::placeholder{
                color: var(--control-color);
                opacity: .8;
            }
        }

        &.inverted{
            input{
                background-color: var(--inverted-control-bg-color);
                color: var(--inverted-control-color);
                &::placeholder{
                    color: var(--inverted-control-color);
                    
                }
            }
        }
    }
</style>