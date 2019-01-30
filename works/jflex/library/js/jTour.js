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
  var JTourController = function () {
    function JTourController(options) {
      _classCallCheck(this, JTourController);

      this.userSteps = options.steps;
      this.steps = [];
      this.activeStep = null;
      this.activeStepIndex = 0;
      this.prevStepIndex = 0;
      this.name = options.name || 'tour';
      this.title = options.title || this.name;
      this.translationElementSelector = options.translationSelector;
      this.isMenu = options.isMenu || false;
      this.menuContainer = options.menuContainer || document.body;
      this.addMenuMethod = options.addMenuMethod || null;
      this.removeMenuMethod = options.removeMenuMethod || null;
      this.triggeredEl = options.triggeredEl || document.body;
      this.player = $.jPlayer;
      this.isSound = options.isSound || true;
      this.tpl = {
        contentWrapper: '<div class="tootip-content-wrapper"></div>',
        title: '<div class="tooltip-title pv10 mb10 big bold t_blue"></div>',
        content: '<div class="tooltip-message mb20"></div>',
        prev: '<button class="tooltip-btn tooltip-btn_back btn small simple" data-role="prev">назад</button>',
        next: '<button class="tooltip-btn tooltip-btn_next btn small simple" data-role="next">вперед</button>',
        end: '<button class="tooltip-btn btn small simple" data-role="end">завершить</button>',
        replay: '<div class="tooltip-replay" data-role="replay"></div>',
        overlay: '<div class="tour-overlay"></div>'
      };
      this.menuTpl = {
        menuWrapper: '<div class="tour-menu-wrapper">' + '<div class="tour-title">Настройка системы</div>' + '</div>',
        soundBtn: '<div>' + '<input id="tour-sound" type="checkbox">' + '<label class="speaker" for="tour-sound"></label>' + '</div>',
        container: '<ol class="tour-menu marker blue"></ol>',
        item: '<li></li>',
        itemAnchor: '<a href="#" ></a>'
      };
      this.events = {
        tourStart: 'jTour:tourStart',
        tourStop: 'jTour:tourStop',
        tourReset: 'jTour:tourReset',
        tourGoNextPage: 'jTour:tourGoNextPage',
        tourOnNextPageStart: 'jTour:tourOnNextPageStart',
        stepBeforeStart: 'jTour:stepBeforeStart',
        stepAfterStart: 'jTour:stepAfterStart',
        stepBeforeEnd: 'jTour:stepBeforeEnd',
        stepAfterEnd: 'jTour:stepAfterEnd',
        menuBeforeSwitch: 'jTour:menuBeforeSwitch',
        menuAfterSwitch: 'jTour:menuAfterSwitch'
      };
      this.class = {
        customTooltipClass: 'js__jtooltip-s_grey'
      };
      this.userTooltipOptions = options.tooltipOptions || {};

      this.init();
    }

    _createClass(JTourController, [{
      key: 'init',
      value: function init() {
        this._tooltipClickHandler = this.contentClickHandler.bind(this);
        this.$triggeredEl = $(this.triggeredEl);
        this.tooltipOptions = $.extend(true, {}, DefaultTooltipOptions, this.userTooltipOptions);

        for (var i = 0; i < this.userSteps.length; i++) {
          this.steps.push($.extend(true, {}, DefaultStep, this.userSteps[i]));
        }

        var tourData = this.getTourData();

        if (tourData) {
          this.startPage = tourData.startPage;
          this.setupStepsPath();
          this.activeStepIndex = tourData.activeStepIndex;
          this.activeStep = this.steps[tourData.activeStepIndex];
          this.isSound = tourData.isSound;
          this.deleteTourData();
          this.start();
        } else {
          this.activeStepIndex = 0;
          this.activeStep = this.steps[0];
          this.setupStepsPath();
        }
      }
    }, {
      key: 'start',
      value: function start() {
        this.$triggeredEl.trigger(this.events.tourStart, [this]);
        this.goto(this.activeStepIndex);

        if (this.isSamePath(this.activeStep.path)) {
          if (this.isMenu && !this.$menu) {
            this.createMenu();
            this.switchMenuItem(this.activeStepIndex);
          }
        }
      }
    }, {
      key: 'stop',
      value: function stop() {
        this.$triggeredEl.trigger(this.events.tourStop, [this]);

        this.reset();
        this.removeMenu();
      }
    }, {
      key: 'reset',
      value: function reset() {
        this.$triggeredEl.trigger(this.events.tourReset, [this]);

        if (this.activeStep.animateType === 'highlight') {
          this.unhighlightEl(this.activeStep.element);
        }

        this.player.stop();
        this.removeTooltip();
        this.closeModal();
        this.activeStepIndex = 0;
        this.activeStep = this.steps[0];
      }
    }, {
      key: 'goto',
      value: function goto(index) {
        if (index < 0 || index >= this.steps.length) return;

        this.prevStepIndex = this.activeStepIndex;
        this.activeStep = this.steps[index];
        this.activeStepIndex = index;

        this.runStep(this.activeStep);
      }
    }, {
      key: 'gotoPage',
      value: function gotoPage(path) {
        this.$triggeredEl.trigger(this.events.tourGoNextPage, [path, this]);
        this.putTourData(path);
        window.open(path, '_self');
      }
    }, {
      key: 'bindNextStep',
      value: function bindNextStep(index) {
        var path = window.location.pathname;
        index = index || 1;

        if (this.activeStepIndex + index >= this.steps.length) {
          return;
        }

        this.prevStepIndex += index - 1;
        this.activeStepIndex += index;
        this.activeStep = this.steps[this.activeStepIndex];

        this.$triggeredEl.trigger(this.events.tourGoNextPage, [path, this]);
        this.putTourData(path);
      }
    }, {
      key: 'runStep',
      value: function runStep(step) {
        var _this = this;

        var $stepElement = $(step.element);

        this.clean();

        if (!this.isSamePath(step.path, true)) {
          this.gotoPage(step.path);
          return;
        }

        if (step.onElement && step.onElement.handler && typeof step.onElement.handler === 'function') {

          $stepElement.on(step.onElement.event, { tourController: this }, step.onElement.handler);
        }

        this.$triggeredEl.trigger(this.events.stepBeforeStart, [step, this]);
        this.openModal(step);

        if ($stepElement.length) {
          this.onModalClose().then(function () {
            return _this.animateToStep(step);
          }).then(function () {
            _this.playAudio(step.file);
          });
        } else {
          this.playAudio(step.file);
        }
      }
    }, {
      key: 'animateToStep',
      value: function animateToStep(step) {
        var _this2 = this;

        return new Promise(function (resolve, reject) {
          switch (step.animateType) {
            case 'simple':
              _this2.scrollTo(step.element).then(function () {
                _this2.showTooltip(step.element, step.content, step.title, step.tooltipPos);
                _this2.$triggeredEl.trigger(_this2.events.stepAfterStart, [step, _this2]);

                resolve();
              }, function (error) {
                console.log(error);
                reject(error);
              });
              break;
            case 'highlight':
              _this2.scrollTo(step.element).then(function () {
                _this2.showTooltip(step.element, step.content, step.title, step.tooltipPos);
                _this2.highlightEl(step.element);
                _this2.$triggeredEl.trigger(_this2.events.stepAfterStart, [step, _this2]);

                resolve();
              }, function (error) {
                console.log(error);
                reject(error);
              });
              break;
          }
        });
      }
    }, {
      key: 'clean',
      value: function clean() {
        var prevStep = this.steps[this.prevStepIndex];
        var $prevStepElement = $(prevStep.element);

        if (this.tooltip) {
          this.$triggeredEl.trigger(this.events.stepBeforeEnd, [prevStep, this]);
          this.removeTooltip();
          setTimeout(function () {
            this.$triggeredEl.trigger(this.events.stepAfterEnd, [prevStep, this]);
          }.bind(this), this.tooltip.hideAnimationSpeed);
        }

        this.closeModal();

        if (!prevStep) return;

        if (prevStep.animateType === 'highlight') {
          this.unhighlightEl(prevStep.element);
        }

        if (prevStep.onElement && typeof prevStep.onElement.handler === 'function') {

          $prevStepElement.off(prevStep.onElement.event, prevStep.onElement.handler);
        }
      }
    }, {
      key: 'isSamePath',
      value: function isSamePath(path, isEmptyPath) {
        var lang = this.getLang();
        var reg = lang ? new RegExp('/' + lang + '/', 'g') : null;
        var currPath = path.replace(reg, '/');
        var localPath = window.location.pathname.replace(reg, '/');

        if (currPath === localPath || currPath === '' && isEmptyPath) {
          return true;
          return true;
        }

        return false;
      }
    }, {
      key: 'getLang',
      value: function getLang() {
        var objClass = $('body').attr('class').split(/\s+/);
        var pattern = 'i18n-';

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = objClass[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var className = _step.value;

            var pos = className.indexOf('i18n-');
            if (pos === -1) continue;

            return className.slice(pos + pattern.length);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return null;
      }
    }, {
      key: 'highlightEl',
      value: function highlightEl(el) {
        var $el = $(el);

        if (!$el.length) return;

        var $overlay = this.$overlay = this.$overlay || $(this.tpl.overlay);
        var computedStyles = window.getComputedStyle($el[0]);
        var backgroundColor = '';

        if (computedStyles.backgroundColor === 'rgba(0, 0, 0, 0)') {
          backgroundColor = this.getParentBackground($el);
        }

        $el.css({
          position: 'relative',
          zIndex: '9500',
          backgroundColor: backgroundColor
        }).after($overlay);

        $overlay.css({
          display: 'none',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          zIndex: '9000'
        }).fadeIn(400);
      }
    }, {
      key: 'unhighlightEl',
      value: function unhighlightEl(el) {
        var $el = $(el);

        if (!$el.length) return;

        var $overlay = this.$overlay = this.$overlay || $(this.tpl.overlay);

        $overlay.fadeOut(400, function () {
          $overlay.remove();
          $el.css({
            position: '',
            zIndex: '',
            backgroundColor: ''
          });
        });
      }
    }, {
      key: 'getParentBackground',
      value: function getParentBackground(el) {
        if ($(el).is('body')) return '#fff';

        var $parent = $(el).parent();
        var backgroundColor = window.getComputedStyle($parent[0]).backgroundColor;

        if (backgroundColor === 'rgba(0, 0, 0, 0)') {
          backgroundColor = this.getParentBackground($parent);
        }

        return backgroundColor;
      }
    }, {
      key: 'scrollTo',
      value: function scrollTo(selector, translation) {
        var _this3 = this;

        return new Promise(function (resolve, reject) {
          var wh = document.documentElement.clientHeight;
          var $el = $(selector);
          var elh = $el.outerHeight();
          var coords = {};
          var scrollTop = 0;

          if ($el.length) {
            coords = _this3.getCoords($el[0]);
          } else {
            reject('no such element');
          }

          if (wh > elh) {
            scrollTop = coords.top - (wh - elh) / 2;
          } else {
            scrollTop = coords.top;
          }

          $("html, body").animate({
            scrollTop: scrollTop - (translation || 0)
          }, {
            duration: 500,
            complete: resolve
          });
        });
      }
    }, {
      key: 'renderContent',
      value: function renderContent(content, title, controlPos) {
        //TODO переписать рендер и хендлер с использованием классов, без использования элементов для сравнения
        this.content = {};
        var $wrapper = this.content.$wrapper = $(this.tpl.contentWrapper);
        var $title = title ? $(this.tpl.title).append(title) : '';
        var $content = content ? $(this.tpl.content).append(content) : '';
        var $prev = this.content.$prev = $(this.tpl.prev);
        var $next = this.content.$next = $(this.tpl.next);
        var $end = this.content.$end = $(this.tpl.end);
        var $replay = this.content.$replay = $(this.tpl.replay);
        var $controls = $('<div class="mb20"></div>');
        controlPos = controlPos || 'bottom';

        $controls.append($prev).append($next).append($end);

        if (this.activeStepIndex === 0) {
          $prev.addClass('disabled').attr('disabled', true);
        }

        if (this.activeStepIndex === this.steps.length - 1) {
          $next.addClass('disabled').attr('disabled', true);
        }

        if (this.activeStep.file) {
          if (!this.isSound) {
            $replay.addClass('disabled');
          }

          if (controlPos === 'bottom') {
            $wrapper.append($replay);
          } else {
            $controls.append($replay);
          }
        }

        if (controlPos === 'bottom') {
          $wrapper.append($title).append($content).append($controls);
        } else {
          $wrapper.append($controls).append($title).append($content);
        }

        $wrapper.on('click', this._tooltipClickHandler);

        return $wrapper;
      }
    }, {
      key: 'contentClickHandler',
      value: function contentClickHandler(e) {
        var $target = $(e.target);

        if ($target.is(this.content.$prev)) {
          this.switchMenuItem(this.activeStepIndex - 1);
          this.goto(this.activeStepIndex - 1);
        } else if ($target.is(this.content.$next)) {
          this.switchMenuItem(this.activeStepIndex + 1);
          this.goto(this.activeStepIndex + 1);
        } else if ($target.is(this.content.$end)) {
          this.stop();
        } else if ($target.is(this.content.$replay) && !$target.hasClass('disabled')) {
          this.playAudio();
        }
      }
    }, {
      key: 'showTooltip',
      value: function showTooltip(el, content, title, pos) {
        var tooltip = this.tooltip;

        if (!tooltip) {
          tooltip = this.tooltip = $(el).jTooltip(this.tooltipOptions).jTooltip('getSelf');

          tooltip.stop();
        }

        tooltip.block = $(el)[0];
        tooltip.content = this.renderContent(content, title);
        tooltip.tooltipPosition = pos;
        tooltip.addTooltip();
      }
    }, {
      key: 'removeTooltip',
      value: function removeTooltip() {
        if (!this.tooltip) return;

        if (this.content && this.content.$wrapper) {
          this.content.$wrapper.off();
        }
        this.content = {};
        this.tooltip.removeTooltip();
      }
    }, {
      key: 'openModal',
      value: function openModal(step) {
        var content = step.manual;
        var title = step.title;
        var element = step.element;
        var controlPos = 'top';
        var options = {
          content: content
        };

        if (!content) return;

        if (!element || !$(element).length) {
          options.content = this.renderContent(content, title, controlPos);
          options.disableOverlayHandler = true;
          options.disableCloseBtnHandler = true;
        }

        this.isModalActive = true;
        $.jBox.open(options);
      }
    }, {
      key: 'closeModal',
      value: function closeModal() {
        if (!this.isModalActive) return;

        $.jBox.close();
        this.isModalActive = false;
      }
    }, {
      key: 'onModalClose',
      value: function onModalClose() {
        var _this4 = this;

        return new Promise(function (resolve) {
          if (_this4.isModalActive) {
            setTimeout(function () {
              $(document.body).one('jBox:afterClose', resolve);
            }, 300);
          } else {
            resolve();
          }
        });
      }
    }, {
      key: 'getCookies',
      value: function getCookies(key) {
        var cachedJsonOption = $.cookie.json;
        $.cookie.json = true;
        var cookie = $.cookie(key);
        $.cookie.json = cachedJsonOption;

        return cookie;
      }
    }, {
      key: 'putCookies',
      value: function putCookies(key, val, opt) {
        var cachedJsonOption = $.cookie.json;
        $.cookie.json = true;
        $.cookie(key, val, opt);
        $.cookie.json = cachedJsonOption;
      }
    }, {
      key: 'deleteCookies',
      value: function deleteCookies(key, opt) {
        return $.removeCookie(key, opt);
      }
    }, {
      key: 'putTourData',
      value: function putTourData(path) {
        var options = {
          path: '/'
        };
        var tourData = {
          path: path,
          name: this.name,
          activeStepIndex: this.activeStepIndex,
          startPage: this.startPage,
          isSound: this.isSound
        };

        this.putCookies(this.name, tourData, options);
      }
    }, {
      key: 'getTourData',
      value: function getTourData() {
        var tourData = this.getCookies(this.name);

        if (!tourData || !this.isSamePath(tourData.path)) return null;

        return tourData;
      }
    }, {
      key: 'deleteTourData',
      value: function deleteTourData() {
        var options = {
          path: '/'
        };

        this.deleteCookies(this.name, options);
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
      key: 'createMenu',
      value: function createMenu() {
        var $menu = this.$menu = this.renderMenu();

        if (!$menu) return;

        this.addMenu($menu);
        this.$soundBtn = $menu.find('#tour-sound').attr('checked', this.isSound);
        this._menuClickHandler = this.menuClickHandler.bind(this);
        $menu.on('click', this._menuClickHandler);
      }
    }, {
      key: 'renderMenu',
      value: function renderMenu() {
        var $menuWrapper = $(this.menuTpl.menuWrapper);
        var $menuContainer = $(this.menuTpl.container);
        var steps = this.steps;
        var $currMenuItem = $(0);

        for (var i = 0; i < steps.length; i++) {
          var currStep = steps[i];
          if (currStep.isMenuStep) {
            var $menuItem = $(this.menuTpl.item);
            var $menuAnchor = $(this.menuTpl.itemAnchor);

            $currMenuItem = $menuItem;

            $menuAnchor.text(currStep.menuTitle || steps[i].title).attr('data-jtour-step', i);
            $menuItem.append($menuAnchor);
            $menuContainer.append($menuItem);
          }

          if (this.activeStepIndex === i) {
            $currMenuItem.addClass('active');
          }
        }

        for (var _i = 0; _i < this.steps.length; _i++) {
          if (!this.steps[_i].file) continue;

          $menuWrapper.prepend(this.menuTpl.soundBtn);
          break;
        }

        $menuWrapper.append($menuContainer);

        return $menuContainer.children() === 0 ? null : $menuWrapper;
      }
    }, {
      key: 'removeMenu',
      value: function removeMenu() {
        if (!this.isMenu || !this.$menu) return;

        if (typeof this.removeMenuMethod === 'function') {
          this.removeMenuMethod(this.$menu, this.menuContainer, this);
        }

        this.$menu.off('click', this._menuClickHandler).remove();

        this.$menu = null;
      }
    }, {
      key: 'addMenu',
      value: function addMenu(menu) {
        if (typeof this.addMenuMethod === 'function') {
          this.addMenuMethod(menu, this.menuContainer, this);
        } else {
          $(this.menuContainer).append(menu);
        }
      }
    }, {
      key: 'menuClickHandler',
      value: function menuClickHandler(e) {
        var $target = $(e.target);

        if ($target.is('[data-jtour-step]')) {
          var index = +$target.attr('data-jtour-step');

          this.switchMenuItem(index);
          this.goto(index);

          e.preventDefault();
          return;
        }

        if ($target.is(this.$soundBtn)) {
          this.toggleVolume();

          return;
        }
      }
    }, {
      key: 'playAudio',
      value: function playAudio(source) {
        source = source || this.activeStep.file;

        if (!this.isSound) return;

        this.player.init(source);
        this.player.play();
      }
    }, {
      key: 'toggleVolume',
      value: function toggleVolume() {
        this.isSound = this.$soundBtn[0].checked;

        if (this.isSound) {
          this.content.$replay.removeClass('disabled').attr('disabled', false);
        } else {
          this.player.pause();
          this.content.$replay.addClass('disabled');
        }
      }
    }, {
      key: 'switchMenuItem',
      value: function switchMenuItem(index) {
        if (!this.$menu) return;

        var $menuItem = this.$menu.find('[data-jtour-step ="' + index + '"]');

        if (!$menuItem.length) return;

        var $currMenuItem = $menuItem.closest('li');
        var $activeMenuItem = this.$menu.find('li.active');

        this.$triggeredEl.trigger(this.events.menuBeforeSwitch, [this]);

        $activeMenuItem.removeClass('active');
        $currMenuItem.addClass('active');

        this.$triggeredEl.trigger(this.events.menuAfterSwitch, [this]);
      }
    }, {
      key: 'setupStepsPath',
      value: function setupStepsPath() {
        if (!this.startPage) {
          this.startPage = window.location.pathname;
        }

        var currPass = this.startPage;

        for (var i = 0; i < this.steps.length; i++) {
          var currStep = this.steps[i];

          if (currStep.path === currPass) {
            continue;
          } else if (!currStep.path) {
            currStep.path = currPass;
          } else {
            currPass = currStep.path;
          }
        }
      }

      /*not used*/

    }, {
      key: 'getTranslation',
      value: function getTranslation(el) {
        var translation = 0;

        if (el.hasAttribute('data-translation')) {
          translation = el.getAttribute('data-translation');
        } else if (this.steps[this.activeStepIndex].translationElementSelector) {
          $(this.steps[this.activeStepIndex].translationElementSelector).each(function () {
            translation += this.offsetHeight;
          });
          //translation = document.querySelector(this.translationElementSelector).offsetHeight;
        }

        return translation;
      }
    }, {
      key: 'getFirstIn',
      value: function getFirstIn(from) {
        var firstIn = -1;
        var steps = this.steps;

        if (typeof from === 'undefined') {
          from = 0;
        } else if (from < 0 || from > steps.length) {
          return firstIn;
        }

        for (var i = from; i < steps.length; i++) {
          if (!this.isSamePath(steps[i].path)) continue;

          firstIn = i;
          break;
        }

        return firstIn;
      }
    }]);

    return JTourController;
  }();

  var DefaultStep = {
    path: '',
    element: '',
    animateType: 'simple',
    tooltipPos: 'top',
    title: '',
    content: '',
    translationElementSelector: null,
    onBeforeStart: null,
    onAfterStart: null,
    onBeforeEnd: null,
    onAfterEnd: null,
    onElement: null // should pass object, arguments: event(string), function(function gets controller in e.data.tourController)
  };

  var DefaultTooltipOptions = {
    customContainerClass: 'js__jtooltip-s_white'
  };

  $.jTour = function (options) {
    var result = null;

    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && $.isArray(options.steps)) {
      result = new JTourController(options);
    }

    return result;
  };
});