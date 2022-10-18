import { Control } from 'ol/control'

export default class ZoomPersonalizado extends Control {
  /**
   * @param {Object} [opt_options] Control options.
   */
  constructor(opt_options) {
    const options = opt_options || {}

    const contenedorZoom = document.createElement('div')
    contenedorZoom.className = 'dai-zoom'

    const botonAcercar = document.createElement('button')
    botonAcercar.className = 'dai-zoom-button'
    botonAcercar.innerHTML = '<span class="icono-agregar" />'
    contenedorZoom.appendChild(botonAcercar)

    const botonAlejar = document.createElement('button')
    botonAlejar.className = 'dai-zoom-button'
    botonAlejar.innerHTML = '<span class="dai-icon-alejar" />'
    contenedorZoom.appendChild(botonAlejar)

    super({
      element: contenedorZoom,
      target: options.target,
    })

    botonAcercar.addEventListener('click', this.acercamiento.bind(this), false)
    botonAlejar.addEventListener('click', this.alejamiento.bind(this), false)
  }

  acercamiento() {
    this.getMap()
      .getView()
      .animate({ zoom: this.getMap().getView().getZoom() + 1, duration: 250 })
  }

  alejamiento() {
    this.getMap()
      .getView()
      .animate({ zoom: this.getMap().getView().getZoom() - 1, duration: 250 })
  }
}
