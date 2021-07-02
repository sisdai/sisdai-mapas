export default{
    inject:["getMap","registerLayer"],
    data:function(){
        return {
            olMap : null,
            olLayer : null,
            VM_id:null,
            VM_title:"",
            /**
             *  informacion de la leyenda de esta capa, para que otros componentes puedan obtenerla
             */
            VM_legend_info:undefined,
            /**
             * Estado de la informacion de la leyenda, para que otros 
             * componentes que quieran acceder a la leyenda de esta capa sepan que status tiene
             */
            VM_legend_info_status:"unready" //"ready","loading"
        }
    },
    render:function(){
        return null
    },
    created:function(){
        let vm = this;
        this.VM_id = this.id != "_default_" ? this.id : Math.random().toString(36).substring(7)
        this.VM_title = this.titulo != "" ? this.titulo: this.VM_id
        this.registerLayer(this)
        this.getMap(function(olMap){
            //console.log(olMap)
            vm.olMap = olMap
            vm._createLayerObject()
            vm._setInitialPropsToLayer()
            vm._addLayerToMap()
        })
    },
    methods:{
        _createLayerObject:function(){
            console.log("Not implemented yet")
            //do nothing
        },
        _addLayerToMap:function(){
            this.olMap.addLayer(this.olLayer)
        },
        _setInitialPropsToLayer:function(){
            
            this.olLayer.set("id",this.VM_id)
            this.olLayer.setVisible(this.visible)
            this.olLayer.setZIndex(this.zIndex)
            this.olLayer.setOpacity(this.opacidad)

            //observando estas propiedades para two way binding
            // solo las que se necesiten
            this.olLayer.on("change:visible",(eventoLayer)=>{
                //console.log(eventoLayer,"cambio visible!!")
                this.$emit("update:visible",eventoLayer.target.getVisible())
            })

        }
        //setters desde props

    },
    props:{
        id:{
            type: String,
            default: "_default_"
        },
        visible:{
            type:Boolean,
            default:true
        },
        zIndex:{
            type:Number,
            default:undefined
        },
        opacidad:{
            type:Number,
            default:1
        },
        titulo:{
            type:String,
            default:""
        }
    },
    watch:{
        visible: function(newValue){
            //revisar si esto no cae en un loop tardado
            this.olLayer.setVisible(newValue)
        },
        opacidad: function(newValue){
            this.olLayer.setOpacity(newValue)
        },
        zIndex:function(newValue){
            this.olLayer.setZIndex(newValue)
        }
    },
    destroyed:function(){
        //eliminar del mapa el layer
        this.olMap.removeLayer(this.olLayer)
        //console.log("removiendo",this.VM_id)
        
    },
    
}