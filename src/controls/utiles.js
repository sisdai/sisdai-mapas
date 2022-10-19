/**
 * @module controls/utiles
 */

/**
 * Crea un elemento html de tipo div, para usarse como contenedor del control, con las siguientes
 * características
 * @param {String} claseCss Clase que distinguirá al elemento contenedor
 * @returns {HTMLDivElement} Elemento html
 */
export function crearContenedorControl(claseCss) {
  const contenedorControl = document.createElement('div')

  contenedorControl.className = `mapa-control dai-${claseCss} ol-unselectable`

  return contenedorControl
}

/**
 * Crea un elemento html de tipo botón con las siguientes características
 * @param {String} claseCss Clase que distinguirá al elemento, recomendable usar la misma clase
 * del contenedor
 * @param {String} icono Icono que se visualizará dentro del botón
 * @param {Function} accion Función que se desencadenará con el evento click
 * @returns {HTMLButtonElement} Elemento html
 */
export function crearBotonControl(claseCss, icono, accion) {
  const boton = document.createElement('button')

  boton.className = `dai-${claseCss}-boton boton-icono boton-secundario`
  boton.innerHTML = `<span class="icono-${icono}" />`

  boton.addEventListener('click', accion, false)

  return boton
}
