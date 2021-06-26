<script>
import layer from "../../mixins/layer"
import vector_any from "../../mixins/vector-layer-any"
import classificable_layer from "../../mixins/classificable-layer"

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';


export default {
    name:"DaiGeojsonLayer",
    mixins:[layer,vector_any,classificable_layer],
    methods:{
        _createLayerObject:function(){
            let vectorSource = this.source != undefined ? createGeojsonSourceFromObjectJs(this.source) : createGeojsonSourceFromUrl(this.url)
            this.olLayer = new VectorLayer({
                source: vectorSource
            })
            if(this.VM_is_classified){
                if(vectorSource.getFeatures().length>0){
                    this._clasificar_v2();
                    this._set_style_class_v2()
                }else{
                    vectorSource.on("change",()=>{
                        console.log("cambio el source del layer, evento cachado, geojson.vue")
                        this._clasificar_v2();
                        this._set_style_class_v2()
                        this._setStyle()
                    })
                }
                
            }
            
            this._setStyle()

            if(this.tooltipContent!="none"){
                
                this.olLayer.set("_tooltip",this.tooltipContent)
                this.olLayer.set("_tooltip_mov",true)
                this.olLayer.set("_tooltip_top",'10px')
                
            }
            
            this._saveAllFeaturesFromSource(vectorSource)
        }
    }
}

const createGeojsonSourceFromObjectJs= (JsObject)=>{
    if (typeof JsObject != 'object' ){
        return new VectorSource({})
    }
    
    return new VectorSource({
            features: new GeoJSON().readFeatures(JsObject)
        })
}

const createGeojsonSourceFromUrl = (url)=>{
    return new VectorSource({
        url: url,
        format: new GeoJSON()
    })
}

</script>