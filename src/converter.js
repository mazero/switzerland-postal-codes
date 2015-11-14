#!/usr/bin/env node

'use strict';

var fs   = require('fs');

var hash = {};
var data = fs.readFileSync('data/postal-codes.tsv', 'utf8');
data.split('\n').forEach(function (row) {
  var columns = row.split('\t');
  if (columns.length === 5){
    if (columns[0] in hash){
      hash[columns[0]] = hash[columns[0]] + ' - ' + columns[1];
    } else {
      hash[columns[0]] = columns[1];
    }
  }
});
fs.writeFileSync('dist/postal-codes.json', JSON.stringify(hash), 'utf8');
fs.writeFileSync('dist-node/index.js', 'module.exports=' + JSON.stringify(hash) + ';', 'utf8');
