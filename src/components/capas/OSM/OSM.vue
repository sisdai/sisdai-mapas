<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import usarCapa from '../../../composables/usarCapa'

export default {
  name: 'DaiCapaXyzOsm',
  setup() {
    const { salvarCapaComoObjeto } = usarCapa()

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
