import TarjetaContenedora from './components/TarjetaContenedora'
import MapaPrincipal from './components/MapaPrincipal/MapaPrincipal'
import CapaOSM from './components/capas/OSM'
import CapaGeoJSON from './components/capas/GeoJSON'

import * as layout from './components/layouts'

import './styles/controles.scss'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  Vue.component(layout.Encabezado.name, layout.Encabezado)
  Vue.component(layout.Capas.name, layout.Capas)

  // componentes
  Vue.use(TarjetaContenedora)
  Vue.component(MapaPrincipal.name, MapaPrincipal)
  Vue.use(CapaOSM)
  Vue.use(CapaGeoJSON)
}

export {
  plugin as install,

  // layouts
  // Capas,

  // componentes
  TarjetaContenedora,
  MapaPrincipal,
  CapaOSM,
  CapaGeoJSON,
}
