import { Control } from 'ol/control'

export default class ZoomPersonalizado extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {}

    const contenedorZoom = document.createElement('div')
    contenedorZoom.className = 'dai-zoom ol-unselectable mapa-control'

    const botonAcercar = zoomBotonConIcono('agregar')
    contenedorZoom.appendChild(botonAcercar)

    const botonAlejar = zoomBotonConIcono('restar')
    contenedorZoom.appendChild(botonAlejar)

    super({
      element: contenedorZoom,
      target: options.target,
    })

    botonAcercar.addEventListener('click', this.acercamiento.bind(this), false)
    botonAlejar.addEventListener('click', this.alejamiento.bind(this), false)
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
 * @param {*} icono
 * @returns
 */
function zoomBotonConIcono(icono) {
  const boton = document.createElement('button')
  boton.className = 'dai-zoom-boton boton-icono boton-secundario'
  boton.innerHTML = `<span class="icono-${icono}" />`
  return boton
}
