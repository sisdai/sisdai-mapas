# Capas

## dai-capa-xyz

Capa de mosaicos xyz, consume servicios que dentro del ulr incluyen el nivel de zoom y la coordenada x/y de una imagen (mosaico), regularmente se usa para desplegar mapas base como los de OSM, ESRI, etc.

### Uso 

```html{2}
<dai-mapa>
    <dai-capa-xyz url="https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png"/>
</dai-mapa>
```

### Propiedades

**Las propiedades y metodos extienden de [Mixin layer](#mixin-layer)**, ademas de las siguientes:
#### url

- Type: `String``
- Default: `https://{a-c}.basemaps.cartocdn.com/rastertiles/light_nolabels/{z}/{x}/{y}.png`

El url del servicio de mapa xyz, por default muestra el servicio de [Carto](https://carto.com/) en estilo claro y sin etiquetas.

## dai-capa-osm

Esta capa tiene la misma finalidad que `dai-capa-xyz`, solo es un atajo para mostrar el mapa base de OSM sin definir el url

### Uso

```html{2}
<dai-mapa>
    <dai-capa-osm/>
</dai-mapa>
```

### Propiedades

**Las propiedades y metodos extienden de [Mixin layer](#mixin-layer)**
## dai-capa-geojson

Componente de capa que despliega capas en formato [geojson](https://geojson.org/)

### Uso

```html{2}
<dai-mapa>
    <dai-capa-geojson url="path/to/file.geojson"/>
<dai-mapa/>
```

o

```html{2}
<dai-mapa>
    <dai-capa-geojson :datos="variable_objetos_json"/>
<dai-mapa/>
```
### Propiedades

**Las propiedades y metodos extienden de [Mixin layer](#mixin-layer) , [Mixin vector-layer](#mixin-vector-layer) y [Mixin clasificable-layer](#mixin-clasificable-layer )**, y sobreescribe las siguientes:

#### url

- Type: `String`
- Default: `undefined`

El url del archivo [geojson](https://geojson.org/), puede ser externo o relativo  a las carpetas del proyecto.

#### datos
- Type: `Object` | `Array<Object>`
- Default `undefined`

Objeto o array de objetos en formato [geojson](https://geojson.org/) para pasar a la capa del mapa. Si se define, la propiedad `url` se ignora.


## dai-capa-geojson-cluster
Componente de capa para desplegar una agrupacion de puntos apartir de datos en formato [geojson](https://geojson.org/).
### Uso

```html{2}
<dai-mapa>
    <dai-capa-geojson-cluster url="path/to/file.geojson"/>
<dai-mapa/>
```

o

```html{2}
<dai-mapa>
    <dai-capa-geojson-cluster :datos="variable_objetos_json"/>
<dai-mapa/>
```
### Propiedades

**Las propiedades y metodos extienden de [Mixin layer](#mixin-layer) , [Mixin vector-layer](#mixin-vector-layer) y [Mixin clasificable-layer](#mixin-clasificable-layer )**, y sobreescribe las siguientes:

#### url

- Type: `String`
- Default: `undefined`

El url del archivo [geojson](https://geojson.org/), puede ser externo o relativo  a las carpetas del proyecto.

#### datos
- Type: `Object` | `Array<Object>`
- Default `undefined`

Objeto o array de objetos en formato [geojson](https://geojson.org/) para pasar a la capa del mapa. Si se define, la propiedad `url` se ignora.


## dai-capa-geojson-puntos-desplazados
Componente de capa que utiliza el formato [geojson](https://geojson.org/) como entrada de datos, crea grupos de puntos, cercanos o que tienen la misma ubicación, y los coloca alrededor del baricentro de cada grupo.

### Uso

```html{2}
<dai-mapa>
    <dai-capa-geojson-puntos-desplazados url="path/to/file.geojson"/>
<dai-mapa/>
```

o

```html{2}
<dai-mapa>
    <dai-capa-geojson-puntos-desplazados :datos="variable_objetos_json"/>
<dai-mapa/>
```
### Propiedades

**Las propiedades y metodos extienden de [Mixin layer](#mixin-layer) , [Mixin vector-layer](#mixin-vector-layer) y [Mixin clasificable-layer](#mixin-clasificable-layer )**, y sobreescribe las siguientes:

#### url

- Type: `String`
- Default: `undefined`

El url del archivo [geojson](https://geojson.org/), puede ser externo o relativo  a las carpetas del proyecto.

#### datos
- Type: `Object` | `Array<Object>`
- Default `undefined`

Objeto o array de objetos en formato [geojson](https://geojson.org/) para pasar a la capa del mapa. Si se define, la propiedad `url` se ignora.

#### distancia
- Type: `Number`
- Default: `20`

Distancia en píxeles dentro de la cual se agruparán las entidades.
    
#### distanciaMinima
- Type: `Number`
- Default: `0`

Distancia mínima en píxeles entre clústeres. Se limitará a la distancia configurada. Por defecto no se garantiza una distancia mínima. Esta configuración se puede utilizar para evitar la superposición de iconos. Como compensación, la posición de la entidad del clúster ya no será el centro de todas sus entidades.
    
#### metodoDesplazamiento
- Type: `String`
- Default: `'anillo'`

El mapa toma los puntos que caen en una tolerancia de distancia dada entre sí (grupo) y los ubica alrededor de su baricentro siguiendo diferentes métodos de desplazamiento:
- `grid`: Coloca todas las características en un círculo cuyo radio depende de la cantidad de características a mostrar.
- `concentric-rings`: utiliza un conjunto de círculos concéntricos para mostrar las características.
- `espiral`: Crea una espiral con las características más alejadas del centro del grupo en cada turno.
- `grid`: Genera una grilla regular con un símbolo de punto en cada intersección.

#### radioPuntoCentro
- Type: `Number`
- Default: `6`

Radio del punto céntrico, utilizado para la distancia entre el punto céntrico y los puntos desplazados más cercanos.

#### radioPuntosDesplazados
- Type: `Number`
- Default: `6`

Radio de puntos desplazados, utilizado para la distancia entre cada punto desplazado.

#### delimitarGruposPor
- Type: `String`,
- Default: `undefined`

Si necesita delimitar los clústeres en función de alguna categoría, use el nombre de la columna con la que desea delimitar en el parámetro `delimiterField`.


## dai-capa-wms
Componenete para desplegar capas desde servicios wms publicos o privados.

### Uso

```html{2}
<dai-mapa>
    <dai-capa-wms url="geoserver.com/capa1" :parametros="{'LAYERS':'capa1'}" />
</dai-mapa>
```

### Propiedades
Propiedades y metodos extienden de [Mixin layer](#mixin-layer) y [Mixin image-layer](#mixin-image-layer )

#### url

- Type: `String`
- Default: `undefined`
- Required

El url del servicio wms

#### parametros

- Type: `Object`
- Default: `{}`
- Required

Opciones de conexion al servicio, parametros que pide el servidor de mapas, por ejemplo en geoserver:

```json
{
    "LAYERS": "nombre de las capas separadas por comas",
    "STYLES": "nombre de los estilos", 
    ...
}
```

## Mixin layer

### Propiedades

#### id
- Type: `String`
- Default: `''`

El identificador de la capa dentro del mapa, indispensable si la capa necesita ser identificada por algun control dentro del componente, por ejemplo la leyenda o el control de opacidad
#### visible
- Type: `Boolean`
- Default: `true`

Indica si la capa es visible dentro del mapa, es decir, que la capa este prendida o apagada.

#### z-index
- Type: `Number`
- Default: `undefined`

Indica la posicion respecto a otras capas, cuando se define un z-index mas alto respecto a las demas capas , esa capa se posicionara hasta enfrente.

#### opacidad
- Type: `Number`
- Default: `1`

Un valor que va de  0 a 1, para indicar la opacidad de la capa. 0 es totalmente invisible y 1 es la opacidad completa.

#### titulo
- Type: `String`
- Default: `''`

El titulo que se le asigna a la capa, puede ser util cuando algunos controles acceden a la capa para mostrar algo, el formato de titulo puede ser mejor para la presentacion por ejemplo en la leyenda.


## Mixin vector-layer

### Propiedades

#### estilo-capa
- Type: `Object`
- Default: 

```json
{
    "fill":{  //relleno
        "color": "gray" // representacion string del color o hexadecimal
    },
    "stroke":{ //contorno
        "color": "white", // representacion string del color o hexadecimal
        "width": 1  // tamaño en pixeles del contorno
    },
    "circle":{ //figura (solo aplica a geometrias punto)
        "fill":{ // relleno 
            "color": "gray"
        },
        "stroke":{ // contorno
            "color": "white",
            "width": 1
        }
    }
}
```

El estilo persistente de la capa, es decir el estilo que no esta enlazado a los datos, la key "circle" esta pensada para las capas de geometria tipo punto, tambien es posible usar una "square", "triangle" o "image" cuando se requiera poner un svg o un svg , revisar [estilos de capa](./estilos-capas.md), cuando la geometria es poligono o linea esta key se ignora.

La idea de esta propiedad es construir un objecto de estilo , tal y como se construira en [OpenLayers](https://openlayers.org/en/latest/apidoc/module-ol_style_Style-Style.html), pero sin instanciar las clases. Por lo tanto todas los parametros que requieren estas clases de estilo son validos en el json  de `estilo-capa`. Es por ello que esto:

```json
{
    "style":{
        "fill":{
            "color":"red"
        },
        "stroke":{
            "width":1,
            "color":"gray"
        }
    }
}
```

equivaldria a esto 

```javascript
 import { Fill, Stroke, Style} from 'ol/style';

new Style({
    fill: new Fill({
        color:'red'
    }),
    stroke: new Stroke({
        width: 1,
        color: 'gray'
    })
})
```

#### estilo-realce
- Type `object`
- Default 

```json
{
    "stroke":{
        "color": "black",
        "width": 3
    },
    "circle":{
        
        "stroke":{
            "color": "black",
            "width": 2
        }
    }
}
```
El estilo que se le asignara al seleccionar el poligono, punto o linea que el usuario de click, casi simpre va centrada a contornos pero puede aplicarse a cualquier propiedad del estilo



#### usar-texturas-en-relleno
- Type `Boolean`
- Default `false`

Se define si el relleno de las geometrias en el estilo tomaran la textura definida en el parametro `estilo-textura-relleno`

#### estilo-textura-relleno
- Type `Object` (Opciones de textura)
- Default 

```json
{
    "pattern":"hatch",
    "angle":45,
    "spacing":5,
    "color":"gray",
    "size":1
}
```

Las opciones para la textura que tomara si `usar-texturas-en-relleno = true`.  Se debe tener en cuenta que algunas propieades se reescriben si la capa usa una clasificacion de datos en la simbologia.

**Opciones disponibles**
- **pattern** : string. cualquiera de los siguientes valores hatch, cross, dot, circle, square, tile, woven, crosses, caps, nylon, hexagon, cementery, sand, brick, wave, clay
- **angle** : number. Angulo de inclinacion de la textura, en grados para `hatch` y 0-1 para ` cross, dot, circle, square, tile,` (solo los inclina en 45)
- **size**: number.  El tamaño de la unidad de la textura, solo aplica para *hatch, cross, dot, circle, square, tile*
- **spacing**: number.  Espaciado la unidad de la textura, solo aplica para *hatch, cross, dot, circle, square, tile*
- **color**: string. El color de la textura
- **fill**: object. el fondo de la textura , regularmente algo como `{"color":"red"}`
- **scale** number. Escala del patron (hacerlo mas grande o mas pequeño)

[Ejemplos](../ejemplos/texturas.md).


#### contenido-tooltip 
- Type `String`, `Function`
- Default `'none'`

El contenido del tooltip. Cuando esta propiedad no se define los tooltips se deshabilitan.

Tener en cuanta que el tooltip reacciona al evento de pasar el mouse sobre la geometria, el popup reacciona hasta que se da click.

Se admite contenido html para que el contenido del tooltip puede llegar con formato.

Cuando se define una función la funcion es un callback que accede a los datos de la capa, y regresa el contenido deseado para el tooltip. Y se ejecuta tantas veces como registros tenga la capa

Por ejemplo, si tenemos una capa de estados con una columna llamada "nombre_estado". Y quisieramos asignar al tooltip el nombre del estado para cada poligono, se definiria una función como la siguiente: `contenido-tooltip="(d)=>d['nombre_estado']"` .


#### tooltip-estatico 
- Type `Boolean`
- Default `false`

Indica si el tooltip se mantiene estatico al pasar el mouse sobre el, por default el tooltip solo aparece al pasar el mouse sobre el poligono/punto/linea y si se sale de ahí se retira , pero con esta opcion activada, al pasar el mouse sobre el punto/poligono/linea + el tooltip este se mantiene y solo cuando se sale de ambos el tooltip  desaparece.

#### tooltip-estatico-margen-superior 

- Type `Number`
- Default `0`

Cuando el tooltip es estatico, dependera del tipo de geometria (punto, poligono o linea), que tanto debe separarse o acercarce del punto de evento "hover" que desencadeno la abertura del tooltip. 

#### contenido-popup 

- Type `String`, `Function`
- Default `'none'`

El contenido del popup. Cuando esta propiedad no se define los popups se deshabilitan.

Tener en cuenta que el tooltip reacciona al evento de pasar el mouse sobre la geometria, el popup reacciona hasta que se da click.

#### zoom-al-dar-click

- Type `Boolean`
- Default `true`

Indica si al dar click en algun poligono/linea/punto el mapa debera hacer el acercamiento.


#### props-asigna-estilo
Lista de keys, de la propiedad `estilo-capa`, a las que se les puede reescribir el valor. Es requerido usar junto con `fn-asigna-estilo`. 

Pensemos en un caso de uso como el siguiente: *para dibujar un texto dentro de una geometria se debe definir dentro de la propiedad `estilo-capa` , pero como se necesita que ese texto dependa del dato del feature, necesitamos reescribirlo al vuelo*, para resolver esto,  dentro de `estilo-capa` se necesita contar con la propiedad `textStyle.text`, y dicha propiedad reescribirla segun los valores de cada feature de la capa.

```javascript
//pensemos que el campo cantidad del geojson tiene el texto que queremos dibujar arriba de la geometria

:props-asigna-estilo="['textStyle.text']"
:fn-asigna-estilo="(featureProps)=>[featureProps.cantidad]
```

Revisar ejemplo [estilos de capa](../ejemplos/cluster.md#cluster-con-numero).

Tambieen funciona para reescribir colores y tamaños, aunque no se mostrara el resultado final en leyenda. Para colores y tamaños se recomienda usar las clasificaciones de estilo basado en datos.


#### fn-asigna-estilo
Funcion que debe retornar el valor de las keys a reescribir dentro del  `estilo-capa`. Dichas keys se definen en `props-asigna-estilo`, importante que se retornen el numero de valores 

```javascript
:props-asigna-estilo="['fill.color','stroke.color']"
:fn-asigna-estilo="(f)=>[f.color_en_props, f.otro_color]"
```

#### url
[depende del tipo de capa]

#### datos
[depende del tipo de capa]



## Mixin classificable-layer

### Propiedades 

#### reglas-estilo-capa

- Type `Object`,`Array`
- Default `undefined`

Las reglas para definir el estilo basado en datos 

Acepta un objeto o un array de objetos con la siguiente estructura

- `clasificacion` Se define la clasificacion que se le hara
    - Type `String`
    - Default `'categorias'`
    - Valores posibles `categorias`, `cuantiles`, `linear`, `cortes-naturales`, `exponencial`, `logaritmica`
- `clases` El numero de clases para la clasificacion que se ejecutara, se omite si la clasificacion es por categorias
    - Type `Number`
    - Default    `5`    
- `columna` la columna dentro de la capa con la que se clasificara
    - Type `Number`
    - Default `5`
- `propiedadObjetivo` que propiedad dentro del estilo afectara
    - Type `String`
    - Default `'relleno'`
    - Valores posibles `relleno`,`proporcion`
- `colores` colores que se usaran para pintar la capa de acuerdo a la clasificación, requerida cuando *propiedadObjetivo*  es *relleno*. Acepta un string con el nombre de la escala de color, por ejemplo, las que se muestran en [Color Brewer](https://colorbrewer2.org/)
    - Type `String`,`Array`
    - Default `Blues`



## Mixin image-layer

### Propiedades

#### extent

- Type: `Array`
- Defaullt `undefined`

Extension (de coordenadas maximas u minimas en las que se desplegara la capa dentro del mapa )