<script>
import layer from "../../mixins/layer";
import vector_any from "../../mixins/vector-layer-any";
import classificable_layer from "../../mixins/classificable-layer";

import VectorLayer from "ol/layer/Vector";
import VectorImage from "ol/layer/VectorImage";
import GeoJSON from "ol/format/GeoJSON";
import Cluster from "ol/source/Cluster";
import Feature from "ol/Feature";

import {
  createGeojsonSourceFromObjectJs,
  createGeojsonSourceFromUrl,
  styleClusterGenerico,
  styleClusterNoVisible,
  HacerGalleta,
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
    tipoVis: {
      type: String,
      default: "anillo",
    },
  },
  data: function () {
    return {
      // VM_featuresGroup: true,
      olLayerCluster: undefined,
      sourceOriginal:
        this.datos !== undefined
          ? createGeojsonSourceFromObjectJs(this.datos)
          : createGeojsonSourceFromUrl(this.url),
    };
  },
  created() {},
  methods: {
    _createLayerObject() {
      const LayerClass = this.renderizarComoImagen ? VectorImage : VectorLayer;
      var ver = true;

      this.olLayerCluster = new LayerClass({
        source: new Cluster({
          distance: this.distancia,
          minDistance: this.distanciaMinima,
          createCluster: function (point, features) {
            if (ver) console.log(point, features);
            ver = false;
            return new Feature({
              geometry: point,
              features: features,
            });
          },
          source: this.sourceOriginal,
        }),
        className: this.className,
        style: styleClusterNoVisible,
      });
      this.olMap.addLayer(this.olLayerCluster);

      if (this.sourceOriginal.getUrl() === undefined) {
        // si la fuente de datos es un archivo
      } else {
        // si la fuente de datos es una url
        this.sourceOriginal.on("featuresloadend", () => {
          setTimeout(() => {
            const sourceGalleta = HacerGalleta(
              this.olLayerCluster.getSource().getFeatures(),
              this.olMap.getView().getResolution(),
              this.estiloCapa.circle.radius
            );

            this.actualizarSource(sourceGalleta);

            // console.log("galleta", this.olLayer.getSource().getFeatures());
            // this.olMap.removeLayer(this.olLayerCluster);
          });
        });
      }

      /** Reemplazar features antes de dibujar los que pasan cómo parámetros */

      let vectorSourceVacio = createGeojsonSourceFromObjectJs();
      this.olLayer = new LayerClass({
        source: vectorSourceVacio,
        className: this.className,
      });

      this.olLayer.set("_realce_hover", this.realceAlPasarMouse);

      if (this.VM_is_classified) {
        this._clasificar_v2();
        this._set_style_class_v2();
      }

      if (this.contenidoTooltip != "none") {
        this.olLayer.set("_tooltip", this.contenidoTooltip);
        this.olLayer.set("_tooltip_mov", !this.tooltipEstatico);
        this.olLayer.set("_tooltip_top", this.tooltipEstaticoMargenSuperior);
      }

      if (this.contenidoPopup !== "none") {
        this.olLayer.set("_popup", this.contenidoPopup);
      }

      this._saveAllFeaturesFromSource(vectorSourceVacio);
      this._setStyle();

      // Redibuja el cluster al mover el mapa
      this.olMap.on("moveend", (e) => {
        if (this.visible) {
          console.log("calcular de nuevo");
        }
      });
    },
    actualizarSource(sourceNuevo) {
      let vectorSource = this.olLayer.getSource();
      vectorSource.clear();

      vectorSource.addFeatures(sourceNuevo.getFeatures());
      if (this.VM_is_classified) {
        this._clasificar_v2();
        this._set_style_class_v2();
      }
      this._saveAllFeaturesFromSource(vectorSource);
      this._setStyle();
    },
  },
  watch: {
    datos: function (newDatos) {
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
    distancia: function (newDistancia) {
      this.olLayer.getSource().setDistance(newDistancia);
    },
    distanciaMinima: function (newDistancia) {
      this.olLayer.getSource().setMinDistance(newDistancia);
    },
  },
  computed: {},
};
</script>
