<script>
import { Image as ImageLayer} from 'ol/layer';
import ImageWMS from 'ol/source/ImageWMS';

import layer from "../../mixins/layer";
import image_layer from "../../mixins/image-layer"
export default {
    name:"DaiWmsLayer",
    mixins:[layer,image_layer],
    props:{
        /**
         * url del servicio wms
         */
        url:{
            type:String,
            default:""
        },
        /**
         * parametros del servicio wms, layers, cql, styles, etc
         */
        params:{
            type:Object,
            default:function(){
                return {}
            }
        },
        /**
         * parametro de tipo de servidor como en https://openlayers.org/en/latest/apidoc/module-ol_source_WMSServerType.html
         */
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
            //agregando informacion para la leyenda
            this.VM_legend_info = {
                type: "legend-wms",
                content:{
                    image:this.olLayer.getSource().getLegendUrl(),
                    title:this.VM_title
                }
            }
            this.VM_legend_info_status = "ready"
            this.$emit("legend_info_ready",this.VM_legend_info)

        }
    }   
}
</script>