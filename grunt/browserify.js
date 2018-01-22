module.exports = {
  options: {
		banner: '<%= package.grunt.banner %>',
		stripBanners: true,
    browserifyOptions: { debug: false },
    transform: [
      [
        "babelify", {
          "presets": [
            "env",
            "es2015",
          ],
          "plugins": [
            "transform-vue-jsx",
          ],
        }
      ],
    ],
  },
  dev: {
    src : [ 'src/*.js' ],
    dest : 'dist/svg-arc-animation.js',
  },
  prod: {
    options: {
      transform: [
        [
          "babelify", {
            "presets": [
              "env",
              "es2015",
            ],
            "plugins": [
              "transform-vue-jsx",
            ],
          }
        ],
        [
          "uglifyify", {
            sourceMap: false,
          },
        ],
      ],
    },
    src : [ 'src/*.js' ],
    dest : 'dist/svg-arc-animation.min.js',
  },
};
