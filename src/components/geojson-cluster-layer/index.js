import DaiCapaGeojsonCluster from "./geojson-cluster.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiCapaGeojsonCluster.name,DaiCapaGeojsonCluster)
}

export default plugin;


export {
    plugin as install,
    DaiCapaGeojsonCluster
};