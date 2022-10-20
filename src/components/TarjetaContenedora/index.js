import TarjetaContenedora from './TarjetaContenedora'

function plugin(Vue) {
  if (plugin.installed) {
    return
  }
  plugin.installed = true
  Vue.component(TarjetaContenedora.name, TarjetaContenedora)
}

export default plugin

export { plugin as install, TarjetaContenedora }
