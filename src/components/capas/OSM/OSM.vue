<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import useCapa from './../../../composables/useCapa'

export default {
  name: 'DaiCapaXyzOsm',
  setup() {
    const { salvarCapaComoObjeto } = useCapa()

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
