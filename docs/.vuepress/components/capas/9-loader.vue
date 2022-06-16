<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa :permitir-colapso="false">
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_poligonos"
                :url="$withBase('/sample-edos.geojson')"
                :estilo-capa="{fill:{color:'yellow'},stroke:{color:'black',width:1}}"
                :use-loader="true"
                :visible="false"
                />
                
                <dai-capa-wms 
                id="estados_geoserver"
                url="https://dadsigvisgeo.conacyt.mx/geoserver/pueblosindigenas/wms"
                :parametros="{'LAYERS':'pueblosindigenas:estados_hist_resi'}"
                :use-loader="true"
                :visible="false"
                :useLoaderOnlyFirstTime="!loader_on_refresh_wms"
                />
            </dai-mapa>
            <template v-slot:header>
                <dai-leyenda-mapa
                :para="['estados_poligonos','estados_centroides','estados_geoserver']"
                />
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<script>
export default {
    props:['loader_on_refresh_wms']
}
</script>