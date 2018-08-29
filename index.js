"use strict";
const fs = require('fs');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

// Extrae los links del archivo dado
const extractLinks = (path) => {
  const markdown = fs.readFileSync(path).toString();
  return markdownLinkExtractor(markdown);
};

/* Walk through a dir for get all files
 * @ param {string} dir Directory where gets all files */
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

async function mdLinks(path, options) {

  let promises = [];
  let promise = new Promise((resolve, reject) => {

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
  });

  return Promise.all(promises).then(response => {
    let r = [];
    for (let i = 0; i < response.length; i++) {
      for (let j = 0; j < response[i].length; j++) {
        r.push(response[i][j]);
      }
    }
    return r;
  });
}

// Promesa a ser llamada
const pushLink = (path, link) => {
  let linkArray = [];
  return new Promise((resolve, reject) => linkCheck(link.href, (err, result) => {
    // Lanza el error
    if (err) return reject(err);

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
  // Almacena las promesas que serán llamadas
  let promises = [];
  let mylinks = [];
  // Manipulación del array
  let total = 0;
  let uniq = 0;
  let broken = 0;

  let result = null;
  // Bucle para validar los enlacs
  links.forEach(link => promises.push(pushLink(path, link)));
  // Problema dos para leer los datos con directorios
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
      console.log(result);
      // console.log(total);
      return result;
    } else if (options.validate) {
      return res.map(r => r[0]);
    } else if (options.stat) {
      console.log(result);
      return result;
    } else {
      return result = {
        data: ""
      };
    }
  });
}
// mdLinks('src/', {
//     validate: false,
//     stat: true
//   }).then(response => {
//     console.log(response);
//
//     console.log("fin.");
//   })
//   .catch(err => console.log(err));

module.exports = mdLinks;
