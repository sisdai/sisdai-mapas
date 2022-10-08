<script>
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

import MixinCapa from './../../../mixins/Capa'

export default {
  name: 'DaiCapaXyzOsm',
  mixins: [MixinCapa],
  methods: {
    crearCapaComoObjeto() {
      // console.log('editado desde osm')
      this.olCapa = new TileLayer({
        source: new OSM(),
        // className: this.className,
      })
    },
  },
}
</script>
