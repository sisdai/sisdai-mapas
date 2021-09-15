<template>
    <div>
        

        <!--MAPA 1-->
        <div class="another-map">

            <dai-card-map-container :collapsed="true" collapsedHeight="70vh" >
                <template v-slot:header>
                    <dai-map-selector class="control-large" v-width-control="'100%'">
                        <option value="o">Titulo de visualizacion dropdown</option>
                    </dai-map-selector>
                    <p  v-width-control="'100%'">Lorem ipsum dolor, sit amet consectetur adipisicing elit. A sapiente repellat ea iusto ab, esse autem placeat mollitia sint natus labore cupiditate ipsum perspiciatis, reiciendis ad, aspernatur omnis facere aliquam!</p>

                    <dai-map-selector  v-width-control="'60%'">
                        <option value="o">Selector</option>
                    </dai-map-selector>

                    <dai-map-switch :options="['Switch 1','Switch2']" v-width-control="'40%'"></dai-map-switch>
                </template>
                <dai-map :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
                    <dai-xyz-layer-osm id="osm_mapa3" />

                    <dai-geojson-layer 
                    id="estados" 
                    render-classification="quantile"
                    :render-colors="['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c']"
                    :render-classes="5"
                    :render-column="'pob18ymas'"

                    :tooltipContent="(f)=>f['abre']+' <br> Poblacion '+f['pob18ymas']"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />

                    <dai-geojson-layer id="edos_1" 
                    title="Estados con un estilo verde"
                    :map-style="{fill:{color:'green'},stroke:{width:1,color:'red'}}"
                    :visible="true"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    
                    <dai-geojson-layer id="edos_2"
                    :visible="false"
                     url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    

                    <dai-map-info >
                        <p><strong>Valores totales seleccionados</strong></p>
                        <p>Variable 1: 100,000,000,000<br>Variable 2: 100,000,000,000</p>
                    </dai-map-info>

                </dai-map>
                <template v-slot:footer>
                    <dai-map-legend  title="Titulo de la leyenda 1" for="estados" :showButtonToggleAll="true" v-width-control="'100%'"></dai-map-legend>
                    <dai-map-opacity layerId="estados" v-width-control="'100%'" />
                    <hr class="dai-map-separator ">
                    
                    <div><p>Leyenda multivariable en una sola capa, cargando...</p></div>
                    <hr class="dai-map-separator ">
                    <dai-map-legend :for="['edos_1','edos_2']" title="Titulo de la leyenda 3" :showButtonToggleAll="true"/>
                    <hr class="dai-map-separator thick">
                    <div class="dai-map-notes">
                        <h4>Notas</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, voluptates non esse accusamus eius unde obcaecati explicabo tenetur</p>
                        <hr class="dai-map-separator thin">
                        <p>
                            <strong>Fuente</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, 
                        </p>
                        <p><strong>Marco Geoestadistico</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, </p>
                    </div>
                    <hr class="dai-map-separator thick">
                    
                        <button class="dai-map-button download">Descargar datos </button>
                    
                    
                </template>
            </dai-card-map-container>
        </div>

        <div class="another-map">

            <dai-card-map-container :collapsed="true" collapsedHeight="70vh" collapsedText="Mas información">
                <template v-slot:header>
                    <p class="map-project-title">Titulo/enlace del proyecto</p>
                    <dai-map-selector class="control-large" v-width-control="'100%'">
                        <option value="o">Titulo de visualizacion dropdown</option>
                    </dai-map-selector>
                    <p class="map-update-title">Ultima actualización: dd/mm/aaaa</p>
                    <p v-width-control="'100%'">Lorem ipsum dolor, sit amet consectetur adipisicing elit.</p>

                    <dai-map-selector  v-width-control="'50%'">
                        <option value="o">Granularidad</option>
                    </dai-map-selector>
                    <dai-map-searcher v-width-control="'50%'" placeholder="Buscador"></dai-map-searcher>
                    
                </template>
                <dai-map :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
                    <dai-xyz-layer-osm id="osm_mapa3" />

                    <dai-geojson-layer 
                    id="estados" 
                    render-classification="quantile"
                    :render-colors="['#eff3ff','#bdd7e7','#6baed6','#3182bd','#08519c']"
                    :render-classes="5"
                    :render-column="'pob18ymas'"

                    :tooltipContent="(f)=>f['abre']+' <br> Poblacion '+f['pob18ymas']"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />

                    <dai-geojson-layer id="edos_1" 
                    title="Estados con un estilo verde"
                    :map-style="{fill:{color:'green'},stroke:{width:1,color:'red'}}"
                    :visible="true"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    
                    <dai-geojson-layer id="edos_2"
                    :visible="false"
                     url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    

                    <dai-map-info >
                        <p><strong>Valores totales seleccionados</strong></p>
                        <p>Variable 1: 100,000,000,000<br>Variable 2: 100,000,000,000</p>
                    </dai-map-info>

                </dai-map>
                <template v-slot:footer>
                    <dai-map-legend  title="Titulo de la leyenda 1" for="estados" :showButtonToggleAll="true" v-width-control="'100%'"></dai-map-legend>
                    <dai-map-opacity layerId="estados" v-width-control="'100%'" />
                    <hr class="dai-map-separator ">
                    
                    <div><p>Leyenda multivariable en una sola capa, cargando...</p></div>
                    <hr class="dai-map-separator ">
                    <dai-map-legend :for="['edos_1','edos_2']" title="Titulo de la leyenda 3" :showButtonToggleAll="true"/>
                    <hr class="dai-map-separator thick">
                    <div class="dai-map-notes">
                        <h4>Notas</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum, voluptates non esse accusamus eius unde obcaecati explicabo tenetur</p>
                        <hr class="dai-map-separator thin">
                        <p>
                            <strong>Fuente</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, 
                        </p>
                        <p><strong>Marco Geoestadistico</strong> ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis ex unde asperiores ab, esse quas nihil, </p>
                    </div>
                    <hr class="dai-map-separator thick">
                    
                        <a class="dai-map-button download">Descargar datos </a>
                    
                    
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
import {DaiMapInfo} from "../src/components/info-control"
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
        DaiMapInfo,
        DaiMapSearcher
        //DaiLegend,DaiMapSelector
    },
    directives:{
        "width-control":WidthControl
    },
}
</script>
