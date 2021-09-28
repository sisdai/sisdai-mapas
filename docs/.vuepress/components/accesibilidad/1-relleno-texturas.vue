<template>
    <div class="another-map">
        <button @click="usarTexturas=!usarTexturas">alternar textura</button>
        <dai-mapa
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                <dai-capa-xyz/>
                <dai-capa-geojson 
                id="estados2"
                :url="$withBase('/sample-edos.geojson')"
                :usar-texturas-en-relleno="usarTexturas"
                :estilo-capa="{
                    fill:{color:'orange'},
                    stroke:{color:'gray',width:1}
                }"
                :estiloTexturaRelleno="{
                    color:'orange',
                    pattern:'brick',
                    
                }"
                />
        </dai-mapa>
    </div>
</template>

<script>
export default {
    data: function (){
        return {
            usarTexturas:true,
            
        }
    },
    
}
</script>