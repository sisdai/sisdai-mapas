<script>
import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import useCapa from './../../../composables/useCapa'

export default {
  name: 'DaiCapaGeojson',
  // mixins: [MixinCapa, MixinCapaVectorial],
  setup() {
    const { salvarCapaComoObjeto } = useCapa()

    salvarCapaComoObjeto(
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures(require('./sample-edos.json')),
        }),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
