<script>
import layer from "../../mixins/layer"
import vector_any from "../../mixins/vector-layer-any"
import classificable_layer from "../../mixins/classificable-layer"

import VectorLayer from 'ol/layer/Vector';
import VectorImage  from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import HexBin from 'ol-ext/source/HexBin'


export default {
    name:"DaiCapaGeojsonHexbinDinamico",
    mixins:[layer,vector_any,classificable_layer],
    props:{
        diametroPixeles:{
            type:Number,
            default:25
        },
        retrasoRecalcular:{
            type:Number,
            default:500
        }
    },
    data:function(){
        return {
            VM_featuresGroup:true,
            VM_timeOut:0
        }
    },
    methods:{
        _createLayerObject:function(){
            let vectorSource = this.datos != undefined ? createGeojsonSourceFromObjectJs(this.datos) : createGeojsonSourceFromUrl(this.url)
            const LayerClass= this.renderizarComoImagen ? VectorImage : VectorLayer
            this.olLayer = new LayerClass({
                source: new HexBin({source:vectorSource, size:.5}),
                className : this.className
            })
            this.olLayer.set("_realce_hover",this.realceAlPasarMouse)
            if(this.VM_is_classified){
                if(vectorSource.getUrl()===undefined){
                    this._clasificar_v2();
                    this._set_style_class_v2()
                }else{
                    vectorSource.on("featuresloadend",()=>{
                        setTimeout(()=>{
                            this._clasificar_v2();
                            this._set_style_class_v2()
                            this._setStyle()
                        },50)
                        
                    })
                }
                
            }
            
            

            if(this.contenidoTooltip!="none"){
                
                this.olLayer.set("_tooltip",this.contenidoTooltip)
                this.olLayer.set("_tooltip_mov",!this.tooltipEstatico)
                this.olLayer.set("_tooltip_top",this.tooltipEstaticoMargenSuperior)
                
            }

            if(this.contenidoPopup!=="none"){
                this.olLayer.set("_popup",this.contenidoPopup)
            }
            
            this._saveAllFeaturesFromSource(this.olLayer.getSource())
            this._setStyle()

            this.olMap.on("moveend",(e)=>{
                if(this.visible){
                    const resolucion = e.target.getView().getResolution()
                    this.olLayer.getSource().setSize(resolucion*this.diametroPixeles)
                    if(this.VM_is_classified){
                        this._clasificar_v2();
                        this._set_style_class_v2()
                    }
                    this._saveAllFeaturesFromSource(this.olLayer.getSource(),false)
                    this._setStyle()
                }
                
            })
            this.olLayer.on("change:visible", (eventoLayer) =>{
                if(eventoLayer.target.getVisible()){
                    const resolucion = this.olMap.getView().getResolution()
                    this.olLayer.getSource().setSize(resolucion*this.diametroPixeles)
                    if(this.VM_is_classified){
                        this._clasificar_v2();
                        this._set_style_class_v2()
                    }
                    this._saveAllFeaturesFromSource(this.olLayer.getSource(),false)
                    this._setStyle()
                }
            });
        }
    },
    watch:{
        datos:function(newDatos){
            if( newDatos !== undefined && this.olLayer !== null && this.olLayer !== undefined ){
                //console.log(this.olLayer,this.olLayer.getSource())
                let vectorSource = this.olLayer.getSource().getSource()
                let features = new GeoJSON().readFeatures({...newDatos})
                
                vectorSource.clear()
                //if(features.length>0){

                    //console.log("se esta escuchando el cambio de datos, BORRAR ESTE LOG")
                    vectorSource.addFeatures(features);
                    if(this.VM_is_classified){
                        this._clasificar_v2();
                        this._set_style_class_v2()
                    }
                //}
                this._saveAllFeaturesFromSource(this.olLayer.getSource())
                this._setStyle()
                
                
            }  
        }
    }
}

const createGeojsonSourceFromObjectJs= (JsObject)=>{
    if (typeof JsObject != 'object' ){
        return new VectorSource({})
    }
    
    return new VectorSource({
            features: new GeoJSON().readFeatures({...JsObject})
        })
}

const createGeojsonSourceFromUrl = (url)=>{
    return new VectorSource({
        url: url,
        format: new GeoJSON()
    })
}

</script>