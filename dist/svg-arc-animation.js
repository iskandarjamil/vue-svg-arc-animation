/*!
* vue-svg-arc-animation v0.0.1
* Copyright 2018 Iskandar Jamil <iskandar.jamil@vltkl.com>
*/

(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
if (typeof d3 === 'undefined') {
  throw new Error('D3.js version 4 (v4) is required. Please include this https://d3js.org/d3.v4.min.js in your script tag. More info on D3, please visit https://d3js.org/');
}

var SvgArcAnimationComponent = {
  name: "svg-arc-animation",
  render: function render(h) {
    var vm = this;
    return h(
      'svg',
      {
        attrs: { width: vm.boxSize, height: vm.boxSize, viewBox: '0 0 ' + vm.boxSize + ' ' + vm.boxSize },
        on: {
          'click': vm.restart
        },
        style: {
          cursor: 'pointer',
          maxWidth: '100%'
        } },
      [h(
        'foreignObject',
        {
          attrs: { width: vm.boxSize, height: vm.boxSize }
        },
        [h(
          'div',
          { 'class': 'svg_aa--txt-wrapper', style: {
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
              height: '100%'
            } },
          [h(
            'div',
            { 'class': 'svg_aa--txt-content', style: {
                color: vm.color,
                fontSize: vm.boxSize / 12 * 0.2 + 'em',
                fontWeight: 'bold'
              } },
            [vm.fgTxt, vm.textOffset]
          )]
        )]
      ), h(
        'g',
        {
          attrs: { transform: 'translate(' + vm.boxSize / 2 + ',' + vm.boxSize / 2 + ')' }
        },
        [h(
          'g',
          { 'class': 'svg_aa--progress_meter' },
          [h(
            'path',
            { 'class': 'svg_aa--bg',
              attrs: { d: vm.bg,
                'fill-opacity': '0',
                stroke: vm.color,
                'stroke-width': vm.bgBorder,
                'stroke-opacity': '1',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            },
            []
          ), h(
            'path',
            { 'class': 'svg_aa--fg', ref: vm.uniqueId + '-fg', attrs: { transform: vm.directionAnim,
                d: vm.fg,
                'fill-opacity': '0',
                stroke: vm.color,
                'stroke-width': vm.fgBorder,
                'stroke-opacity': '0',
                'stroke-linecap': 'round',
                'stroke-linejoin': 'round'
              }
            },
            []
          )]
        )]
      )]
    );
  },

  props: {
    value: {
      type: Number,
      default: 500
    },
    total: {
      type: Number,
      default: 1000
    },
    textOffset: {
      type: String,
      default: ''
    },
    size: {
      type: Number,
      default: 75
    },
    padding: {
      type: Number,
      default: 10
    },
    direction: {
      type: String,
      default: 'ltr'
    },
    duration: {
      type: Number,
      default: 1200
    },
    delay: {
      type: Number,
      default: 0
    },
    color: {
      type: String,
      default: "red"
    },
    bgBorder: {
      type: Number,
      default: 2
    },
    fgBorder: {
      type: Number,
      default: 8
    },
    start: {
      type: Boolean,
      default: true
    }
  },
  data: function data() {
    return {
      shortName: 'svg-aa',
      twoPi: Math.PI * 2,
      easing: d3.easeBounce,
      fgTxt: 0
    };
  },

  computed: {
    uniqueId: function uniqueId() {
      return this.shortName + '-' + this._uid;
    },
    percentage: function percentage() {
      return this.value < 1 ? 0 : this.value / this.total * 100;
    },
    boxSize: function boxSize() {
      return (this.size + this.padding) * 2;
    },
    bg: function bg() {
      return this.setArc({ endAngle: this.twoPi });
    },
    fg: function fg() {
      return this.setArc({ endAngle: this.twoPi });
    },
    directionAnim: function directionAnim() {
      return this.direction === 'ltr' ? 'rotate(180, 0, 0) scale(1,-1)' : 'rotate(0, 0, 0) scale(1, 1)';
    }
  },
  methods: {
    init: function init() {
      var vm = this;

      if (this.start) {
        Vue.nextTick(function () {
          setTimeout(function () {
            vm.animateDraw();
          }, vm.delay);
        });
      }

      /**
       * Animate All SVG
       */
      this.$parent.$on('animate', function () {
        Vue.nextTick(function () {
          setTimeout(function () {
            vm.animateDraw();
          }, vm.delay);
        });
      });

      /**
       * Animate single/target SVG
       */
      this.$on('animate', function () {
        Vue.nextTick(function () {
          setTimeout(function () {
            vm.animateDraw();
          }, vm.delay);
        });
      });
    },
    animateDraw: function animateDraw() {
      var vm = this;
      var new_startAngle = 0,
          new_endAngle,
          interpolate_start,
          interpolate_end;

      if (vm.value < 1) return;

      d3.select(vm.$refs[vm.uniqueId + '-fg']).attr('stroke-opacity', 1).transition().ease(vm.easing).duration(vm.duration).attrTween("d", function () {
        return vm.arcTween({ endAngle: 0 }, vm.percentage / 100);
      });
    },
    setArc: function setArc(callback) {
      var vm = this;
      var fn = d3.arc().startAngle(0).innerRadius(vm.size).outerRadius(vm.size).cornerRadius(50);
      return fn(callback);
    },
    arcTween: function arcTween(d, new_score) {
      var vm = this;
      var new_startAngle = 0,
          new_endAngle,
          interpolate_start,
          interpolate_end,
          txtCalc;

      new_endAngle = new_startAngle + new_score * (2 * Math.PI);
      interpolate_start = d3.interpolate(d.startAngle, new_startAngle);
      interpolate_end = d3.interpolate(d.endAngle, new_endAngle);

      return function (t) {
        d.endAngle = interpolate_end(t);
        txtCalc = d.endAngle / new_endAngle * vm.value;
        vm.fgTxt = txtCalc < 1 ? 0 : txtCalc.toFixed(0);
        return vm.setArc(d);
      };
    },
    restart: function restart(event) {
      var vm = this;
      vm.fgTxt = 0;
      d3.select(vm.$refs[vm.uniqueId + '-fg']).attr('stroke-opacity', 1).transition().duration(10).attrTween("d", function () {
        return vm.arcTween({ endAngle: 0 }, 0.01);
      });

      Vue.nextTick(function () {
        setTimeout(function () {
          vm.animateDraw();
        }, 10);
      });
    }
  },
  mounted: function mounted() {
    this.init();
  }
};

var SvgArcAnimation = {
  install: function install(Vue, options) {
    Vue.component(SvgArcAnimationComponent.name, SvgArcAnimationComponent);
  }
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(SvgArcAnimation);
}

exports.default = SvgArcAnimation;

},{}]},{},[1]);
