<template>
  <DaiTarjetaContenedorMapa :colapsada="false">
    <template #header>
      El mapa toma los puntos que caen en una tolerancia de distancia dada entre
      sí (grupo) y los ubica alrededor de su baricentro siguiendo diferentes
      métodos de desplazamiento:

      <ul>
        <li>
          <b>anillo</b>: (valor por defecto) Coloca todas las características en
          un círculo cuyo radio depende de la cantidad de características a
          mostrar.
        </li>
        <li>
          <b>anillos-concentricos</b>: Utiliza un conjunto de círculos
          concéntricos para mostrar las características.
        </li>
        <li>
          <b>espiral</b>: Crea una espiral con las características más alejadas
          del centro del grupo en cada vuelta.
        </li>
        <li>
          <b>cuadricula</b>: Genera una grilla regular con un símbolo de punto
          en cada intersección.
        </li>
      </ul>

      <p>Metodo de desplazamiento</p>
      <dai-selector-mapa v-model="metodoSeleccionado">
        <option
          v-for="metodo in metodosDesplazamiento"
          :value="metodo"
          :key="metodo"
        >
          {{ metodo }}
        </option>
      </dai-selector-mapa>
    </template>
    <DaiMapa>
      <DaiCapaXyz />

      <DaiCapaGeojsonPuntosDesplazados
        id="desplazamiento-basico"
        titulo="Desplazamiento básico"
        :url="$withBase('/centroides-estados.geojson')"
        :distancia="80"
        :metodoDesplazamiento="metodoSeleccionado"
        :radioPuntoCentro="4"
        :radioPuntosDesplazados="4"
        :propsAsignaEstilo="['circle']"
        :fnAsignaEstilo="fnAsignaEstilo"
        tipoGeometria="Point"
      />
    </DaiMapa>
  </DaiTarjetaContenedorMapa>
</template>

<script>
export default {
  data() {
    return {
      metodoSeleccionado: "anillo",
      metodosDesplazamiento: [
        "anillo",
        "anillos-concentricos",
        "espiral",
        "cuadricula",
      ],
    };
  },
  methods: {
    fnAsignaEstilo(feature) {
      if (feature.ring) {
        // estilo para anillos
        return [
          {
            radius: feature.ring.radius,
            stroke: { color: "back" },
          },
        ];
      }

      if (feature.features && feature.features.length > 1) {
        // estilo para baricentro (centro del cluster)
        return [
          {
            fill: { color: "gray" },
            radius: 4,
          },
        ];
      }

      // estilo para puntos desplazados
      const punto = feature.features
        ? feature.features[0].getProperties()
        : feature;

      // console.log(punto.estados_grado_marg);
      return [
        {
          fill: { color: `#${punto["cvegeo"]}a` },
          radius: 4,
          stroke: { color: "white" },
        },
      ];
    },
  },
};
</script>