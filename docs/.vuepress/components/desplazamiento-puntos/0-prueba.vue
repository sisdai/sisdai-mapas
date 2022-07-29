<template>
    <DaiTarjetaContenedorMapa>
        <DaiMapa
            :extension="[
                -120.668130000000005,
                18.5014099999999999,
                20.8850700000000007,
                57.0758399999999995
            ]"
        >
            <DaiCapaXyz />

            <DaiCapaGeojsonCluster
                id="cluster-basico"
                titulo="Capa con cluster"
                :url="$withBase('/comunidad-sargazo.geojson')"
                :distancia="50"
                :estilo-capa="{
                    circle: {
                        fill: { color: 'red' },
                        stroke: { color: 'black', width: 1 },
                        radius: 9
                    },
                    textStyle: {
                        text: '-',
                        fill: { color: 'white' }
                    }
                }"
                :props-asigna-estilo="['textStyle.text']"
                :fn-asigna-estilo="f => [f.features.length.toString()]"
            />
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>

<script>
export default {
    mounted() {}
};
</script>
