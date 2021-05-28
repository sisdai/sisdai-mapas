<template>
    <div>
        

        <!--MAPA 1-->
        <div class="another-map">
            <dai-card-map-container :allow-collapsing="false">
                <template v-slot:header>
                    <p>Agregando una capa geoson con un control de transparencia</p>
                    <dai-map-selector>
                        <option value="una opcion">una opcion</option>
                    </dai-map-selector>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-xyz-layer-osm/>
                    <dai-geojson-layer id="estados" url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-map>
                <template v-slot:footer>
                    <dai-opacity-control layerId="estados" />
                    <dai-map-selector>
                        <option value="una opcion">otra opcion</option>
                    </dai-map-selector>
                    <dai-opacity-control title="Opacidad de otra capa"   v-width-control="{mobile:'50%',desktop:'100%'}"/>
                </template>
            </dai-card-map-container>
            
        </div>

        <!--MAPA 2-->
        <div class="another-map">
            <dai-card-map-container >
                <template v-slot:header>
                    <p>Agregando una capa geoson con un control de transparencia</p>
                    <dai-map-selector>
                        <option value="una opcion">una opcion</option>
                    </dai-map-selector>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-xyz-layer-osm/>
                    <dai-geojson-layer 
                    id="estados" 
                    render-classification="quantile"
                    :render-colors="['red','gray','yellow']"
                    :render-classes="3"
                    :render-column="'pob18ymas'"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-map>
                <template v-slot:footer>
                    <dai-legend for="estados"></dai-legend>
                </template>
            </dai-card-map-container>
            
        </div>

        

    </div>
</template>

<script>
import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiXyzLayerOsm} from "../src/components/xyz-layer-osm"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiGeojsonLayer} from "../src/components/geojson-layer"
//import {DaiWmsLayer} from "../src/components/wms-layer"
import {DaiLegend} from "../src/components/legend-control"
import {DaiOpacityControl} from "../src/components/opacity-control"
import {DaiMapSelector} from "../src/components/selector-control"
import {WidthControl} from "@/directives"

export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,DaiXyzLayerOsm,
        DaiGeojsonLayer,
        DaiOpacityControl,
        DaiMapSelector,
        //DaiWmsLayer,
        DaiLegend
        //DaiLegend,DaiMapSelector
    },
    directives:{
        "width-control":WidthControl
    },
    data:function(){
        return{
            
        }
    },
    methods:{
        
    }
}
</script>