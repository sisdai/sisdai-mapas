import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import Point from "ol/geom/Point";

export const createGeojsonSourceFromObjectJs = JsObject => {
    if (typeof JsObject != "object") {
        return new VectorSource({});
    }

    return new VectorSource({
        features: new GeoJSON().readFeatures({ ...JsObject })
    });
};

export const createGeojsonSourceFromUrl = url => {
    return new VectorSource({
        url: url,
        format: new GeoJSON()
    });
};

export const styleClusterGenerico = size =>
    new Style({
        image: new CircleStyle({
            radius: size + 5,
            stroke: new Stroke({
                color: "#fff"
            }),
            fill: new Fill({
                color: "#3399CC"
            })
        }),
        text: new Text({
            text: size.toString(),
            fill: new Fill({
                color: "#fff"
            })
        })
    });

export const styleClusterNoVisible = () =>
    new Style({
        image: new CircleStyle({
            radius: 0
        })
    });

export const HacerGalleta = (clusters, pix, pointRadius, metodoUbicacion) => {
    const sourceGalleta = new VectorSource({});

    clusters.forEach(cluster => {
        sourceGalleta.addFeatures(
            metodosDeUbicacion[metodoUbicacion](
                cluster.get("geometry").flatCoordinates,
                cluster.get("features"),
                pix,
                pointRadius
            )
        );
    });
    return sourceGalleta;
};

const metodosDeUbicacion = {
    anillo: (centro, features, pix, pointRadius) => {
        pointRadius = pointRadius + 3;
        // const pointRadius = 8;
        var featuresNuevos = [];
        var r, a, p;
        r = pix * pointRadius * (0.5 + features.length / 4);

        features.forEach((feature, i) => {
            a = (2 * Math.PI * i) / features.length;
            if (features.length == 2 || features.length == 4) a += Math.PI / 4;
            p = [centro[0] + r * Math.sin(a), centro[1] + r * Math.cos(a)];
            const newFeature = feature.clone();
            newFeature.setGeometry(new Point(p));
            featuresNuevos.push(newFeature);
        });

        return featuresNuevos;
    },
    espiral: (centro, features, pix, pointRadius) => {
        pointRadius = pointRadius + 1;
        var featuresNuevos = [];
        // Ángulo inicial
        var r, a, p;
        a = 0;
        var d = 2 * pointRadius;

        features.forEach(feature => {
            // New radius => increase d in one turn
            r = d / 2 + (d * a) / (2 * Math.PI);
            // Angle
            a = a + (d + 0.1) / r;
            var dx = pix * r * Math.sin(a);
            var dy = pix * r * Math.cos(a);
            p = [centro[0] + dx, centro[1] + dy];
            const newFeature = feature.clone();
            newFeature.setGeometry(new Point(p));
            featuresNuevos.push(newFeature);
        });

        return featuresNuevos;
    },
    cuadricula: (centro, features, pix, pointRadius) => {
        var featuresNuevos = [];
        features.forEach(feature => {});
        return featuresNuevos;
    },
    "anillos-consentricos": (centro, features, pix, pointRadius) => {
        var featuresNuevos = [];
        features.forEach(feature => {});
        return featuresNuevos;
    }
};
