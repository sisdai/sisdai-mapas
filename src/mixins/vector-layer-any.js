import generateOlStyle, {serializedStyleIfHighlight,fixSerializedStyleIfIncomplete} from "./_json2olstyle"

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
        source:{
            type:[Array,Object],
            default: undefined
        },
        /** contenido del tooltip al pasar el hover, puede ser una funcion que accede a las propiedades del feature o un texto estatico */
        tooltipContent:{
            type:[Function,String],
            default:"none"
        },
        /** contenido del popup al clickear el feature, puede ser una funcion que accede a las propiedades del feature o un texto estatico */
        popupContent:{
            type:[Function,String],
            default:"none"
        },
        fixdedTooltip:{
            type:Boolean,
            default: false
        },
        fixedTooltipTop:{
            type: Number,
            default: 0
        },
        zoomOnClickFeature:{
            type: Boolean,
            default:true
        },
        mapStyle:{
            type: [Function,Object],
            default:function(){
                return {
                    fill:{
                        color:"gray"
                    },
                    stroke:{
                        width:1,
                        color:"white" // "scale["color"]"
                    }
                }
            }
        },
        highlightStyle: {
            type : Object,
            default:function(){
                return {
                    style:{
                        stroke:{
                            color: "black",
                            width: 3
                        },
                        zIndex:3
                    }
                }
            }
        }
    },
    data:function(){
        return {
            VM_mapStyle:undefined
        }
    },
    created:function(){

        //console.log("llgamos aqui")
        this.VM_mapStyle = this.mapStyle
    },
    methods:{
        _setStyle:function(){
            let style;
            let vm = this;
            if (typeof vm.VM_mapStyle == "function"){
                style= function(feature){
                    let serializes= fixSerializedStyleIfIncomplete( vm.VM_mapStyle(feature) )
                    serializes = feature.get("_hightlight") == true ? serializedStyleIfHighlight(serializes,vm.highlightStyle): serializes ;
                    let olstyles=generateOlStyle(serializes)["style"]
                    return olstyles
                }
            }else{
                style= function(feature){
                    let serializes= vm.VM_mapStyle
                    serializes = feature.get("_hightlight") == true ? serializedStyleIfHighlight(serializes): serializes ;
                    let olstyles=generateOlStyle(serializes)["style"]
                    return olstyles
                }
            }
            this.olLayer.setStyle(style)
        }
    }
}