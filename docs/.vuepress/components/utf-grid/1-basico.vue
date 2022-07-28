<template>
    <div class="another-map">
        <dai-mapa :zoom="8" :centro="[-99.1332,19.4326]" >
            <dai-capa-xyz-osm/>
            <dai-capa-wms 
            url="https://dadsigvisgeo.conacyt.mx/geoserver/pueblosindigenas/wms" 
            :parametros="{'LAYERS':'municipios_hist_resi'}"
            :useLoader="true"
            :z-index="3"
            />
            <dai-capa-utf-grid 
            id="municipios_hist_resi"
            :z-index="3"
            wms-url="https://dadsigvisgeo.conacyt.mx/geoserver/pueblosindigenas/wms" 
            :wms-parametros="{LAYERS:'municipios_hist_resi'}"
            :contenidoTooltip="f=>`municipios_hist_resi - ${f.nom_mun} <br> pob_pue_hist ${f.pob_pue_hist}`"
            />

            
            <dai-capa-utf-grid 
            id="covid_pob_grado_marg_2020_201"
            :z-index="2"
            wms-url="https://gema.conacyt.mx/geoserver/wms" 
            :wms-parametros="{LAYERS:'covid_pob_grado_marg_2020_2015'}"
            :contenidoTooltip="f=>`covid_pob_grado_marg_2020_2015 - ${f.nom_mun}`"
            />

            <dai-capa-wms 
            :z-index="5"
            url="https://gema.conacyt.mx/geoserver/wms" 
            :parametros="{LAYERS:'glifosato_rendimiento_2020_mun_a'}"
            />
            <dai-capa-utf-grid 
            id="glifosato_rendimiento_2020_mun_a"
            :z-index="5"
            wms-url="https://gema.conacyt.mx/geoserver/wms" 
            :wms-parametros="{LAYERS:'glifosato_rendimiento_2020_mun_a'}"
            :contenidoTooltip="f=>`glifosato_rendimiento_2020_mun_a - ${f.nom_mun}`"
            />
        </dai-mapa>
    </div>
    
</template>

