<template>
  <DaiTarjetaContenedorMapa :colapsada="false" id="desplazamiento-puntos">
    <template v-slot:header>
      <div>
        <p>Metodo de desplazamiento</p>
        <dai-selector-mapa v-model="metodoSeleccionado">
          <option
            v-for="metodo in metodosDeUbicacion"
            :value="metodo"
            :key="metodo"
          >
            {{ metodo }}
          </option>
        </dai-selector-mapa>
      </div>

      <div>
        <p>
          Distancia dentro de la cual se agruparán las entidades.
          {{ distanciaCluster }}
        </p>
        <input
          class="dai-range"
          type="range"
          min="0"
          max="200"
          step="1"
          v-model="distanciaCluster"
        />
      </div>

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
      <!--div>
        <p>Radio de circulos</p>
        <input type="number" v-model="radioPuntos">
      </div-->
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
        :distancia="Number(distanciaCluster)"
        :distanciaMinima="Number(distanciaMinimaCluster)"
        :metodoDesplazamiento="metodoSeleccionado"
        :radioPuntoCentro="radioPuntoCentro"
        :radioPuntosDesplazados="radioPuntosDesplazados"
        delimitarGruposPor="codigo_pais"
        :propsAsignaEstilo="['circle']"
        :fnAsignaEstilo="fnAsignaEstilo"
        :contenidoTooltip="
          (f) =>
            `<b>${f.nombre_actor}</b><br>` +
            `<b>Cargo: </b>${f.cargo_titulo}<br>` +
            `<b>Sector: </b>${f.sector}<br>` +
            `<b>Institución: </b>${f.institucion}<br>`
        "
      />
      <!--
        :datos="require('../capas/centroides-estados.json')"
        :estilo-capa="{ circle: { radius: 5 } }"

        url="/comunidad-sargazo.geojson"
        :reglas-estilo-capa="reglasEstiloCapa"
        :props-asigna-estilo="['circle']"
        :fn-asigna-estilo="fnAsignaEstilo"
        :contenidoTooltip="
          (f) =>
            `<b>${f.nombre_actor}</b><br>` +
            `<b>Cargo: </b>${f.cargo_titulo}<br>` +
            `<b>Sector: </b>${f.sector}<br>` +
            `<b>Institución: </b>${f.institucion}<br>`
        "
      -->
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
      distanciaCluster: 152,
      distanciaMinimaCluster: 0,
      metodosDeUbicacion: [
        "anillo",
        "anillos-concentricos",
        "espiral",
        "cuadricula",
      ],
      metodoSeleccionado: "anillos-concentricos",
      radioPuntoCentro: 3,
      radioPuntosDesplazados: 5,
    };
  },
  methods: {
    fnAsignaEstilo(f) {
      // circle.radius
      if (f.hasOwnProperty("ring")) {
        return [
          {
            radius: f.ring.radius,
            stroke: { color: "gray" },
          },
        ];
      }
      return [
        {
          fill: { color: dic[f.linea_estrategica_conacyt] },
          radius: f.hasOwnProperty("features") ? this.radioPuntoCentro : this.radioPuntosDesplazados,
        },
      ];
    },
  },
};

const dic = {
  "Contención, recolección y disposición": "#C51228",
  Normatividad: "#FF5500",
  "Comunicación y educación": "#DB16A3",
  "Monitoreo, modelación y alerta temprana": "#7D1DD8",
  "Origen e importancia ecológica": "#262699",
  "Impactos socioeconómicos y ambientales": "#438BFF",
  "Aprovechamiento y usos": "#1263FC",
  "Cooperación internacional": "#0A7F94",
  Restauración: "#054C32",
  "Atención integral": "#42A542",
};
</script>

<style lang="scss">
#desplazamiento-puntos {
  .card-map-header {
    flex-direction: column;
    padding: 8px;
    div {
      margin: 0;
      display: flex;
      flex-direction: row;
      width: 100%;
      justify-content: space-between;

      .select,
      input {
        width: 300px;
      }
    }
  }
  .ol-tooltipmov {
    min-width: 200px;
  }
}
</style>