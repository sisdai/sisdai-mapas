import Control from 'ol/control/Control'

/**
 *
 */
export default class ZoomPersonalizado extends Control {
  botonAcercar = crearBoton('agregar', this.acercamiento.bind(this))
  botonAlejar = crearBoton('restar', this.alejamiento.bind(this))

  /**
   *
   */
  constructor() {
    const contenedorZoom = document.createElement('div')
    contenedorZoom.className = 'mapa-control dai-zoom ol-unselectable'

    super({
      element: contenedorZoom,
      target: undefined,
    })

    contenedorZoom.appendChild(this.botonAcercar)
    contenedorZoom.appendChild(this.botonAlejar)
  }

  /**
   *
   */
  acercamiento() {
    this.getMap()
      .getView()
      .animate({ zoom: this.getMap().getView().getZoom() + 1, duration: 250 })
  }

  /**
   *
   */
  alejamiento() {
    this.getMap()
      .getView()
      .animate({ zoom: this.getMap().getView().getZoom() - 1, duration: 250 })
  }
}

/**
 *
 * @param {String} icono
 * @param {Function} accion
 * @returns
 */
function crearBoton(icono, accion) {
  const boton = document.createElement('button')
  boton.className = 'dai-zoom-boton boton-icono boton-secundario'
  boton.innerHTML = `<span class="icono-${icono}" />`
  boton.addEventListener('click', accion, false)
  return boton
}
