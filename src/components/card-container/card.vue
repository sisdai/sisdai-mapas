<template>
    <div class="card-map-container" 
        :class="{'without-footer': !VM_hasFooter,'collapsed':collapsingClass}"
        :style="{'max-height':collapsingHeight}">
        <div class="card-map-header">
            <slot name="header"></slot>
        </div>
        <slot></slot>
        <div class="card-map-footer" v-if="VM_hasFooter" :class="{'collapsing':allowCollapsing}">
            <div class="card-map-footer-container">
                <slot name="footer"></slot>
            </div>
            
            <button v-if="allowCollapsing" class="collapsable-button" @click="VM_collapsed=!VM_collapsed">
                {{VM_collapsed? '+' : '-'}}
            </button>
        </div>
    </div>
</template>
<script>
export default {
    name:"DaiCardMapContainer",
    props:{
        allowCollapsing:{
            type:Boolean,
            default:true
        },
        collapsed:{
            type: Boolean,
            default:true
        },
        collapsedHeight:{
            type:String,
            default:"60vh"
        },
        fillContainer:{
            type:Boolean,
            default:false
        }
    },
    data:function(){
        return {
            cmpMap:null,
            VM_hasFooter:false,
            VM_collapsed:true
        }
    },
    created:function(){
        this.VM_collapsed = this.collapsed;
    },
    computed:{
        collapsingClass:function(){
            return this.VM_hasFooter && this.VM_collapsed && this.allowCollapsing;
        },
        collapsingHeight:function(){
            return this.VM_hasFooter && this.VM_collapsed && this.allowCollapsing ? this.collapsedHeight : "250vh"
        }
    },
    mounted:function(){
        this.VM_hasFooter = this.hasFooterSlot()
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
        }
        
    },
    provide:function(){
        return{
            getComponentMap:this._getComponentMap
        }
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
    &.without-footer{
        padding-bottom: 5px;
        
    }
    .dai-map-container{
        margin-left: -.5rem;
        margin-right: -.5rem;
        margin-top: .5rem;
    }
    .card-map-header{
        display: flex;
        flex-wrap: wrap;
        *{
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
            *{
                margin: .3rem;
                flex-grow: 1;
            }
        }
        .collapsable-button{
            //width: 100%;
            width: calc(100% + .6rem);
            background-color: black;
            color: white;
            margin-left: -.5rem;
            margin-right: -.5rem;
            border-style: none;
            border-radius: 0 0 8px 8px;
            cursor: pointer;
            font-size: 18px;
            height: 1.8rem;
            position: absolute;
            bottom: 0px;
        }
    }

    
}
</style>