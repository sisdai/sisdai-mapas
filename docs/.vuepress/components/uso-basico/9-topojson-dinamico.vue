<template>
  <dai-mapa
    :extension="[
      -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
    ]"
  >
    <dai-capa-xyz-osm />

    <dai-capa-topojson
      :url="url"
      :use-loader="true"
    />
  </dai-mapa>
</template>

<script>
const url =
  "https://gema.conacyt.mx/geoserver/contexto/wms?service=WMS&version=1.1.0&request=GetMap&layers=contexto%3Agref_division_municipal_2020&bbox=-118.36511993408203%2C14.532097816467285%2C-86.71040344238281%2C32.71865463256836&width=768&height=441&srs=EPSG%3A4326&styles=&format=application%2Fjson%3Btype%3Dtopojson";

export default {
  computed: {
    url() {
      return url;
    },
  },
};
</script>