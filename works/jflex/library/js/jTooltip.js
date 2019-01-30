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
  var JTooltip = function () {
    function JTooltip(options) {
      _classCallCheck(this, JTooltip);

      this.block = options.block;
      this.content = options.content || '';
      this.tooltipPosition = options.position || 'bottom';
      this.extraMargin = options.extraMargin || 5;
      this.showAnimation = options.showAnimation || 'fade';
      this.hideAnimation = options.hideAnimation || 'fade';
      this.showAnimationSpeed = options.showAnimationSpeed || 200;
      this.hideAnimationSpeed = options.hideAnimationSpeed || 200;
      this.customContainerClass = options.customContainerClass || '';
      this.tpl = {
        tooltipContainer: '<div class="jtooltip"></div>',
        tooltipInner: '<div class="jtooltip-inner"></div>',
        tooltipArrow: '<div class="jtooltip-arrow"></div>'
      };
      this.events = {
        beforeOpen: 'jTooltip:beforeOpen',
        afterOpen: 'jTooltip:afterOpen',
        beforeClose: 'jTooltip:beforeClose',
        afterClose: 'jTooltip:afterClose'
      };

      this.init();
    }

    _createClass(JTooltip, [{
      key: 'init',
      value: function init() {
        if (!this.block) return;

        var debounceDuration = this.showAnimationSpeed + this.hideAnimationSpeed + 20;
        this.$block = $(this.block);

        this._addTooltipHandler = this.debounce(this.addTooltipHandler, debounceDuration).bind(this);
        this._removeTooltipHandler = this.removeTooltipHandler.bind(this);

        this.content = this.content || this.block.getAttribute('data-jtooltip-title') || this.block.getAttribute('title') || this.block.getAttribute('name');

        $(this.block).on({
          'mouseenter': this._addTooltipHandler,
          'mouseleave': this._removeTooltipHandler
        });

        this.running = true;
      }
    }, {
      key: 'addTooltipHandler',
      value: function addTooltipHandler(e) {
        e.preventDefault();

        var title = this.$block.attr('title');

        if (title) {
          this.$block.removeAttr('title').attr('data-cached-title', title);
        }

        this.addTooltip();
      }
    }, {
      key: 'removeTooltipHandler',
      value: function removeTooltipHandler(e) {
        e.preventDefault();

        var cachedTitle = this.$block.attr('data-cached-title');

        if (cachedTitle) {
          this.$block.removeAttr('data-cached-title').attr('title', cachedTitle);
        }

        this.removeTooltip();
      }
    }, {
      key: 'addTooltip',
      value: function addTooltip() {
        this.renderTooltip();
        this.setTooltipPos(this.tooltipPosition);
        this.showTooltip();
      }
    }, {
      key: 'renderTooltip',
      value: function renderTooltip(hidden) {
        var $tooltip = this.$tooltip = $(this.tpl.tooltipContainer);
        var $inner = this.$inner = $(this.tpl.tooltipInner);
        var $arrow = this.$arrow = $(this.tpl.tooltipArrow);
        var content = this.content;
        var customStyleClass = this.getPartialClass(this.block, 'js__jtooltip-s_') || '';

        $inner.append(content);
        $tooltip.append($inner).append($arrow).addClass(customStyleClass).addClass(this.customContainerClass).appendTo('body');

        if (hidden) {
          $tooltip.hide();
        }
      }
    }, {
      key: 'setTooltipPos',
      value: function setTooltipPos(pos, force) {
        var baseTooltipPos = this.tooltipPosition;
        var isAvaliablePos = this.getAvailiablePos(pos);
        var currForce = false;
        var blockCoords = this.getCoords(this.block);
        var $tooltip = this.$tooltip;
        var $arrow = this.$arrow;
        var offset = this.extraMargin;
        var top = null;
        var left = null;
        var arrowClass = '';
        var arrowCss = {};

        $tooltip.show();

        var tooltipWidth = $tooltip.outerWidth();
        var tooltipHeight = $tooltip.outerHeight();

        if (!isAvaliablePos && !force) {
          var nextPos = '';

          switch (pos) {
            case 'top':
              if (baseTooltipPos === pos) {
                nextPos = 'bottom';
              } else if (baseTooltipPos === 'bottom') {
                nextPos = 'right';
              } else if (baseTooltipPos === 'left' || baseTooltipPos === 'right') {
                nextPos = baseTooltipPos;
                currForce = true;
              }
              break;
            case 'right':
              if (baseTooltipPos === 'left') {
                nextPos = 'bottom';
              } else {
                nextPos = 'left';
              }
              break;
            case 'bottom':
              if (baseTooltipPos === 'top') {
                nextPos = 'right';
              } else {
                nextPos = 'top';
              }
              break;
            case 'left':
              if (baseTooltipPos === pos) {
                nextPos = 'right';
              } else if (baseTooltipPos === 'right') {
                nextPos = 'bottom';
              } else if (baseTooltipPos === 'top' || baseTooltipPos === 'bottom') {
                nextPos = baseTooltipPos;
                currForce = true;
              }
              break;
          }

          this.setTooltipPos(nextPos, currForce);
          return;
        }

        switch (pos) {
          case 'top':
            top = blockCoords.top - (tooltipHeight + offset);
            left = this.getCenterTooltip(pos);
            arrowCss = this.getArrowCenter(pos, left);
            arrowClass = 'jtooltip-t';
            break;
          case 'right':
            top = this.getCenterTooltip(pos);
            left = blockCoords.right + offset;
            arrowCss = this.getArrowCenter(pos, top);
            arrowClass = 'jtooltip-r';
            break;
          case 'bottom':
            top = blockCoords.bottom + offset;
            left = this.getCenterTooltip(pos);
            arrowCss = this.getArrowCenter(pos, left);
            arrowClass = 'jtooltip-b';
            break;
          case 'left':
            top = this.getCenterTooltip(pos);
            left = blockCoords.left - (tooltipWidth + offset);
            arrowCss = this.getArrowCenter(pos, top);
            arrowClass = 'jtooltip-l';
            break;
        }

        $tooltip.addClass(arrowClass).css({
          left: left + 'px',
          top: top + 'px'
        });

        $arrow.css(arrowCss.propName, arrowCss.propVal);

        $tooltip.hide();
      }
    }, {
      key: 'getAvailiablePos',
      value: function getAvailiablePos(pos) {
        var blockCoodrs = this.getCoords(this.block);
        var viewportCoords = this.getViewportCoords();
        var offset = this.extraMargin;
        var $tooltip = this.$tooltip;
        var tooltipWidth = $tooltip.outerWidth() + offset;
        var tooltipHeight = $tooltip.outerHeight() + offset;
        var result = false;

        switch (pos) {
          case 'top':
            result = blockCoodrs.top - viewportCoords.top >= tooltipHeight;
            break;
          case 'right':
            result = viewportCoords.right - blockCoodrs.right >= tooltipWidth;
            break;
          case 'bottom':
            result = viewportCoords.bottom - blockCoodrs.bottom >= tooltipHeight;
            break;
          case 'left':
            result = blockCoodrs.left - viewportCoords.left >= tooltipWidth;
            break;
        }

        return result;
      }
    }, {
      key: 'getCenterTooltip',
      value: function getCenterTooltip(pos) {
        var blockCoodrs = this.getCoords(this.block);
        var viewportCoords = this.getViewportCoords();
        var $tooltip = this.$tooltip;
        var tooltipWidth = $tooltip.outerWidth();
        var tooltipHeight = $tooltip.outerHeight();
        var blockCenter = 0;

        if (pos === 'top' || pos === 'bottom') {
          blockCenter = blockCoodrs.left + blockCoodrs.width / 2;
          var availLeft = blockCenter - tooltipWidth / 2 >= viewportCoords.left;
          var availRight = blockCenter + tooltipWidth / 2 <= viewportCoords.right;

          if (!availLeft || viewportCoords.width <= tooltipWidth) {
            return viewportCoords.left;
          } else if (!availRight) {
            return viewportCoords.right - tooltipWidth;
          }

          return blockCenter - tooltipWidth / 2;
        } else {
          blockCenter = blockCoodrs.top + blockCoodrs.height / 2;
          var availTop = blockCenter - tooltipHeight / 2 >= viewportCoords.top;
          var availBottom = blockCenter + tooltipHeight / 2 <= viewportCoords.bottom;

          if (!availTop || viewportCoords.height <= tooltipHeight) {
            return viewportCoords.top;
          } else if (!availBottom) {
            return viewportCoords.bottom - tooltipHeight;
          }

          return blockCenter - tooltipHeight / 2;
        }
      }
    }, {
      key: 'getArrowCenter',
      value: function getArrowCenter(posName, posUnit) {
        var $arrow = this.$arrow;
        var arrowCoords = this.getCoords($arrow[0]);
        var blockCoords = this.getCoords(this.block);
        var blockCenter = 0;
        var arrowCenter = 0;
        var offset = 0;
        var propName = '';
        var propLengthName = '';
        var propVal = '';
        var currPropVal = '';

        if (posName === 'top' || posName === 'bottom') {
          propName = 'left';
          propLengthName = 'width';
        } else {
          propName = 'top';
          propLengthName = 'height';
        }

        offset = posUnit - arrowCoords[propName];
        blockCenter = blockCoords[propName] + blockCoords[propLengthName] / 2;
        arrowCenter = arrowCoords[propName] + arrowCoords[propLengthName] / 2 + offset;

        if (blockCenter === arrowCenter) return;

        currPropVal = $arrow.css(propName) !== 'auto' ? parseFloat($arrow.css(propName)) : 0;
        propVal = currPropVal + (blockCenter - arrowCenter) + 'px';

        return {
          propName: propName,
          propVal: propVal
        };
      }
    }, {
      key: 'removeTooltip',
      value: function removeTooltip() {
        this.hideTooltip(true);
      }
    }, {
      key: 'showTooltip',
      value: function showTooltip() {
        var _this = this;

        if (!this.$tooltip.length) return;

        $(this.block).trigger(this.events.beforeOpen, [this.$tooltip, this]);

        switch (this.showAnimation) {
          case 'simple':
            this.$tooltip.show();
            $(this.block).trigger(this.events.afterOpen, [this.$tooltip, this]);
            break;
          case 'slide':
            this.$tooltip.slideDown(this.events.showAnimationSpeed, function () {
              $(_this.block).trigger(_this.events.afterOpen, [_this.$tooltip, _this]);
            });
            break;
          case 'fade':
            this.$tooltip.fadeIn(this.events.showAnimationSpeed, function () {
              $(_this.block).trigger(_this.events.afterOpen, [_this.$tooltip, _this]);
            });
            break;
        }
      }
    }, {
      key: 'hideTooltip',
      value: function hideTooltip(destroyTooltip) {
        var _this2 = this;

        var destroy = function destroy() {};

        if (!this.$tooltip || !this.$tooltip.length) return;

        if (destroyTooltip) {
          destroy = this.destoyTooltip.bind(this);
        }

        $(this.block).trigger(this.events.beforeClose, [this.$tooltip, this]);

        switch (this.showAnimation) {
          case 'simple':
            this.$tooltip.hide();
            destroy();
            $(this.block).trigger(this.events.afterClose, [this.$tooltip, this]);
            break;
          case 'slide':
            this.$tooltip.slideUp(this.hideAnimationSpeed, function () {
              destroy();
              $(_this2.block).trigger(_this2.events.afterClose, [_this2.$tooltip, _this2]);
            });
            break;
          case 'fade':
            this.$tooltip.fadeOut(this.hideAnimationSpeed, function () {
              destroy();
              $(_this2.block).trigger(_this2.events.afterClose, [_this2.$tooltip, _this2]);
            });
            break;
        }
      }
    }, {
      key: 'destoyTooltip',
      value: function destoyTooltip() {
        this.$tooltip.remove();
        this.$tooltip = null;
        this.$inner = null;
        this.$arrow = null;
      }
    }, {
      key: 'getCoords',
      value: function getCoords(elem) {
        var box = elem.getBoundingClientRect();
        var html = document.documentElement;

        return {
          top: box.top + window.pageYOffset || html.scrollTop,
          right: box.right + window.pageXOffset || html.scrollLeft,
          bottom: box.bottom + window.pageYOffset || html.scrollTop,
          left: box.left + window.pageXOffset || html.scrollLeft,
          width: elem.offsetWidth,
          height: elem.offsetHeight
        };
      }
    }, {
      key: 'getViewportCoords',
      value: function getViewportCoords() {
        var html = document.documentElement;
        var top = window.pageYOffset || html.scrollTop;
        var left = window.pageXOffset || html.scrollLeft;
        var right = left + html.clientWidth;
        var bottom = top + html.clientHeight;

        return {
          top: top,
          right: right,
          bottom: bottom,
          left: left,
          width: html.clientWidth,
          height: html.clientHeight
        };
      }
    }, {
      key: 'getPartialClass',
      value: function getPartialClass(el, classStart) {
        var classStr = el.className;
        var startPos = classStr.indexOf(classStart);

        if (!~startPos) return null;

        var endPos = ~classStr.indexOf(' ', startPos) ? classStr.indexOf(' ', startPos) : undefined;

        return classStr.slice(startPos, endPos);
      }
    }, {
      key: 'debounce',
      value: function debounce(func, ms) {
        var state = false;

        function wrapper() {
          if (state) return;

          func.apply(this, arguments);
          state = true;

          setTimeout(function () {
            state = false;
          }, ms);
        }

        return wrapper;
      }
    }, {
      key: 'getSelf',
      value: function getSelf() {
        return this;
      }
    }, {
      key: 'stop',
      value: function stop() {
        if (!this.running) return;

        $(this.block).off({
          'mouseenter': this._addTooltipHandler,
          'mouseleave': this._removeTooltipHandler
        });

        this.running = false;
      }
    }, {
      key: 'start',
      value: function start() {
        if (this.running) return;

        $(this.block).on({
          'mouseenter': this._addTooltipHandler,
          'mouseleave': this._removeTooltipHandler
        });

        this.running = true;
      }
    }, {
      key: 'preventDef',
      value: function preventDef(e) {
        e.preventDefault();
      }
    }]);

    return JTooltip;
  }();

  $.fn.jTooltip = function () {
    var _ = this;
    var options = arguments[0] || {};
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < _.length; i++) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
        options.block = _[i];
        _[i].jTooltip = new JTooltip(options);
      } else {
        var result = _[i].jTooltip[options].call(_[i].jTooltip, args);

        if (typeof result !== 'undefined') return result;
      }
    }

    return _;
  };
});

/*init*/
/*
jQuery(document).ready(function ($) {
  /!*tooltip*!/
  (function() {
    let $tooltips = $('[class*="js__jtooltip"]');

    $tooltips.each(function () {
      let $tooltip = $(this);
      let className = {
        positionTop: 'js__jtooltip-t',
        positionRight: 'js__jtooltip-r',
        positionBottom: 'js__jtooltip-b',
        positionleft: 'js__jtooltip-l'
      };
      let options = {};


      if ($tooltip.hasClass('js__jtooltip') || $tooltip.hasClass('js__jtooltip-horizontal')) { //temporary patch for changing hml layout
        return;
      }

      if ($tooltip.hasClass(className.positionTop)) {
        options.position = 'top';
      } else if ($tooltip.hasClass(className.positionRight)) {
        options.position = 'right';
      } else if ($tooltip.hasClass(className.positionBottom)) {
        options.position = 'bottom';
      } else if ($tooltip.hasClass(className.positionleft)) {
        options.position = 'left';
      }

      $tooltip.jTooltip(options);
    });
  })();

  /!*vertical*!/
  (function () {
    let $tooltip = $('.js__jtooltip');
    let options = {};

    $tooltip.jTooltip(options);
  })();

  /!*horizontal*!/
  (function () {
    let $tooltip = $('.js__jtooltip-horizontal');
    let options = {
      position: 'right'
    };

    $tooltip.jTooltip(options);
  })();
});*/