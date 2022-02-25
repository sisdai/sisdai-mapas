<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa :permitir-colapso="false">
            <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="poligonosx"
                :url="$withBase('/sample-edos.geojson')"
                titulo="Capa con relleno textura"
                :usar-texturas-en-relleno="true"
                />
                
                <dai-capa-wms 
                id="wmsx"
                titulo="Capa wms"
                url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms"
                :parametros="{'LAYERS':'estados_210521'}"
                />
            </dai-mapa>
            <template v-slot:header>
                <dai-leyenda-mapa
                :para="['poligonosx','wmsx']"
                titulo="Mas opciones para una leyenda"
                :infos="{
                    poligonosx: 'Hola soy una capa con relleno de textura',
                    wmsx: {
                        contenido:'<b>Soy una capa desde servidor wms</b> geoserver',
                        lado:'izquierdo'
                    },
                    ':header:': {
                        contenido:'Un info del titulo',
                        lado: 'izquierdo'
                    }
                }"
                />
            </template>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

