import DaiLeyendaMapa from "./legend.vue"
function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiLeyendaMapa.name,DaiLeyendaMapa)
}

export default plugin;


export {
    plugin as install,
    DaiLeyendaMapa
}