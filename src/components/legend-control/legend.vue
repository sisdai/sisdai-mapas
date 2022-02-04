<template>
    <div class="main-legend" :class="{'no-tamanos-mapa':!tamanosDeMapa}">
        <div class="header-legend" >
            <div class="title-header-legend">
                <input type="checkbox" class="checkbox-legend-header" 
                v-model="algunoActivo"
                :style="{display: mostrarBotonAlternaTodos && estiloBotonAlternaTodos==='checkbox' ? '':'none'}"
                @change="cambioCheckbox"
                >
                <span>{{titulo}}</span>
            </div>
            <button class="toggle-all" v-if="mostrarBotonAlternaTodos && estiloBotonAlternaTodos==='boton'" @click="toogleAll">{{labelToogleAll}}</button>
            <button class="header-legend-collapsable-boton" :class="{up:!VM_collapsed}" @click="VM_collapsed = !VM_collapsed" v-if="colapsable" >
                <svg xmlns="http://www.w3.org/2000/svg" width="17.908" height="12.147" viewBox="0 0 17.908 12.147">
                    <path id="Trazado_24243" data-name="Trazado 24243" d="M8.954,0,0,9.359l2.667,2.788L8.954,5.576l6.287,6.571,2.667-2.788Z" transform="translate(17.908 12.147) rotate(180)" />
                </svg>
            </button>
            
        </div>
        <div class="legend-content" :class="{collapsed:VM_collapsed}">
            <legend-item v-for="(leg, i) in VM_legends" :key="leg" :index="i" :layerId="leg" :class="{'has-parent-check': mostrarBotonAlternaTodos && estiloBotonAlternaTodos==='checkbox'}"></legend-item>
        </div>
        
    </div>
</template>

<script>
import control from "../../mixins/control"
import LegendItem from "./legend-item.vue"

export default {
    name:"DaiLeyendaMapa",
    mixins:[control],
    props:{
        para:{
            type:[Array,String],
            default:function(){
                return []
            }
        },
        titulo:{
            type:String,
            default:""
        },
        /**
         * Asignar alguna accion para este boton desde las propiedades
         */
        mostrarBotonAlternaTodos:{
            type:Boolean,
            default:false
        },
        estiloBotonAlternaTodos:{
            type:String,
            default:'boton',
            validator:function(value){
                return ['boton', 'checkbox'].indexOf(value) !== -1
            }
        },
        colapsable:{
            type:Boolean,
            default:false
        },
        /**
         * Para que en la leyenda, en representaciones de punto, se vea el mismo tamaño que en el mapa
         */
        tamanosDeMapa:{
            type: Boolean,
            default:false
        },
        /**
         * Botón información
         */
        mostrarBotonInfo:{
            type:Boolean,
            default:false
        },
        contenidoInfo:{
            type:[Array,String],
            default:function(){
                return []
            }
        },
    },
    components:{
        LegendItem
    },
    data:function(){
        return{
            VM_legends:[],
            labelToogleAll:"Quitar todos",  
            algunoActivo:true,
            VM_collapsed:false
        }
    },
    mounted:function(){
        let iniciarRegistroMapa=()=>{
            this.cmpMap.$on("add-layer",()=>{
                this._draw_legends_from_layers()
            })
            this.cmpMap.$on("remove-layer",()=>{
                //console.log("removiendo layer....")
                this._draw_legends_from_layers()
            })
            this._draw_legends_from_layers()
        }

        
        if(!this.cmpMap){
            
            this.$on("readyCmpMap",()=>{
                
                iniciarRegistroMapa()
            })
            return
        }
        iniciarRegistroMapa()
    },
    methods:{
        _draw_legends_from_layers:function(){
            let layers_in_map = Object.keys( this.cmpMap.cmpLayers)
            let layers_in_params = Array.isArray( this.para ) ? this.para : [this.para];

            let interseccion_layers = layers_in_params.filter(value=>layers_in_map.includes(value))
            this.VM_legends = []
            interseccion_layers.forEach(layer_name => {
                
                this.VM_legends.push(layer_name)
            });
        },
        cambioCheckbox:function(){
            this.toogleAll()
        },
        toogleAll:function(){
            let legendas = this.$children;
            //console.log(legendas)
            if(legendas.length==1 && legendas[0].$children[0].hasSubfilters){
                //solo aplicar el apagar prender a la leyenda de esa capa
                this._toogle_all_subfilters(legendas[0].$children[0])
                return
            }

            //aplicar a todas las leyendas
            let estadoTodas = legendas.map(legend=>{
                return legend.$children[0].visible;
            })
            let apagarTodos = estadoTodas.some(item=>item)
            legendas.forEach(leyenda=>{
                let legendItemChild = leyenda.$children[0]
                
                let  esvisible = legendItemChild.visible
                if(apagarTodos && esvisible){
                    legendItemChild.visible = false
                    legendItemChild.set_visible_to_layer()
                }else if (!apagarTodos && !esvisible){
                    legendItemChild.visible = true
                    legendItemChild.set_visible_to_layer()
                }
            })


        },
        _toogle_all_subfilters:function(children_legend){
            children_legend.toggle_allSubFilters()
            //console.log(children_legend)
        },
        checkLabelToggleAll:function(){
            let legendas = this.$children;
            
            if(legendas.length==1 && legendas[0].$children[0].hasSubfilters){  
                return
            }
            let estadoTodas = legendas.map(legend=>{
                return legend.$children[0].visible;
            })
            this.labelToogleAll = estadoTodas.some(item=>item) ? "Quitar todos" : "Mostrar todos";
            this.algunoActivo = estadoTodas.some(item=>item)
        }
    }
}
</script>

<style lang="scss" >
    div.title-header-legend{
        font-size: 14px;
        font-weight: 600;
        margin-block-end: .5em;
        flex-grow: 1;
        display: flex;
        align-items: center;
    }

    .header-legend{
        display: flex;
        justify-content: space-between;
        align-items: center;
        button.toggle-all{
            height: 1.6em;
            border: 1px solid var(--control-color);
            background-color: var(--control-bg-color);
            color: var(--control-color);
            text-align: center;
            white-space: nowrap;
            border-radius: 4px;
            cursor: pointer;
            font-size: 12px;
            font-family: "Montserrat";
            flex-grow: 0;
        }

        input[type=checkbox].checkbox-legend-header{
            background-color: var(--control-bg-color);
            font-size: inherit;
            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;
            width: 32px;
            height: 32px;
            border-radius: 5px;
            border: 1px solid var(--control-color);
            cursor: pointer;
            margin-right: 0.5em;
            background-repeat: no-repeat;
            background-position: center;
            background-size: 1.5em 1.5em;
            flex-grow: 0;

            //quitando algunas cossas que pone la base web
            margin-bottom: 0;
            margin-top: 0;
            margin-left: 0px;
            
            &:checked {
                background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 512 512"><path d="m186 340l-90-91-32 31 122 122 262-261-32-31z"></path></svg>');
            }
            
        }


        .header-legend-collapsable-boton{
            background-color: var(--control-bg-color);
            border:none;
            flex-grow: 0;
            margin-block-end: 0.5em;
            cursor: pointer;
            &.up{
                svg{
                    transform: rotate(180deg);
                }
            }
        }
    }
    

    .legend-normal-vector.has-parent-check{
        margin-left: 6px;
        
    }

    .legend-content{
        
        &.collapsed{
            display: none;
            
        }
    }
</style>

<style lang="scss">
.main-legend.no-tamanos-mapa{
    .legend-normal-vector{
        .dai-map-shape{
            .shape{
                max-height: 25px;
                max-width: 25px;
                min-height: 25px;
                min-width: 25px;
            }
        }
    }
}
</style>