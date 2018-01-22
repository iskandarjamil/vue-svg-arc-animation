module.exports = {
	options: {
    port: '<%= package.grunt.port %>',
    hostname: '<%= package.grunt.hostname %>',
		livereload : '<%= package.grunt.livereload %>',
		keepAlive: true,
		base : {
			path: '<%= package.grunt.path %>',
			options: { maxAge: 1000*60*5 }
		}
  },
	server: {
		keepAlive: true,
	}
};
