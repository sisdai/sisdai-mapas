<template>
    <div class="another-map">
        <button @click="toPng">exportar</button>
        <a id="image-download" download="map.png"></a>
        <dai-mapa 
        :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
        ref="mapa1"
        >
            <dai-capa-xyz/>
             <dai-capa-geojson 
            :opacidad=".5"
            url="https://dadsigvisgeo.conacyt.mx/geoserver/vacunacion/wms?service=WMS&version=1.1.0&request=GetMap&layers=vacunacion:estados&bbox=-118.365119934082%2C14.5320978164673%2C-86.7104034423828%2C32.7186546325684&width=768&height=441&srs=EPSG%3A404000&format=geojson"/>
        </dai-mapa>
    </div>
    
</template>


<script>
export default {
    methods:{
        toPng(){
            let map = this.$refs["mapa1"]
            console.log(map.getPngDataUrl())
            const link = document.getElementById('image-download');
            link.href = map.getPngDataUrl()
            link.click();
        }
    }
}
</script>