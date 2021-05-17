import DaiGeojsonLayer from "./geojson.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiGeojsonLayer.name,DaiGeojsonLayer)
}

export default plugin;


export {
    plugin as install,
    DaiGeojsonLayer
};