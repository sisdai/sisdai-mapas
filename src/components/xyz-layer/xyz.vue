<script>
import { Tile as TileLayer} from 'ol/layer';
import { XYZ } from 'ol/source';

import layer from "../../mixins/layer"
export default {
    mixins:[layer],
    props:{
        url:{
            type:String,
            default:"https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"
        },
        attributions:{
            type:String,
            default:' &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, © <a href="https://carto.com/">Carto</a>'
        }
    },
    methods:{
        createLayerObject:function(){
            this.olLayer = new TileLayer({
                source: new XYZ({
                    url: this.url,
                    attributions:this.attributions
                }),
            })
        }
    }
}
</script>