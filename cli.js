#!/usr/bin/env node
const path = require('path');
// const angie = process.argv;
const mdLinks = require('./index.js');
// console.log(mdLinks);
let path1;

const options = {
  validate: false,
  stat: false
}

const message = () => {
  console.log(`\n Uso: \n\n$ md-links <route> <options> \n\n<route> es la ruta del archivo o carpeta a evaluar \n<options> tendrán los valores de:
--stats, muestra cantidad de links y cantidad de links únicos \n--validate, muestra ruta de archivo, texto de referencia, link, estado de link \n--stats --validate, muestra cantidad de links, cantidad de links únicos y cantidad de links rotos`);
}
const grab = (flag) => {
  const index = process.argv.indexOf(flag);
  return (index === -1) ? null : process.argv[index+1];
}

const validate = grab('--validate');
const stat = grab('--stat');

if (!validate || !stat) {
  message();
} else if (validate) {
  options.validate = true;
  mdLinks(path1, options).then(response=> console.log(response));
} else if (stat) {
  options.stat = true
  mdLinks(path1, options).then(response=> console.log(response));
} else if (stat && validate) {
  options.stat = true
  options.validate = true
  mdLinks(path1, options).then(response=> console.log(response));
}
