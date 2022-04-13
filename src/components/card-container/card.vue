<template>
  <div
    class="card-map-container"
    :class="{
      'without-footer': !VM_hasFooter,
      collapsed: collapsingClass,
      flex: llenarEspacioDisponibleConMapa,
      'desktop-version': esVersionEscritorioEnPantallaLarga,
      'usar-margen-inferior-por-logo-lib': usarLogoLibreria
    }"
    :style="{ 'max-height': collapsingHeight }"
  >
    <div class="card-map-header">
      <slot name="header"></slot>
    </div>
    <slot></slot>
    <div
      class="card-map-footer"
      v-if="VM_hasFooter"
      :class="{ collapsing: permitirColapso, 'usar-margen-por-logo-lib': usarLogoLibreria }"
    >
      <div class="card-map-footer-container">
        <slot name="footer"></slot>
      </div>

      <button
        v-if="permitirColapso"
        class="collapsable-button"
        :class="{'sibling-logo-lib':usarLogoLibreria}"
        @click="VM_collapsed = !VM_collapsed"
        v-html="VM_collapsed ? etiquetaColapso : etiquetaNoColapso"
      ></button>
      
    </div>
    <a v-if="usarLogoLibreria" class="pie-mapa-libreria" href="https://conacyt.mx/" target="_blank">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 102.28 30" class="logo-conacyt"><defs></defs><g id="Capa_2" data-name="Capa 2"><g id="Capa_1-2" data-name="Capa 1"><g id="b"><g id="c"><path class="cls-1" d="M15.07,15.91a.88.88,0,1,0-.88-.87.88.88,0,0,0,.88.87"/><path class="cls-1" d="M17.38,15.61a1,1,0,1,0-1-1,1,1,0,0,0,1,1"/><path class="cls-1" d="M19.82,14.47a1.19,1.19,0,1,0-1.19-1.19,1.19,1.19,0,0,0,1.19,1.19"/><path class="cls-1" d="M21.84,14.53a1.69,1.69,0,1,1,1.68,1.69,1.69,1.69,0,0,1-1.68-1.69"/><path class="cls-1" d="M27.8,15.47a2.17,2.17,0,1,0-2.17-2.17,2.16,2.16,0,0,0,2.17,2.17"/><path class="cls-1" d="M27.53,20.14A2.17,2.17,0,1,0,25.37,18a2.17,2.17,0,0,0,2.16,2.16"/><path class="cls-1" d="M23.47,22.41a2.17,2.17,0,1,1,2.16,2.17,2.16,2.16,0,0,1-2.16-2.17"/><path class="cls-1" d="M22.29,27.91a2.17,2.17,0,1,0-2.16-2.17,2.17,2.17,0,0,0,2.16,2.17"/><path class="cls-1" d="M15.8,27.57A2.17,2.17,0,1,1,18,29.74a2.17,2.17,0,0,1-2.17-2.17"/><path class="cls-1" d="M11,27.84A2.16,2.16,0,1,1,13.18,30,2.17,2.17,0,0,1,11,27.84"/><path class="cls-1" d="M6.37,26.23a2.17,2.17,0,1,1,2.17,2.16,2.17,2.17,0,0,1-2.17-2.16"/><path class="cls-1" d="M2.83,23.21A2.16,2.16,0,1,1,5,25.38a2.16,2.16,0,0,1-2.16-2.17"/><path class="cls-1" d="M.56,19a2.16,2.16,0,1,1,2.16,2.17A2.16,2.16,0,0,1,.56,19"/><path class="cls-1" d="M0,14.09a2.16,2.16,0,1,1,2.16,2.16A2.17,2.17,0,0,1,0,14.09"/><path class="cls-1" d="M26.42,11.13A2.17,2.17,0,1,0,24.25,9a2.16,2.16,0,0,0,2.17,2.16"/><path class="cls-1" d="M21.33,5.39a2.16,2.16,0,1,1,2.15,2.16,2.16,2.16,0,0,1-2.15-2.16"/><path class="cls-1" d="M17.33,3A2.17,2.17,0,1,1,19.5,5.15,2.17,2.17,0,0,1,17.33,3"/><path class="cls-1" d="M12.67,2.16a2.17,2.17,0,1,1,2.16,2.17,2.16,2.16,0,0,1-2.16-2.17"/><path class="cls-1" d="M10.13,5.34A2.17,2.17,0,1,0,8,3.18a2.16,2.16,0,0,0,2.16,2.16"/><path class="cls-1" d="M4,5.69A2.17,2.17,0,1,1,6.15,7.86,2.17,2.17,0,0,1,4,5.69"/><path class="cls-1" d="M1.25,9.45a2.16,2.16,0,1,1,2.16,2.16A2.16,2.16,0,0,1,1.25,9.45"/><path class="cls-1" d="M18.29,8.24A1.69,1.69,0,1,1,20,9.93a1.69,1.69,0,0,1-1.69-1.69"/><path class="cls-1" d="M14.85,6.71a1.69,1.69,0,1,1,1.69,1.7,1.69,1.69,0,0,1-1.69-1.7"/><path class="cls-1" d="M21.25,18.12a1.69,1.69,0,1,1,1.7,1.7,1.7,1.7,0,0,1-1.7-1.7"/><path class="cls-1" d="M22.46,12.69A1.69,1.69,0,1,0,20.77,11a1.69,1.69,0,0,0,1.69,1.69"/><path class="cls-1" d="M11.08,6.87a1.69,1.69,0,1,1,1.69,1.69,1.69,1.69,0,0,1-1.69-1.69"/><path class="cls-1" d="M7.73,8.64a1.69,1.69,0,1,1,1.69,1.69A1.69,1.69,0,0,1,7.73,8.64"/><path class="cls-1" d="M5.57,11.71A1.69,1.69,0,1,1,7.26,13.4a1.69,1.69,0,0,1-1.69-1.69"/><path class="cls-1" d="M4.81,15.59A1.69,1.69,0,1,1,6.5,17.28a1.69,1.69,0,0,1-1.69-1.69"/><path class="cls-1" d="M6,19.4a1.69,1.69,0,1,1,1.69,1.69A1.69,1.69,0,0,1,6,19.4"/><path class="cls-1" d="M8.74,22.18a1.69,1.69,0,1,1,1.68,1.69,1.69,1.69,0,0,1-1.68-1.69"/><path class="cls-1" d="M12.24,23.46a1.7,1.7,0,1,1,1.7,1.7,1.7,1.7,0,0,1-1.7-1.7"/><path class="cls-1" d="M17.73,24.8A1.69,1.69,0,1,0,16,23.11a1.69,1.69,0,0,0,1.69,1.69"/><path class="cls-1" d="M20.88,22.91a1.69,1.69,0,1,0-1.69-1.69,1.69,1.69,0,0,0,1.69,1.69"/><path class="cls-1" d="M15.79,13.88a1,1,0,1,0,0-2,1,1,0,0,0,0,2"/><path class="cls-1" d="M12.47,13.28a1,1,0,1,1,1,1,1,1,0,0,1-1-1"/><path class="cls-1" d="M12.75,16.59a1,1,0,0,0,0-2,1,1,0,1,0,0,2"/><path class="cls-1" d="M14.38,18.32a1,1,0,1,0-1-1,1,1,0,0,0,1,1"/><path class="cls-1" d="M16.59,17.86a1,1,0,1,0,0-2,1,1,0,0,0,0,2"/><path class="cls-1" d="M14.14,9.91a1.19,1.19,0,1,1,1.19,1.19,1.2,1.2,0,0,1-1.19-1.19"/><path class="cls-1" d="M16.89,10.89a1.19,1.19,0,1,1,1.19,1.19,1.19,1.19,0,0,1-1.19-1.19"/><path class="cls-1" d="M12.53,11.71a1.2,1.2,0,1,0,0-2.39,1.2,1.2,0,0,0,0,2.39"/><path class="cls-1" d="M9.36,12.5a1.19,1.19,0,0,1,2.38,0,1.19,1.19,0,1,1-2.38,0"/><path class="cls-1" d="M8.72,15.5a1.19,1.19,0,1,1,1.2,1.19,1.21,1.21,0,0,1-1.2-1.19"/><path class="cls-1" d="M11.06,19.46a1.19,1.19,0,1,0-1.18-1.19,1.19,1.19,0,0,0,1.18,1.19"/><path class="cls-1" d="M13.46,21.13a1.19,1.19,0,1,0-1.18-1.19,1.19,1.19,0,0,0,1.18,1.19"/><path class="cls-1" d="M15.06,20a1.19,1.19,0,1,1,1.19,1.19A1.19,1.19,0,0,1,15.06,20"/><path class="cls-1" d="M18.67,19.85a1.19,1.19,0,1,0-1.19-1.19,1.19,1.19,0,0,0,1.19,1.19"/><path class="cls-1" d="M18.8,16.07A1.2,1.2,0,1,1,20,17.26a1.18,1.18,0,0,1-1.19-1.19"/><path class="cls-1" d="M42,10.13l-.19,1.35c0-.18,0-.31,0,0a2.76,2.76,0,0,0-1.8-.54,3.72,3.72,0,0,0-3.42,2,5.85,5.85,0,0,0-.8,3.41,2.57,2.57,0,0,0,1.07,2.16,3.44,3.44,0,0,0,1.89.52,3.39,3.39,0,0,0,2-.58h0a8.08,8.08,0,0,1-.1,1c0,.33,0,.38-.1.79a7.13,7.13,0,0,1-2,.31,6.47,6.47,0,0,1-2.76-.54,3.7,3.7,0,0,1-2.1-3.46A7.38,7.38,0,0,1,34,13.9a6.07,6.07,0,0,1,2.65-3.48,7,7,0,0,1,3.67-1,4.61,4.61,0,0,1,1.7.32.83.83,0,0,0-.08.36"/><path class="cls-1" d="M48.18,10.94a3.72,3.72,0,0,0-2.1.61,4.37,4.37,0,0,0-1.72,2.51,6.14,6.14,0,0,0-.27,2.16A3.3,3.3,0,0,0,44.68,18,2.57,2.57,0,0,0,47,19a3.63,3.63,0,0,0,3.28-1.87,5.66,5.66,0,0,0,.65-1.61,6.47,6.47,0,0,0,.17-1.79,2.82,2.82,0,0,0-1.19-2.34,3.13,3.13,0,0,0-1.68-.44m.24-1.49A4.9,4.9,0,0,1,52,10.66a3.81,3.81,0,0,1,1.16,2.65,8.22,8.22,0,0,1-.43,3.11,5.57,5.57,0,0,1-2.76,3.31,6.74,6.74,0,0,1-3.22.75,4.91,4.91,0,0,1-3.56-1.21A3.8,3.8,0,0,1,42,16.64a8.27,8.27,0,0,1,.43-3.12,5.64,5.64,0,0,1,2.76-3.31,6.76,6.76,0,0,1,3.23-.76"/><polygon class="cls-1" points="65.05 9.69 63.44 20.26 61.57 20.26 56.76 12.72 55.61 20.26 53.74 20.26 55.36 9.69 57.17 9.69 62.02 17.3 63.18 9.69 65.05 9.69"/><path class="cls-1" d="M72.1,16l-.93-4.16L68.91,16Zm.54-6.32,2.5,10.57H73l-.65-2.84H68.16l-1.52,2.84h-2L70.55,9.69h2.09"/><polygon class="cls-1" points="95.01 9.69 94.02 9.69 92.9 9.69 89.65 13.97 87.61 9.69 85.32 9.69 88.31 15.76 87.63 20.26 89.53 20.26 90.22 15.71 93.83 11.17 96.91 11.17 95.52 20.26 97.43 20.26 98.81 11.17 102.06 11.17 102.28 9.69 95.01 9.69"/><path class="cls-1" d="M84.41,10.06l-.19,1.35c0-.18,0-.31,0,0a2.81,2.81,0,0,0-1.81-.54,3.73,3.73,0,0,0-3.41,2,6,6,0,0,0-.8,3.42,2.6,2.6,0,0,0,1.07,2.16,3.44,3.44,0,0,0,1.89.52,3.49,3.49,0,0,0,2-.58h0a5.57,5.57,0,0,1-.1,1c0,.33,0,.38-.1.78a6.47,6.47,0,0,1-1.95.32,6.29,6.29,0,0,1-2.76-.54,3.72,3.72,0,0,1-2.11-3.45,7.11,7.11,0,0,1,.33-2.58,6.05,6.05,0,0,1,2.65-3.49,7,7,0,0,1,3.67-1,4.61,4.61,0,0,1,1.7.32.93.93,0,0,0-.07.36"/></g></g></g></g></svg>
    </a>
  </div>
</template>
<script>
export default {
  name: "DaiTarjetaContenedorMapa",
  props: {
    permitirColapso: {
      type: Boolean,
      default: true,
    },
    colapsada: {
      type: Boolean,
      default: true,
    },
    alturaColapsada: {
      type: String,
      default: "60vh",
    },
    llenarEspacioDisponibleConMapa: {
      type: Boolean,
      default: false,
    },
    etiquetaColapso: {
      type: String,
      default: '<span class="dai-icon-collapsed size-font-25rem-x7"></span>',
    },
    etiquetaNoColapso: {
      type: String,
      default: '<span class="dai-icon-uncollapsed size-font-25rem-x7"></span>',
    },
    esVersionEscritorioEnPantallaLarga: {
      type: Boolean,
      default: false,
    },
    usarLogoLibreria: {
      type: Boolean,
      default: true,
    },
  },
  data: function () {
    return {
      cmpMap: null,
      VM_hasFooter: false,
      VM_collapsed: true,
      VM_screenIsMobile: false,
    };
  },
  created: function () {
    this.VM_collapsed = this.colapsada;
  },
  computed: {
    collapsingClass: function () {
      return this.VM_hasFooter && this.VM_collapsed && this.permitirColapso;
    },
    collapsingHeight: function () {
      if (this.esVersionEscritorioEnPantallaLarga && !this.VM_screenIsMobile) {
        return "initial";
      }
      return this.VM_hasFooter && this.VM_collapsed && this.permitirColapso
        ? this.alturaColapsada
        : "250vh";
    },
  },
  mounted: function () {
    this.VM_hasFooter = this.hasFooterSlot();

    let mediaquery = window.matchMedia("(max-width: 976px)");
    this._fn_matchMediaQueryMobile(mediaquery);
    mediaquery.addEventListener("change", this._fn_matchMediaQueryMobile);
  },
  methods: {
    hasFooterSlot() {
      return !!this.$slots.footer;
    },
    _registerMap(mapComponent) {
      this.cmpMap = mapComponent;
      if (!this.VM_screenIsMobile) {
        this.cmpMap.forceResizeMap(true);
      }
    },
    _getComponentMap: function () {
      return this.cmpMap;
    },
    _fn_matchMediaQueryMobile: function (media) {
      if (media.matches) {
        this.VM_screenIsMobile = true;
      } else {
        this.VM_screenIsMobile = false;
      }
    },
  },
  provide: function () {
    return {
      getComponentMap: this._getComponentMap,
    };
  },
  destroyed: function () {},
};
</script>

<style lang="scss">
.card-map-container {
  border-radius: 8px;
  background-color: var(--main-bg-color);
  color: var(--main-text-color);
  padding: 0.6rem 0.3rem 0rem 0.3rem;
  border: 1px solid black;
  overflow-y: clip;
  position: relative;
  transition: max-height 0.3s ease-in;
  &.flex {
    display: flex;
    flex-direction: column;
    .dai-map-container {
      flex-grow: 1;
    }
  }
  &.without-footer {
    padding-bottom: 0px;
    .dai-map-container {
      margin-bottom: 0px;
    }
    &.usar-margen-inferior-por-logo-lib{
        padding-bottom: 40px;
    }
  }
  .dai-map-container {
    margin-left: -0.3rem;
    margin-right: -0.3rem;
    margin-top: 0.5rem;

    margin-bottom: 0.5rem;
  }
  .card-map-header {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    > * {
      margin: 0.3rem;
      flex-grow: 1;
    }
  }

  .card-map-footer {
    &.collapsing {
      padding-bottom: 1.8rem;
      &.usar-margen-por-logo-lib{
          padding-bottom: calc( 1.8rem + 40px);
      }
    }

    &.usar-margen-por-logo-lib{
        padding-bottom: 40px;
    }

    .card-map-footer-container {
      display: flex;
      flex-wrap: wrap;
      width: calc(100% - 0.3rem);
      align-items: center;
      justify-content: center;
      > * {
        margin: 0.3rem;
        flex-grow: 1;
      }
    }
    .collapsable-button {
      width: 100%;
      //width: calc(100% + .6rem);
      background-color: var(--control-bg-color-accent);
      color: var(--control-color-accent);
      margin-left: -0.3rem;
      margin-right: -0.3rem;
      border-style: none;
      border-radius: 0 0 8px 8px;
      cursor: pointer;
      //font-size: 28px;
      height: 1.8rem;
      position: absolute;
      bottom: 0px;
      &.sibling-logo-lib{
          bottom: 40px;
          border-radius: 0;
      }
    }

    
  }

  &.desktop-version {
    @media screen and (min-width: 976px) {
      display: grid;
      grid-template-areas:
        "head map"
        "foot map";
      //grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr 2fr;
      padding-top: 0;
      //flex-direction: row;
      .card-map-header {
        grid-area: head;
        padding-top: 0.6rem;
        padding-right: 0.3rem;
      }
      .card-map-footer {
        grid-area: foot;
        padding-right: 0.3rem;
        .collapsable-button {
          display: none;
        }
        &.usar-margen-por-logo-lib{
            padding-bottom: 40px;
        }
      }
      .dai-map-container {
        grid-area: map;
        height: 100%;
        margin-top: 0;
        margin-bottom: 0;
        margin-left: 0;
      }
      &.usar-margen-inferior-por-logo-lib{
          .dai-map-container{
              height: calc(100% - 40px);
          }
      }
    }
  }

  .pie-mapa-libreria{
    max-height: 40px;
    width: 100%;
    position: absolute;
    bottom: 0px;
    left: 0;
    background-color: #F7F7F7;
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    padding: 4.5px 24px;
    border-top: 1px solid black;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;

    svg.logo-conacyt{
        width: 102px;
        height: 30px;
        fill: #22222299;
        transition: all .2s ease-in-out;
    }
    &:hover,&:focus{
        background-color: #F7F7F7;
        svg.logo-conacyt{
            fill: #002663;
        }
    }

    @media (min-width: 769px) {
        justify-content: normal;
    }
  }

}

$sizes: 20;

@for $i from 1 through $sizes {
  .size-font-25rem-x#{$i} {
    font-size: $i * 0.25rem;
  }
}
</style>