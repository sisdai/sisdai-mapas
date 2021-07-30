<template>
    <div>
        

        <!--MAPA 1-->
        <div class="another-map-v-desktop">
            <dai-tarjeta-contenedor-mapa :es-version-escritorio-en-pantalla-larga="true">
                <template v-slot:header>
                    <p>Agregando un simple recurso de capa geojson</p>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-capa-geojson 
                    id="estados11"
                    :reglasEstiloCapa="{
                        columna:'personal_salud',
                        clasificacion:'cuantiles',
                        colores:'Reds',
                        clases:6
                    }"
                    :contenido-tooltip="f=>f['personal_salud']"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    <dai-capa-geojson 
                    id="estados12"
                    :visible="false"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    <dai-capa-geojson 
                    id="estados13"
                    :visible="false"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa para="estados11" 
                        titulo="okkkk" 
                        :mostrar-boton-alterna-todos="true"
                    />
                    <dai-leyenda-mapa :para="['estados12','estados13']"></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>

        <!--MAPA 2-->
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :collapsed="false">
                <template v-slot:header>
                    <p>Creando capas wms, probando la reactividad de las propiedades</p>
                    <button @click="agregar_1mas_map2">agregar/quitar una capa mas</button>
                    <button @click="visibilidad_estados_map2=!visibilidad_estados_map2">toggle visibilidad estados</button>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >

                    <dai-capa-geojson id="edos_1" 
                    titulo="Estados con un estilo verde"
                    :estiloCapa="{fill:{color:'green'},stroke:{width:1,color:'red'}}"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    <dai-capa-geojson id="edos_2" 
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    
                    <dai-capa-wms id="estados" url="https://geo.crip.conacyt.mx/geoserver/estados_inegi_2019/wms" 
                        :visible.sync="visibilidad_estados_map2"
                        :parametros="{'LAYERS':'estados_inegi_2019'}"/>
                    <dai-capa-wms id="centros" url="https://geo.crip.conacyt.mx/geoserver/centros_de_acondicionamiento_fisico/wms" 
                        :parametros="{'LAYERS':'centros_de_acondicionamiento_fisico'}" 
                        titulo="Centros de acondicionamiento fisico"/>
                    <dai-capa-wms v-for="capa in capas_map2" :key="capa" :id="capa" :url="'https://geo.crip.conacyt.mx/geoserver/'+capa+'/wms'" 
                        :parametros="{'LAYERS':capa}"/>
                </dai-mapa>
                <template v-slot:footer>
                    <p>la leyenda va aqui</p>
                    <dai-leyenda-mapa 
                    :para="['edos_1','edos_2','estados','centros','a_conabio_areas_natur_protegidas_2009']" 
                    titulo="Capas de este mapa"
                    :mostrarBotonAlternaTodos="true"
                    ></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>

    </div>
</template>

<script>
import "./styles.css"



export default {
    name:"App",
    
    
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

<style>
.another-map-v-desktop{
    padding: 1rem;
    background-color: #f4f4f4;
    
    margin-top: 1rem;
}
</style>