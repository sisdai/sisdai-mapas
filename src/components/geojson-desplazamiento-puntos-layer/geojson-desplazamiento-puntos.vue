<script>
import layer from "../../mixins/layer";
import vector_any from "../../mixins/vector-layer-any";
import classificable_layer from "../../mixins/classificable-layer";

import VectorLayer from "ol/layer/Vector";
import VectorImage from "ol/layer/VectorImage";
import GeoJSON from "ol/format/GeoJSON";

import DisplacedPoints from "ol-displaced-points";

import {
  createGeojsonSourceFromObjectJs,
  createGeojsonSourceFromUrl,
} from "./utiles";

export default {
  name: "DaiCapaGeojsonDesplazamientoDePuntos",
  mixins: [layer, vector_any, classificable_layer],
  props: {
    distancia: {
      type: Number,
      default: 20,
    },
    distanciaMinima: {
      type: Number,
      default: 0,
    },
    metodoDesplazamiento: {
      type: String,
      default: "anillo",
    },
    radioPuntoCentro: {
      type: Number,
      default: 6,
    },
    radioPuntosDesplazados: {
      type: Number,
      default: 6,
    },
    delimitarGruposPor: {
      type: String,
    },
  },
  data: function () {
    return {
      // VM_featuresGroup: true,
    };
  },
  created() {},
  methods: {
    _createLayerObject() {
      // this.VM_is_cluster = true;

      let vectorSource =
        this.datos !== undefined
          ? createGeojsonSourceFromObjectJs(this.datos)
          : createGeojsonSourceFromUrl(this.url);

      const LayerClass = this.renderizarComoImagen ? VectorImage : VectorLayer;

      this.olLayer = new LayerClass({
        source: new DisplacedPoints({
          source: vectorSource,
          distance: this.distancia,
          minDistance: this.distanciaMinima,
          placementMethod: dicMetodosDesplazamiento[this.metodoDesplazamiento],
          radiusCenterPoint: this.radioPuntoCentro,
          radiusDisplacedPoints: this.radioPuntosDesplazados,
          delimiterField: this.delimitarGruposPor,
        }),
        className: this.className,
      });
      this.olLayer.set("_realce_hover", this.realceAlPasarMouse);

      if (this.VM_is_classified) {
        if (vectorSource.getUrl() === undefined) {
          this._clasificar_v2();
          this._set_style_class_v2();
        } else {
          vectorSource.on("featuresloadend", () => {
            setTimeout(() => {
              //console.log(evento.target.getFeatures())
              //console.log("cambio el source del layer, evento cachado, geojson.vue")
              this._clasificar_v2();
              this._set_style_class_v2();
              this._setStyle();
            }, 50);
          });
        }
      }

      if (this.contenidoTooltip != "none") {
        this.olLayer.set("_tooltip", this.contenidoTooltip);
        this.olLayer.set("_tooltip_mov", !this.tooltipEstatico);
        this.olLayer.set("_tooltip_top", this.tooltipEstaticoMargenSuperior);
      }

      if (this.contenidoPopup !== "none") {
        this.olLayer.set("_popup", this.contenidoPopup);
      }

      this._saveAllFeaturesFromSource(this.olLayer.getSource());
      this._setStyle();
    },
  },
  watch: {
    datos(newDatos) {
      if (
        newDatos !== undefined &&
        this.olLayer !== null &&
        this.olLayer !== undefined
      ) {
        //console.log(this.olLayer,this.olLayer.getSource())
        let vectorSource = this.olLayer.getSource().getSource();
        let features = new GeoJSON().readFeatures({ ...newDatos });

        vectorSource.clear();
        //if(features.length>0){

        //console.log("se esta escuchando el cambio de datos, BORRAR ESTE LOG")
        vectorSource.addFeatures(features);
        if (this.VM_is_classified) {
          this._clasificar_v2();
          this._set_style_class_v2();
        }
        //}
        this._saveAllFeaturesFromSource(this.olLayer.getSource());
        this._setStyle();
      }
    },
    distancia(newDistancia) {
      this.olLayer.getSource().setDistance(newDistancia);
    },
    distanciaMinima(newDistancia) {
      this.olLayer.getSource().setMinDistance(newDistancia);
    },
    metodoDesplazamiento(newMethod) {
      this.olLayer
        .getSource()
        .setPlacementMethod(dicMetodosDesplazamiento[newMethod]);
    },
  },
};

const dicMetodosDesplazamiento = {
  anillo: "ring",
  "anillos-concentricos": "concentric-rings",
  espiral: "spiral",
  cuadricula: "grid",
};
</script>
