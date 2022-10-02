import DaiMapSwitch from "./switcher"

function plugin(Vue){
    if(plugin.installed){
        return
    }
    plugin.installed = true;
    Vue.component(DaiMapSwitch.name,DaiMapSwitch)
}

export default plugin;


export { 
    plugin as install,
    DaiMapSwitch
}