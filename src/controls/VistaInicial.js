/**
 * @module controls/VistaInicial
 */

import Control from 'ol/control/Control'
import { crearContenedorControl, crearBotonControl } from './utiles'

const claseCss = 'vista-inicial'

/**
 * @typedef {Object} Opciones
 * @property {Number} centro Coordenadas [x, y] del centro inicial de la vista.
 * @property {Array<Number>} extension Coordenadas extremas [x1, y1, x2, y2] de la caja envolvente
 * de la vista.
 * @property {Array<Number>} rellenoAlBordeDeLaExtension Relleno (en píxeles [superior, derecho,
 * inferior, izquierdo]) que se agregará a la extensión de la vista.
 * @property {Number} zoom Nivel de zoom de la vista.
 */

/**
 * @classdesc
 * Agrega un control personalizado que permite volver a la vista del mapa que se definió
 * inicialmente.
 */
export default class VistaInicial extends Control {
  constructor(opciones) {
    /**
     * Elemento contenedor del control
     * @type {HTMLDivElement}
     * @private
     */
    const contenedorControl = crearContenedorControl(claseCss)

    super({
      element: contenedorControl,
      target: undefined,
    })

    /**
     * Nombre con el que se podrá extraer el control del mapa.
     * @type {String}
     * @protected
     */
    this.nombre = 'VistaInicial'

    /**
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @private
     */
    this.botonVistaInicial = crearBotonControl(
      claseCss,
      'mapa-centro',
      this.reiniciarVista.bind(this)
    )
    contenedorControl.appendChild(this.botonVistaInicial)

    /**
     * @type {number}
     * @protected
     */
    this.centro = opciones.centro

    /**
     * @type {Array<number>}
     * @protected
     */
    this.extension = opciones.extension

    /**
     * @type {String}
     * @private
     */
    this.tipoDeVista = this.extensionEsValida() ? 'extension' : 'centro'

    /**
     * @type {Array<number>}
     * @protected
     */
    this.rellenoAlBordeDeLaExtension = opciones.rellenoAlBordeDeLaExtension

    /**
     * @type {number}
     * @protected
     */
    this.zoom = opciones.zoom

    /**
     * Si la vista es de tipo extension, solicitar la vista inical cuando el mapa esté listo
     */
    if (this.tipoDeVista === 'extension') {
      new Promise(resolve => {
        const _this = this
        function revisarMapa() {
          if (_this.getMap()) {
            resolve()
          } else setTimeout(revisarMapa, 50)
        }

        revisarMapa()
      }).then(() => {
        this.reiniciarVista()
      })
    }
  }

  /**
   *
   * @returns {Boolean}
   */
  extensionEsValida() {
    return Boolean(
      Number(this.extension.value[0]) !== 0 &&
        Number(this.extension.value[3]) !== 0
    )
  }

  /**
   * Reinicia la vista que se difinió inicialmente en el mapa
   */
  reiniciarVista() {
    // const vInicial = this.getMap().get('vistaInicial')
    this.funcionesPorTipoDeVista[this.tipoDeVista]()
    this.dispatchEvent('reset')
  }

  /**
   * Contiene las funciones que reinician la vista dependiendo del tipo de vista
   * @type {Object} [centro|extension]
   * @protected
   */
  funcionesPorTipoDeVista = {
    centro: () =>
      this.getMap().getView().animate({ zoom: this.zoom, center: this.centro }),
    extension: () =>
      this.getMap().getView().fit(this.extension, {
        padding: this.rellenoAlBordeDeLaExtension,
        duration: 1000,
      }),
  }
}
