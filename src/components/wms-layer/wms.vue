<script>
import ImageLayer from "ol/layer/Image";
import ImageWMS from "ol/source/ImageWMS";

import layer from "../../mixins/layer";
import image_layer from "../../mixins/image-layer";
export default {
  name: "DaiCapaWms",
  mixins: [layer, image_layer],
  props: {
    /**
     * url del servicio wms
     */
    url: {
      type: String,
      default: "",
    },
    /**
     * parametros del servicio wms, layers, cql, styles, etc
     */
    parametros: {
      type: Object,
      default: function () {
        return {};
      },
    },
    /**
     * parametro de tipo de servidor como en https://openlayers.org/en/latest/apidoc/module-ol_source_WMSServerType.html
     */
    serverType: {
      type: String,
      default: "geoserver",
    },
    parametrosLeyenda: {
      type: Object,
      default: function () {
        return {};
      },
    },
  },
  methods: {
    _createLayerObject: function () {
      const sourceLayer= new ImageWMS({
          url: this.url,
          params: this.parametros,
          serverType: this.serverType,
          crossOrigin: 'Anonymous'
      })
      this.olLayer = new ImageLayer({
        source: sourceLayer,
        className : this.className
      });

      if (this.extension != undefined) {
        this.olLayer.setExtent(this.extension);
      }
      //agregando informacion para la leyenda
      let copiaParemetrosLeyenda = {...this.parametrosLeyenda}
      if(this.parametros.hasOwnProperty('cql_filter')){
          copiaParemetrosLeyenda['cql_filter'] = this.parametros['cql_filter']
      }
      this.VM_legend_info = {
        type: "legend-wms",
        content: {
          image: this.olLayer
            .getSource()
            .getLegendUrl(undefined, { ...copiaParemetrosLeyenda  }),
          title: this.VM_title,
        },
      };

      //console.log(this.VM_legend_info);

      this.VM_legend_info_status = "ready";
      this.$emit("legend_info_ready", this.VM_legend_info);

      sourceLayer.on("imageloadstart",()=>{
        if(this.useLoader){
          this.addLayerLoaderToQueue("wms-"+this.VM_id)
        }
      })

      sourceLayer.on("imageloaderror",()=>{
        if(this.useLoader){
          this.removeLayerLoaderFromQueue("wms-"+this.VM_id)
        }
        //console.log("Error al cargar "+this.VM_id)
        this.VM_has_errors = true;
      })
      sourceLayer.on("imageloadend",()=>{
        if(this.useLoader){
          this.removeLayerLoaderFromQueue("wms-"+this.VM_id)
        }
        this.VM_has_errors = false;
      })

    },
  },
  watch: {
    parametros: function (nValue) {
      if (this.olLayer) {
        this.olLayer.getSource().updateParams(nValue);
      }
    },
  },
};
</script>