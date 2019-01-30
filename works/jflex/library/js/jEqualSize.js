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
  var EqualSizeController = function () {
    function EqualSizeController(options) {
      _classCallCheck(this, EqualSizeController);

      this.$container = $(options.container);
      this.childrenSelectors = options.children || null;
      this.childrenArr = [];
      this.isActive = false;
    }

    _createClass(EqualSizeController, [{
      key: 'init',
      value: function init() {
        var _this = this;

        if (!this.$container.length) return;

        if ($.isArray(this.childrenSelectors)) {
          this.childrenSelectors.forEach(function (currChildrenSelector) {
            var currChildrenObj = {
              selector: null,
              included: [],
              excluded: []
            };
            currChildrenObj.selector = currChildrenSelector;
            _this.childrenArr.push(currChildrenObj);
          });
        } else if (typeof this.childrenSelectors === 'string') {
          var childrenObj = {
            selector: null,
            included: [],
            excluded: []
          };

          childrenObj.selector = this.childrenSelectors;
          this.childrenArr.push(childrenObj);
        }

        this.processingContainer();

        this._onResize = this._onResize ? this._onResize.bind(this) : this.processingContainer.bind(this);

        $(window).on('resize', this._onResize);
        this.isActive = true;
      }
    }, {
      key: 'stop',
      value: function stop() {
        var _this2 = this;

        if (this.childrenArr.length) {
          this.childrenArr.forEach(function (currChildren) {
            _this2.getChildren(_this2.$container, currChildren).each(function (index, el) {
              el.style.height = '';
            });
          });
        } else {
          this.getChildren(this.$container).each(function (index, el) {
            el.style.height = '';
          });
        }

        $(window).off('resize', this._onResize);
        this.isActive = false;
      }
    }, {
      key: 'run',
      value: function run() {
        if (this.isActive || !this.$container.length) return false;

        if (!this._onResize) {
          this._onResize = this.processingContainer.bind(this);
        }

        this._onResize();
        $(window).on('resize', this._onResize);
        return true;
      }
    }, {
      key: 'oneRun',
      value: function oneRun() {
        this.processingContainer();
      }
    }, {
      key: 'processingContainer',
      value: function processingContainer() {
        var $container = this.$container;
        var children = this.childrenArr;

        if (children.length) {
          var i = children.length - 1;
          var reverse = true;

          while (i < children.length) {
            this.setEqualSize($container, children[i]);

            if (i <= 0) {
              reverse = false;
            }

            if (reverse) {
              i--;
            } else {
              i++;
            }
          }
        } else {
          this.setEqualSize($container);
        }
      }
    }, {
      key: 'setEqualSize',
      value: function setEqualSize(container, children) {
        var _this3 = this;

        this.getMaxSize(container, children).then(function (size) {
          var $children = _this3.getChildren(container, children);

          $children.each(function (index, el) {
            el.style.height = size + 'px';
          });
        });
      }
    }, {
      key: 'getMaxSize',
      value: function getMaxSize(container, children) {
        var _this4 = this;

        return new Promise(function (resolve) {
          var $container = $(container);
          var $innerBlocks = _this4.getChildren($container, children);
          var maxHeight = 0;
          var _ = _this4;
          var $img = $innerBlocks.find('img');

          if ($img.length) {
            _this4.loadImg($img).then(function () {
              $innerBlocks.each(function () {
                var height = _.getSize($(this));

                if (height <= maxHeight) return;

                maxHeight = height;
              });

              /*$containerClone.remove();*/

              resolve(maxHeight);
            });
          } else {
            $innerBlocks.each(function () {
              var height = _.getSize($(this));

              if (height <= maxHeight) return;

              maxHeight = height;
            });

            /*$containerClone.remove();*/

            resolve(maxHeight);
          }
        });
      }
    }, {
      key: 'getSize',
      value: function getSize($el) {
        var height = 0;

        if (!$el.is(':hidden')) {
          height = $el.outerHeight();
          return height;
        }

        var $parents = $el.parents();

        if ($el.attr('style')) {
          $el.attr('data-cashed-style', $el.attr('style'));
          $el.show();
        }

        for (var i = 0; i < $parents.length; i++) {
          var $currParent = $parents.eq(i);

          if ($currParent.attr('style')) {
            $currParent.attr('data-cashed-style', $currParent.attr('style'));
          }

          $currParent.show();
        }

        height = $el.outerHeight();

        for (var _i = 0; _i < $parents.length; _i++) {
          var _$currParent = $parents.eq(_i);
          var cashedStyle = _$currParent.attr('data-cashed-style');

          if (cashedStyle) {
            _$currParent.attr('style', cashedStyle);
            _$currParent.removeAttr('data-cashed-style');
          }
        }

        return height;
      }
    }, {
      key: 'getChildren',
      value: function getChildren(container, children) {
        var $container = $(container);

        if (!children) {
          return $container.children();
        }

        if (typeof children === 'string' || (typeof children === 'undefined' ? 'undefined' : _typeof(children)) === $) {
          //probably could come just jq object
          return $container.find(children);
        }

        if ((typeof children === 'undefined' ? 'undefined' : _typeof(children)) === 'object' && children.selector) {
          var selector = children.selector;
          var $resultedChildren = $container.find(selector);

          if (children.included && children.included.length) {
            var $includedChildren = $container.find(children.included.join(', '));
            $resultedChildren = $resultedChildren.add($includedChildren);

            /*children.included.forEach((currIncluded) => {
             $resultedChildren = $resultedChildren.add($container.find(currIncluded));
             });*/
          }

          if (children.excluded && children.excluded.length) {
            var excludedChildren = children.excluded.join(', ');
            $resultedChildren = $resultedChildren.not(excludedChildren);
          }

          return $resultedChildren;
        }

        return false;
      }
    }, {
      key: 'addChildren',
      value: function addChildren(children, index) {
        if (typeof children !== 'string' || !this.childrenArr.length) return false;

        index = index || 0;
        var included = this.childrenArr[index].included;
        var excluded = this.childrenArr[index].excluded;
        var includedIndex = included.indexOf(children);
        var excludedIndex = excluded.indexOf(children);

        if (~includedIndex) return true;

        if (~excludedIndex) {
          excluded.splice(excludedIndex, 1);
        }

        included.push(children);
        this.oneRun();
        return true;
      }
    }, {
      key: 'removeChildren',
      value: function removeChildren(children, index) {
        if (typeof children !== 'string' || !this.childrenArr) return false;

        index = index || 0;
        var included = this.childrenArr[index].included;
        var excluded = this.childrenArr[index].excluded;
        var includedIndex = included.indexOf(children);
        var excludedIndex = excluded.indexOf(children);

        if (~excludedIndex) return true;

        this.stop();

        if (~includedIndex) {
          included.splice(includedIndex, 1);
        }

        excluded.push(children);
        this.run();
        return true;
      }
    }, {
      key: 'loadImg',
      value: function loadImg($img) {
        return new Promise(function (resolve) {
          var loadedImg = 0;

          $img.each(function () {
            var $currImg = $(this);
            var $imgClone = $('<img>');

            $imgClone.on('load error', function () {
              loadedImg++;

              if (loadedImg === $img.length) {
                resolve();
              }
            });

            $imgClone.attr('src', $currImg.attr('src'));
          });
        });
      }
    }, {
      key: 'getSelf',
      value: function getSelf() {
        return this;
      }
    }]);

    return EqualSizeController;
  }();

  $.fn.jEqualSize = function () {
    var _ = this;
    var options = arguments[0];
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < _.length; i++) {
      if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object') {
        options.container = _;
        _[i].jEqualSize = new EqualSizeController(options);
        _[i].jEqualSize.init();
      } else if (typeof options === 'undefined') {
        options = {
          container: _
        };
        _[i].jEqualSize = new EqualSizeController(options);
        _[i].jEqualSize.init();
      } else {
        var result = _[i].jEqualSize[options].call(_[i].jEqualSize, args);

        if (typeof result !== 'undefined') return result;
      }

      return _;
    }
  };
});

/*equal init*/
/*jQuery(document).ready(function ($) {
  /!*equal size simple*!/
  (function () {
    let $equalContainer = $('.js__equal');

    $equalContainer.jEqualSize();
  })();

  /!*equal size selective*!/
  (function () {
    let $equalContainer = $('.js__equal-select');
    let options = {
      children: '.js__equal-child'
    };

    $equalContainer.jEqualSize(options);
  })();

  /!*equal size selective multiple children*!/
  (function () {
    let $equalContainer = $('.js__equal-select-mult');
    let options = {
      children: ['.js__equal-child-1', '.js__equal-child-2', '.js__equal-child-3']
    };

    $equalContainer.jEqualSize(options);
  })();
});*/
