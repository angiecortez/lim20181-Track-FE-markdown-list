#!/usr/bin/env node
const path = require('path');
const [, , ...args] = process.argv;
console.log(args[0]);

const options = {
  validate: false,
  stat: false
}
