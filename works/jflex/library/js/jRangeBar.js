/* jFlex library. Made by Jeto */
/* https://jflex.org */
/* https://jeto.org */


/*sliding counter*/
//TODO  touch events


'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
  var JRangeBarController = function () {
    function JRangeBarController(options) {
      _classCallCheck(this, JRangeBarController);

      this.parentEl = options.parent;
      this.minInput = options.min;
      this.maxInput = options.max;
      this.userRanges = options.ranges;
      this.addMethod = options.addMethod || null;
      this.ranges = [];
      this.events = {
        change: 'jRangeBar:change',
        updateUnit: 'jRangeBar:update-unit',
        updateUnitSilent: 'jRangeBar:update-unit:silent',
        updatePixel: 'jRangeBar:update-pixel',
        updatePixelSilent: 'jRangeBar:update-pixel:silent',
        refresh: 'jRangeBar:refresh',
        startEventArr: ['mousedown', 'touchstart', 'pointerdown'],
        moveEventArr: ['mousemove', 'touchmove', 'pointermove'],
        endEventArr: ['mouseup', 'touchend', 'pointerup']
      };
      this.tpl = '<div class="jrangebar-wrapper">\n                    <div class="jrangebar-inner">\n                      <span class="min"></span>\n                      <span class="max"></span>\n                    </div>\n                  </div>';

      this.init();
    }

    _createClass(JRangeBarController, [{
      key: 'init',
      value: function init() {
        this.$parent = $(this.parentEl);
        this.$minInput = $(this.minInput);
        this.$maxInput = $(this.maxInput);

        this.minInputValCached = this.baseMin = +this.$minInput.val();
        this.maxInputValCached = this.baseMax = +this.$maxInput.val();

        this.events.startEvent = this.events.startEventArr.join('.jRangeBar-' + counter + ' ') + '.jRangeBar-' + counter;
        this.events.moveEvent = this.events.moveEventArr.join('.jRangeBar-' + counter + ' ') + '.jRangeBar-' + counter;
        this.events.endEvent = this.events.endEventArr.join('.jRangeBar-' + counter + ' ') + '.jRangeBar-' + counter;

        this.renderRangeBar();
        this.setupDimentions();
        this.parseRanges();
        this.bindHandlers();
        this.attachHandlers();
      }
    }, {
      key: 'bindHandlers',
      value: function bindHandlers() {
        this._onMouseDown = this.onMouseDown.bind(this);
        this._onMouseUp = this.onMouseUp.bind(this);
        this._onMouseMove = this.onMouseMove.bind(this);

        this._onInput = this.onInput.bind(this);
        this._onChange = this.onChange.bind(this);

        this._onPixelUpdate = this.onPixelUpdate.bind(this);
        this._onPixelUpdateSilent = this.onPixelUpdate.bind(this, true);
        this._onUnitUpdate = this.onUnitUpdate.bind(this);
        this._onUnitUpdateSilent = this.onUnitUpdate.bind(this, true);
        this._onRefresh = this.onRefresh.bind(this);
      }
    }, {
      key: 'attachHandlers',
      value: function attachHandlers() {
        var _$wrapper$on;

        var minCounterId = '#' + this.$minCounter.attr('id');
        var maxCounterId = '#' + this.$maxCounter.attr('id');

        $('body').on(this.events.startEvent, minCounterId + ', ' + maxCounterId, this._onMouseDown);

        this.$minInput.add(this.$maxInput).on({
          'input': this._onInput,
          'change': this._onChange
        });

        this.$wrapper.on((_$wrapper$on = {}, _defineProperty(_$wrapper$on, this.events.updateUnit, this._onUnitUpdate), _defineProperty(_$wrapper$on, this.events.updateUnitSilent, this._onUnitUpdateSilent), _defineProperty(_$wrapper$on, this.events.updatePixel, this._onPixelUpdate), _defineProperty(_$wrapper$on, this.events.updatePixelSilent, this._onPixelUpdateSilent), _defineProperty(_$wrapper$on, this.events.refresh, this._onRefresh), _$wrapper$on));

        $(window).on('resize', this._onRefresh);
      }
    }, {
      key: 'detachHandlers',
      value: function detachHandlers() {
        var _$wrapper$off;

        this.$minCounter.add(this.$maxCounter).off(_defineProperty({}, this.events.startEvent, this._onMouseDown));

        this.$minInput.add(this.$maxInput).off({
          'input': this._onInput,
          'change': this._onChange
        });

        this.$wrapper.off((_$wrapper$off = {}, _defineProperty(_$wrapper$off, this.events.updateUnit, this._onUnitUpdate), _defineProperty(_$wrapper$off, this.events.updateUnitSilent, this._onUnitUpdateSilent), _defineProperty(_$wrapper$off, this.events.updatePixel, this._onPixelUpdate), _defineProperty(_$wrapper$off, this.events.updatePixelSilent, this._onPixelUpdateSilent), _defineProperty(_$wrapper$off, this.events.refresh, this._onRefresh), _$wrapper$off));

        $(window).off('resize', this._onRefresh);
      }
    }, {
      key: 'renderRangeBar',
      value: function renderRangeBar() {
        var $wrapper = this.$wrapper = $(this.tpl);
        this.$inner = $wrapper.find('.jrangebar-inner');
        this.$minCounter = $wrapper.find('.min');
        this.$maxCounter = $wrapper.find('.max');

        this.$minCounter.attr('id', 'jrangebar-min-' + counter);
        this.$maxCounter.attr('id', 'jrangebar-max-' + counter);
        counter++;

        if (this.addMethod) {
          this.addMethod(this.$parent, $wrapper);
        } else {
          this.$parent.append($wrapper);
        }
      }
    }, {
      key: 'onMouseDown',
      value: function onMouseDown(e) {
        var target = e.currentTarget;
        var innerCoords = this.$inner[0].getBoundingClientRect();
        var clientX = this.getPosition(e);

        e.preventDefault();

        var $target = this.$target = $(target);

        if ($target.is(this.$minCounter)) {
          this.shiftX = clientX - innerCoords.left;
        } else if ($target.is(this.$maxCounter)) {
          this.shiftX = innerCoords.right - clientX;
        } else {
          return;
          //this.shiftX = 0;
        }

        //console.dir(e);
        //console.log(this.shiftX);

        $('body').on(this.events.moveEvent, this._onMouseMove);
        $('body').on(this.events.endEvent, this._onMouseUp);
      }
    }, {
      key: 'onMouseMove',
      value: function onMouseMove(e) {
        this.moveAt(e);
        this.pixelToUnit();
      }
    }, {
      key: 'moveAt',
      value: function moveAt(e) {
        var wrapperCoords = this.$wrapper[0].getBoundingClientRect();
        var wrapperWidth = this.wrapperWidth;
        var minCounterWidth = this.minCounterWidth;
        var maxCounterWidth = this.maxCounterWidth;
        var $target = this.$target;
        var clientX = this.getPosition(e);
        var shiftX = this.shiftX;

        if ($target.is(this.$minCounter)) {

          var left = clientX - wrapperCoords.left - shiftX;
          var maxLeft = wrapperWidth - minCounterWidth - maxCounterWidth - parseFloat(this.$inner.css('right')) - 1;

          if (left < 0) {
            left = 0;
          } else if (left > maxLeft) {
            left = maxLeft;
          }

          this.$inner.css('left', left + 'px');
        } else if ($target.is(this.$maxCounter)) {
          var right = wrapperCoords.right - clientX - shiftX;
          var maxRight = wrapperWidth - minCounterWidth - maxCounterWidth - parseFloat(this.$inner.css('left')) - 1;

          if (right < 0) {
            right = 0;
          } else if (right > maxRight) {
            right = maxRight;
          }

          this.$inner.css('right', right + 'px');
        }
      }
    }, {
      key: 'onMouseUp',
      value: function onMouseUp() {
        var _$$off;

        $('body').off((_$$off = {}, _defineProperty(_$$off, this.events.moveEvent, this._onMouseMove), _defineProperty(_$$off, this.events.endEvent, this._onMouseUp), _$$off));
        this.$target = null;
      }
    }, {
      key: 'onInput',
      value: function onInput(e) {
        var $target = this.$target = $(e.target);
        var val = +$target.val();
        var maxVal = void 0;
        var minVal = void 0;

        if (!this.isNumeric(val)) return;

        if ($target.is(this.$minInput)) {
          maxVal = this.maxInputValCached;
          minVal = this.baseMin;
        } else if ($target.is(this.$maxInput)) {
          maxVal = this.baseMax;
          minVal = this.minInputValCached;
        }

        if (val > maxVal) {
          val = maxVal;
        } else if (val < minVal) {
          val = minVal;
        }

        if ($target.is(this.$minInput)) {
          this.minInputValCached = val;
        } else if ($target.is(this.$maxInput)) {
          this.maxInputValCached = val;
        }

        this.unitToPixel();

        this.$target = null;
      }
    }, {
      key: 'onChange',
      value: function onChange(e) {
        this.refreshInput(e);
      }
    }, {
      key: 'onRefresh',
      value: function onRefresh() {
        this.setupDimentions();
        this.parseRanges();
      }
    }, {
      key: 'refreshInput',
      value: function refreshInput(e) {
        var $target = $(e.target);

        if ($target.is(this.$minInput)) {
          $target.val(this.minInputValCached);
        } else if ($target.is(this.$maxInput)) {
          $target.val(this.maxInputValCached);
        }
      }
    }, {
      key: 'onPixelUpdate',
      value: function onPixelUpdate(silent) {
        this.pixelToUnit(silent);
      }
    }, {
      key: 'onUnitUpdate',
      value: function onUnitUpdate(silent) {
        this.minInputValCached = +this.$minInput.val();
        this.maxInputValCached = +this.$maxInput.val();

        this.unitToPixel(silent);
      }
    }, {
      key: 'pixelToUnit',
      value: function pixelToUnit(silentProcess) {
        var left = parseFloat(this.$inner.css('left'));
        var right = parseFloat(this.$inner.css('right'));
        var minVal = 0;
        var maxVal = 0;

        if (this.ranges.length) {
          minVal = Math.round(this.getCompoundRange('left', 'unit'));
          maxVal = Math.round(this.getCompoundRange('right', 'unit'));
        } else {
          minVal = Math.round(left * this.unitInPixel);
          maxVal = Math.round((this.fullPixelRange - right) * this.unitInPixel);
        }

        this.minInputValCached = minVal;
        this.maxInputValCached = maxVal;

        this.$minInput.val(minVal);
        this.$maxInput.val(maxVal);

        if (silentProcess) return;

        this.$wrapper.add(this.$minInput).add(this.$maxInput).trigger(this.events.change);
      }
    }, {
      key: 'unitToPixel',
      value: function unitToPixel(silentProcess) {
        var left = void 0;
        var right = void 0;

        if (this.ranges.length) {
          left = this.getCompoundRange('left', 'pixel');
          right = this.getCompoundRange('right', 'pixel');
        } else {
          left = this.baseMin / this.unitInPixel;
          right = this.fullPixelRange - this.baseMax / this.unitInPixel;
        }

        this.$inner.css('left', left + 'px');
        this.$inner.css('right', right + 'px');

        if (silentProcess) return;

        this.$wrapper.add(this.$minInput).add(this.$maxInput).trigger(this.events.change);
      }
    }, {
      key: 'parseRanges',
      value: function parseRanges() {
        var prevUnitSum = this.baseMin;
        var prevPixelSum = 0;

        if (!this.userRanges || !$.isArray(this.userRanges)) return;

        this.ranges = [];

        for (var i = 0; i < this.userRanges.length; i++) {
          var currPixelRange = this.userRanges[i].pixelRange;
          var currUnitRange = this.userRanges[i].unitRange;
          var currRange = {};

          /*if (!isNumeric(currPixelRange) || !isNumeric(currUnitRange)) {
           return false;
           }*/

          if (typeof currPixelRange === 'string' && ~currPixelRange.lastIndexOf('%')) {
            currPixelRange = this.fullPixelRange * parseFloat(currPixelRange) / 100; //+ prevPixelSum;
          } else {
            currPixelRange = parseInt(currPixelRange);
          }

          if (typeof currUnitRange === 'string' && ~currUnitRange.lastIndexOf('%')) {
            currUnitRange = this.fullUnitRange * parseFloat(currUnitRange) / 100 + this.baseMin;
          } else {
            currUnitRange = parseInt(currUnitRange);
          }

          currRange.pixelRange = currPixelRange;
          currRange.unitRange = currUnitRange;
          this.ranges.push(currRange);

          prevPixelSum = currPixelRange;
          prevUnitSum = currUnitRange;
        }

        if (this.fullUnitRange !== prevUnitSum) {
          this.ranges.push({
            unitRange: this.baseMax,
            pixelRange: this.fullPixelRange
          });
        }
      }
    }, {
      key: 'getCompoundRange',
      value: function getCompoundRange(direction, outputUnit) {
        var prevPixelRange = 0;
        var prevUnitRange = this.baseMin;
        var sourceUnit = 0;
        var result = 0;

        if (direction === 'left') {
          if (outputUnit === 'pixel') {
            sourceUnit = this.minInputValCached - this.baseMin;
          } else if (outputUnit === 'unit') {
            sourceUnit = parseFloat(this.$inner.css('left'));
          }
        } else if (direction === 'right') {
          if (outputUnit === 'pixel') {
            sourceUnit = this.maxInputValCached - this.baseMin;
          } else if (outputUnit === 'unit') {
            sourceUnit = this.fullPixelRange - parseFloat(this.$inner.css('right'));
          }
        }

        for (var i = 0; i < this.ranges.length; i++) {
          var currPixelRange = this.ranges[i].pixelRange;
          var currUnitRange = this.ranges[i].unitRange;
          var currUnitInPixel = 0;

          currPixelRange = currPixelRange - prevPixelRange;
          currUnitRange = currUnitRange - prevUnitRange;
          currUnitInPixel = currUnitRange / currPixelRange;

          if (outputUnit === 'pixel') {
            if (sourceUnit > currUnitRange) {
              sourceUnit -= currUnitRange;
              result += currUnitRange / currUnitInPixel;
            } else {
              result += sourceUnit / currUnitInPixel;

              if (direction === 'left') {
                return result;
              } else if (direction === 'right') {
                return this.fullPixelRange - result;
              }
            }
          } else if (outputUnit === 'unit') {
            if (sourceUnit > currPixelRange) {
              sourceUnit -= currPixelRange;
              result += currPixelRange * currUnitInPixel;
            } else {
              result += sourceUnit * currUnitInPixel;
              return result;
            }
          }

          prevPixelRange = this.ranges[i].pixelRange;
          prevUnitRange = this.ranges[i].unitRange;
        }
      }
    }, {
      key: 'getDimentions',
      value: function getDimentions() {
        var fullUnitRange = this.baseMax - this.baseMin;
        var wrapperWidth = this.$wrapper.width();
        var minCounterWidth = this.$minCounter.outerWidth();
        var maxCounterWidth = this.$maxCounter.outerWidth();
        var fullPixelRange = wrapperWidth - minCounterWidth - maxCounterWidth - 1; // - 2;
        var unitInPixel = fullUnitRange / fullPixelRange;

        return {
          unitRange: fullUnitRange,
          pixelRange: fullPixelRange,
          unitInPixel: unitInPixel,
          wrapperWidth: wrapperWidth,
          minCounterWidth: minCounterWidth,
          maxCounterWidth: maxCounterWidth
        };
      }
    }, {
      key: 'setupDimentions',
      value: function setupDimentions() {
        var ranges = this.getDimentions();

        this.fullUnitRange = ranges.unitRange;
        this.fullPixelRange = ranges.pixelRange;
        this.unitInPixel = ranges.unitInPixel;
        this.wrapperWidth = ranges.wrapperWidth;
        this.minCounterWidth = ranges.minCounterWidth;
        this.maxCounterWidth = ranges.maxCounterWidth;
      }
    }, {
      key: 'getPosition',
      value: function getPosition(e) {
        // Get the offset DIRECTION relative to the viewport
        var coordinate = 'x';
        var ucCoordinate = 'X';
        //let rangePos = this.$inner[0].getBoundingClientRect()['left'];
        var pageCoordinate = 0;

        if (typeof e.originalEvent['client' + ucCoordinate] !== 'undefined') {
          pageCoordinate = e.originalEvent['client' + ucCoordinate];
        } else if (e.originalEvent.touches && e.originalEvent.touches[0] && typeof e.originalEvent.touches[0]['client' + ucCoordinate] !== 'undefined') {
          pageCoordinate = e.originalEvent.touches[0]['client' + ucCoordinate];
        } else if (e.currentPoint && typeof e.currentPoint[coordinate] !== 'undefined') {
          pageCoordinate = e.currentPoint[coordinate];
        }

        return pageCoordinate; // - rangePos;
      }
    }, {
      key: 'isNumeric',
      value: function isNumeric(n) {
        return !isNaN(parseFloat(n)) && isFinite(n);
      }
    }, {
      key: 'getSelf',
      value: function getSelf() {
        return this;
      }
    }]);

    return JRangeBarController;
  }();

  var counter = 0;

  $.fn.jRangeBar = function () {
    var _ = this;
    var options = arguments[0] || {};
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < _.length; i++) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
        options.parent = _[i];
        _[i].jRangeBar = new JRangeBarController(options);
      } else {
        var result = _[i].jRangeBar[options].call(_[i].jRangeBar, args);

        if (typeof result !== 'undefined') return result;
      }
    }

    return _;
  };
});
