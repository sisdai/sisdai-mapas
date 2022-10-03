import MapaPrincipal from "./MapaPrincipal";

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    Vue.component(MapaPrincipal.name, MapaPrincipal);
}

export default plugin;

export { plugin as install, MapaPrincipal };
