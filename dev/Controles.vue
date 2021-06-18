<template>
    <div>
        <!--MAPA 1-->
        <div class="another-map">
            <dai-card-map-container :allow-collapsing="false">
                <template v-slot:header>
                    <p v-width-control="'100%'">Estilos y tamaños</p>
                    
                    <dai-map-selector v-width-control="{mobile:'100%',desktop:'33%'}" class="control-small inverted">
                        <option value="una opcion">small control</option>
                    </dai-map-selector>

                    <dai-map-switch :options="['t','p']" :optionsLabels="['small','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-small"></dai-map-switch>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-small">with class control-small</p>

                    <dai-map-selector v-width-control="{mobile:'100%',desktop:'33%'}" class="control-normal">
                        <option value="una opcion">normal control</option>
                    </dai-map-selector>

                    <dai-map-switch :options="['t','p']" :optionsLabels="['normal','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-normal"></dai-map-switch>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-normal">with class control-normal</p>

                    <dai-map-selector v-width-control="{mobile:'100%',desktop:'33%'}" class="control-medium">
                        <option value="una opcion">medium control</option>
                    </dai-map-selector>

                    <dai-map-switch :options="['t','p']" :optionsLabels="['medium','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-medium"></dai-map-switch>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-medium">with class control-medium</p>

                    <dai-map-selector v-width-control="{mobile:'100%',desktop:'33%'}" class="control-large">
                        <option value="una opcion">large control</option>
                    </dai-map-selector>

                    <dai-map-switch :options="['t','p']" :optionsLabels="['large','control']" v-width-control="{mobile:'100%',desktop:'33%'}" class="control-large inverted"></dai-map-switch>
                    
                    <p v-width-control="{mobile:'100%',desktop:'33%'}" class="control-large">with class control-large</p>
                    
                    <dai-map-searcher placeholder="sfdsdfg" v-width-control="'100%'" class="control-large" />

                    <dai-map-searcher v-width-control="{mobile:'50%',desktop:'33%'}" placeholder="Buscador de estados" 
                    for="estados"
                    :accesorOptions="(f)=>f.nom_edo"
                    />

                    <dai-map-searcher v-width-control="{mobile:'50%',desktop:'33%'}" placeholder="sfdsdfg" class="control-small inverted"/>
                    <dai-map-searcher v-width-control="{mobile:'50%',desktop:'33%'}" placeholder="sfdsdfg" class="control-medium"/>

                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-xyz-layer-osm/>
                    <dai-geojson-layer id="estados" url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-map>
                <template v-slot:footer>
                    <dai-map-opacity layerId="estados" />
                    <dai-map-selector>
                        <option value="una opcion">otra opcion</option>
                    </dai-map-selector>
                    <dai-map-opacity title="Opacidad de otra capa"   v-width-control="{mobile:'50%',desktop:'100%'}"/>
                </template>
            </dai-card-map-container>
        </div>

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
                    <dai-map-opacity layerId="estados" />
                    <dai-map-selector>
                        <option value="una opcion">otra opcion</option>
                    </dai-map-selector>
                    <dai-map-opacity title="Opacidad de otra capa"   v-width-control="{mobile:'50%',desktop:'100%'}"/>
                </template>
            </dai-card-map-container>
            
        </div>

        <!--MAPA 2-->
        <div class="another-map">
            <dai-card-map-container :collapsed="false" >
                <template v-slot:header>
                    <p>Agregando una capa geoson con un control de transparencia</p>
                    <dai-map-selector>
                        <option value="una opcion">una opcion</option>
                    </dai-map-selector>

                    <dai-map-switch :options="['t','p','o']" :optionsLabels="['Total','porcentaje','otr']" ></dai-map-switch>

                    <dai-map-switch :options="['t','p']" :optionsLabels="['Total','porcentaje']" ></dai-map-switch>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                    <dai-xyz-layer-osm/>
                    <dai-geojson-layer 
                    id="estados" 
                    render-classification="quantile"
                    :render-colors="['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c']"
                    :render-classes="5"
                    :render-column="'pob18ymas'"

                    :tooltipContent="(f)=>f['abre']+' <br> Poblacion '+f['pob18ymas']"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-map>
                <template v-slot:footer>
                    <dai-map-legend  title="Titulo de la coropleta" for="estados" v-width-control="'100%'"></dai-map-legend>
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
import {DaiMapLegend} from "../src/components/legend-control"
import {DaiMapOpacity} from "../src/components/opacity-control"
import {DaiMapSelector} from "../src/components/selector-control"
import {DaiMapSwitch} from "../src/components/switcher-control"
import {DaiMapSearcher} from "../src/components/searcher-control"
import {WidthControl} from "@/directives"

export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,DaiXyzLayerOsm,
        DaiGeojsonLayer,
        DaiMapOpacity,
        DaiMapSelector,
        //DaiWmsLayer,
        DaiMapLegend,
        DaiMapSwitch,
        DaiMapSearcher
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