/* jFlex library. Made by Jeto */
/* https://jflex.org */
/* https://jeto.org */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD (Register as an anonymous module)
    define(['jquery'], factory);
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
})(function ($) {
  var JPlayer = function () {
    function JPlayer() {
      _classCallCheck(this, JPlayer);

      this.volume = 30;
      this.player = null;
      this.loop = false;
    }

    _createClass(JPlayer, [{
      key: 'init',
      value: function init(source, loop, volume) {
        if (!source) {
          return;
        }

        this.source = source;
        this.volume = volume || this.volume;
        this.loop = loop || this.loop;
        this.activate();
      }
    }, {
      key: 'activate',
      value: function activate() {
        var player = this.player;

        if (player) {
          this.pause();
        } else {
          player = this.player = new Audio();
          player.autoplay = true;
        }

        player.loop = this.loop;
        player.src = this.source;
        player.volume = this.volume / 100; // min volume 0, max 1
      }
    }, {
      key: 'play',
      value: function play() {
        if (!this.player) return;

        this.player.play();
      }
    }, {
      key: 'pause',
      value: function pause() {
        if (!this.player) return;

        this.player.pause();
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.pause();
        this.player = null;
      }
    }, {
      key: 'volumeUp',
      value: function volumeUp(volume) {
        if (!this.player) return;

        if (this.isNumeric(volume)) {
          this.volume += volume;
        } else {
          this.volume += 10;
        }

        this.volume = this.volume <= 100 ? this.volume : 100;
        this.player.volume = this.volume / 100;
      }
    }, {
      key: 'volumeDown',
      value: function volumeDown(volume) {
        if (!this.player) return;

        if (this.isNumeric(volume)) {
          this.volume -= volume;
        } else {
          this.volume -= 10;
        }

        this.volume = this.volume >= 0 ? this.volume : 0;
        this.player.volume = this.volume / 100;
      }
    }, {
      key: 'loopToggler',
      value: function loopToggler(loop) {
        if (!this.player) return;

        if (loop !== undefined) {
          this.loop = loop;
        } else {
          this.loop = !this.loop;
        }

        this.player.loop = this.loop;
      }
    }, {
      key: 'isNumeric',
      value: function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    }]);

    return JPlayer;
  }();

  var player = new JPlayer();

  $.jPlayer = player;
});

