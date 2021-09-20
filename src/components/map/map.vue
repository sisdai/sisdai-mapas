<template>
    <div class="dai-map-container">
        

        <div class="dai-map " :class="[colorControlesInvertidos ? 'inverted-controls': 'default-controls']" ref="map"></div>
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
import CustomZoomControl, {ResetControl,NivelControl} from "./_zoom-control"
import {invoke_tooltips} from "./_invokeTooltips";
import {invoke_clicks} from "./_invokeClicks";
export default {
    name:"DaiMapa",
    props:{
        centro:{
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
        extension:{
            type:Array,
            default:function(){
                return [0,0,0,0]
            }
        },
        colorControlesInvertidos:{
            type:Boolean,
            default: false
        },
        niveles:{
            type:Array,
            default:function(){
                return []
            }
        },
        nivelActual:{
            type:String,
            default: ""
        }
    },
    data:function(){
        return {
            cmpLayers:{},
            VM_highlight_feature:undefined,
            VM_hover_feature:undefined,
            VM_reset_view:undefined,
            map:undefined,
            VM_has_niveles:false,
            VM_nivel_actual :"",
            VM_nivel_control : undefined
        }
    },
    created:function(){
        this.VM_reset_view = this.extension[0] == 0 && this.extension[3] ==0 
            ? {type:"center",value:{zoom:this.zoom,center:this.centro}} 
            : {type:"extent",value:this.extension};
        this.VM_has_niveles = this.niveles.length > 0;
        this.VM_nivel_actual = this.nivelActual
    },
    
    mounted:function(){
        
        let resetcontrol = new ResetControl();
        resetcontrol.on("reset",()=>{
            if (this.VM_highlight_feature) {
                this.VM_highlight_feature.set("_hightlight", false);
            }
            if(this.VM_has_niveles){
                this.setNivel(this.niveles[0])
            }
            this.$emit("reset_view",this.map)
        })

        this.VM_nivel_control = new NivelControl();
        this.VM_nivel_control.on("click_control",()=>{
            this.setNivelRetroceso()
        })
        this.VM_nivel_control.setVisible( this.VM_has_niveles && this.niveles.indexOf(this.VM_nivel_actual) > 0 )
        this.map = new Map({
            target: this.$refs.map,
            layers: [],
            view: new View({
                center: this.centro,
                zoom: this.zoom,
                projection: 'EPSG:4326',
                maxZoom: this.maxZoom,
                minZoom: this.minZoom
            }),
            controls:[new CustomZoomControl(),resetcontrol,this.VM_nivel_control]
        });
        this.map.set("_reset_view",this.VM_reset_view)
        if(this.VM_reset_view.type=="extent"){
            this.map.getView().fit(this.extension,{duration:500,padding: [10, 10, 10, 10]})
        }

        //verificar si hay un card contaiener
        if(this.$parent.$options.name == "DaiTarjetaContenedorMapa"){
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
            this.$emit("click",e)
            invoke_clicks(this.map,e,this)
            
        })

        this.map.getLayers().on("add",()=>{
            this.$emit("add-layer")
        })
        this.map.getLayers().on("remove",(evento)=>{
            
            let id_layer=evento.element.get("id")
            this.cmpLayers[id_layer] = undefined
            delete this.cmpLayers[id_layer]
            this.$emit("remove-layer")
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
        },
        cerrarPopup:function(){
            this._cerrarPopup()
        },
        forceResizeMap:function(forceResetView=false){
            setTimeout(()=>{
                //console.log("se esta forzando el resize")
                this.map.updateSize()
                if(forceResetView){
                    this.external_force_reset_view()
                }
            },500)

        },
        resetMap:function(){
            this.external_force_reset_view()
            if (this.VM_highlight_feature) {
                this.VM_highlight_feature.set("_hightlight", false);
            }
            if(this.VM_has_niveles){
                this.setNivel(this.niveles[0])
            }
            this.$emit("reset_view",this.map)
        },
        external_force_reset_view:function(){
            if(this.VM_reset_view.type == "extent"){
                this.map.getView().fit(this.VM_reset_view.value,{duration:500,padding:[10,10,10,10]})
            }else{
                this.map.getView().animate(this.VM_reset_view.value)
            }
        },
        setNivel:function(newNivel){
            
            if (this.niveles.includes(newNivel) ){
                //console.log(newNivel,"bind inverso deberia")
                this.$emit("update:nivelActual",newNivel)
                this.VM_nivel_actual = newNivel;
            }
        },
        setNivelRetroceso:function(){
            const idx = this.niveles.indexOf(this.VM_nivel_actual)
            let newIndex = idx - 1
            //console.log(newIndex,idx)
            if (newIndex> -1){
                this.setNivel(this.niveles[newIndex])
            }
            
        }
    },
    provide:function(){
        return {
            getMap:this._getMap,
            registerLayer: this._registerLayer
        }
    },watch:{
        nivelActual:function(newNIvel){
            if (this.niveles.includes(newNIvel) ){
                this.VM_nivel_actual = newNIvel
                
            }
            
        },
        VM_nivel_actual:function(newValue){
            this.$emit("cambioNivel",newValue)
            this.VM_nivel_control.setVisible( this.VM_has_niveles && this.niveles.indexOf(this.VM_nivel_actual) > 0 )
        },
        niveles:function(newNiveles){
            this.VM_has_niveles = newNiveles.length > 0;
        }
    }
}
</script>

<style lang="scss" >
.dai-map-container{
    min-height: 200px;
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
