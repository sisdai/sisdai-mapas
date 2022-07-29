<script>



export default{
    name: "DaiCapaUtfGrid",
    inject:["getMap","registerGrid","unregisterGrid"],
    props: {
        id:{
            type: String,
            default: "_default_"
        },
        wmsUrl: {
            type: String,
            default : ""
        },
        wmsParametros: {
            type: Object,
            default: function(){
                return {}
            }
        },
        zIndex: {
            type:Number,
            default: 0
        },

        contenidoTooltip: {
            type:[Function,String],
            default:"none"
        },
        contenidoPopup:{
            type:[Function,String],
            default:"none"
        },
        
    },
    data(){
        return {
            olMap : null,
            VM_id:null,
            VM_grid: {}
        }
    },
    render(){
        return null
    },
    methods:{
        listenerFunctionToMapMoveend(e){
            const mapa = e.target
            const extent = mapa.getView().calculateExtent(mapa.getSize())
            const size = mapa.getSize()
            const parametros = {...this.wmsParametros,...defaultParametros}
            parametros["WIDTH"] =size[0] % 4 === 0 ?  size[0] : size[0] + size[0] % 4
            parametros["HEIGHT"] = size[1] % 4 === 0 ?  size[1] : size[1] + size[1] % 4
            parametros['BBOX'] = extent.join(",")

            
            const parametrosString =  Object.keys(parametros).map(key => key + '=' + parametros[key]).join('&');
            const urlServicioWms = this.wmsUrl+"?"+parametrosString;

            fetch(urlServicioWms).then(response => response.json()).then(data => {
                this.VM_grid = data
            })
        },
        addEventListenerToMapMoveend(){
            this.olMap.on("moveend",this.listenerFunctionToMapMoveend)
        }
    },
    created(){
        const vm = this;
        this.VM_id = this.id != "_default_" ? this.id : Math.random().toString(36).substring(7)
        this.getMap(function(olMap){
            vm.olMap = olMap
            vm.addEventListenerToMapMoveend()
            vm.registerGrid(vm)
        })
    },
    destroyed(){
        this.olMap.un("moveend",this.listenerFunctionToMapMoveend)
        this.unregisterGrid(this.VM_id)
    }
}

const defaultParametros = {
    SERVICE:"WMS",
    VERSION:"1.3.0",
    REQUEST:"GetMap",
    FORMAT:"application/json;type=utfgrid",
    //CRS:"EPSG:4326" (creo que depende mas de como este configurado el layer en geoserver)
}
</script>