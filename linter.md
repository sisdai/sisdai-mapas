# Linter de código

Permite definir ciertas reglas para que todos los desarrolladores de ese proyecto las cumplan y las apliquen en el código.

## EditorConfig

EditorConfig ayuda a mantener estilos de codificación coherentes para varios desarrolladores que trabajan en el mismo proyecto en varios editores e IDE. El proyecto EditorConfig consta de un formato de archivo para definir estilos de codificación y una colección de complementos de editor de texto que permiten a los editores leer el formato de archivo y adherirse a los estilos definidos. Los archivos EditorConfig son fáciles de leer y funcionan bien con los sistemas de control de versiones.

Visita [editorconfig.org](https://editorconfig.org) para más información

### Configuración EditorConfig

- Se agregó el archivo [.editorconfig](./.editorconfig)

### ESlint

Encuentra y soluciona problemas en tu código JavaScript

ESLint analiza estáticamente su código para encontrar problemas rápidamente. Está integrado en la mayoría de los editores de texto y puede ejecutar ESLint como parte de su proceso de integración continua.

Visita [eslint.org](https://eslint.org) para más información

### Configuración ESlint

- Se ejecutó el siguiente comando para instalar las dependencias necesarias para la cinfiguración de eslint con formateo de prettier:

```sh
vue add @vue/cli-plugin-eslint
```

- Además se habilitaron la opción de formatear al guardar y ejecutar el `linter` en cada `commit`.

### Prettier

Es un formateador de código que admite muchos lenguajes y se integra con la mayoría de los editores.

Permite configurarse para formatear al guardar cambios ahorrando tiempo y energía

### Configuración Prettier

- Se instaló cómo dependencia de desarrollo con:

```sh
npm install --save-dev --save-exact prettier
```

- Se agregó el archivo `.prettierrc.js` .
- Para habilitar el formateo al guardar en VScode, se añadío la configuración en [.vscode/settings.json](./.vscode/settings.json).
- Se agregó el script `prettier . --write` en el package.json para hacer la magia (en caso de que no funcione al guardar) ejecutando:

```sh
npm run format
```
