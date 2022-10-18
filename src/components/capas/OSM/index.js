import DaiXyzLayerOSM from './OSM'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true
  Vue.component(DaiXyzLayerOSM.name, DaiXyzLayerOSM)
}

export default plugin

export { plugin as install, DaiXyzLayerOSM }
