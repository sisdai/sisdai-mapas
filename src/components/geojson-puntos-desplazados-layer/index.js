import DaiCapaGeojsonPuntosDesplazados from "./geojson-puntos-desplazados.vue";

function plugin(Vue) {
    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    Vue.component(
        DaiCapaGeojsonPuntosDesplazados.name,
        DaiCapaGeojsonPuntosDesplazados
    );
}

export default plugin;

export { plugin as install, DaiCapaGeojsonPuntosDesplazados };
