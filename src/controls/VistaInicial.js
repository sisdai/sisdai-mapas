import Control from 'ol/control/Control'

export default class VistaInicial extends Control {
  botonVistainicial = crearBoton('mapa-centro', this.reiniciarVista.bind(this))

  constructor() {
    const contenedorVistaInicial = document.createElement('div')
    contenedorVistaInicial.className =
      'mapa-control dai-vista-inicial ol-unselectable'

    super({
      element: contenedorVistaInicial,
      target: undefined,
    })

    contenedorVistaInicial.appendChild(this.botonVistainicial)
  }

  /**
   *
   */
  reiniciarVista() {
    this.getMap()
      .getView()
      .animate({ zoom: this.getMap().getView().getZoom() + 1, duration: 250 })
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
  boton.className = 'dai-vista-inicial-boton boton-icono boton-secundario'
  boton.innerHTML = `<span class="icono-${icono}" />`
  boton.addEventListener('click', accion, false)
  return boton
}
