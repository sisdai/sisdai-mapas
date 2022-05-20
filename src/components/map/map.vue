<template>
    <div class="dai-map-container">
        <transition name="fade">
            <loader v-if="VM_loader_queue.length>0" />
        </transition>

        <div class="dai-map " 
        :class="[colorControlesInvertidos ? 'inverted-controls': 'default-controls']" 
        ref="map"
        ></div>
        <slot></slot>
        
        <div ref="tooltip" class="ol-tooltip ol-tooltip-bottom">
            <div class="botones" v-if="VM_isTouchDevice">
                <button class="boton-cerrar" @click="cerrarTooltip"><span class="dai-icon-cerrar"></span></button>
            </div>
            <div class="content"></div>
        </div>
        <div ref="tooltipmov" class="ol-tooltipmov ">
            <div class="botones" v-if="VM_isTouchDevice">
                <button class="boton-cerrar" @click="cerrarTooltip"><span class="dai-icon-cerrar"></span></button>
            </div>
            <div class="content"></div>
            
        </div>
        <div ref="popup" class="ol-popup">
            <div class="botones">
                <button class="boton-cerrar" @click="_cerrarPopup"><span class="dai-icon-cerrar"></span></button>
            </div>
            <div class="content">
            </div>
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
import {defaults as defaultInteractions} from 'ol/interaction';
import Attribution from 'ol/control/Attribution';
import MouseWheelZoom from 'ol/interaction/MouseWheelZoom';
import {getCenter} from 'ol/extent';

import loader from "../utils/loader.vue"

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
        /**No permite que se navegue mas alla de esta extension */
        noSalirDeExtension:{
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
        },
        zoomOnScroll:{
            type: Boolean,
            default: true
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
            VM_nivel_control : undefined,

            VM_scrollZoomInteraction: undefined,
            VM_isTouchDevice:false,
            VM_loader_queue:[]
        }
    },
    created:function(){
        this.VM_reset_view = this.extension[0] == 0 && this.extension[3] ==0 
            ? {type:"center",value:{zoom:this.zoom,center:this.centro}} 
            : {type:"extent",value:this.extension};
        this.VM_has_niveles = this.niveles.length > 0;
        this.VM_nivel_actual = this.nivelActual
    },
    components:{
        loader
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
        const attributionControl = new Attribution({
            collapsible:false
        })

        const extensionMaxima = this.noSalirDeExtension[0] === 0 && this.noSalirDeExtension[3] === 0 ? undefined : this.noSalirDeExtension

        this.map = new Map({
            target: this.$refs.map,
            layers: [],
            view: new View({
                center: this.centro,
                zoom: this.zoom,
                projection: 'EPSG:4326',
                maxZoom: this.maxZoom,
                minZoom: this.minZoom,
                extent: extensionMaxima
            }),
            controls:[new CustomZoomControl(),resetcontrol,this.VM_nivel_control,attributionControl],
            interactions: defaultInteractions({
                mouseWheelZoom: false,
                altShiftDragRotate:false
                })
        });
        //definir si la interaccion de scrool esta encendida
        this.VM_scrollZoomInteraction = new MouseWheelZoom({})
        this.VM_scrollZoomInteraction.setActive(this.zoomOnScroll)
        this.map.addInteraction(this.VM_scrollZoomInteraction)

        this.map.set("_reset_view",this.VM_reset_view)
        if(this.VM_reset_view.type=="extent"){
            this.map.getView().fit(this.extension,{duration:500,padding: [10, 10, 10, 10]})
        }

        //verificar si hay un card contaiener
        if(this.$parent.$options.name == "DaiTarjetaContenedorMapa"){
            this.$parent._registerMap(this)
        }

        //el mapa debe saber si se encuentra en un dispositivo touch, para cambiar algunos eventos como el tooltip
        this.VM_isTouchDevice = isTouchDevice()

        //los overlays 
        //tooltip overlay
        let overlay_tooltip = new Overlay({
            id: "tooltip",
            element: this.$refs.tooltip,
            // TEORIA:si es desktop true, si es touch false porque el arrastre ya se asegura un poco que el usuario lo tiene donde lo necesita
            //2021-10-22 puesto en false mejor todo el tiempo
            autoPan: false, 
            stopEvent: true,
            positioning: "bottom-center",
            insertFirst: !this.VM_isTouchDevice
        });
        overlay_tooltip.setPosition(undefined);
        this.map.addOverlay(overlay_tooltip);

        //tooltipmov
        let overlay_tooltip_mov = new Overlay({
            id: "tooltipmov",
            element: this.$refs.tooltipmov,
            autoPan: false,
            stopEvent: this.VM_isTouchDevice,
            positioning: "bottom-center",
            insertFirst: !this.VM_isTouchDevice
            
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
            const seleccion = invoke_clicks(this.map,e,this)
            //solo si es un dispositivo touch se emitira el evento de los tooltips
            //console.log(e)
            if(this.VM_isTouchDevice){
                if(seleccion.has_selection){
                    let coordinate = seleccion.feature_selected.getGeometry().getType().includes('Polygon') 
                        || seleccion.feature_selected.getGeometry().getType().includes('LineString') 
                        ?  getCenter( seleccion.feature_selected.getGeometry().getExtent() )
                        : e.coordinate; 
                    e.coordinate = coordinate
                }
                invoke_tooltips(this.map,e)
            }
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

        this.$refs.map.addEventListener("mouseout",()=>{
            overlay_tooltip.setPosition(undefined);
            overlay_tooltip_mov.setPosition(undefined);
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
        cerrarTooltip:function(){
            let tooltip_overlay = this.map.getOverlayById("tooltip");
            tooltip_overlay.setPosition(undefined);
            let tooltipmov_overlay = this.map.getOverlayById("tooltipmov")
            tooltipmov_overlay.setPosition(undefined)
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
            
        },
        _addLayerLoaderToQueue: function(id){
            this.VM_loader_queue.push(id)
        },
        _removeLayerLoaderFromQueue: function(id){
            let idx = this.VM_loader_queue.findIndex(item=>item===id);
            //console.log(idx,id,this.VM_loader_queue)
            if(idx>-1){
                this.VM_loader_queue.splice(idx,1);
            }
            
        },
        getPngDataUrl(){
            let map = this.map
            const mapCanvas = document.createElement('canvas');
            const size = map.getSize();
            mapCanvas.width = size[0];
            mapCanvas.height = size[1];
            const mapContext = mapCanvas.getContext('2d');

            Array.prototype.forEach.call(
                map.getViewport().querySelectorAll('.ol-layer canvas, canvas.ol-layer'),
                function (canvas) {
                    if (canvas.width > 0) {
                    const opacity =
                        canvas.parentNode.style.opacity || canvas.style.opacity;
                    mapContext.globalAlpha = opacity === '' ? 1 : Number(opacity);

                    const backgroundColor = canvas.parentNode.style.backgroundColor;
                    if (backgroundColor) {
                        mapContext.fillStyle = backgroundColor;
                        mapContext.fillRect(0, 0, canvas.width, canvas.height);
                    }

                    let matrix;
                    const transform = canvas.style.transform;
                    if (transform) {
                        // Get the transform parameters from the style's transform matrix
                        matrix = transform
                        .match(/^matrix\(([^\(]*)\)$/)[1]
                        .split(',')
                        .map(Number);
                    } else {
                        matrix = [
                        parseFloat(canvas.style.width) / canvas.width,
                        0,
                        0,
                        parseFloat(canvas.style.height) / canvas.height,
                        0,
                        0,
                        ];
                    }
                    // Apply the transform to the export map context
                    CanvasRenderingContext2D.prototype.setTransform.apply(
                        mapContext,
                        matrix
                    );
                    mapContext.drawImage(canvas, 0, 0);
                    }
                }
                );

                mapContext.globalAlpha = 1;
                return mapCanvas.toDataURL()
        }
    },
    provide:function(){
        return {
            getMap:this._getMap,
            registerLayer: this._registerLayer,
            addLayerLoaderToQueue: this._addLayerLoaderToQueue,
            removeLayerLoaderFromQueue: this._removeLayerLoaderFromQueue

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
        },
        zoomOnScroll: function(zoomOnScroll){
            if(this.VM_scrollZoomInteraction){
                this.VM_scrollZoomInteraction.setActive(zoomOnScroll)
            }
        },
        extension: function(newExtension){
            this.VM_reset_view = newExtension[0] == 0 && newExtension[3] ==0 
            ? {type:"center",value:{zoom:this.zoom,center:this.centro}} 
            : {type:"extent",value:newExtension};
        },
        "VM_reset_view": function(newResetView){
            this.map.set("_reset_view",newResetView)
        }
    }
}

function isTouchDevice() {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
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
