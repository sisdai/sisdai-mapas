<template>
  <DaiTarjetaContenedorMapa :colapsada="false">
    <template v-slot:header>
      <p>Selecciona la textura</p>
      <dai-selector-mapa v-model="metodoSeleccionado">
        <option
          v-for="metodo in metodosDeUbicacion"
          :value="metodo"
          :key="metodo"
        >
          {{ metodo }}
        </option>
      </dai-selector-mapa>

      <p>Distancia dentro de la cual se agruparán las entidades.</p>
      <br />
      <input
        class="dai-range"
        type="range"
        min="0"
        max="200"
        step="1"
        v-model="distanciaCluster"
      />

      <!--p>
        Distancia mínima entre clústeres. No puede ser mayor que la distancia
        configurada
      </!--p>
      <br />
      <input
        class="dai-range"
        type="range"
        min="0"
        max="200"
        step="1"
        v-model="distanciaMinimaCluster"
      /-->
    </template>

    <DaiMapa
      :extension="[
        -120.668130000000005, 18.5014099999999999, 20.8850700000000007,
        57.0758399999999995,
      ]"
    >
      <DaiCapaXyz />

      <DaiCapaGeojsonDesplazamientoDePuntos
        id="galletar-basico"
        titulo="Capa de galleta"
        url="/comunidad-sargazo.geojson"
        :estilo-capa="{ circle: { radius: 5 } }"
        :reglas-estilo-capa="reglasEstiloCapa"
        :distancia="Number(distanciaCluster)"
        :distanciaMinima="Number(distanciaMinimaCluster)"
        :metodoUbicacion="metodoSeleccionado"
      />
      <!--
        :datos="require('../capas/centroides-estados.json')"
        :estilo-capa="{ circle: { radius: 5 } }"

        url="/comunidad-sargazo.geojson"
        :reglas-estilo-capa="reglasEstiloCapa"
      -->

      <!--DaiCapaGeojsonCluster
        id="cluster-clasificado"
        titulo="Capa con cluster"
        :url="$withBase('/centroides-estados.geojson')"
        :reglas-estilo-capa="{
          clasificacion: 'linear',
          columna: 'features_count',
          propiedadObjetivo: 'proporcion',
          clases: 4,
          proporciones: [4, 8, 12, 16],
        }"
        :estilo-capa="{
          circle: {
            fill: { color: 'green' },
          },
        }"
      /-->
    </DaiMapa>

    <template #footer>
      <dai-leyenda-mapa
        para="galletar-basico"
        :mostrar-boton-alterna-todos="true"
      />
    </template>
  </DaiTarjetaContenedorMapa>
</template>

<script>
export default {
  data() {
    return {
      reglasEstiloCapa: {
        clasificacion: "categorias",
        columna: "linea_estrategica_conacyt",
        acomodoCategorias: [
          "Contención, recolección y disposición",
          "Normatividad",
          "Comunicación y educación",
          "Monitoreo, modelación y alerta temprana",
          "Origen e importancia ecológica",
          "Impactos socioeconómicos y ambientales",
          "Aprovechamiento y usos",
          "Cooperación internacional",
          "Restauración",
          "Atención integral",
        ],
        propiedadObjetivo: "relleno",
        colores: [
          "#C51228",
          "#FF5500",
          "#DB16A3",
          "#7D1DD8",
          "#262699",
          "#438BFF",
          "#1263FC",
          "#0A7F94",
          "#054C32",
          "#42A542",
        ],
      },
      distanciaCluster: 20,
      distanciaMinimaCluster: 0,
      metodosDeUbicacion: [
        "anillo",
        "anillos-consentricos",
        "espiral",
        "cuadricula",
      ],
      metodoSeleccionado: "anillo",
    };
  },
  mounted() {},
};
</script>
