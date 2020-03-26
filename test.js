var AJV = require('ajv')
var fs = require('fs')
var glob = require('glob')
var path = require('path')

var ajv = new AJV()
var schema = require('./schema')

var error = false

if (ajv.validateSchema(schema)) {
  console.log('schema.json: valid')
} else {
  error = true
  ajv.errors.forEach(function (error) {
    console.log(error)
  })
}

var licenses = glob.sync('licenses/*.json')

licenses.forEach(function (license) {
  var data = require(path.join(process.cwd(), license))
  if (ajv.validate(schema, data)) {
    console.log(license + ': valid')
  } else {
    error = true
    console.log(license + ':')
    ajv.errors.forEach(function (error) {
      console.log(error)
    })
  }
})

if (error) process.exit(1)
