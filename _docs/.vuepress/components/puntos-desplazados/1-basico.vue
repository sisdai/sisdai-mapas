<template>
  <DaiTarjetaContenedorMapa :colapsada="false">
    <template #header>
      La metodología de puntos dezplazados crea clusters de puntos, cercanos o
      que tienen la misma ubicación, y los coloca alrededor del baricentro de
      cada cluster.
      <DaiLeyendaMapa :para="['sin-cluster', 'desplazamiento-basico']" />

    </template>
    <DaiMapa>
      <DaiCapaXyz />

      <DaiCapaGeojson
        id="sin-cluster"
        titulo="Capa sin cluster"
        :url="$withBase('/centroides-estados.geojson')"
        :estilo-capa="{
          circle: {
            fill: { color: 'white' },
            stroke: { color: 'black', width: 1 },
            radius: 4,
          },
        }"
      />
      
      <DaiCapaGeojsonPuntosDesplazados
        id="desplazamiento-basico"
        titulo="Desplazamiento básico"
        :url="$withBase('/centroides-estados.geojson')"
        :distancia="80"
        :radioPuntoCentro="4"
        :radioPuntosDesplazados="4"
        :estilo-capa="{
          circle: {
            fill: { color: 'red' },
            stroke: { color: 'black', width: 1 },
            radius: 4,
          },
        }"
        tipoGeometria="Point"
      />
    </DaiMapa>
  </DaiTarjetaContenedorMapa>
</template>