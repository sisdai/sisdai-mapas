import {
    DaiMap,
    DaiCardMapContainer,

    DaiXyzLayer,
    DaiXyzLayerOsm,
    DaiGeojsonLayer,

    DaiLegend,
    DaiMapSelector
} from "./components"

import {
    WidthControl
} from "./directives"

export default function plugin(Vue){
    if (plugin.installed) {
        return
    }
    plugin.installed = true
    Vue.use(DaiMap)
    Vue.use(DaiCardMapContainer)

    Vue.use(DaiXyzLayer)
    Vue.use(DaiXyzLayerOsm)
    Vue.use(DaiGeojsonLayer)

    Vue.use(DaiLegend)
    Vue.use(DaiMapSelector)

    //directivas
    Vue.directive(WidthControl.name,WidthControl);

}

export {
    plugin as install,
    //componentes
    DaiMap,
    DaiCardMapContainer,

    DaiXyzLayer,
    DaiXyzLayerOsm,
    DaiGeojsonLayer,

    DaiLegend,
    DaiMapSelector,

    //directivas
    WidthControl

}