<template>
    <div>
        

        <!--MAPA 1-->
        <div class="another-map">
            <dai-card-map-container>
                <template v-slot:header>
                    <p>Agregando un simple recurso de capa geojson</p>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-geojson-layer url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-map>
            </dai-card-map-container>
        </div>

        <!--MAPA 2-->
        <div class="another-map">
            <dai-card-map-container :collapsed="false">
                <template v-slot:header>
                    <p>Creando capas wms, probando la reactividad de las propiedades</p>
                    <button @click="agregar_1mas_map2">agregar/quitar una capa mas</button>
                    <button @click="visibilidad_estados_map2=!visibilidad_estados_map2">toggle visibilidad estados</button>
                </template>
                <dai-map  
                    :extent="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >

                    <dai-geojson-layer id="edos_1" 
                    title="Estados con un estilo verde"
                    :map-style="{fill:{color:'green'},stroke:{width:1,color:'red'}}"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    <dai-geojson-layer id="edos_2" url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    
                    <dai-wms-layer id="estados" url="https://geo.crip.conacyt.mx/geoserver/estados_inegi_2019/wms" 
                        :visible.sync="visibilidad_estados_map2"
                        :params="{'LAYERS':'estados_inegi_2019'}"/>
                    <dai-wms-layer id="centros" url="https://geo.crip.conacyt.mx/geoserver/centros_de_acondicionamiento_fisico/wms" 
                        :params="{'LAYERS':'centros_de_acondicionamiento_fisico'}" title="Centros de acondicionamiento fisico"/>
                    <dai-wms-layer v-for="capa in capas_map2" :key="capa" :id="capa" :url="'https://geo.crip.conacyt.mx/geoserver/'+capa+'/wms'" 
                        :params="{'LAYERS':capa}"/>
                </dai-map>
                <template v-slot:footer>
                    <p>la leyenda va aqui</p>
                    <dai-map-legend :for="['edos_1','edos_2','estados','centros','a_conabio_areas_natur_protegidas_2009']" title="Capas de este mapa"></dai-map-legend>
                </template>
            </dai-card-map-container>
        </div>

    </div>
</template>

<script>
import "./styles.css"

import {DaiMap} from "../src/components/map"
import {DaiCardMapContainer} from "../src/components/card-container"
import {DaiGeojsonLayer} from "../src/components/geojson-layer"
import {DaiWmsLayer} from "../src/components/wms-layer"
import {DaiMapLegend} from "../src/components/legend-control"
import {WidthControl} from "@/directives"

export default {
    name:"App",
    components:{
        DaiMap,DaiCardMapContainer,
        DaiGeojsonLayer,
        DaiWmsLayer,
        DaiMapLegend
        //DaiLegend,DaiMapSelector
    },
    directives:{
        "width-control":WidthControl
    },
    data:function(){
        return{
            capas_map2:[],
            visibilidad_estados_map2:true
        }
    },
    methods:{
        agregar_1mas_map2:function(){
            if(this.capas_map2.length==0){
                this.capas_map2.push("a_conabio_areas_natur_protegidas_2009")
            }
            else{
                this.capas_map2.shift()
            }
        },
    }
}
</script>