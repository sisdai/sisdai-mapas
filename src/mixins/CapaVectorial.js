export const DEFAULT_FILL_COLOR = 'gray'
export const DEFAULT_STROKE_COLOR = 'white'
export const DEFAULT_RADIUS = 7

export default {
  name: 'MixinCapaVectorial',
  props: {
    estiloCapa: {
      /**
       * Fuente de datos de una capa GeoJSON
       */
      url: {
        type: String,
        default: '',
      },

      /**
       * Objetos que se convertiran en feature, dependera del tipo de capa la estructura que estos deben tener
       * (si esta definido source, url se ignora )
       * */
      datos: {
        type: [Array, Object],
        default: undefined,
      },

      /**
       *
       */
      type: Object,
      default: function () {
        return {
          fill: {
            color: DEFAULT_FILL_COLOR,
          },
          stroke: {
            width: 1,
            color: DEFAULT_STROKE_COLOR, // "scale["color"]"
          },
          circle: {
            fill: {
              color: DEFAULT_FILL_COLOR,
            },
            stroke: {
              color: DEFAULT_STROKE_COLOR,
              width: 1,
            },
            radius: DEFAULT_RADIUS,
          },
        }
      },
    },

    /**
     *
     */
    tipoGeometria: {
      default: '', //'Point', 'LineString', 'LinearRing', 'Polygon', 'MultiPoint', 'MultiLineString', 'MultiPolygon', 'GeometryCollection', 'Circle'
      type: String,
    },
  },
  data: () => ({
    /**
     * anteriormente VM_mapStyle
     */
    VM_estiloCapa: undefined,

    /**
     * anteriormente VM_geometryType
     */
    VM_tipoGeometria: '',
  }),
  created() {
    this.VM_estiloCapa = { ...this.estiloCapa }

    if (this.tipoGeometria !== '') {
      //console.log("se definio tipo de geometria desde el inicio")
      this.VM_tipoGeometria = this.tipoGeometria
    }
  },
  methods: {
    asignarEstilo() {
      console.log('asignando estilo')
    },
  },
}
