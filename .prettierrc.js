module.exports = {
  /**
   * @property {number} [printWidth=80] Especifique la longitud de la línea en la que se ajustará
   * la impresora.
   *
   * No es el límite máximo de longitud de línea permitido. Es una forma de decirle a Prettier
   * aproximadamente que tan largo le gustaría que fueran las líneas. Prettier se esforzará por
   * cumplir con el ancho de impresión especificado. (**No intente usar printWidth como si fuera
   * el max-len de ESLint**, no son lo mismo).
   *
   * @see https://prettier.io/docs/en/options.html#print-width
   */
  printWidth: 80,

  /**
   * @property {number} [tabWidth=2] Especifique el número de espacios por nivel de identación.
   *
   * @see https://prettier.io/docs/en/options.html#tab-width
   */
  tabWidth: 2,

  /**
   * @property {boolean} [useTabs=false] Identación con tabulaciones en lugar de espacios.
   *
   * @see https://prettier.io/docs/en/options.html#tabs
   */
  useTabs: false,

  /**
   * @property {boolean} [semi=true] Imprima punto y coma al final de las declaraciones.
   *
   * @see https://prettier.io/docs/en/options.html#semicolons
   */
  semi: false,

  /**
   * @property {boolean} [singleQuote=false] Utilice comillas simples en lugar de comillas dobles.
   *
   * @see https://prettier.io/docs/en/options.html#quotes
   */
  singleQuote: true,

  /**
   * @property {string} [trailingComma='es5'] Imprima comas finales siempre que sea posible en
   * estructuras sintácticas separadas por comas de varias líneas. (Una matriz de una sola
   * línea, por ejemplo, nunca tiene comas al final).
   *
   * @see https://prettier.io/docs/en/options.html#trailing-commas
   */
  trailingComma: 'es5',

  /**
   * @property {boolean} [bracketSpacing=true] Print spaces between brackets in object literals.
   *
   * Opciones válidas:
   * - true -> { foo: bar }
   * - false -> {foo: bar}
   *
   * @see https://prettier.io/docs/en/options.html#bracket-spacing
   */
  bracketSpacing: true,

  /**
   * @property {boolean} [bracketSameLine=false] Coloque el > de un elemento HTML de varias
   * líneas (HTML, JSX, Vue, Angular) al final de la última línea en lugar de estar solo en la
   * línea siguiente (no se aplica a los elementos de cierre automático).
   *
   * @see https://prettier.io/docs/en/options.html#bracket-line
   */
  bracketSameLine: false,

  /**
   * @property {string} [arrowParens='always'] Incluya paréntesis alrededor de un único
   * parámetro de función de flecha.
   *
   * Opciones válidas:
   * - 'siempre' -> Siempre incluye parens: (x) => x
   * - 'evitar' -> Omita los paréntesis cuando sea posible: x => x
   *
   * @see https://prettier.io/docs/en/options.html#arrow-function-parentheses
   */
  arrowParens: 'avoid',

  /**
   * @property {string} [endOfLine='lf'] Por razones históricas, existen dos tipos comunes de
   * finales de línea en los archivos de texto. Es decir \n (o LF para salto de línea) y \r\n
   * (o CRLF para retorno de carro + salto de línea). El primero es común en Linux y macOS,
   * mientras que el segundo prevalece en Windows.
   *
   * @see https://prettier.io/docs/en/options.html#end-of-line
   */
  endOfLine: 'lf',

  /**
   * @property {string} [embeddedLanguageFormatting='auto'] Cuando Prettier identifica casos en
   * los que parece que ha colocado un código que sabe cómo formatear dentro de una cadena en
   * otro archivo, como en una plantilla etiquetada en JavaScript con una etiqueta llamada html
   * o en bloques de código en Markdown, por defecto intentará para formatear ese código.
   *
   * Opciones válidas:
   * - 'auto' -> formatee el código incrustado si Prettier puede identificarlo automáticamente.
   * - 'off' -> nunca formatee automáticamente el código incrustado.
   *
   * @see https://prettier.io/docs/en/options.html#embedded-language-formatting
   */
  embeddedLanguageFormatting: 'auto',

  /**
   * @property {boolean} [singleAttributePerLine=false] Aplique un solo atributo por línea en
   * HTML, Vue y JSX.
   *
   * Opciones válidas:
   * - falso -> no aplicar un solo atributo por línea.
   * - true -> impone un solo atributo por línea.
   *
   * @see https://prettier.io/docs/en/options.html#single-attribute-per-line
   */
  singleAttributePerLine: true,
}
