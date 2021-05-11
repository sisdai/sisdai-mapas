<template>
    <div class="dai-map-container">
        <div class="map" ref="map"></div>
        <slot></slot>
    </div>
</template>
<script>
import Map from 'ol/Map';
import View from 'ol/View';
//import { defaults as defaultControls} from 'ol/control';
import CustomZoomControl from "./_zoom-control"
export default {
    name:"DaiMap",
    props:{
        center:{
            type:Array,
            default:function(){
                return [0,0]
            }
        },
        zoom:{
            type:Number,
            default:1
        },
        maxZoom:{
            type:Number,
            default:20
        },
        minZoom:{
            type:Number,
            default:1
        },
        extent:{
            type:Array,
            default:function(){
                return [0,0,0,0]
            }
        }
    },
    data:function(){
        return {
            cmpLayers:{}
        }
    },
    
    mounted:function(){
        
        if(this.extent[0]!=0 && this.extent[3]!=0){
            this.hasInitialExtent = true;
        }
        this.map = new Map({
            target: this.$refs.map,
            layers: [],
            view: new View({
                center: this.center,
                zoom: this.zoom,
                projection: 'EPSG:4326',
                maxZoom: this.maxZoom,
                minZoom: this.minZoom
            }),
            controls:[new CustomZoomControl]
        });

        //verificar si hay un card contaiener
        if(this.$parent.$options.name == "DaiCardMapContainer"){
            this.$parent._registerMap(this)
        }

    },
    methods:{
        _getMap:function(found){
            var vm = this
            function checkForMap () {
                if (vm.map) {
                found(vm.map)
                } else {
                setTimeout(checkForMap, 50)
                }
            }
            checkForMap()
        },
        _registerLayer:function(component_layer){
            this.cmpLayers[component_layer.id] = component_layer
        }
    },
    provide:function(){
        return {
            getMap:this._getMap,
            registerLayer: this._registerLayer
        }
    }
}
</script>

<style lang="scss" >
.dai-map-container{
    min-height: 300px;
    min-width: 200px;
    height: 40vh;
    position: relative;
}
.map{
    width: 100%;
    height: 100%;
    position: absolute;
}
</style>