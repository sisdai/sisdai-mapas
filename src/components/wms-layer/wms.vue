<script>
import { Image as ImageLayer} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';

import layer from "../../mixins/layer";
import image_layer from "../../mixins/image-layer"
export default {
    name:"DaiWmsLayer",
    mixins:[layer,image_layer],
    props:{
        url:{
            type:String,
            default:""
        },
        layer:{
            type:String,
            default:""
        },
        params:{
            type:Object,
            default:function(){
                return {}
            }
        },
        serverType:{
            type:String,
            default:"geoserver"
        }
    },
    methods:{
        _createLayerObject:function(){
            this.olLayer = new ImageLayer({
                source: new ImageWMS({
                    url: this.url,
                    params:this.params,
                    serverType:this.serverType
                })
            })

            if(this.extent!=undefined){
                this.olLayer.setExtent(this.extent)
            }
        }
    }   
}
</script>