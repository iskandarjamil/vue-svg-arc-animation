module.exports = {
  options: {
      spawn: false,
      livereload: '<%= package.grunt.livereload %>',
      debounceDelay: 50,
  },

	source_main: {
    files: [ 'src/*.js', 'src/*.vue' ],
    tasks: [ 'dev' ]
  },
};
