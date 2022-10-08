import MapaPrincipal from './components/MapaPrincipal'
import CapaOSM from './components/capas/OSM'

export default function plugin(Vue) {
  if (plugin.installed) {
    return
  }

  plugin.installed = true

  // componentes
  Vue.use(MapaPrincipal)
  Vue.use(CapaOSM)
}

export {
  plugin as install,

  // componentes
  MapaPrincipal,
  CapaOSM,
}
