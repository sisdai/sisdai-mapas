<script>
import { Tile as TileLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';

import layer from "../../mixins/layer"
export default {
    name:"DaiCapaXyzOsm",
    mixins:[layer],
    methods:{
        _createLayerObject:function(){
            this.olLayer = new TileLayer({
                source: new OSM()
            })
        }
    }
}
</script>