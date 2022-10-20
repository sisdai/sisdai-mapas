/**
 * @module controls/ZoomPersonalizado
 */

import Control from 'ol/control/Control'
import { crearContenedorControl, crearBotonControl } from './utiles'

const claseCss = 'zoom'

/**
 * @classdesc
 * Agrega un control con iconos y estilos personalizados que permite hacer zoom in y zoom out
 * sobre el mapa.
 */
export default class ZoomPersonalizado extends Control {
  /**
   * Nombre con el que se podrá extraer el control del mapa.
   * @type {String}
   */
  static nombre = 'ZoomPersonalizado'

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
    this.botonAcercar = crearBotonControl(
      claseCss,
      'agregar',
      this.acercamiento.bind(this)
    )

    /**
     * Elemento clickable del control
     * @type {HTMLButtonElement}
     * @protected
     */
    this.botonAlejar = crearBotonControl(
      claseCss,
      'restar',
      this.alejamiento.bind(this)
    )

    contenedorControl.appendChild(this.botonAcercar)
    contenedorControl.appendChild(this.botonAlejar)
  }

  /**
   * Acerca la vista del mapa por una unidad de zoom
   */
  acercamiento() {
    this.getMap()
      .getView()
      .animate({
        zoom: this.getMap().getView().getZoom() + 1,
        duration: 250,
      })
  }

  /**
   * Aleja la vista del mapa por una unidad de zoom
   */
  alejamiento() {
    this.getMap()
      .getView()
      .animate({
        zoom: this.getMap().getView().getZoom() - 1,
        duration: 250,
      })
  }
}
