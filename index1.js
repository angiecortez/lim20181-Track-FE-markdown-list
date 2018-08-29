"use strict";
const fs = require('fs');
const nodePath = require('path');
const linkCheck = require('link-check');
const markdownLinkExtractor = require('markdown-link-extractor');

const extractLinks = (path) => {
  const markdown = fs.readFileSync(path).toString();
  return markdownLinkExtractor(markdown);
};
const directories = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file =>{  // console.log(file);
    const newdir = dir + '/' + file;
    const stat = fs.statSync(newdir);
    console.log(newdir);
    // Check if is a subdirectory
    if (stat.isDirectory()) {
      /* Recurse into a subdirectory */
      results = results.concat(directories(newdir));
    }  /* Is a file */
      results.push(`${newdir}`);
  });
  return results;
}

const mdLinks = (path, options) => new Promise((resolve, reject) => {
  // Store the links
  let linkArray = [];
  // Store the markdown files
  let filesArray = [];
  let countLinks = 0;
  path = fs.realpathSync(path);
  console.log(`Path: ${path}`);
  const stats = fs.statSync(path);
  if (stats.isDirectory()) {
    // Get the absolute path of files
    filesArray = directories(path);
    // Count for exit the cicle
    let counter = 0;
    // Count of links
    filesArray.forEach((file) => {

    });
  } else {

  }

})


const pushLink = (path, link) => {
  let linkArray = [];
  let promises = [];
}
// module.exports = mdLinks;
