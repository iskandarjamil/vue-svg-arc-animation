# Vue SVG Arc Animation
Built with [Vue.js](https://vuejs.org) and [D3](https://d3js.org/). Developed by [iskandarjamil](http://iskandarjamil.com).

<p align="center">
  <img src="https://raw.githubusercontent.com/iskandarjamil/vue.svg-arc-animation.plugin/master/images/preview.gif" align="center" width="708"/>
</p>

## Demo
[View example](http://htmlpreview.github.io/?https://github.com/iskandarjamil/vue.svg-arc-animation.plugin/blob/master/example/index.html)!

## Installation
``` bash
# Intall via NPM
$ npm install vue-svg-arc-animation --save

or

# Intall via Bower
$ bower install vue-svg-arc-animation --save
```


## Usage
```html
<body>
  <div id="main">
    <svg-arc-animation :value="300" :total="1000"></svg-arc-animation>
    <svg-arc-animation :value="700" :total="1000" :size="100" :delay="200" :duration="2000" :color="'orange'"></svg-arc-animation>
    <svg-arc-animation :value="500" :total="1000" :size="80" :delay="400" :duration="2000" :color="'blue'" :direction="'rtl'"></svg-arc-animation>
  </div>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/vue/2.5.13/vue.js"></script>
  <script src="./dist/svg-arc-animation.min.js"></script>
  <script>
    var app = new Vue({
      el : '#main',
    });
  </script>
</body>
```

or

```html
<body>
  <div id="main"></div>

  <script>
    import Vue from 'vue';
    import SvgArcAnimation from "vue-svg-arc-animation";

    Vue.use(SvgArcAnimation);

    new Vue({
      el: '#main',
      template: `
        <div>
          <svg-arc-animation :value="300" :total="1000"></svg-arc-animation>
          <svg-arc-animation :value="700" :total="1000" :size="100" :delay="200" :duration="2000" :color="'orange'"></svg-arc-animation>
          <svg-arc-animation :value="500" :total="1000" :size="80" :delay="400" :duration="2000" :color="'blue'" :direction="'rtl'"></svg-arc-animation>
        </div>
      `,
    });
  </script>
</body>
```

## License
[MIT](https://github.com/iskandarjamil/vue.svg-arc-animation.plugin/blob/master/LICENSE) license.
