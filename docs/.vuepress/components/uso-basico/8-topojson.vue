<template>
    <dai-mapa :zoom="7" :centro="[-102.28259, 22.35981]">
        <dai-capa-topojson
            id="disponibilidad"
            :url="$withBase('/topojson-sample.geojson')"
            :reglas-estilo-capa="{
                columna: 'classification',
                acomodoCategorias: ['Con disponibilidad', 'Sin disponibilidad'],
                propiedadObjetivo: 'relleno',
                clases: 2,
                colores: ['#00AFB9', '#F07167']
            }"
            :estilo-capa="{
                stroke: {
                    color: '#fff',
                    width: 0.2
                }
            }"
        />
    </dai-mapa>
</template>
