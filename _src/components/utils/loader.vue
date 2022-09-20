<template>
  <div class="loader" ref="loader">
    <!-- By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL -->
    <svg
      width="55"
      height="80"
      viewBox="0 0 55 80"
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFF"
    >
      <g transform="matrix(1 0 0 -1 0 80)">
        <rect width="10" height="20" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="4.3s"
            values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="15" width="10" height="80" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="80;55;33;5;75;23;73;33;12;14;60;80"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="30" width="10" height="50" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="1.4s"
            values="50;34;78;23;56;23;34;76;80;54;21;50"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="45" width="10" height="30" rx="3">
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="30;45;13;80;56;72;45;76;34;23;67;30"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: "Loader",
  data() {
    return {
      inicialPositionParent: "",
    };
  },
  mounted() {
    //console.log("inicial",this.$parent.$el.style.position)
    this.inicialPositionParent = this.$parent.$el.style.position;
    this.$parent.$el.style.position = "relative";
    this.$refs.loader.addEventListener("wheel",wheelEvent)
  },
  destroyed() {
    //console.log("destruyendo loader")
    this.$parent.$el.style.position = this.inicialPositionParent;
    
  },
  beforeDestroy(){
      this.$refs.loader.removeEventListener("wheel",wheelEvent)
  }
};

const wheelEvent = (event)=>{
    event.preventDefault()
}

</script>

<style lang="scss" scoped>
.loader {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  position: absolute;
  z-index: 21;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    height: auto;
    max-width: 100%;
  }
}
</style>
