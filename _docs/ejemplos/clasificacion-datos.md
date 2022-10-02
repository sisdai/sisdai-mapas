# Clasificacion de datos

## Categorias

<clasificacion-1-categorias />

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <dai-leyenda-mapa        
        :para="['estados2']"
        :mostrar-boton-alterna-todos="true"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados2" 
        url="/centroides-estados.geojson"
        :reglas-estilo-capa="{
            clasificacion:'categorias',
            columna : 'estados_grado_marg',
            acomodoCategorias:['Muy bajo','Bajo','Medio','Alto','Muy alto'],
            propiedadObjetivo: 'relleno',
            colores:'Reds'
        }"
        />
        
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

## Cuantiles
<clasificacion-2-cuantiles />

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <dai-leyenda-mapa
        :para="['estados2']"
        :mostrar-boton-alterna-todos="true"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados2" 
        url="/centroides-estados.geojson"
        :reglas-estilo-capa="{
            clasificacion:'cuantiles',
            columna : 'estados_pob18ymas',
            propiedadObjetivo: 'proporcion',
            clases:4,
            proporciones:[4,8,12,16]
        }"
        />
        
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

## Linear o de intervalos iguales
<clasificacion-3-linear />

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <dai-leyenda-mapa
        :para="['estados2']"
        :mostrar-boton-alterna-todos="true"
        :coropletas-con-checkbox="true"
        />
    </template>
    <dai-mapa 
    :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
    >
        
        <dai-capa-geojson 
        id="estados2" 
        url="/sample-edos.geojson"
        :reglas-estilo-capa="{
            clasificacion:'linear',
            columna : 'pob18ymas',
            propiedadObjetivo: 'relleno',
            clases:5,
            colores:'Blues'
        }"
        />
        
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```


## Cortes naturales


<clasificacion-4-cortes-naturales />

```html
<dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <dai-leyenda-mapa
                :para="['estados2']"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados2" 
                :url="$withBase('/sample-edos.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'cortes-naturales',
                    columna : 'pob18ymas',
                    propiedadObjetivo: 'relleno',
                    clases:5,
                    colores:'OrRd'
                }"
                />
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
```


## Categorias incompletas en los datos

Cuando una categoria se quiera representar en leyenda, pero dicha categoria no necesariamente se encuentra en los datos, podra agregarse en la propiedad `acomodoCategorias`

<clasificacion-7-categorias-incompletas />

```html
<template>
    <div class="another-map">
        <dai-tarjeta-contenedor-mapa>
            <template v-slot:header>  
                <dai-leyenda-mapa
                :para="['estados_c']"
                :mostrar-boton-alterna-todos="true"
                />
            </template>
            <dai-mapa 
            :extension="[-118.365119934082,14.5320978164673,-86.7104034423828,32.7186546325684]" 
            >
                
                <dai-capa-geojson 
                id="estados_c" 
                titulo="Estados con titulo"
                :url="$withBase('/centroides-estados.geojson')"
                :reglas-estilo-capa="{
                    clasificacion:'categorias',
                    columna : 'estados_grado_marg',
                    acomodoCategorias:['Muy bajo','Bajo','Categoria gris que no esta en datos','Medio','Alto','Muy alto'],
                    propiedadObjetivo: 'relleno',
                    colores: ['red','black', 'gray','yellow','green','orange']
                }"
                />
                
            </dai-mapa>
        </dai-tarjeta-contenedor-mapa>
    </div>
</template>
```
