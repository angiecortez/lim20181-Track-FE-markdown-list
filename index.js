"use strict";
const fs = require('fs');
const nodePath = require('path');

const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

// const markdown = fs.readFileSync('README.md').toString();
// const links = markdownLinkExtractor(markdown);
//
//
// linkCheck('http://google.com', (err, result) => {
//    if (err) {
//        console.error(err);
//        return;
//    }
//    console.log(`${result.link} is ${result.status}`);
// });

const extractLinks = (path) => {
  const markdown = fs.readFileSync(path).toString();
  const links = markdownLinkExtractor(markdown);
  return links;
};

const mdLinks = (path, options) => new Promise ((resolve, reject) => {
  // console.log(fs.realpathSync(path));
  path = fs.realpathSync(path);
  let linkArrays = [];
  const stats = fs.statSync(path);
  if(stats.isDirectory()){
    fs.readdirSync(path).forEach(fileName => {
      fileName = nodePath.join(path, fileName);

      linkArrays = linkArrays.concat(mdLinks(fileName, options));
    })
  }else {
    extractLinks(path).forEach(link =>{
      linkArrays.push({
        href : link.href,
        text: link.text,
        file: path
      });
    });
  }
  resolve('linkArrays');
});
console.log(mdLinks("src"));
