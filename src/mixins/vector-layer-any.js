import generateOlStyle, {serializedStyleIfHighlight,fixSerializedStyleIfIncomplete, checkPointShapeFromStyle, serializedStyleSetTexture, removeFillStyle} from "./_json2olstyle"

import GeoJSON from 'ol/format/GeoJSON';

export const DEFAULT_FILL_COLOR="gray"
export const DEFAULT_STROKE_COLOR="white"
export const DEFAULT_RADIUS = 7

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
            default: 5
        },
        zoomAlDarClick:{
            type: Boolean,
            default:true
        },
        realceAlPasarMouse:{
            type: Boolean,
            default:false
        },
        estiloCapa:{
            type: Object,
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
                        radius: DEFAULT_RADIUS
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
        },
        usarTexturasEnRelleno:{
            type:Boolean,
            default:false
        },
        estiloTexturaRelleno:{
            type:Object,
            default:function(){
                return {
                    pattern:"hatch",
                    angle:45,
                    spacing:5,
                    color:'gray',
                    size:1
                }
            } //definir un catalogo
        },
        //propiedades a las que se les reescribira el estilo (preferentemente que no sean las de clasificacion (rellenos,tamaños))
        propsAsignaEstilo:{
            type:Array,
            default:function(){
                return []
            }
        },
        //Funcion para definir esas propieadades de estilo al vuelo, toma como paametro el feature actual 
        //y debe regresar el tantas propieadades se definieron en `propsAsignaEstilo`
        fnAsignaEstilo:{
            type: Function,
            default:function(){
                return (feature)=>[]
            }
        },
        tipoGeometria:{
            default:'', //'Point', 'LineString', 'LinearRing', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection', 'Circle'
            type:String,
            
        }
    },
    data:function(){
        return {
            VM_mapStyle:undefined,
            VM_allFeatures:"",
            VM_geometryType:"",
            VM_defaultShapePoint:"circle",

            VM_is_classified:false,
            VM_is_cluster:false,
            
            
        }
    },
    created:function(){
        //console.log("DEBUG: carga vm_mapstyle")
        this.VM_mapStyle = {...this.estiloCapa}
        if(this.tipoGeometria!==""){
            //console.log("se definio tipo de geometria desde el inicio")
            this.VM_geometryType = this.tipoGeometria;
        }
        
    },
    methods:{
        _setStyle:function(){
            
            let style;
            let vm = this;
            
            let colorsLegend={fill:"gray", stroke:"gray",stroke_width:1}
            let shapeLegend = "square"
            if (typeof vm.VM_mapStyle === "function"){
                style= function(feature){
                    let serializes= JSON.parse(JSON.stringify(fixSerializedStyleIfIncomplete( vm.VM_mapStyle(feature) ) ))
                    const estilo_realce = fixSerializedStyleIfIncomplete(vm.estiloRealce)
                    let serializes2 = feature.get("_hightlight") == true ? serializedStyleIfHighlight(serializes,estilo_realce): JSON.parse(JSON.stringify(serializes)) ;
                    if(vm.usarTexturasEnRelleno){
                        serializes2 =removeFillStyle(serializes2,'fill',vm.VM_defaultShapePoint)
                    }else{
                        serializes2 =removeFillStyle(serializes2,'fillPattern',vm.VM_defaultShapePoint)
                    }
                    //console.log(JSON.stringify( serializes2),">>SALIO DE FUNCION<<",vm.VM_id)
                    if(vm.propsAsignaEstilo.length>0){
                        //console.log(JSON.stringify(serializes2),"INICIO_reescribe")
                        let resultReescribe = vm.fnAsignaEstilo(feature.getProperties())
                        vm.propsAsignaEstilo.forEach((path,i)=>{
                            replacePropertyAt(serializes2["style"],path,resultReescribe[i])
                        })
                        //console.log(JSON.stringify(serializes2),"FIN_reescribe")
                    }
                    let olstyles=generateOlStyle(serializes2)["style"]
                    return olstyles
                }
            }else{
                
                let serializes= JSON.parse(JSON.stringify({...fixSerializedStyleIfIncomplete( vm.VM_mapStyle )}))
                
                //let geometry_type = vm.olLayer.getSource().getFeatures()[0].getGeometry().getType()
                /******************************************************************************** */
                /******************************************************************************** */
                /******************************************************************************** */
                /******************************************************************************** */
                /******************************************************************************** */
                //console.log("//AQUI VERIFICAR TAMBIEN QUE SHAPE SE VA A LA LEYENDA",serializes)
                
                if(this.VM_geometryType.includes("Point") ){

                    this.VM_defaultShapePoint= checkPointShapeFromStyle(serializes)
                    shapeLegend = this.VM_defaultShapePoint;
                    colorsLegend.fill = serializes.style?.[shapeLegend]?.fill?.color || 'gray';
                    colorsLegend.stroke = serializes.style?.[shapeLegend]?.stroke?.color || 'white';
                    colorsLegend.stroke_width = serializes.style?.[shapeLegend]?.stroke?.width || 1;
                    colorsLegend.radius = serializes.style?.[shapeLegend]?.radius || DEFAULT_RADIUS;
                }else  if(this.VM_geometryType.includes("LineString") ){
                    shapeLegend = "line"
                    colorsLegend.fill = "transparent"
                    colorsLegend.stroke = serializes.style?.stroke?.color || 'white';
                    colorsLegend.stroke_width = serializes.style?.stroke?.width || 1;
                    colorsLegend.radius = 12.5;
                }else{
                    //console.log("aqui se esta poniendo los colores de leyenda por default", this.id)
                    colorsLegend.fill = serializes.style?.fill?.color || 'gray';
                    colorsLegend.stroke = serializes.style?.stroke?.color || 'white';
                    colorsLegend.stroke_width = serializes.style?.stroke?.width || 1;
                    colorsLegend.radius = 12.5;
                    //colorsLegend.fill = serializes["style"].fill !=undefined ? serializes["style"].fill.color : 'gray'
                    //colorsLegend.stroke = serializes["style"].stroke != undefined ? serializes["style"].stroke.color : 'gray'
                }
                
                style= function(feature){
                    
                    const estilo_realce = fixSerializedStyleIfIncomplete(vm.estiloRealce)
                    
                    let serializes2 = feature.get("_hightlight") == true ? serializedStyleIfHighlight(serializes,estilo_realce): JSON.parse(JSON.stringify(serializes)) ;
                    
                    
                    if(vm.usarTexturasEnRelleno 
                        && ( 
                         ( vm.VM_geometryType.includes('Polygon') && !("fillPattern" in serializes2.style) ) 
                         || ( vm.VM_geometryType.includes('Point') && !("fillPattern" in serializes2.style[vm.VM_defaultShapePoint]) ) 
                        )
                    ){ //una condicion mas
                           serializes2 = serializedStyleSetTexture(
                               serializes2,
                               vm.VM_defaultShapePoint,
                               vm.estiloTexturaRelleno)
                           //console.log(serializes2,"setTExtureINStyle",vm.VM_geometryType)
                    }
                    
                    if(vm.propsAsignaEstilo.length>0){
                        //console.log(JSON.stringify(serializes2),"INICIO_reescribe")
                        let resultReescribe = vm.fnAsignaEstilo(feature.getProperties())
                        vm.propsAsignaEstilo.forEach((path,i)=>{
                            replacePropertyAt(serializes2["style"],path,resultReescribe[i])
                        })
                        //console.log(JSON.stringify(serializes2),"FIN_reescribe")
                    }

                    let olstyles=generateOlStyle(serializes2)["style"]
                    
                    
                    return olstyles
                }
            }
            if(this.olLayer!==null){
                this.olLayer.setStyle(style)
            }

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
                        stroke_width : colorsLegend?.stroke_width || 1,
                        shape_radius : colorsLegend?.radius || DEFAULT_RADIUS,
                        shape: shapeLegend, // circle, square,  triangle, line, etc,  tambien el url del svg que se desee insertar
                        //shape: "svg:ruta/alsvg",
                        title:this.VM_title,
                        texture:JSON.parse(JSON.stringify(this.estiloTexturaRelleno))
                    }
                }
                this.VM_legend_info_status = "ready"
                this.$emit("legend_info_ready",this.VM_legend_info)    
            }
            
        },
        _saveAllFeaturesFromSource:function(vectorSource){
            let geojsonFormat = new GeoJSON()
            //if(vectorSource.getFeatures().length>1){
            if(vectorSource.getUrl()===undefined){
                this.VM_allFeatures = geojsonFormat.writeFeatures( vectorSource.getFeatures() )
                this.VM_geometryType = vectorSource.getFeatures().length > 0 
                    ? vectorSource.getFeatures()[0].getGeometry().getType() 
                    : ""
                this.$emit("saved_features",this.VM_allFeatures)
                return
            }
            //console.log("---AQUI ESPERAR LAS FEATURES EN VM_allfeatures")
            let listenerFn = (evento)=>{
                //console.log(0,this.id)
                this.VM_allFeatures = geojsonFormat.writeFeatures(evento.features)
                //console.log(evento.features[0].getGeometry(),1,this.id)
                this.VM_geometryType = evento.features.length > 0 ? evento.features[0].getGeometry().getType() : ""
                //console.log(evento.features[0].getGeometry(),2,this.id)
                let serializes= fixSerializedStyleIfIncomplete( this.VM_mapStyle )
                if(this.VM_geometryType.includes("Point")){
                    
                    this.VM_defaultShapePoint= checkPointShapeFromStyle(serializes)    
                    if(this.VM_legend_info?.type === "legend-normal-vector"){
                        this.VM_legend_info.content.shape = this.VM_defaultShapePoint
                        this.VM_legend_info.content.fill_color = serializes.style?.[this.VM_defaultShapePoint]?.fill?.color || 'gray'
                        this.VM_legend_info.content.stroke_color = serializes.style?.[this.VM_defaultShapePoint]?.stroke?.color || 'white'
                        this.VM_legend_info.content.stroke_width = serializes.style?.[this.VM_defaultShapePoint]?.stroke?.width || 1
                        this.VM_legend_info.content.shape_radius =  serializes.style?.[this.VM_defaultShapePoint]?.radius || DEFAULT_RADIUS;
                        //this.VM_legend_info.content.shape = this.VM_geometryType.includes("Point") ? 'square' :this.VM_legend_info.content.shape
                    }
                    
                }else if(this.VM_geometryType.includes("LineString")){
                    if(this.VM_legend_info?.type === "legend-normal-vector"){
                        this.VM_legend_info.content.shape = "line"
                        this.VM_legend_info.content.fill_color = "transparent"
                        this.VM_legend_info.content.stroke_color = serializes.style?.stroke?.color || 'white'
                        this.VM_legend_info.content.stroke_width = serializes.style?.stroke?.width || 1
                        this.VM_legend_info.content.shape_radius =  12.5;
                        //this.VM_legend_info.content.shape = this.VM_geometryType.includes("Point") ? 'square' :this.VM_legend_info.content.shape
                    }
                }else{
                    if(this.VM_legend_info?.type === "legend-normal-vector"){
                        this.VM_legend_info.content.shape = "square"
                        this.VM_legend_info.content.fill_color = serializes.style?.fill?.color || 'gray'
                        this.VM_legend_info.content.stroke_color = serializes.style?.stroke?.color || 'white'
                        this.VM_legend_info.content.stroke_width = serializes.style?.stroke?.width || 1
                        this.VM_legend_info.content.shape_radius =  12.5;
                        //this.VM_legend_info.content.shape = this.VM_geometryType.includes("Point") ? 'square' :this.VM_legend_info.content.shape
                    }
                }  
                this.$emit("saved_features",this.VM_allFeatures)
                
                //console.log(evento,"---AQUI GUARDAR LAS FEATURES EN VM_allfeatures")
            }
            vectorSource.on("featuresloadend",listenerFn)
        },
        filtrarDatos:function(fn_comparacion){
            //console.log("se filtraran los datos :)")
            let sourceLayer=this.olLayer.getSource()
            let geojsonFormat = new GeoJSON()
            let allFeatureslayer = geojsonFormat.readFeatures( this.VM_allFeatures);
            let nuevosFeatures= allFeatureslayer.filter(fn_comparacion)
            //console.log(nuevosFeatures)
            sourceLayer.clear()
            sourceLayer.addFeatures(nuevosFeatures)
            //console.log("decirle que hay un filtro")
        }
    },
    watch:{
        usarTexturasEnRelleno:function(nv){
            if(this.olLayer){
                this._setStyle()
            }
        },
        estiloCapa:function(nv){
            //si es una capa clasificable, reinvocar la funcion de clasificar con estilo
            if(typeof this.VM_mapStyle === "function" && this.VM_is_classified){
                this._set_style_class_v2()
                this._set_legend_info()
            }else{
                this.VM_mapStyle = nv
                this._setStyle()
            }
        }
    }
}


function replacePropertyAt(object, path, newValue){
    const list_keys = path.split('.');
    //console.log(list_keys,'path')
    let last_instance = object
    list_keys.forEach((key,i)=>{
        if(i<(list_keys.length-1)){
            last_instance=last_instance[key]
        }
    })

    last_instance[list_keys[list_keys.length-1]] = newValue
}