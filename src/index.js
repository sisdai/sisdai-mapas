import TarjetaContenedora from './components/TarjetaContenedora'
import MapaPrincipal from './components/MapaPrincipal'
import CapaOSM from './components/capas/OSM'
import CapaGeoJSON from './components/capas/GeoJSON'

import './styles/controles.scss'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  // componentes
  Vue.use(TarjetaContenedora)
  Vue.use(MapaPrincipal)
  Vue.use(CapaOSM)
  Vue.use(CapaGeoJSON)
}

export {
  plugin as install,

  // componentes
  TarjetaContenedora,
  MapaPrincipal,
  CapaOSM,
  CapaGeoJSON,
}
