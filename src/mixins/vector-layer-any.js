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
        tooltipContent:{
            type:[Function,String],
            default:"none"
        },
        popupContent:{
            type:[Function,String],
            default:"none"
        },
        fixdedTooltip:{
            type:Boolean,
            default: false
        },
        fixdedTooltipTop:{
            type: Number,
            default: 0
        }
    }
}