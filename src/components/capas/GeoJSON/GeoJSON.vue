<script>
import { toRefs } from 'vue'

import VectorLayer from 'ol/layer/Vector'
// import VectorImage from 'ol/layer/VectorImage'
import VectorSource from 'ol/source/Vector'
import GeoJSON from 'ol/format/GeoJSON'

import usarCapaVectorial, {
  props,
} from './../../../composables/usarCapaVectorial'

export default {
  name: 'DaiCapaGeojson',
  props,
  setup(props) {
    /**
     *
     */
    const { datos } = toRefs(props)
    // watch(zoom, cambiarZoom)

    const { salvarCapaComoObjeto } = usarCapaVectorial()

    salvarCapaComoObjeto(
      new VectorLayer({
        source: new VectorSource({
          features: new GeoJSON().readFeatures({ ...datos.value }),
        }),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
