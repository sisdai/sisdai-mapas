import MapaPrincipal from './components/MapaPrincipal'
import CapaOSM from './components/capas/OSM'
import CapaGeoJSON from './components/capas/GeoJSON'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  // componentes
  Vue.use(MapaPrincipal)
  Vue.use(CapaOSM)
  Vue.use(CapaGeoJSON)
}

export {
  plugin as install,

  // componentes
  MapaPrincipal,
  CapaOSM,
  CapaGeoJSON,
}
