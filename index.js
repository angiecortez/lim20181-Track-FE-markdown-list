"use strict";
const fs = require('fs');
const nodePath = require('path');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

const extractLinks = (path) => {
  const markdown = fs.readFileSync(path).toString();
  const links = markdownLinkExtractor(markdown);
  return links;
};
let count = 0;
let uniques = 0;
let broken = 0;
/* Walk through a dir for get all files * @ param {string} dir Directory where gets all files */
const directories = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file =>{
    console.log(file);
    const newdir = dir + '/' + file;
    const stat = fs.statSync(newdir);
    console.log(newdir);
    // Check if is a subdirectory
    if (stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(directories(newdir));
    } else {
      /* Is a file */
      results.push(`${newdir}`);
    }
  }); return results;
}

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // Store the links
  let linkArray = [];
  // Store the markdown files
  let filesArray = [];
  let countLinks = 0;
  let counter = 0;
  path = fs.realpathSync(path);
  // console.log(`Path: ${path}`);
  const stats = fs.statSync(path);
  if (stats.isDirectory()) {
    console.log("Es un directorio\n");
    // Get the absolute path of files
    filesArray = directories(path);
    // Count of links;
    filesArray.forEach((file) => {
      console.log(`Extrayendo enlaces del directorio: ${file}`);
      let extractedLinks = extractLinks(file);
      countLinks += extractedLinks.length;
      console.log("Enlaces del archivo: " + file);
      extractedLinks.forEach((link) => {
        // console.log(`- ${JSON.stringify(link)}`);
        linkCheck(link.href, (err, result) => {
          // Exit of function linkCheck if error occurs
          if (err) return reject(err);
          if (options.validate) {
            linkArray.push({
              file: file,
              href: result.link,
              text: link.text,
              status: result.statusCode,
              ok: result.status === 'alive',
            //  text: result.text, //Undefined
            });
            counter++;
          }
          else if (options.stat) {
            linkArray.push({
              totalLinks: console.log(`existen ${extactedLinks.length} links en este archivo`),
              uniques: null,
            });
            counter++
          }
          else if (options.stat && options.validate) {
            linkArray.push({
              totalLinks: console.log(`existen ${extactedLinks.length} links en este archivo`),
              uniques: null,
              broken: result.status === 'dead',
            })
          }
          // The promise is fulfilled
          if (counter === countLinks) resolve(linkArray);
          console.log(`existen ${countLinks} links es esta carpeta`);
        });
      });
      console.log("\n");
    });
  } else {
    // console.log(typeof path);
    console.log(path);
    const extactedLinks = extractLinks(path);
    // console.log(extactedLinks.length);
    extactedLinks.forEach(link => {
      if (options.validate) {
        linkCheck(link.href, (err, result) => {
          if (err) return reject(err);
          linkArray.push({
            href: link.href,
            text: link.text,
            file: path,
            status: result.statusCode,
            ok: result.status === 'alive',
            broken: result.status === 'dead',

          });
          if (linkArray.length === extactedLinks.length) {
            extactedLinks.push()
            console.log(` existen ${extactedLinks.length} links en este archivo`);
            resolve(linkArray);
          }
        });
      }
      else if (options.stat) {
        linkArray.push({
          totalLinks: extactedLinks.length,
          uniques: null,
        });
          resolve(linkArray);
      }
      else if (options.stat && options.validate) {
        linkArray.push({
          totalLinks: console.log(`existen ${extactedLinks.length} links en este archivo`),
          uniques: null,
          broken: result.status === 'dead',
        })
        resolve(linkArray);
      }
    });
  }
});
// mdLinks('README.md', { validate:true }).then((links) => {
//   console.log(links);
// }).catch(console.error);
module.exports = mdLinks;
