"use strict";
const fs = require('fs');
const nodePath = require('path');

const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

// const markdown = fs.readFileSync('README.md').toString();
// const links = markdownLinkExtractor(markdown);
// linkCheck('http://google.com', (err, result) => {
//    if (err) {
//        console.error(err);
//        return}
//    console.log(`${result.link} is ${result.status}`);
// });
const extractLinks = (path) => {
  const markdown = fs.readFileSync(path).toString();
  // console.log(markdown);
  const links = markdownLinkExtractor(markdown);
  // console.log(links);
  return links;
};
let linkArray = [];
let fileArray = [];
const mdLinks = async (path, options) => new Promise ((resolve, reject) => {
  path = fs.realpathSync(path);
  const stats = fs.statSync(path);
  // console.log(stats);
  if(stats.isDirectory()) {
    // console.log(path);
    // Promise.resolve('hello world')
    // Utilizar Promise.all()
    fs.readdirSync(path).forEach(async fileName => {
      // fileName = nodePath.join(path, fileName);
      let NewfileName = nodePath.join(path, fileName);
      // console.log(NewfileName);
      let Await = await mdLinks(NewfileName, options)
      fileArray = fileArray.concat(Await);
      // console.log(path);
    })
  } else {
    const extactedLinks = extractLinks(path);
    // console.log(extactedLinks);
    extactedLinks.forEach(link => {
      // console.log(link.href);
      if(options.validate) {
        linkCheck(link.href, (err, result) => {
          // console.log(result);
          if (err) {
            return reject(err);
          }

          linkArray.push({
            href: link.href,
            text: link.text,
            file: path,
            status: result.statusCode,
            ok: result.status === 'alive'
          });
          console.log(linkArray);
          // if (linkArray.length === extactedLinks.length) {
            // console.log(linkArray);
            resolve(linkArray);
          // }
        });
      } else {
        linkArray.push({
          href: link.href,
          text: link.text,
          file: path,
          status: result.statusCode,
          fail: result.status === 'dead'
        });
        // if (linkArray.length === extractLinks.length) {
          resolve(linkArray);
        // }
      }
    });
  }
});

Promise.all(mdLinks('src', { validate: true })).then((links) => {
  console.log(links);
}).catch(console.error);
