import DaiCapaUtfGrid from "./utf-grid.vue"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiCapaUtfGrid.name,DaiCapaUtfGrid )
}

export default plugin;


export {
    plugin as install,
    DaiCapaUtfGrid 
};