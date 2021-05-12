<script>
import layer from "../../mixins/layer"
import vector_any from "../../mixins/vector-layer-any"

import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';


export default {
    name:"DaiGeojsonLayer",
    mixins:[layer,vector_any],
    methods:{
        _createLayeObject:function(){
            let vectorSource = this.source != undefined ? createGeojsonSourceFromObjectJs(this.source) : createGeojsonSourceFromUrl(this.url)
            this.olLayer = new VectorLayer({
                source: vectorSource
            })
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