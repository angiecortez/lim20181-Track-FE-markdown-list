"use strict";
const fs = require('fs');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

// Extrae los links del archivo dado
const extractLinks = (path) => {
  const markdown = fs.readFileSync(path).toString();
  return markdownLinkExtractor(markdown);
};
  // [ [1, 2, 3], [4, 5, 6] ] -> [1, 2, 3, 4, 5, 6] se usara para concatenar dos arrays que haga en una línea
const flatten = arr => arr.reduce((memo, item) => memo.concat(item), [])
/* Walk through a dir for get all files dir Directory where gets all files */
const directories = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    // console.log(file);
    const newdir = dir + '/' + file;
    const stat = fs.statSync(newdir);
    // console.log(`File: ${newdir}`);
    // Check if is a subdirectory
    if (stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(directories(newdir));
    } else {
      /* Is a file */
      results.push(`${newdir}`);
    }
  });
  return results;
}

const mdLinks = (path, options) => {
  let promises = [];
  // let promise = new Promise((resolve, reject) => {
    path = fs.realpathSync(path);
    const stats = fs.statSync(path);
    if (stats.isDirectory()) {
      // Store the markdown files
      directories(path).forEach(file => {
        promises.push(getLinks(file, options));
      });
    } else {
      // Manda la promesa al array de promesas
      promises.push(getLinks(path, options));
    }
  // });
  return Promise.all(promises).then(values => /*Array.isArray(values[0]) ? values[0] : */ flatten(values));
}

// Promesa a ser llamada
const pushLink = (path, link) => {
  let linkArray = [];
  return new Promise((resolve, reject) => linkCheck(link.href, (err, result) => {
    // Lanza el error
    if (err) {return reject(err)};
    linkArray.push({
      href: link.href,
      text: link.text,
      file: path,
      status: result.statusCode,
      ok: result.status === 'alive'
    });
    resolve(linkArray);
  }));
}

const getLinks = (path, options) => {
  const links = extractLinks(path);
  let promises = []; // Almacena las promesas que serán llamadas
  let mylinks = [];
  // Manipulación del array
  let total = 0;
  let uniq = 0;
  let broken = 0;

  let result = null;
  // Bucle para validar los enlacs
  links.forEach(link => promises.push(pushLink(path, link)));
  return Promise.all(promises).then(res => {
    let linksHrefs = [];
    res.filter((item) => linksHrefs.push(item[0].href));
    // Obtiene el total y los únicos
    total = linksHrefs.length;
    uniq = linksHrefs.filter((item, index, array) => array.indexOf(item) === index);
    // Crea el array de lo que se necesita
    result = {
      total: total,
      uniq: uniq.length,
    };
    if (options.validate && options.stat) {
      // Realiza la cuenta de los enlaces rotos
      // console.log(res);
       res.map(r => {
        if (r[0].status != 200) broken++;
      });
      // Crea el array de lo que se necesita
      result.broken = broken;
      // console.log(total);
      return result;
    } else if (options.validate) {
      return [ ...res.map(r => r[0]) ];
    } else if (options.stat) {
      // console.log(result);
      return result;
    } else {
      return [ ...res.map(r =>{
        const object = {href:r[0].href, text:r[0].text, file: r[0].file}
        return object;
      }) ];

    }
  });
}
// mdLinks('src/', {
//     validate: false,
//     stat: true
//   })
//  .then(console.log)
//   .catch(console.error)

module.exports = mdLinks;
