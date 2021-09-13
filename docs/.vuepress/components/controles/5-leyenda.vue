<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <h3 v-width-control="'100%'" >Control de leyenda</h3> 
                <dai-leyenda-mapa
                titulo="Este es el titulo de la leyenda"
                :para="['estados','estados2','estados3']"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-geojson 
                id="estados" 
                url="/sample-edos.geojson"
                />
                <dai-capa-geojson 
                id="estados2" 
                titulo="Estados con titulo"
                url="/centroides-estados.geojson"
                />
                <dai-capa-geojson 
                id="estados3" 
                url="/centroides-estados.geojson"
                :estilo-capa="{circle:{fill:{color:'purple'},radius:3}}"
                />
            </dai-mapa>

            
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>