import DaiCapaGeojsonDesplazamientoDePuntos from "./geojson-desplazamiento-puntos.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiCapaGeojsonDesplazamientoDePuntos.name,DaiCapaGeojsonDesplazamientoDePuntos)
}

export default plugin;


export {
    plugin as install,
    DaiCapaGeojsonDesplazamientoDePuntos
};