<template>
  <DaiTarjetaContenedoraMapa>
    <template #encabezadoMapa>EncabezadoMapa</template>

    <template #izquierdaMapa>IzquierdaMapa</template>

    <DaiMapa
      :centro="mapa.centro"
      :extension="mapa.extension"
      :zoom="mapa.zoom"
    >
      <DaiCapaGeojson
        :datos="geojson.edos"
        :zIndex="geojson.zIndex"
      />

      <DaiCapaXyzOsm :zIndex="osm.zIndex" />
    </DaiMapa>

    <template #derechaMapa>DerechaMapa</template>

    <template #pieMapa>PieMapa</template>

    <!--DaiMapa tema="algun-tema" :extension="mapa.extension">
      <EncabezadoMapa>
        Contenido HTML, Titulos, Controles, uso de leyenda, etc
      </EncabezadoMapa>

      <IzquierdaMapa>
        Contenido HTML, Controles, uso de leyenda, scrolables, etc
      </IzquierdaMapa>

      <Capas>
        <DaiCapaGeojson
          :datos="geojson.edos"
          :zIndex="geojson.zIndex"
        />

        <DaiCapaXyzOsm :zIndex="osm.zIndex" />
      </Capas>

      <DerechaMapa>
        Contenido HTML, Controles, uso de leyenda, scrolables, etc
      </DerechaMapa>

      <PieMapa>
        Contenido HTML, Referencias, Controles, uso de leyenda, etc
      </PieMapa>
    </DaiMapa-->
  </DaiTarjetaContenedoraMapa>
</template>

<script>
import edos from './../public/capas/sample-edos.json'

const extension = [
  -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
]

export default {
  data: () => ({
    mapa: {
      centro: [-102, 24],
      // extension,
      zoom: 4.5,
    },
    geojson: {
      edos,
      zIndex: 1,
    },
    osm: {
      zIndex: 0,
    },
  }),
}
</script>
