<template>
  <DaiTarjetaContenedorMapa :colapsada="false">
    <template #header>
      <select v-show="datosCargados" v-model="seleccionEstado">
        <option value="none">Selecciona</option>
        <option
          v-for="(estado, idx) in listaEstados"
          :key="`edo_${idx}`"
          :value="estado.cve_ent"
        >
          {{ estado.nom_ent }}
        </option>
      </select>

      <select v-show="datosCargados" v-model="seleccionMunicipio">
        <option value="none">Selecciona</option>
        <option
          v-for="(municipio, idx) in listaMunicipios"
          :key="`mun_${idx}`"
          :value="municipio.cvegeomun"
        >
          {{ municipio.nom_mun }}
        </option>
      </select>

      <div v-show="!datosCargados">Cargando...</div>
    </template>

    <DaiMapa ref="mapa" :extension="extend">
      <DaiCapaXyzOsm />
      <DaiCapaTopojson
        :id="idCapa"
        :datos="datosTopoJson"
        :estiloCapa="{ stroke: { color: '#fff', width: 0.1 } }"
        :reglasEstiloCapa="{
          clasificacion: 'personalizada',
          columna: 'area_km',
          propiedadObjetivo: 'relleno',
          clases: 2,
          clasificacionPersonalizada: [[1,2000],[2000,34200]],
          colores: ['#00AFB9', '#F07167'],
        }"
        :useLoader="true"
      />
    </DaiMapa>

    <template #footer>
      <DaiLeyendaMapa titulo="Área en km²" :para="idCapa" />
    </template>
  </DaiTarjetaContenedorMapa>
</template>

<script>
export default {
  data: () => ({
    extend: [
      -118.365119934082, 14.5320978164673, -86.7104034423828, 32.7186546325684,
    ],
    idCapa: "capaTopoJson",
    datosTopoJson: {
      type: "Topology",
      transform: {},
      arcs: [],
      objects: {},
    },
    datosCargados: false,

    listaEstados: [],
    seleccionEstado: "none",
    listaMunicipios: [],
    seleccionMunicipio: "none",
    filtroTopoJson: "",
  }),
  computed: {
    urlTopoJsonConFiltro() {
      return `${urlTopoJson}&${this.filtroTopoJson}`;
    },
  },
  mounted() {
    this.cargarTopoJson();
    this.cargarListaEstados();
  },
  methods: {
    cargarTopoJson() {
      this.datosCargados = false;
      loadLayer(this.urlTopoJsonConFiltro).then((data) => {
        this.datosTopoJson = data;
        this.datosCargados = true;
      });
    },
    cargarListaEstados() {
      loadLayer(urlEstados).then((data) => {
        this.listaEstados = data.features.map((feature) => feature.properties);
      });
    },
    cargarListaMunicipios() {
      loadLayer(
        urlMunicipios + `&cql_filter=cve_ent='${this.seleccionEstado}'`
      ).then((data) => {
        this.listaMunicipios = data.features.map(
          (feature) => feature.properties
        );
      });
    },
  },
  watch: {
    urlTopoJsonConFiltro() {
      this.cargarTopoJson();
    },
    datosCargados(newValue) {
      if (newValue) {
        setTimeout(() => {
          this.extend = this.$refs.mapa.cmpLayers[this.idCapa].olLayer
            .getSource()
            .getExtent();
        }, 50);
      }
    },
    extend() {
      setTimeout(() => {
        this.$refs.mapa.external_force_reset_view();
      }, 50);
    },
    seleccionEstado(newValue) {
      this.seleccionMunicipio = "none";
      if (newValue === "none") {
        this.listaMunicipios = [];
        this.filtroTopoJson = "";
      } else {
        this.cargarListaMunicipios();
        this.filtroTopoJson = `cql_filter=cve_ent='${newValue}'`;
      }
    },
    seleccionMunicipio(newValue) {
      if (newValue === "none") {
        this.filtroTopoJson = `cql_filter=cve_ent='${this.seleccionEstado}'`;
      } else {
        this.filtroTopoJson = `cql_filter=cvegeomun='${newValue}'`;
      }
    },
  },
};

const urlTopoJson =
  "https://gema.conacyt.mx/geoserver/contexto/wms?service=WMS&version=1.1.0&request=GetMap&layers=contexto%3Agref_division_municipal_2020&bbox=-118.36511993408203%2C14.532097816467285%2C-86.71040344238281%2C32.71865463256836&width=768&height=441&srs=EPSG%3A4326&styles=&format=application%2Fjson%3Btype%3Dtopojson";
const urlEstados =
  "https://gema.conacyt.mx/geoserver/contexto/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=contexto%3Agref_division_estatal_2020&outputFormat=application%2Fjson&propertyName=cve_ent,nom_ent&sortBy=nom_ent";
const urlMunicipios =
  "https://gema.conacyt.mx/geoserver/contexto/wfs?service=WFS&version=1.0.0&request=GetFeature&typeName=contexto%3Agref_division_municipal_2020&outputFormat=application%2Fjson&propertyName=cvegeomun,nom_mun&sortBy=nom_mun";

async function loadLayer(url) {
  const result = await fetch(url);
  return await result.json();
}
</script>