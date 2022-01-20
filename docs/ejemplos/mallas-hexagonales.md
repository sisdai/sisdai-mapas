# Mallas hexagonales


## Una malla dinamica 
Que es definida por los pixeles que el usuario necesita mostrar en pantalla (cuando el zoom cambia la malla se recalcula)

<mallas-hexagonales-1-dinamica />

```html
<DaiTarjetaContenedorMapa>
    <template #header>           
        <DaiLeyendaMapa :para="['normal']"/>
        <DaiLeyendaMapa :para="['cluster-hexbin']" :mostrar-boton-alterna-todos="true"/>
    </template>
    <DaiMapa :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
        <DaiCapaXyz />
        <DaiCapaGeojsonHexbinDinamico
        id="cluster-hexbin"
        titulo="Capa con hexbin"
        :datos="centroides"
        :diametroPixeles="25"
        :reglas-estilo-capa="{
            columna:'features_count',
            clasificacion:'linear',
            clases:3
        }"
        :estilo-capa="{
            textStyle:{text:'-'}
        }"
        :props-asigna-estilo="['textStyle.text']"
        :fn-asigna-estilo="(f)=>[f.features_count+'']"
        />
        <DaiCapaGeojson 
        id="normal"
        titulo="Capa normal"
        :datos="centroides"
        :estilo-capa="{
            circle:{
                fill:{color:'white'},
                stroke:{color:'black',width:1},
                radius:4
            }
        }"
        />
    </DaiMapa>
</DaiTarjetaContenedorMapa>
```

## Una malla estatica
Que es definida por las unidades en el mapa (metros o grados) 


<mallas-hexagonales-2-estatica />

## Una malla dinamica con varios puntos


<mallas-hexagonales-3-dinamica-varios-puntos />