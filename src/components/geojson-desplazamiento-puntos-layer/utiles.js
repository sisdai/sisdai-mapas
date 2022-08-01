import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { Circle as CircleStyle, Fill, Stroke, Style, Text } from "ol/style";
import Point from "ol/geom/Point";
import Feature from "ol/Feature";

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

export const HacerGalleta = (clusters, pix, pointRadius) => {
    const sourceGalleta = new VectorSource({});
    pointRadius = pointRadius + 3;

    clusters.forEach(cluster => {
        // datos del feature
        const center = cluster.get("geometry").flatCoordinates;

        // param
        // const pointRadius = 8;
        var featuresNuevos = [];

        const features = cluster.get("features");
        var r = pix * pointRadius * (0.5 + features.length / 4),
            a,
            p;

        features.forEach((feature, i) => {
            a = (2 * Math.PI * i) / features.length;
            if (features.length == 2 || features.length == 4) a += Math.PI / 4;
            p = [center[0] + r * Math.sin(a), center[1] + r * Math.cos(a)];
            const newFeature = feature.clone();
            newFeature.setGeometry(new Point(p));
            featuresNuevos.push(newFeature);
        });
        sourceGalleta.addFeatures(featuresNuevos);
    });
    return sourceGalleta;
};
