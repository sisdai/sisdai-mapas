import * as DaiMap from "./map"
import * as DaiCardMapContainer from "./card-container"


//layers
import * as DaiXyzLayerOsm from "./xyz-layer-osm"
import * as DaiXyzLayer from "./xyz-layer"
import * as DaiGeojsonLayer  from "./geojson-layer"
import * as DaiCapaGeojsonCluster  from "./geojson-cluster-layer"
import * as DaiCapaGeojsonDesplazamientoDePuntos  from "./geojson-desplazamiento-puntos-layer"
import * as DaiCapaGeojsonHexbin from "./geojson-hexbin-layer"
import * as DaiWmsLayer from "./wms-layer"

//controles
import * as DaiLeyendaMapa from "./legend-control"
import * as DaiMapSelector from "./selector-control"
import * as DaiMapOpacity from "./opacity-control"
import * as DaiMapSwitch from "./switcher-control"
import * as DaiMapSearcher from "./searcher-control"
import * as DaiMapInfo from "./info-control"

export{
    DaiMap,
    DaiCardMapContainer,

    DaiXyzLayer,
    DaiXyzLayerOsm,
    DaiGeojsonLayer,
    DaiCapaGeojsonCluster,
    DaiCapaGeojsonDesplazamientoDePuntos,
    DaiCapaGeojsonHexbin,
    DaiWmsLayer,

    DaiLeyendaMapa,
    DaiMapSelector,
    DaiMapOpacity,
    DaiMapSwitch,
    DaiMapSearcher,
    DaiMapInfo,
    
}