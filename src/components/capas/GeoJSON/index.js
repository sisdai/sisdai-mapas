import GeoJSON from './GeoJSON'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true
  Vue.component(GeoJSON.name, GeoJSON)
}

export default plugin

export { plugin as install, GeoJSON }
