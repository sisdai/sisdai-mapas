<script>
import layer from "../../mixins/layer"
import vector_any from "../../mixins/vector-layer-any"
import classificable_layer from "../../mixins/classificable-layer"

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';


export default {
    name:"DaiCapaGeojson",
    mixins:[layer,vector_any,classificable_layer],
    methods:{
        _createLayerObject:function(){
            let vectorSource = this.datos != undefined ? createGeojsonSourceFromObjectJs(this.datos) : createGeojsonSourceFromUrl(this.url)
            this.olLayer = new VectorLayer({
                source: vectorSource
            })
            this.olLayer.set("_realce_hover",this.realceAlPasarMouse)
            if(this.VM_is_classified){
                if(vectorSource.getUrl()===undefined){
                    this._clasificar_v2();
                    this._set_style_class_v2()
                }else{
                    vectorSource.on("featuresloadend",()=>{
                        setTimeout(()=>{
                            //console.log(evento.target.getFeatures())
                            //console.log("cambio el source del layer, evento cachado, geojson.vue")
                            this._clasificar_v2();
                            this._set_style_class_v2()
                            this._setStyle()
                        },50)
                        
                    })
                }
                
            }
            
            

            if(this.contenidoTooltip!="none"){
                
                this.olLayer.set("_tooltip",this.contenidoTooltip)
                this.olLayer.set("_tooltip_mov",true)
                this.olLayer.set("_tooltip_top",'10px')
                
            }
            
            this._saveAllFeaturesFromSource(vectorSource)
            this._setStyle()
        }
    },
    watch:{
        datos:function(newDatos){
            if( newDatos !== undefined && this.olLayer.getSource()!==undefined){
                
                let vectorSource = this.olLayer.getSource()
                let features = new GeoJSON().readFeatures({...newDatos})
                
                vectorSource.clear()
                if(features.length>0){

                    //console.log("se esta escuchando el cambio de datos, BORRAR ESTE LOG")
                    vectorSource.addFeatures(features);
                    if(this.VM_is_classified){
                        this._clasificar_v2();
                        this._set_style_class_v2()
                    }
                }
                this._saveAllFeaturesFromSource(vectorSource)
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