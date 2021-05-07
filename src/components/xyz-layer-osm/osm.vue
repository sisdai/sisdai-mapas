<script>
import { Tile as TileLayer} from 'ol/layer';
import OSM from 'ol/source/OSM';

import layer from "../../mixins/layer"
export default {
    mixins:[layer],
    methods:{
        createLayerObject:function(){
            this.olLayer = new TileLayer({
                source: new OSM()
            })
        }
    }
}
</script>