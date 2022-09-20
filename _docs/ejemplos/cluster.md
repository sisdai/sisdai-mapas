# Cluster

## Cluster basico

<cluster-1-basico />

```html
<DaiMapa>
    <DaiCapaXyz />
    <DaiCapaGeojson 
    id="sin-cluster"
    titulo="Capa sin cluster"
    :url="$withBase('/centroides-estados.geojson')"
    :estilo-capa="{
        circle:{
            fill:{color:'white'},
            stroke:{color:'black',width:1},
            radius:4
        }
    }"
    />
    <DaiCapaGeojsonCluster 
    id="cluster-basico"
    titulo="Capa con cluster"
    :url="$withBase('/centroides-estados.geojson')"
    :estilo-capa="{
        circle:{
            fill:{color:'red'},
            stroke:{color:'black',width:1},
            radius:6
        }
    }"
    />
</DaiMapa>
```

## Cluster con numero

<cluster-2-con-numero />


```html
<DaiMapa>
    <DaiCapaXyz />
    <DaiCapaGeojsonCluster 
    id="cluster-basico"
    titulo="Capa con cluster"
    :url="$withBase('/centroides-estados.geojson')"
    :estilo-capa="{
        circle:{
            fill:{color:'red'},
            stroke:{color:'black',width:1},
            radius:9
        },
        textStyle:{
            text:'-',
            fill:{color:'white'}
        }
    }"
    :usarTexturasEnRelleno="false"
    :props-asigna-estilo="['textStyle.text']"
    :fn-asigna-estilo="(f)=>[f.features.length.toString()]"
    />
</DaiMapa>
```


## Cluster con tamaño y numeros

<cluster-3-tamanos-y-numero />

```html
<DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['cluster-basico','sin-cluster']"/>
        </template>
        <DaiMapa>
            <DaiCapaXyz />
            <DaiCapaGeojson 
            id="sin-cluster"
            titulo="Capa sin cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            />
            <DaiCapaGeojsonCluster 
            id="cluster-basico"
            titulo="Capa con cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'red'},
                    stroke:{color:'black',width:1},
                    radius:5
                },
                textStyle:{
                    text:'-',
                    fill:{color:'white'}
                }
            }"
            :usarTexturasEnRelleno="false"
            :props-asigna-estilo="['textStyle.text', 'circle.radius']"
            :fn-asigna-estilo="(f)=>[
                f.features.length.toString(), 
                f.features.length + 5
            ]"
            />
        </DaiMapa>
</DaiTarjetaContenedorMapa>
```

## Cluster con tamaños, desde las reglas de clasificacion

<cluster-4-cluster-clasificado />

```html
<template>
    <DaiTarjetaContenedorMapa>
        <template #header>
            
            <DaiLeyendaMapa :para="['cluster-clasificado','sin-cluster']"/>
        </template>
        <DaiMapa>
            <DaiCapaXyz />
            <DaiCapaGeojson 
            id="sin-cluster"
            titulo="Capa sin cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :estilo-capa="{
                circle:{
                    fill:{color:'white'},
                    stroke:{color:'black',width:1},
                    radius:4
                }
            }"
            />
            <DaiCapaGeojsonCluster 
            id="cluster-clasificado"
            titulo="Capa con cluster"
            :url="$withBase('/centroides-estados.geojson')"
            :reglas-estilo-capa="{
                clasificacion:'linear',
                columna:'features_count',
                propiedadObjetivo: 'proporcion',
                clases:4,
                proporciones:[4,8,12,16]
            }"
            :estilo-capa="{
                circle:{
                    fill:{color:'green'}
                }
            }"
            />
        </DaiMapa>
    </DaiTarjetaContenedorMapa>
</template>
```