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
    this.getMap()
      .getView()
      .animate({ zoom: this.getMap().getView().getZoom() + 1, duration: 250 })
  }
}
