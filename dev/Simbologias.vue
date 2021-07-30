<template>
    <div>
        <div class="another-map-v-desktop">
            <dai-tarjeta-contenedor-mapa :es-version-escritorio-en-pantalla-larga="true">
                <template v-slot:header>
                    <p>Agregando un simple recurso de capa geojson</p>
                    <button @click="un_click">alguna accion</button>

                    <p>
                        Nivel actual del mapa {{nivelActual}}
                    </p>
                </template>
                <dai-mapa 
                    ref="mapa_componente"
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    :niveles="['estatal','municipal','secciones']"
                    :nivel-actual.sync="nivelActual"
                    @cambioNivel="secambioelnivel"  
                    >
                 
                    <dai-capa-geojson 
                    ref="capa1_parafiltro"
                    id="estados11"
                    :reglasEstiloCapa="{
                        columna:'personal_salud',
                        clasificacion:'cuantiles',
                        colores:'Reds',
                        clases:6,
                        clasesVisiblesInicial:[false,false,true,true,false,false]
                    }"
                    :contenido-tooltip="f=>f['personal_salud']"
                    url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson" />
                    <dai-capa-geojson 
                    ref="capa2_parafiltro"
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
        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :colapsada="false">
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                    <button @click="otro_click">otro click</button>
                    
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos"
                        ref="capa_cultivos"
                        :reglas-estilo-capa="[
                        {columna:'cultivo',colores:'Category10'},
                        {
                            columna:'cultivo_tot',
                            clasificacion:'personalizada',
                            clases:3,
                            proporciones:[6,12,16],
                            propiedadObjetivo:'proporcion',
                            tituloVariable:'Cantidad de cultivos',
                            clasificacionPersonalizada: [ [1,12500], [12500,40000], [40000,216935] ]
                        }
                        ]"
                        contenido-tooltip="HOla"
                        @click_feature="otro_click"
                        :zoomAlDarClick="false"
                    />
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos2"
                        :reglas-estilo-capa="[
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:3,proporciones:[1,2,3],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos leyenda 2'}
                        ]"
                        :estilo-capa="{style:{circle:{'fill':{color:'red'},stroke:{color:'black',width:1}}}}"
                        
                    />
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa :para="['cultivos','cultivos2']" titulo="Capas de este mapa" :mostrar-boton-alterna-todos="true"></dai-leyenda-mapa>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>

        <div class="another-map">
            <dai-tarjeta-contenedor-mapa :colapsada="false">
                <template v-slot:header>
                    <p>Agregando estilo simple a las capas</p>
                </template>
                <dai-mapa  
                    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]"
                    >
                 
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos3"
                        :reglas-estilo-capa="[
                        {columna:'cultivo_tot',colores:'Blues',clasificacion:'cuantiles',clases:6},
                        {columna:'cultivo_tot',clasificacion:'cuantiles',clases:4,proporciones:[4,6,12,20],propiedadObjetivo:'proporcion',tituloVariable:'Cantidad de cultivos'}
                        ]"
                    />

                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos4"
                    />
                    <dai-capa-geojson :datos="datos_cultivos"  id="cultivos5"
                    />

                    
                </dai-mapa>
                <template v-slot:footer>
                    <dai-leyenda-mapa :para="['cultivos3']" titulo="Capas de este mapa 2" :mostrar-boton-alterna-todos="true"></dai-leyenda-mapa>
                    <dai-leyenda-mapa :para="['cultivos4','cultivos5']" titulo="segunda leyenda"/>
                </template>
            </dai-tarjeta-contenedor-mapa>
        </div>
    </div>
</template>

<script>
import "./styles.css"



import datos from "./data/circulos-sample.json"

export default {
    name:"App",
    components:{
        
    },
    data:function(){
        return {
            datos_cultivos:datos,
            nivelActual:"secciones"
        }
    },methods:{
        un_click:function(){
            
            // una variable que cambia el prop < ... :nivel-actual="nivelActual" .../>
            this.nivelActual = "municipal"

            //una funcion de poner el nivel al objeto componente
            //this.$refs.mapa_componente.setNivel("estatal")

            // una funcion de ir un nivel hacia atras
            //this.$refs.mapa_componente.setNivelRetroceso()
        },
        otro_click:function(){
            console.log("nose")
            this.$refs.capa_cultivos.filtrarDatos(feature=>feature.getProperties()["cve_ent"]=="16")
        },
        secambioelnivel:function(nivel){
            console.log("se cambio el nivel a",nivel,"haz algo")
        }
    }
}
</script>

<style>

</style>