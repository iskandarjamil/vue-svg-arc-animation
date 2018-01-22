/*!
 * Project's Gruntfile
 * https://iskandarjamil.com/
 * Copyright (c) 2018 iskandarjamil
 */

var path = require('path');

module.exports = function(grunt) {
  require('time-grunt')(grunt);
  require('jit-grunt')(grunt);

  var pkg = grunt.file.readJSON('package.json');
  var banner = pkg.grunt.banner;
  var env = process.env.NODE_ENV || 'development';

  grunt.initConfig({
    package : pkg,
    banner  : banner,

    browserify : require('./grunt/browserify.js'),
    clean      : require('./grunt/clean.js'),
    connect    : require('./grunt/connect.js'),
    jshint     : require('./grunt/jshint.js'),
    watch      : require('./grunt/watch.js'),
  });


  grunt.registerTask('dev', [
    'browserify:dev',
  ]);
  grunt.registerTask('prod', [
    'clean',
    'dev',
    'browserify:prod',
  ]);

};
