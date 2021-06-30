<script>
import { Tile as TileLayer} from 'ol/layer';
import { XYZ } from 'ol/source';

import layer from "../../mixins/layer"
export default {
    name:"DaiCapaXyz",
    mixins:[layer],
    props:{
        url:{
            type:String,
            default:"https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        },
        atribuciones:{
            type:String,
            default:' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a>'
        }
    },
    methods:{
        _createLayerObject:function(){
            this.olLayer = new TileLayer({
                source: new XYZ({
                    url: this.url,
                    attributions:this.attributions
                }),
            })
        }
    },
    watch:{
        url:function(newValue){
            this.olLayer.getSource().setUrl(newValue)
        }
    }
}
</script>