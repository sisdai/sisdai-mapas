# Texturas

## Relleno simple

<texturas-1-relleno-texturas/>

```html
<dai-tarjeta-contenedor-mapa
:permitir-colapso="false"
>
    <template #footer>
        <div>
            <p>Da click para alternar la textura</p>
            <button @click="usarTexturas=!usarTexturas" class="dai-map-button">alternar textura</button>
        </div>

        <dai-leyenda-mapa :para="['estados2','estados_c']" />

    </template>
    <dai-mapa
        :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
        >
            <dai-capa-xyz/>
            <dai-capa-geojson 
            id="estados2"
            url="/sample-edos.geojson"
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
            <dai-capa-geojson 
            id="estados_c" 
            titulo="centroides"
            url="/centroides-estados.geojson"
            :estilo-capa="{
                circle:{
                    radius:12,
                    fill:{color:'blue'},
                    stroke:{color:usarTexturas?'black':'gray',width:1},
                },
            }"
            :usar-texturas-en-relleno="usarTexturas"
            :estiloTexturaRelleno="{
                color:'blue',
                pattern:'hatch',
                scale:.5,
                angle:45,
                fill:{color:'gray'}
            }"
            />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```


## Texturas en clasificacion

### Coropletas
<texturas-2-relleno-texturas-coropletas/>

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
        url="/sample-edos.geojson"
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
            angle:45,

        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>

```


### Categorias
<texturas-3-relleno-textura-categorias/>

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
        ya url="/sample-edos.geojson"
        :reglas-estilo-capa="{
            clasificacion:'categorias',
            columna : 'grado_marg',
        }"
        :estilo-capa="{
            stroke:{color:usarTexturas?'gray':'lightgray',width:1}
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'green',
            size:2,
            spacing:7
        }"
        />
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

### Simbolos graduados con dos clasificaciones

<texturas-4-relleno-texturas-puntos/>

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
                url="/centroides-estados.geojson"
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
                        stroke:{color:usarTexturas?'black':'white',width:1},
                        radius:1,
                        fill:{color:'white'}
                    }
                }"
                :usar-texturas-en-relleno="usarTexturas"
                />
                
            </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

### Puntos clasificados por relleno

<texturas-5-relleno-categorias-puntos/>


```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <dai-leyenda-mapa
        :para="['estados_c']"
        :mostrar-boton-alterna-todos="true"
        />
        <button @click="usarTexturas=!usarTexturas">alternar textura</button>
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados_c" 
        titulo="Estados con titulo"
        url="/centroides-estados.geojson"
        :reglas-estilo-capa="{
            clasificacion:'cuantiles',
            columna : 'estados_pob18ymas_urbano',
            acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
            propiedadObjetivo: 'relleno',
            colores:'Reds'
        }"
        :estilo-capa="{
            circle:{
                radius:10
            }
        }"
        :usar-texturas-en-relleno="usarTexturas"
        :estiloTexturaRelleno="{
            color:'red',
            pattern:'cross',
            scale:.5,
            fill:{color:'yellow'}
        }"
        />
        
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```


#### Puntos clasificados por tamaño
<texturas-6-relleno-tamanos-puntos/>


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
        :para="['estados_tamanos']"
        :mostrar-boton-alterna-todos="true"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        <dai-capa-xyz/>
        <dai-capa-geojson 
        id="estados_tamanos" 
        :url="$withBase('/centroides-estados.geojson')"
        :reglas-estilo-capa="[
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
                stroke:{color:usarTexturas?'black':'white',width:1},
                radius:1,
                fill:{color:'#4285f4'},
            }
        }"
        :usar-texturas-en-relleno="usarTexturas"
        />
        
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```