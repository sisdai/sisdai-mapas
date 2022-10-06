import OSM from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'

export default new TileLayer({
  source: new OSM(),
})
