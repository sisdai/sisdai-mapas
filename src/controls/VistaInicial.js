/**
 * @module controls/VistaInicial
 */

import Control from 'ol/control/Control'
import { crearContenedorControl, crearBotonControl } from './utiles'

const claseCss = 'vista-inicial'

/**
 * @classdesc
 * Agrega un control personalizado que permite volver a la vista del mapa que se definió
 * inicialmente.
 */
export default class VistaInicial extends Control {
  constructor() {
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
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @protected
     */
    this.botonVistaInicial = crearBotonControl(
      claseCss,
      'mapa-centro',
      this.reiniciarVista.bind(this)
    )

    contenedorControl.appendChild(this.botonVistaInicial)
  }

  /**
   * Reinicia la vista que se difinió inicialmente en el mapa
   */
  reiniciarVista() {
    const vInicial = this.getMap().get('vistaInicial')
    this.tipoDeVista[vInicial.tipo](vInicial.valores, vInicial.rellenoAlBorde)
    this.dispatchEvent('reset')
  }

  /**
   * Contiene las funciones que reinician la vista dependiendo del tipo de vista
   * @type {Object} [centro|extension]
   * @private
   */
  tipoDeVista = {
    centro: valores => this.getMap().getView().animate(valores),
    extension: (valores, rellenoAlBorde) =>
      this.getMap().getView().fit(valores, {
        padding: rellenoAlBorde,
        duration: 500,
      }),
  }
}
