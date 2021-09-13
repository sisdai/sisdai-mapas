# Tarjeta contenedor

## Agregando un encabezado

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <h3>Titulo del mapa</h3> 
        <!--aqui puede ir cualquier html y/o componente-->
    </template>
    <dai-mapa>
        <dai-capa-xyz/>
    </dai-mapa>
</dai-tarjeta-contenedor-mapa>
```

<tarjeta-contenedor-1-only-header />




## Agregando un footer

```html
<dai-tarjeta-contenedor-mapa>
    <template v-slot:header>  
        <!--cualquier contenido-->
        </template>
    <dai-mapa>
        <dai-capa-xyz/>
    </dai-mapa>
    <template v-slot:footer>  
        <!--cualquier contenido-->
    </template>
</dai-tarjeta-contenedor-mapa>
```

<tarjeta-contenedor-2-header-footer />


## Opciones de tarjeta al colapsar
Con las siguientes opciones se puede administrar el tamaño estado de la tarjeta y etiquetas de colapso

```html
<dai-tarjeta-contenedor-mapa
 :colapsada="false"
 altura-colapsada="300px"
 etiqueta-colapso="Abrir"
 etiqueta-no-colapso="<strong>Cerrar</strong>"
 >
    <template v-slot:header>  
        <!--cualquier contenido-->
        </template>
    <dai-mapa>
        <dai-capa-xyz/>
    </dai-mapa>
    <template v-slot:footer>  
        <!--cualquier contenido-->
    </template>
</dai-tarjeta-contenedor-mapa>
```

<tarjeta-contenedor-3-opciones />

## No permitir el colapso
Con la propiedad `permitir-colapso` se puede quitar esa funcion

```html
<dai-tarjeta-contenedor-mapa
 :permitir-colapso="false"
 >
    <template v-slot:header>  
        <!--cualquier contenido-->
        </template>
    <dai-mapa>
        <dai-capa-xyz/>
    </dai-mapa>
    <template v-slot:footer>  
        <!--cualquier contenido-->
    </template>
</dai-tarjeta-contenedor-mapa>
```

<tarjeta-contenedor-4-opciones />

## Llenar espacio disponible
Cuando nuestra tarjeta debe tener un ancho, alto especifico (al estar en su estado de no-colapso) y cuando los elementos no alcancen a llenar la tarjeta convendra usar la propiedad  `llenar-espacio-disponible-con-mapa`.

En el ejemplo la clase `full-height` aplicada a la tarjeta dejara la tarjeta de un alto especifico al estar "no-colapsada", presiona el boton  _alterna 'llenar-espacio...'_ para ver la diferencia.

Aun asi siempre sera posible asignar una clase a `<dai-mapa>` para definir su tamaño si se requiere que sea estatico


<tarjeta-contenedor-5-mapa-espacio-disponible />

```html
<button @click="permite_colapso=!permite_colapso">
    alterna 'permitir-colapso'
</button>
<button @click="llena_espacio=!llena_espacio">
    alterna 'llenar-espacio...'
</button>
<hr>
<dai-tarjeta-contenedor-mapa
 :permitir-colapso="permite_colapso"
 :llenar-espacio-disponible-con-mapa="llena_espacio"
 class="full-height"
 >
    <template v-slot:header>  
        <!--cualquier contenido-->
        </template>
    <dai-mapa>
        <dai-capa-xyz-osm/>
    </dai-mapa>
    <template v-slot:footer>  
        <!--cualquier contenido-->
    </template>
</dai-tarjeta-contenedor-mapa>
```

```javascript
export default {
    data:function(){
        return {
            permite_colapso:false,
            llena_espacio : true
        }
    }
}
```

```css
.full-height{
    height: 80vh;
}
```


## Redistribucion del diseño en Desktop

La tarjeta contenedor cuenta con una propiedad para definir si el mapa se distribuira de manera diferente en las pantallas mas anchas: `es-version-escritorio-en-pantalla-larga`, con esta propiedad definida en `true` automaticamente el header y el footer se acomodas del lado lateral del mapa.



<a href="./tarjeta-contenedor/desktop-version.html" target="_blank">Ve ejemplo aqui</a>