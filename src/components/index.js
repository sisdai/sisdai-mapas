import * as DaiMap from "./map"
import * as DaiCardMapContainer from "./card-container"

//layers
import * as DaiXyzLayerOsm from "./xyz-layer-osm"
import * as DaiXyzLayer from "./xyz-layer"
import * as  DaiGeojsonLayer  from "./geojson-layer"
import * as DaiWmsLayer from "./wms-layer"

//controles
import * as DaiLegend from "./legend-control"
import * as DaiMapSelector from "./selector-control"
import * as DaiMapOpacity from "./opacity-control"
import * as DaiMapSwitch from "./switcher-control"
import * as DaiMapSearcher from "./searcher-control"

export{
    DaiMap,
    DaiCardMapContainer,

    DaiXyzLayer,
    DaiXyzLayerOsm,
    DaiGeojsonLayer,
    DaiWmsLayer,

    DaiLegend,
    DaiMapSelector,
    DaiMapOpacity,
    DaiMapSwitch,
    DaiMapSearcher
}