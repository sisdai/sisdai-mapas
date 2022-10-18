<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import usarCapa, { props } from '../../../composables/usarCapa'

export default {
  name: 'DaiCapaXyzOsm',
  props,
  setup(propsRefs) {
    const { salvarCapaComoObjeto } = usarCapa(propsRefs)

    salvarCapaComoObjeto(
      new TileLayer({
        source: new OSM(),
        // className: this.className,
      })
    )

    return {}
  },
  render: () => null,
}
</script>
