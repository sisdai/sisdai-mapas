<template>
  <DaiMapa
    :centro="map.centro"
    :zoom="map.zoom"
  >
    <DaiCapaGeojson
      :datos="gjsn.edos"
      :zIndex="gjsn.zIndex"
    />
    <DaiCapaXyzOsm :zIndex="osm.zIndex" />
  </DaiMapa>
</template>

<script>
import edos from './../public/capas/sample-edos.json'

export default {
  data: () => ({
    map: {
      centro: [-102, 24],
      zoom: 4.5,
    },
    gjsn: {
      edos,
      zIndex: 1,
      extension: [],
    },
    osm: {
      zIndex: 0,
    },
  }),
}
</script>
