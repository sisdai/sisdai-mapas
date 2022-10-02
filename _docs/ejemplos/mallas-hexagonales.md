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

```html
<DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['normal','hexbin']"/>
        </template>
        <DaiMapa :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
            <DaiCapaXyz />
            <DaiCapaGeojsonHexbin
            id="hexbin"
            titulo="Capa con hexbin"
            :datos="centroides"
            :diametro="2"
            :estilo-capa="{
                textStyle:{text:'-'}
            }"
            :props-asigna-estilo="['textStyle.text']"
            :fn-asigna-estilo="(f)=>[f.features_count+'']"
            :reglas-estilo-capa="{
                columna:'features_count',
                clasificacion:'linear',
                clases:3
            }"
            
            />
            <DaiCapaGeojson 
            id="normal"
            titulo="Capa normal"
            :url="$withBase('/centroides-estados.geojson')"
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

```javascript
import centroides from "../capas/centroides-estados.json"
export default {
    data:function(){
        return {
            centroides:centroides
        }
    }
}
```

## Una malla dinamica con un dataset grande (25,000 puntos)


<mallas-hexagonales-3-dinamica-varios-puntos />

```html
<DaiTarjetaContenedorMapa>
        <template #header>
            <label for=""><input type="checkbox" v-model="malla_visible"> apagar-prender malla</label>
            <DaiLeyendaMapa :para="['normal']"/>
            <DaiLeyendaMapa :para="['cluster-hexbin']" :mostrar-boton-alterna-todos="true"/>
        </template>
        <DaiMapa :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" >
            <DaiCapaXyz />
            <DaiCapaGeojsonHexbinDinamico
            id="cluster-hexbin"
            titulo="Capa con hexbin"
            :renderizarComoImagen="true"
            :datos="puntos"
            :diametroPixeles="25"
            :reglas-estilo-capa="{
                columna:'features_count',
                clasificacion:'cuantiles',
                clases:4
            }"
            :estilo-capa="{
                textStyle:{text:'-'}
            }"
            :props-asigna-estilo="['textStyle.text']"
            :fn-asigna-estilo="(f)=>[f.features_count+'']"
            :visible="malla_visible"
            :contenidoTooltip="(f)=>f.features_count+' hay aqui'"
            />
            <DaiCapaGeojson 
            id="normal"
            titulo="Capa normal"
            :renderizarComoImagen="true"
            :datos="puntos"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            :visible="false"
            
            />
            
        </DaiMapa>
</DaiTarjetaContenedorMapa>
```

```javascript
export default {
    data:function(){
        return {
            puntos : { "type": "FeatureCollection","features":[]},
            malla_visible:true
        }
    },
    mounted:function(){
        const url ='/large_dataset.geojson'
        fetch(url).then(response=>response.json()).then(data=>{
            this.puntos=data 
        })
    }
}
```