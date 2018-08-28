#!/usr/bin/env node
const path = require('path');
const mdLinks = require('./index.js');
// console.log(mdLinks);
let path1;
let options = {
  validate: false,
  stat: false
}
const message = () => {
  console.log(`\n Uso: \n\n$ md-links <route> <options> \n\n<route> es la ruta del archivo o carpeta a evaluar \n<options> tendrán los valores de:
--stats, muestra cantidad de links y cantidad de links únicos \n--validate, muestra ruta de archivo, texto de referencia, link, estado de link \n--stats --validate, muestra cantidad de links, cantidad de links únicos y cantidad de links rotos`);
}
const grab = (flag) => {
  // console.log(process.argv);
  const index = process.argv.indexOf(flag);
  if (process.argv.indexOf(2)) {
    path1 = process.argv[2];
    // console.log(path1);
  }
  return (index === -1) ? false : true;
}

options.validate = grab('--validate');
options.stat = grab('--stat');
options.help = grab('--help');
if (options.help) {
  message();
}

 mdLinks(path1, options)
 .then(response=> console.log(response))
 .catch(err => console.log(err));

// const validateLinkFunction = (linkTotal) => {
//   linkTotal.forEach(link =>{
//     if (err) return reject(err);
//     if (options.validate) {
//       linkCheck(link.href, (err, result) => {
//         if (err) return reject(err);
//         linkArray.push({
//           href: link.href,
//           text: link.text,
//           file: path,
//           status: result.statusCode,
//           ok: result.status === 'alive',
//         });
//        // counter++;
//         if (linkArray.length === extactedLinks.length) {
//           console.log(` existen ${extactedLinks.length} links en este archivo`);
//           resolve(linkArray);
//         }
//       });
//     }
//       else if (options.stat) {
//         linkArray.push({
//           totalLinks: console.log(`existen ${extactedLinks.length} links en este archivo`),
//           uniques: null,
//         });
//       }
//       else if (options.stat && options.validate) {
//         linkArray.push({
//           totalLinks: console.log(`existen ${extactedLinks.length} links en este archivo`),
//           uniques: null,
//           broken: null
//         })
//       }
//   })
// }
