import DaiCapaGeojsonHexbinDinamico from "./geojson-hexbin-dinamico.vue"
import DaiCapaGeojsonHexbin from "./geojson-hexbin.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiCapaGeojsonHexbinDinamico.name,DaiCapaGeojsonHexbinDinamico)
    Vue.component(DaiCapaGeojsonHexbin.name,DaiCapaGeojsonHexbin)
}

export default plugin;


export {
    plugin as install,
    DaiCapaGeojsonHexbinDinamico,
    DaiCapaGeojsonHexbin
};