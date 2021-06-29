import generateOlStyle, {serializedStyleIfHighlight,fixSerializedStyleIfIncomplete} from "./_json2olstyle"

import GeoJSON from 'ol/format/GeoJSON';

export const DEFAULT_FILL_COLOR="gray"
export const DEFAULT_STROKE_COLOR="white"

export default{
    props:{
        /**  Url de la fuente de datos, sea csv, geojson o kml por ejemplo */
        url:{
            type:String,
            default:""
        },
        /** 
         * Objetos que se convertiran en feature, dependera del tipo de capa la estructura que estos deben tener 
         * (si esta definido source, url se ignora )
         * */
        datos:{
            type:[Array,Object],
            default: undefined
        },
        /** contenido del tooltip al pasar el hover, puede ser una funcion que accede a las propiedades del feature o un texto estatico */
        contenidoTooltip:{
            type:[Function,String],
            default:"none"
        },
        /** contenido del popup al clickear el feature, puede ser una funcion que accede a las propiedades del feature o un texto estatico */
        contenidoPopup:{
            type:[Function,String],
            default:"none"
        },
        tooltipEstatico:{
            type:Boolean,
            default: false
        },
        tooltipEstaticoMargenSuperior:{
            type: Number,
            default: 0
        },
        zoomAlDarClick:{
            type: Boolean,
            default:true
        },
        estiloCapa:{
            type: [Object,Function],
            default:function(){
                return {
                    fill:{
                        color:DEFAULT_FILL_COLOR
                    },
                    stroke:{
                        width:1,
                        color:DEFAULT_STROKE_COLOR // "scale["color"]"
                    },
                    circle:{
                        fill: {
                            color: DEFAULT_FILL_COLOR
                        },
                        stroke: {
                            color: DEFAULT_STROKE_COLOR,
                            width: 1
                        },
                        radius: 7
                    }
                }
            }
        },
        estiloRealce: {
            type : Object,
            default:function(){
                return {
                    style:{
                        stroke:{
                            color: "black",
                            width: 3
                        },
                        zIndex:3,
                        _simple_point:{
                            stroke: {
                                color: "black",
                                width: 2
                            }
                        }
                    }
                }
            }
        }
    },
    data:function(){
        return {
            VM_mapStyle:undefined,
            VM_allFeatures:[]
        }
    },
    created:function(){

        //console.log("llgamos aqui")
        this.VM_mapStyle = this.estiloCapa
    },
    methods:{
        _setStyle:function(){
            let style;
            let vm = this;
            let colorsLegend={fill:"gray", stroke:"gray"}
            if (typeof vm.VM_mapStyle == "function"){
                style= function(feature){
                    let serializes= fixSerializedStyleIfIncomplete( vm.VM_mapStyle(feature) )
                    serializes = feature.get("_hightlight") == true ? serializedStyleIfHighlight(serializes,vm.estiloRealce): serializes ;
                    let olstyles=generateOlStyle(serializes)["style"]
                    return olstyles
                }
            }else{
                let serializes= fixSerializedStyleIfIncomplete( vm.VM_mapStyle )
                console.log("//AQUI VERIFICAR TAMBIEN QUE SHAPE SE VA A LA LEYENDA",serializes)
                colorsLegend.fill = serializes["style"].fill !=undefined ? serializes["style"].fill.color : 'gray'
                colorsLegend.stroke = serializes["style"].stroke != undefined ? serializes["style"].stroke.color : 'gray'
                style= function(feature){
                    
                    let serializes2 = feature.get("_hightlight") == true ? serializedStyleIfHighlight(serializes,vm.estiloRealce): serializes ;
                    let olstyles=generateOlStyle(serializes2)["style"]
                    
                    
                    return olstyles
                }
            }
            this.olLayer.setStyle(style)

            /**
             * poner informacion en la leyenda cuando no es clasificable el layer
             */
            if(!this.VM_is_classified){
                //agregando informacion para la leyenda
                this.VM_legend_info = {
                    type: "legend-normal-vector",
                    content:{
                        fill_color: colorsLegend.fill,
                        stroke_color: colorsLegend.stroke,
                        shape: "circle", // circle, square,  triangle, line, etc,  tambien el url del svg que se desee insertar
                        //shape: "svg:ruta/alsvg",
                        title:this.VM_title
                    }
                }
                this.VM_legend_info_status = "ready"
                this.$emit("legend_info_ready",this.VM_legend_info)    
            }
            
        },
        _saveAllFeaturesFromSource:function(vectorSource){
            let geojsonFormat = new GeoJSON()
            if(vectorSource.getFeatures().length>1){
                this.VM_allFeatures = geojsonFormat.writeFeatures( vectorSource.getFeatures() )
                return
            }
            console.log("---AQUI ESPERAR LAS FEATURES EN VM_allfeatures")
            let listenerFn = (evento)=>{
                console.log(evento,"---AQUI GUARDAR LAS FEATURES EN VM_allfeatures")
            }
            vectorSource.on("featuresloadend",listenerFn)
        }
    }
}