# Puntos desplazados

## Básico

<puntos-desplazados-1-basico />

```html
<DaiMapa>
    <DaiCapaXyz />
    <DaiCapaGeojson
        id="sin-cluster"
        titulo="Capa sin cluster"
        :url="$withBase('/centroides-estados.geojson')"
        :estilo-capa="{
          circle: {
            fill: { color: 'white' },
            stroke: { color: 'black', width: 1 },
            radius: 4,
          },
        }"
    />
    <DaiCapaGeojsonPuntosDesplazados
        id="desplazamiento-basico"
        titulo="Desplazamiento básico"
        :url="$withBase('/centroides-estados.geojson')"
        :distancia="80"
        :radioPuntoCentro="4"
        :radioPuntosDesplazados="4"
        :estilo-capa="{
          circle: {
            fill: { color: 'red' },
            stroke: { color: 'black', width: 1 },
            radius: 4,
          },
        }"
        tipoGeometria="Point"
    />
</DaiMapa>
```

## Metodos de desplazamiento

<puntos-desplazados-2-metodos />

```html{22}
<DaiTarjetaContenedorMapa :colapsada="false">
    <template #header>
        <p>Metodo de desplazamiento</p>
        <dai-selector-mapa v-model="metodoSeleccionado">
            <option
                v-for="metodo in metodosDesplazamiento"
                :value="metodo"
                :key="metodo"
            >
                {{ metodo }}
            </option>
        </dai-selector-mapa>
    </template>
    <DaiMapa>
        <DaiCapaXyz />

        <DaiCapaGeojsonPuntosDesplazados
            id="desplazamiento-basico"
            titulo="Desplazamiento básico"
            :url="$withBase('/centroides-estados.geojson')"
            :distancia="80"
            :metodoDesplazamiento="metodoSeleccionado"
            :radioPuntoCentro="4"
            :radioPuntosDesplazados="4"
            tipoGeometria="Point"
        />
    </DaiMapa>
</DaiTarjetaContenedorMapa>
```

## Estilos

Para lograr un estilo de colores en cada punto desplazado, centro y anillo, se recomienda utilizar los parámetros `propsAsignaEstilo` y `fnAsignaEstilo` de la siguiente manera:

```html{9,10}
<DaiCapaGeojsonPuntosDesplazados
    id="desplazamiento-basico"
    titulo="Desplazamiento básico"
    :url="$withBase('/centroides-estados.geojson')"
    :distancia="80"
    :metodoDesplazamiento="metodoSeleccionado"
    :radioPuntoCentro="4"
    :radioPuntosDesplazados="4"
    :propsAsignaEstilo="['circle']"
    :fnAsignaEstilo="fnAsignaEstilo"
    tipoGeometria="Point"
/>
```

```javascript
export default {
    methods: {
        fnAsignaEstilo(feature) {
            if (feature.ring) {
                // estilo para anillos
                return [
                    {
                        radius: feature.ring.radius,
                        stroke: { color: "back" },
                    },
                ];
            }

            if (feature.features && feature.features.length > 1) {
                // estilo para baricentro (centro del cluster)
                return [
                    {
                        fill: { color: "gray" },
                        radius: 4,
                    },
                ];
            }

            // estilo para puntos desplazados
            const punto = feature.features
                ? feature.features[0].getProperties()
                : feature;

            // console.log(punto.estados_grado_marg);
            return [
                {
                    fill: { color: `#${punto["cvegeo"]}a` },
                    radius: 4,
                    stroke: { color: "white" },
                },
            ];
        },
    },
};
```
