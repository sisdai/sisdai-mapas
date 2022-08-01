<script>
import layer from "../../mixins/layer";
import vector_any from "../../mixins/vector-layer-any";
import classificable_layer from "../../mixins/classificable-layer";

import VectorLayer from "ol/layer/Vector";
import VectorImage from "ol/layer/VectorImage";
import GeoJSON from "ol/format/GeoJSON";
import Cluster from "ol/source/Cluster";

import {
  createGeojsonSourceFromObjectJs,
  createGeojsonSourceFromUrl,
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
  },
  data: function () {
    return {
      // VM_featuresGroup: true,
      olMap: undefined,
    };
  },
  created() {
    this.getMap((olMap) => {
      this.olMap = olMap;
    });
  },
  methods: {
    _createClusterLayerObject() {
      // Creando layer cluster
      const olLayerCluster = new this.LayerClass({
        source: new Cluster({
          source: this.sourceOriginal,
          distance: this.distancia,
          minDistance: this.distanciaMinima,
        }),
        className: this.className,
        style: styleClusterNoVisible,
      });
      this.olMap.addLayer(olLayerCluster);

      if (this.sourceOriginal.getUrl() === undefined) {
        // si la fuente de datos es un archivo
      } else {
        // si la fuente de datos es una url
        this.sourceOriginal.on("featuresloadend", () => {
          setTimeout(() => {
            // array de features
            //olLayerCluster.getSource().getFeatures().map((f) => f.get("features")).flat()

            // array de features clusterizados
            //olLayerCluster.getSource().getFeatures()
            const sourceGalleta = HacerGalleta(
              olLayerCluster.getSource().getFeatures(),
              this.olMap.getView().getResolution()
            );
            console.log("galleta", sourceGalleta.getFeatures());

            this.olMap.addLayer(
              new this.LayerClass({
                source: sourceGalleta,
                className: this.className,
              })
            );
          }, 50);
        });
      }
    },
    async _createLayerObject() {
      // this._createClusterLayerObject();
      const olLayerCluster = new this.LayerClass({
        source: new Cluster({
          source: this.sourceOriginal,
          distance: this.distancia,
          minDistance: this.distanciaMinima,
        }),
        className: this.className,
        style: styleClusterNoVisible,
      });
      this.olMap.addLayer(olLayerCluster);

      if (this.sourceOriginal.getUrl() === undefined) {
        // si la fuente de datos es un archivo
      } else {
        // si la fuente de datos es una url
        this.sourceOriginal.on("featuresloadend", () => {
          setTimeout(() => {
            const sourceGalleta = HacerGalleta(
              olLayerCluster.getSource().getFeatures(),
              this.olMap.getView().getResolution()
            );

            this.actualizarSource(sourceGalleta);

            // console.log("galleta", this.olLayer.getSource().getFeatures());
            this.olMap.removeLayer(olLayerCluster);
          });
        });
      }

      /** Reemplazar features antes de dibujar los que pasan cómo parámetros */

      let vectorSourceVacio = createGeojsonSourceFromObjectJs();
      this.olLayer = new this.LayerClass({
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

      /* Redibuja el cluster al mover el mapa
      this.olMap.on("moveend", (e) => {
        if (this.visible) {
          if (this.VM_is_classified) {
            this._clasificar_v2();
            this._set_style_class_v2();
          }
          this._saveAllFeaturesFromSource(this.olLayer.getSource(), false);
          this._setStyle();
        }
      });*/
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
  computed: {
    sourceOriginal() {
      return this.datos !== undefined
        ? createGeojsonSourceFromObjectJs(this.datos)
        : createGeojsonSourceFromUrl(this.url);
    },
    vectorSource() {
      return this.datos !== undefined
        ? createGeojsonSourceFromObjectJs(this.datos)
        : createGeojsonSourceFromUrl(this.url);
    },
    LayerClass() {
      return this.renderizarComoImagen ? VectorImage : VectorLayer;
    },
  },
};
</script>
