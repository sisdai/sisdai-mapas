<template>
    <div class="card-map-container" 
        :class="{
            'without-footer': !VM_hasFooter,
            'collapsed':collapsingClass,
            'flex':llenarEspacioDisponibleConMapa,
            'desktop-version':esVersionEscritorioEnPantallaLarga
            }"
        :style="{'max-height':collapsingHeight}">
        <div class="card-map-header">
            <slot name="header"></slot>
        </div>
        <slot ></slot>
        <div class="card-map-footer" v-if="VM_hasFooter" :class="{'collapsing':permitirColapso}">
            <div class="card-map-footer-container">
                <slot name="footer"></slot>
            </div>
            
            <button v-if="permitirColapso" class="collapsable-button" @click="VM_collapsed=!VM_collapsed" v-html=" VM_collapsed ? etiquetaColapso : etiquetaNoColapso">
                
            </button>
        </div>
    </div>
</template>
<script>

export default {
    name:"DaiTarjetaContenedorMapa",
    props:{
        permitirColapso:{
            type:Boolean,
            default:true
        },
        colapsada:{
            type: Boolean,
            default:true
        },
        alturaColapsada:{
            type:String,
            default:"60vh"
        },
        llenarEspacioDisponibleConMapa:{
            type:Boolean,
            default:false
        },
        etiquetaColapso:{
            type:String,
            default: '<span class="dai-icon-collapsed size-font-25rem-x7"></span>'
        },
        etiquetaNoColapso:{
            type:String,
            default:'<span class="dai-icon-uncollapsed size-font-25rem-x7"></span>'
        },
        esVersionEscritorioEnPantallaLarga:{
            type:Boolean,
            default:false
        }
    },
    data:function(){
        return {
            cmpMap:null,
            VM_hasFooter:false,
            VM_collapsed:true,
            VM_screenIsMobile:false,
            

        }
    },
    created:function(){
        this.VM_collapsed = this.colapsada;
        
    },
    computed:{
        collapsingClass:function(){
            return this.VM_hasFooter && this.VM_collapsed && this.permitirColapso;
        },
        collapsingHeight:function(){
            if(this.esVersionEscritorioEnPantallaLarga && !this.VM_screenIsMobile){
                return 'initial';
            }
            return this.VM_hasFooter && this.VM_collapsed && this.permitirColapso ? this.alturaColapsada : "250vh"
        }
    },
    mounted:function(){
        this.VM_hasFooter = this.hasFooterSlot()
        let mediaquery=window.matchMedia("(max-width: 976px)")
        this._fn_matchMediaQueryMobile(mediaquery)
        mediaquery.addEventListener("change",this._fn_matchMediaQueryMobile)
    },
    methods:{
        hasFooterSlot() {
            return !!this.$slots.footer
        },
        _registerMap(mapComponent){
            this.cmpMap = mapComponent;
        },
        _getComponentMap:function(){
            return this.cmpMap
        },
        _fn_matchMediaQueryMobile:function(media){
            console.log(media.matches)
            if(media.matches){
                this.VM_screenIsMobile = true
            }else{
                this.VM_screenIsMobile = false
            }
        }
        
    },
    provide:function(){
        return{
            getComponentMap:this._getComponentMap
        }
    },
    destroyed:function(){

    }
}
</script>

<style lang="scss">
.card-map-container{
    
    border-radius: 8px;
    background-color: var(--main-bg-color);
    color: var(--main-text-color);
    padding: .6rem .3rem 0rem .3rem;
    border: 1px solid black;
    overflow-y: clip;
    position: relative;
    transition: max-height 0.30s ease-in;
    &.flex{
        display: flex;
        flex-direction: column;
        .dai-map-container{
            flex-grow: 1;
        }
    }
    &.without-footer{
        padding-bottom: 0px;
        .dai-map-container{
            margin-bottom: 0px;
        }
        
        
    }
    .dai-map-container{
        
        margin-left: -.5rem;
        margin-right: -.5rem;
        margin-top: .5rem;
        
        margin-bottom: .5rem;
        
    }
    .card-map-header{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        >*{
            margin: .3rem;
            flex-grow: 1;
        }
    }

    .card-map-footer{
        &.collapsing{
            padding-bottom: 1.8rem;
        }
        
        .card-map-footer-container{
            display: flex;
            flex-wrap: wrap;
            width: calc(100% - .3rem);
            align-items: center;
            justify-content: center;
            >*{
                margin: .3rem;
                flex-grow: 1;
            }
        }
        .collapsable-button{
            //width: 100%;
            width: calc(100% + .6rem);
            background-color: var(--control-bg-color-accent);
            color: var(--control-color-accent);
            margin-left: -.5rem;
            margin-right: -.5rem;
            border-style: none;
            border-radius: 0 0 8px 8px;
            cursor: pointer;
            //font-size: 28px;
            height: 1.8rem;
            position: absolute;
            bottom: 0px;

            
        }
    }

    &.desktop-version{
        @media screen and (min-width:976px) {
            display: grid;
            grid-template-areas:"head map" 
                                "foot map" ;
            //grid-template-rows: 1fr 1fr;
            grid-template-columns: 1fr 2fr;
            padding-top: 0;
            //flex-direction: row;
            .card-map-header{
                grid-area: head;
                padding-top: .6rem;
            }
            .card-map-footer{
                grid-area: foot;

                .collapsable-button{
                    display: none;
                }
            }
            .dai-map-container{
                grid-area: map;
                height: 100%;
                margin-top: 0;
                margin-bottom: 0;
                margin-left: 0;
            }
        }
    }

}

$sizes:20;

@for $i  from 1 through $sizes {
    
    .size-font-25rem-x#{$i} {
        font-size: $i * .25rem;
    }
}
</style>