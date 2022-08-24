<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <dai-mapa
                :extension="[
                    -118.365119934082,
                    14.5320978164673,
                    -86.7104034423828,
                    32.7186546325684
                ]"
            >
                <dai-capa-topojson
                    id="disponibilidad"
                    :url="$withBase('/example.geojson')"
                    :reglas-estilo-capa="{
                        clasificacion: 'categorias',
                        columna: 'classification',
                        acomodoCategorias: [
                            'Con disponibilidad',
                            'Sin disponibilidad'
                        ],
                        clases: 2
                    }"
                    :estilo-capa="{
                        stroke: {
                            color: '#fff',
                            width: 0.2
                        }
                    }"
                    :usar-texturas-en-relleno="true"
                    :estiloTexturaRelleno="{
                        color: '#00AFB9',
                        pattern: 'hexagon',
                        scale: 0.5,
                        fill: { color: '#F07167' }
                    }"
                />
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>

<!-- :zoom="7" :centro="[-102.28259, 22.35981]" -->
