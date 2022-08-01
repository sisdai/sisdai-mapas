import DaiTopojsonLayer from "./topojson.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiTopojsonLayer.name,DaiTopojsonLayer)
}

export default plugin;


export {
    plugin as install,
    DaiTopojsonLayer
};