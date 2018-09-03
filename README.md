# Markdown Links

## Preámbulo

Esta libreria fue diseñada para encontrar links en archivos Markdown, y te hara validaciones, en caso pongas la opción `mdLinks --validate`, te mostrara el texto del archivo, el link, si el link esta roto, y el lugar en donde se encuentra el archivo.

Estos archivos, son rescatados con una libreria llamada `markdown-link-extractor`, que como bien dice el nombre extrae los link de todos los archivos markdown. Tambien se utilizo otra libreria llamada `link-check`, que verificara(hara peticiones HTTP), y me dira si dichos links estan rotos o no, y me lo retornara en un Array.

Para poder hacer las validaciones de dichos links, deberas escribir `mdLinks`, la ruta del archivo o carpeta del cual deseas hacer las validaciones y la opción `--validate`.

### Ejemplo --validate
```js
mdLinks README.md --validate
Esta linea de comandos nos dara este Array de objetos, los cuales tienes el 'Link, texto, la ruta, el estado y si la ruta esta rota o no'.

[
  { href: 'https://www.youtube.com/watch?v=WgSc1nv_4Gw',
  text: '¿Qué es Nodejs? Javascript en el Servidor - Fazt en YouTube',
  file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/README.md',
  status: 200,
  ok: true },
{ href: 'https://www.ibm.com/developerworks/ssa/opensource/library/os-nodejs/index.html',
  text: '¿Simplemente qué es Node.js? - IBM Developer Works, 2011',
  file: '/Users/Angie/Documents/javascript/lim20181-Track-FE-markdown-list/README.md',
  status: 200,
  ok: true }
]
```
Para poder saber cuantos links, cuantos links unicos existen y cuantos links rotos existen hay en dicha ruta, deberas escribir `mdLinks`, la ruta del archivo o carpeta del cual deseas saber dicha información y la opción `--validate --stat`.

### Ejemplo --validate --stat
```js
`mdLinks README.md --validate --stat`

[
  { total: 35,
    uniq: 32,
    broken: 1 }
]
```
Para poder saber cuantos links, cuantos links unicos existen en dicha ruta, deberas escribir `mdLinks`, la ruta del archivo o carpeta del cual deseas saber dicha información y la opción `--stat`.

### Ejemplo --stat
```js
`mdLinks README.md --stat`

[
  {
    total: 35,
    uniq: 32,
  }
]
```
