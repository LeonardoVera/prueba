# Proyecto vanilla

Página básica con HTML, CSS y JavaScript, sin dependencias ni compilación.

## Ver la página

Abre `index.html` directamente en tu navegador.

## Archivos

- `index.html`: estructura de la página.
- `styles.css`: estilos básicos y adaptables a móviles.
- `main.js`: interacción del botón.

## Ejecutar los tests

Necesitas Node.js 24 o superior y npm.

```sh
npm ci
npm test
```

En PowerShell, si la política de ejecución bloquea `npm`, usa `npm.cmd ci` y `npm.cmd test`.

Los tests usan los módulos nativos `node:test` y `node:assert`, sin dependencias externas. Comprueban el estado inicial del mensaje, el saludo al hacer clic y el comportamiento con clics repetidos. El DOM se simula con un doble mínimo; no son pruebas en un navegador real.

## Integración continua

El workflow `.github/workflows/ci.yml` se ejecuta en cada push y pull request. Configura Node.js 24, ejecuta `npm ci` y después `npm test`. Si falla cualquier test, el workflow falla.

## Próximas iteraciones

Agregar el despliegue en GitHub Pages.
