export default{
    inject:["getMap","registerLayer"],
    data:function(){
        return {
            olMap : null,
            olLayer : null
        }
    },
    render:function(){
        return null
    },
    created:function(){
        let vm = this;
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
            this.olLayer.set("id",this.id)
            this.olLayer.setVisible(this.visible)
            this.olLayer.setZIndex(this.zIndex)
            this.olLayer.setOpacity(this.opacity)

            //observando estas propiedades para two way binding
            // solo las que se necesiten
            this.olLayer.on("change:visible",(eventoLayer)=>{
                console.log(eventoLayer,"cambio visible!!")
                this.$emit("update:visible",eventoLayer.target.getVisible())
            })

        }
        //setters desde props

    },
    props:{
        id:{
            type: String,
            default: Math.random().toString(36).substring(7)
        },
        visible:{
            type:Boolean,
            default:true
        },
        zIndex:{
            type:Number,
            default:undefined
        },
        opacity:{
            type:Number,
            default:1
        }
    },
    watch:{
        visible: function(newValue){
            //revisar si esto no cae en un loop tardado
            this.olLayer.setVisible(newValue)
        },
        opacity: function(newValue){
            this.olLayer.setOpacity(newValue)
        },
        zIndex:function(newValue){
            this.olLayer.setZIndex(newValue)
        }
    }
}