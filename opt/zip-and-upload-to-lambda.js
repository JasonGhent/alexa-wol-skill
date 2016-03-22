#!/usr/bin/env node

'use strict';

// dependencies
var AWS     = require('aws-sdk');
var Zip     = require('adm-zip');
var params  = { FunctionName: 'Machine-WOL' };

// instantiations
var lambda  = new AWS.Lambda({ region: 'us-east-1' });
var zip     = new Zip();

// zip things up
console.log('Compressing lib to zip archive...');
zip.addLocalFolder('./lib');

console.log('Converting zip archive to Buffer...')
params.ZipFile = zip.toBuffer();

// Lambda
console.log('Sending buffer to Lambda..');
lambda.updateFunctionCode(params, function(err, data) {
  // an error occurred
  if (err) return console.log(JSON.stringify(err, null, 2), '\n', err.stack);

  // else successful response
  console.log('Lambda upload successful!')
});
