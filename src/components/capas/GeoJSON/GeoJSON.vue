<script>
import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import MixinCapa from './../../../mixins/Capa'
import MixinCapaVectorial from './../../../mixins/CapaVectorial'

export default {
  name: 'DaiCapaGeojson',
  mixins: [MixinCapa, MixinCapaVectorial],
  methods: {
    crearCapaComoObjeto() {
      this.olCapa = new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(require('./sample-edos.json')),
        }),
        // className: this.className,
      })

      this.asignarEstilo()
    },
  },
}
</script>
