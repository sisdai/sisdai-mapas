<script>
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

import layer from "../../mixins/layer"
export default {
    name:"DaiCapaXyzOsm",
    mixins:[layer],
    methods:{
        _createLayerObject:function(){
            this.olLayer = new TileLayer({
                source: new OSM(),
                className : this.className
            })
        }
    }
}
</script>