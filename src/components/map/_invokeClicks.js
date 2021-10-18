import VectorSource from 'ol/source/Vector';

/**
 * Invocar el mostrar/ocultar los tooltips dentro del mapa
 * @param {Map} map objeto mapa de Open Layers
 * @param {*} e evento
 */
 
 export const invoke_clicks = (map, e, component) => {
    
    const hightlight_on_click = (feature) => {
        if (feature !== component.VM_highlight_feature) {
            if (component.VM_highlight_feature) {
                component.VM_highlight_feature.set("_hightlight", false);
            }
            if (feature) {
                feature.set("_hightlight", true);
            }
            component.VM_highlight_feature = feature;
        }
    }

    var pixel = map.getEventPixel(e.originalEvent);
    var hit = map.hasFeatureAtPixel(pixel);

    let capas_con_popup = map.getLayers().getArray().filter(item=>item.get("_popup")!=undefined).map(item2=>item2.get("id"))
    
    let popup_overlay = map.getOverlayById("popup")
    //let tooltipelement = document.getElementById("fixed-tooltip-content");
    if (hit) {
        var f_l = map.forEachFeatureAtPixel(pixel, function (feature, layer) {
            return [feature, layer];
        });

        if (f_l) {
            var layer = f_l[1];
            var feature = f_l[0];

            let id = layer.get("id")
            //console.log(id,"el layer id")
            component.cmpLayers[id].$emit("click_feature",f_l)
            //Si es necesario acercar cuando el usuario da click
            if(component.cmpLayers[id].zoomAlDarClick){
                hightlight_on_click(feature)
                if(feature.getGeometry().getType()=="Point"){
                    if(feature.get("features") && feature.get("features").length > 1){//es una capa de puntos agrupados
                        const vSource = new VectorSource({
                            features:feature.get("features")
                        })
                        map.getView().fit(vSource.getExtent(),{duration:500,padding:[25,25,25,25]})
                    }else{
                        map.getView().animate({center:feature.getGeometry().getCoordinates(),zoom:13.5,duration:500})
                    }
                    
                }else{
                    map.getView().fit(feature.getGeometry(),{duration:500,padding:[25,25,25,25]})
                }
            }
            
            

            
            if (capas_con_popup.includes(layer.get("id")) &&  layer.get("_popup")!=undefined ) {
                //hightlight_on_hover(f_l[0]);
                //if (layers[layer.get("name")].highlight_accessor != undefined) {
                //    layers[layer.get("name")].highlight_accessor(f_l[0])
                //}

                let contenido = layer.get("_popup")
                if(typeof contenido == "function"){
                    contenido = contenido(feature.getProperties())
                }

                //console.log(contenido,"es lo que acaba de pasar, este es el contenido a mandar en el popup")

                let ext = map.getView().calculateExtent();
                let x3 = (ext[0] + ext[2]) / 2;
                let y3 = (ext[1] + ext[3]) / 2;
                if(feature.getGeometry().getType()=="Point"){
                    popup_overlay.setPosition(feature.getGeometry().getCoordinates())
                }else{
                    popup_overlay.setPosition([e.coordinate[0], e.coordinate[1]])
                }
                
                //console.log(feature.getGeometry().getType())
                //popup_overlay.setPosition(feature.getGeometryName())
                        //console.log(x3,e.coordinate[0])
                if (e.coordinate[0] > x3) {
                        popup_overlay.getElement().classList.remove("ol-popup-right");
                        popup_overlay.getElement().classList.add("ol-popup-left");
                } else {
                        popup_overlay.getElement().classList.remove("ol-popup-left");
                        popup_overlay.getElement().classList.add("ol-popup-right");
                }
                if (e.coordinate[1] > y3) {
                        popup_overlay.getElement().classList.remove("ol-popup-top");
                        popup_overlay.getElement().classList.add("ol-popup-bottom");
                } else {
                        popup_overlay.getElement().classList.remove("ol-popup-bottom");
                        popup_overlay.getElement().classList.add("ol-popup-top");
                }
                popup_overlay.getElement().querySelector(".content").innerHTML = contenido

                //componente.toltipcontent = componente._fn_tooltip(f_l[0].getProperties());
            } else {
                popup_overlay.setPosition(undefined)
                //tooltipelement.classList.remove("show")
            }
            
        } else {

            popup_overlay.setPosition(undefined)
            //tooltipelement.classList.remove("show")
        }
    } else {
        popup_overlay.setPosition(undefined)
        //tooltipelement.classList.remove("show")
    }
}