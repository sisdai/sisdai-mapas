<template>
  <div id="mapa-directo"></div>
</template>

<script>
import Map from "ol/Map";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import View from "ol/View";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import VectorLayer from "ol/layer/Vector";
import { Circle, Fill, Stroke, Style } from "ol/style";

import DisplacedPoints from "@local/ol-displaced-points";

export default {
  created() {},
  mounted() {
    const map = crearMapa("mapa-directo");

    const vectorSource = new VectorSource({
      features: new GeoJSON().readFeatures(
        require("../capas/centroides-estados.json")
      ),
    });

    const radioPuntos = 5;
    const radioCentro = 5;
    const obj = new DisplacedPoints({
      source: vectorSource,
      distance: 80,
      minDistance: 40,
      radioCenterPoint: radioCentro,
      radioDisplacedPoints: radioPuntos,
      methodPlacement: 'concentric-rings',
    });

    // console.log(obj.getFeatures());
    vectorSource.on("featuresloadend", (e) => {
      setTimeout(() => {
        console.log(e);
      }, 50);
    });

    addSourceToMap(map, {
      source: obj,
      style: (cluster) => {
        if (cluster.get("anillo")) {
          return styleRadiusRing(cluster.get("anillo"));
        }
        if (cluster.get("features")) {
          return styleRadiusColor(radioCentro, "red");
        }
        return styleRadiusColor(radioPuntos, "green");
      },
    });
  },
};

function addSourceToMap(map, optiosSource) {
  map.addLayer(new VectorLayer(optiosSource));
}

const styleRadiusRing = (ring) => {
  return new Style({
    image: new Circle({
      radius: ring.radius,
      stroke: new Stroke({
        color: "black",
        with: 1,
      }),
    }),
  });
};

const styleRadiusColor = (radius, color) => {
  return new Style({
    image: new Circle({
      radius: radius,
      stroke: new Stroke({
        color: "#fff",
        with: 1,
      }),
      fill: new Fill({
        color: color,
      }),
    }),
  });
};

function crearMapa(tarjet) {
  return new Map({
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
    ],
    target: tarjet,
    view: new View({
      center: [-101.012614352653245, 20.905432044070093],
      zoom: 3,
      projection: "EPSG:4326",
    }),
  });
}
</script>

<style lang="scss" scoped>
#mapa-directo {
  width: 100%;
  height: 400px;
}
</style>