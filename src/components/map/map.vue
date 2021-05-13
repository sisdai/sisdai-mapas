<template>
    <div class="dai-map-container">
        <div class="dai-map " :class="[darkControls ? 'dark-controls': 'light-controls']" ref="map"></div>
        <slot></slot>
        <div ref="tooltip" class="ol-tooltip ol-tooltip-bottom">
            <div class="content"></div>
        </div>
        <div ref="tooltipmov" class="ol-tooltipmov ">
            <div class="content"></div>
        </div>
        <div ref="popup" class="ol-popup">
            <div class="botones"><a class="boton-cerrar" @click="_cerrarPopup">x</a></div><div class="content"></div>
        </div>
    </div>
</template>
<script>
import Map from 'ol/Map';
import View from 'ol/View';
import Overlay from 'ol/Overlay';
//import { defaults as defaultControls} from 'ol/control';
import CustomZoomControl, {ResetControl} from "./_zoom-control"
import {invoke_tooltips} from "./_invokeTooltips";
import {invoke_clicks} from "./_invokeClicks";
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
        },
        darkControls:{
            type:Boolean,
            default: false
        }
    },
    data:function(){
        return {
            cmpLayers:{},
            VM_highlight_feature:undefined,
            VM_hover_feature:undefined,
            VM_reset_view:undefined
        }
    },
    created:function(){
        this.VM_reset_view = this.extent[0] == 0 && this.extent[3] ==0 
            ? {type:"center",value:{zoom:this.zoom,center:this.center}} 
            : {type:"extent",value:this.extent};
    },
    
    mounted:function(){
        
        let resetcontrol = new ResetControl();
        resetcontrol.on("reset",()=>{
            if (this.VM_highlight_feature) {
                this.VM_highlight_feature.set("_hightlight", false);
            }
            this.$emit("resetView",this.map)
        })
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
            controls:[new CustomZoomControl(),resetcontrol]
        });
        this.map.set("_reset_view",this.VM_reset_view)
        if(this.VM_reset_view.type=="extent"){
            this.map.getView().fit(this.extent,{duration:500,padding: [10, 10, 10, 10]})
        }

        //verificar si hay un card contaiener
        if(this.$parent.$options.name == "DaiCardMapContainer"){
            this.$parent._registerMap(this)
        }
        //los overlays 
        //tooltip overlay
        let overlay_tooltip = new Overlay({
            id: "tooltip",
            element: this.$refs.tooltip,
            autoPan: true,
            stopEvent: true,
            positioning: "bottom-center",
            insertFirst: true
        });
        overlay_tooltip.setPosition(undefined);
        this.map.addOverlay(overlay_tooltip);

        //tooltipmov
        let overlay_tooltip_mov = new Overlay({
            id: "tooltipmov",
            element: this.$refs.tooltipmov,
            autoPan: false,
            stopEvent: false,
            positioning: "bottom-center",
            
        });
        overlay_tooltip_mov.setPosition(undefined);
        this.map.addOverlay(overlay_tooltip_mov);
        //popup popup
        let overlay_popup = new Overlay({
            id: "popup",
            element: this.$refs.popup,
            autoPan: false,
            stopEvent: true,
            positioning: "center-center",
            insertFirst: false
        });
        overlay_popup.setPosition(undefined);
        this.map.addOverlay(overlay_popup);

        this.map.on("pointermove",(evento)=>{
            let target= evento.originalEvent.target
            
            if( target.classList.contains("ol-tooltip") || this.$refs.tooltip.contains(target) ){
                return 
            }
            if (evento.dragging) {
                return;
            }
            invoke_tooltips(this.map, evento)
        })
        this.map.on("click",(e)=>{
            invoke_clicks(this.map,e,this)
            
        })

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
            this.cmpLayers[component_layer.VM_id] = component_layer;
        },
        _cerrarPopup:function(){
            let popup_overlay = this.map.getOverlayById("popup")
            popup_overlay.setPosition(undefined)
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
.dai-map{
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: #E9E9E9;
}
</style>