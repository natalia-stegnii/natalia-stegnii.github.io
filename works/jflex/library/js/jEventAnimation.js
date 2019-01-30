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
  var JEventAnimationController = function () {
    function JEventAnimationController(options) {
      _classCallCheck(this, JEventAnimationController);

      this.listenedBlock = options.listenedBlock || document.body;
      this.$elements = $(0);
      this.events = {
        refresh: 'jEventAnimation:refreshEl',
        refreshStart: 'jEventAnimation:refreshStart',
        inView: 'jEventAnimation:inView',
        inViewFirstTime: 'jEventAnimation:inViewFirstTime',
        outOfView: 'jEventAnimation:outOfView',
        outOfViewFirstTime: 'jEventAnimation:outOfViewFirstTime',
        animateStart: 'jEventAnimation:animateStart',
        animateEnd: 'jEventAnimation:animateEnd'
      };
      this.class = {
        infinite: 'js__jeventanimation-infinite',
        animated: 'js__jeventanimation-animated',
        animating: 'js__jeventanimation-animating',
        animatedCss: 'animated',
        animateJs: 'js__jeventanimation-js',
        animateJsNumber: 'js__jeventanimation-number',
        inView: 'js__jeventanimation-inview'
      };

      this.init();
    }

    _createClass(JEventAnimationController, [{
      key: 'init',
      value: function init() {
        this._onScroll = this.update.bind(this, null);
        this._onRefresh = this.refreshHandler.bind(this);

        $(window).on('scroll', this._onScroll);
        $(this.listenedBlock).on(this.events.refresh, this._onRefresh);
      }
    }, {
      key: 'runAnimation',
      value: function runAnimation(el) {
        var _this = this;

        $(el).each(function (index, currEl) {
          var $currEl = $(currEl);

          if ($currEl.hasClass(_this.class.animated) && !$currEl.hasClass(_this.class.infinite)) return;
          if ($currEl.hasClass(_this.class.animating)) return;

          if ($currEl.hasClass(_this.class.animateJsNumber)) {
            _this.animateNumber(currEl);
          } else if ($currEl.hasClass(_this.class.animateJs)) {
            _this.animateJs(currEl);
          } else {
            _this.animateCss(currEl);
          }
        });
      }
    }, {
      key: 'getJsAnimation',
      value: function getJsAnimation(el) {
        for (var i = 0; i < animationJs.length; i++) {
          if ($(el).hasClass(animationJs[i].name)) {
            return animationJs[i];
          }
        }

        return null;
      }
    }, {
      key: 'prepareJsAnimatedEl',
      value: function prepareJsAnimatedEl(el) {
        var _this2 = this;

        $(el).each(function (i, currEl) {
          var $currEl = $(currEl);
          var currAnimation = _this2.getJsAnimation($currEl);

          if (currAnimation.hideOnStart) {
            $currEl.hide();
          } else {
            $currEl.show();
          }
        });
      }
    }, {
      key: 'animateJs',
      value: function animateJs(el) {
        var _this3 = this;

        $(el).each(function (i, currEl) {
          var $currEl = $(currEl);
          var currAnimation = _this3.getJsAnimation($currEl);
          var delay = parseFloat($currEl.attr('data-animation-delay'));
          var speed = parseFloat($currEl.attr('data-animation-speed'));

          if (!currAnimation) return;

          _this3.prepareJsAnimatedEl(currEl);
          $currEl.addClass(_this3.class.animating);

          if (delay) {
            setTimeout(function () {
              currAnimation.method($currEl, speed);
              $currEl.trigger(_this3.events.animateStart, [currEl, _this3]).delay(speed || currAnimation.speed).removeClass(_this3.class.animating).trigger(_this3.events.animateEnd, [currEl, _this3]);
            }, delay);
          } else {
            currAnimation.method($currEl, speed);
            $currEl.trigger(_this3.events.animateStart, [currEl, _this3]).delay(speed || currAnimation.speed).removeClass(_this3.class.animating).trigger(_this3.events.animateEnd, [currEl, _this3]);
          }

          $currEl.addClass(_this3.class.animated);
        });
      }
    }, {
      key: 'animateNumber',
      value: function animateNumber(el) {
        var _this4 = this;

        $(el).each(function (i, currEl) {
          var $currEl = $(currEl);

          $currEl.addClass(_this4.class.animating).trigger(_this4.events.animateStart, [currEl, _this4]).prop('animator', 0).animate({ animator: $currEl.text() }, {
            duration: 2000,
            easing: 'swing',
            step: function step(now) {
              $currEl.text(Math.ceil(now));
            },
            complete: function complete() {
              $currEl.addClass(_this4.class.animated).removeClass(_this4.class.animating).trigger(_this4.events.animateEnd, [currEl, _this4]);
            }
          });
        });
      }
    }, {
      key: 'animateCss',
      value: function animateCss(el) {
        var _this5 = this;

        $(el).each(function (i, currEl) {
          var $currEl = $(currEl);
          var delay = parseFloat($currEl.attr('data-animation-delay'));
          var speed = parseFloat($currEl.attr('data-animation-speed'));

          if (speed) {
            currEl.style.animationDuration = speed + 's';
          }

          if (delay) {
            currEl.style.animationDelay = delay + 's';
          }

          /*if (!$currEl.hasClass(this.class.animated)) {
            $currEl.addClass(this.class.animated);
          }
           if (!$currEl.hasClass(this.class.animatedCss)) {
            $currEl.addClass(this.class.animatedCss);
          }*/

          //let animationName = $currEl.css('animation-name');

          $currEl
          //.removeClass(animationName)
          .addClass(_this5.class.animating).addClass(_this5.class.animatedCss)
          //.addClass(animationName)
          .delay(parseFloat(getComputedStyle(currEl).animationDelay) * 1000).trigger(_this5.events.animateStart, [currEl, _this5]).delay(parseFloat(getComputedStyle(currEl).animationDuration) * 1000)
          //.css('animation-name',  '')
          .addClass(_this5.class.animated).removeClass(_this5.class.animating).trigger(_this5.events.animateEnd, [currEl, _this5]);
        });
      }
    }, {
      key: 'update',
      value: function update(el) {
        var _this6 = this;

        $(el || this.$elements).each(function (i, currEl) {
          if (_this6.isInView(currEl, true)) {
            _this6.runAnimation(currEl);
          }
        });
      }
    }, {
      key: 'isInView',
      value: function isInView(el, firstTime) {
        var coords = this.getCoords(el);
        var clientHeight = document.documentElement.clientHeight;
        var scrollHeight = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, document.body.offsetHeight, document.documentElement.offsetHeight, document.body.clientHeight, document.documentElement.clientHeight);
        var viewport = {
          top: window.pageYOffset,
          bottom: window.pageYOffset + clientHeight
        };
        if (coords.bottom > viewport.top && coords.bottom <= viewport.bottom && coords.top >= viewport.top && coords.top < viewport.bottom) {
          $(el).trigger(this.events.inView, [el, this]);

          if (!el.classList.contains(this.class.inView)) {
            $(el).trigger(this.events.inViewFirstTime, [el, this]);
          }

          if (firstTime && el.classList.contains(this.class.inView)) {
            return false;
          }

          el.classList.add(this.class.inView);
          return true;
        }

        if (el.classList.contains(this.class.inView)) {
          $(el).trigger(this.events.outOfViewFirstTime, [el, this]);
          el.classList.remove(this.class.inView);
        }

        $(el).trigger(this.events.outOfView, [el, this]);

        return false;
      }
    }, {
      key: 'refreshEl',
      value: function refreshEl(el) {
        var _this7 = this;

        $(el).each(function (i, currEl) {
          $(currEl).removeClass(_this7.class.animated).removeClass(_this7.class.inView).removeClass(_this7.class.animatedCss).trigger(_this7.events.refreshStart, [currEl, _this7]);

          if (_this7.isInView(currEl)) {
            _this7.runAnimation(currEl);
          }
        });
      }
    }, {
      key: 'refreshHandler',
      value: function refreshHandler(e) {
        var target = e.target;

        if (!this.$elements.is(target)) return;

        this.refreshEl(target);
      }
    }, {
      key: 'addElement',
      value: function addElement(newEl, options) {
        var _this8 = this;

        var $newEl = $(newEl);

        $newEl.each(function (i, currEl) {
          var $currEl = $(currEl);
          var jsAnimation = _this8.getJsAnimation(currEl);

          if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
            if (options.infinite) {
              $currEl.addClass(_this8.class.infinite);
            }
          }

          if (jsAnimation) {
            $currEl.addClass(_this8.class.animateJs);
          }

          _this8.$elements = _this8.$elements.add($currEl);

          _this8.update(currEl);
        });
      }
    }, {
      key: 'removeElement',
      value: function removeElement(el) {
        var $el = $(el);

        if (_typeof(this.$elements) !== $) return;

        this.$elements = this.$elements.not($el);

        this.cleanEl($el);
      }
    }, {
      key: 'cleanEl',
      value: function cleanEl(el) {
        var $el = $(el);

        for (var className in this.class) {
          $el.removeClass(this.class[className]);
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        $(window).off('scroll', this._onScroll);
        $(this.listenedBlock).off(this.events.refresh, this._onRefresh);
      }
    }, {
      key: 'start',
      value: function start() {
        $(window).on('scroll', this._onScroll);
        $(this.listenedBlock).on(this.events.refresh, this._onRefresh);
      }
    }, {
      key: 'destroy',
      value: function destroy() {
        this.stop();

        this.cleanEl(this.$elements);
        this.$elements.each(function (i, el) {
          el.jEventAnimation = null;
        });

        this.deleteObj(animator);
        animator = null;
      }
    }, {
      key: 'deleteObj',
      value: function deleteObj(obj) {
        for (var prop in obj) {
          if (_typeof(obj[prop]) === 'object') {
            this.deleteObj(obj[prop]);
          }

          delete obj[prop];
        }
      }
    }, {
      key: 'getSelf',
      value: function getSelf() {
        return this;
      }
    }, {
      key: 'getCoords',
      value: function getCoords(elem) {
        var box = elem.getBoundingClientRect();

        return {
          top: box.top + window.pageYOffset,
          bottom: box.bottom + window.pageYOffset,
          left: box.left + window.pageXOffset,
          right: box.right + window.pageXOffset
        };
      }
    }, {
      key: 'addJsAnimation',
      value: function addJsAnimation(animation) {
        var _this9 = this;

        var newAnimation = $.extend({}, DefaultAnimation, animation);
        animationJs.push(newAnimation);

        this.$elements.each(function (i, currEl) {
          var $currEl = $(currEl);

          if ($currEl.hasClass(newAnimation.name)) {
            $currEl.addClas(_this9.class.animateJs);
          }
        });
      }
    }]);

    return JEventAnimationController;
  }();

  var DefaultAnimation = {
    name: '',
    hideOnStart: false,
    speed: 400,
    method: function method(element, speed) {}
  };

  var animationJs = [{
    name: 'fadeIn',
    hideOnStart: true,
    speed: 400,
    method: function method(element, speed) {
      speed = speed || this.speed;

      $(element).fadeIn(speed);
    }
  }, {
    name: 'fadeOut',
    hideOnStart: false,
    speed: 400,
    method: function method(element, speed) {
      speed = speed || this.speed;

      $(element).fadeOut(speed);
    }
  }, {
    name: 'slideDown',
    hideOnStart: true,
    speed: 400,
    method: function method(element, speed) {
      speed = speed || this.speed;

      $(element).slideDown(speed);
    }
  }, {
    name: 'slideUp',
    hideOnStart: false,
    speed: 400,
    method: function method(element, speed) {
      speed = speed || this.speed;

      $(element).slideUp(speed);
    }
  }];

  var animator = null;

  $.fn.jEventAnimation = function () {
    var _ = this;
    var options = arguments[0] || {};
    var args = Array.prototype.slice.call(arguments, 1);

    if (!_.length) return;

    if (!animator) {
      animator = new JEventAnimationController({});
    }

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
      animator.addElement(_, options);

      for (var i = 0; i < _.length; i++) {
        _[i].jEventAnimation = animator;
      }
    } else {
      for (var _i = 0; _i < _.length; _i++) {
        var result = _[_i].jEventAnimation[options].call(_[_i].jEventAnimation, args);

        if (typeof result !== 'undefined') return result;
      }
    }

    return _;
  };
});

/*
jQuery(document).ready(function ($) {
  /!*init*!/
  let $animatedEl = $('.js__jeventanimation');

  $animatedEl.jEventAnimation();
});*/