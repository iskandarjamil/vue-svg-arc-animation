module.exports = {
  options: {
  	banner: '<%= package.grunt.banner %>',
    stripBanners: false
  },
	main: {
		files: {
			'dist/svg-arc-animation.min.js': ['dist/svg-arc-animation.min.js']
		}
	},
};
