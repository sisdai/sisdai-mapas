# Texturas sistema de diseño

## Diagonales 1

<texturas-sd-diagonales-1/>

```html
<dai-tarjeta-contenedor-mapa>
    <template #header>
        <div>
            <p>Da lick en el boton para alternar la textura</p>
            <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                {{usarTexturas?'quitar texturas':'poner texturas'}}
            </button>
        </div>
                

        <dai-leyenda-mapa para="estados1"  />
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
        <dai-capa-geojson 
        id="estados1"
        :url="$withBase('/sample-edos.geojson')"
        :reglas-estilo-capa="{
            clasificacion:'cortes-naturales',
            columna : 'pob18ymas',
            clases:5,
        }"
        :estilo-capa="{
            stroke:{color:usarTexturas?'gray':'lightgray',width:1}
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'#2171b5',
            pattern:'hatch',
            angle:135,
            
        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```


## Diagonales 2

<texturas-sd-diagonales-2/>

```
estiloTexturaRelleno="{
            color:'#2171b5',
            pattern:'hatch',
            angle:45,
            
        }"
```


## Lineas verticales

<texturas-sd-lineas-verticales/>

```
estiloTexturaRelleno="{
            color:'#2171b5',
            pattern:'hatch',
            angle:0,
            
        }"
```

## Lineas horizontales

<texturas-sd-lineas-horizontales/>

```
estiloTexturaRelleno="{
            color:'#2171b5',
            pattern:'hatch',
            angle:90,
            
        }"
```

## Puntos

<texturas-sd-puntos/>

```html
<dai-tarjeta-contenedor-mapa>
    <template #header>
        <div>
            <p>Da lick en el boton para alternar la textura</p>
            <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                {{usarTexturas?'quitar texturas':'poner texturas'}}
            </button>
        </div>            
        <dai-leyenda-mapa para="estados1"  />
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
        <dai-capa-geojson 
        id="estados1"
        :url="$withBase('/sample-edos.geojson')"
        :reglas-estilo-capa="{
            clasificacion:'cortes-naturales',
            columna : 'pob18ymas',
            clases:5,
        }"
        :estilo-capa="{
            stroke:{color:usarTexturas?'gray':'lightgray',width:1}
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'#2171b5',
            pattern:'dot'
            
        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

## Entramado

<texturas-sd-entramado/>

```
:estiloTexturaRelleno="{
        color:'#2171b5',
        pattern:'cross'
                    
    }"
```

## Cruces

<texturas-sd-cruces/>

```
:estiloTexturaRelleno="{
        color:'#2171b5',
        pattern:'crosses'
        
    }"
```

## Coropleta textura diferentes (categoría)

Uso de diferentes texturas en el mismo valor de grosor Ejemplo: puntos 2, cruces 2, línea horizontal 2, línea vertical 2.
<texturas-sd-ejemplo-1/>


```html
<dai-tarjeta-contenedor-mapa>
    <template #header>
        <div>
            <p>Da lick en el boton para alternar la textura</p>
            <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                {{usarTexturas?'quitar texturas':'poner texturas'}}
            </button>
        </div>
        <dai-leyenda-mapa para="estados1"  />
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
        <dai-capa-geojson 
        id="estados1"
        :url="$withBase('/sample-edos.geojson')"
        :reglas-estilo-capa="{
            clasificacion:'categorias',
            columna : 'grado_marg',
            acomodoCategorias : ['Muy bajo','Bajo','Medio','Alto','Muy alto', 'otra'],
            colores:'Dark2'
        }"
        :estilo-capa="{
            stroke:{color:usarTexturas?'gray':'lightgray',width:1}
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'#1F5D50',
            size:1,
            spacing:7
        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```


## Coropleta y disco (cantidad doble 2 categorías)

<texturas-sd-ejemplo-2/>


```html
<dai-tarjeta-contenedor-mapa>
    <template #header>
        <div>
            <p>Da lick en el boton para alternar la textura</p>
            <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                {{usarTexturas?'quitar texturas':'poner texturas'}}
            </button>
        </div>
        <dai-leyenda-mapa para="estados1"  />
        <dai-leyenda-mapa para="estados_c"  />
    </template>
    <dai-mapa
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados1"
        :url="$withBase('/sample-edos.geojson')"
        :reglas-estilo-capa="{
            clasificacion:'cortes-naturales',
            columna : 'pob18ymas',
            clases:5,
        }"
        :estilo-capa="{
            stroke:{color:usarTexturas?'gray':'lightgray',width:1}
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'#1F5D50',
            pattern:'hatch',
            angle:0,
        }"
        />
        <dai-capa-geojson 
        id="estados_c" 
        titulo="Estados con titulo"
        :url="$withBase('/centroides-estados.geojson')"
        :reglas-estilo-capa="{
            clasificacion:'cuantiles',
            columna : 'estados_pob18ymas_urbano',
            propiedadObjetivo: 'relleno',
            colores:'YlGn'
        }"
        :estilo-capa="{
            circle:{
                radius:13,
                stroke:{color:'#022562',width:usarTexturas?3:1}
            }
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'#022562',
            pattern:'dot',
            fill:{color:'#DFC9A1'}
        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```
## Disco (con dos clasificaciones, categoría y cantidad)

<texturas-sd-ejemplo-3/>


```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>
        <div>
            <p>Da lick en el boton para alternar la textura</p>
            <button @click="usarTexturas=!usarTexturas" class="dai-map-button">
                {{usarTexturas?'quitar texturas':'poner texturas'}}
            </button>
        </div>
        <dai-leyenda-mapa
        :para="['estados2']"
        :mostrar-boton-alterna-todos="true"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
        <dai-capa-geojson 
        id="estados2" 
        :url="$withBase('/centroides-estados.geojson')"
        :reglas-estilo-capa="[
            {
                clasificacion:'categorias',
                columna : 'estados_grado_marg',
                acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
                propiedadObjetivo: 'relleno',
                colores:'Reds'
            },
            {
                clasificacion:'cuantiles',
                columna:'estados_pob18ymas_rural',
                propiedadObjetivo:'proporcion',
                proporciones:[5,8,12,15],
                clases:4,
                tituloVariable:'Cantidad de problación'
            }
        ]"
        :estilo-capa="{
            circle:{
                stroke:{color:usarTexturas?'#022562':'white',width:usarTexturas?3:1},
                radius:1,
                fill:{color:'white'}
            }
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'#022562',
            size:1.5,
            spacing:4,
            fill:{color:'#DFC9A1'}
        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```