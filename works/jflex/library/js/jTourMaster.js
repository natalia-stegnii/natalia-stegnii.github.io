//TODO events

/*comments*/
/*steps examples*/
/*{
            element: '#edit-submit',
            title: 'Отправить',
            content: 'Сохраните серийный номер',
            onElement: {
              event: 'click',
              handler: function (e) {
                let $target = $(e.target);
                let tour = e.data.tourController;

                e.preventDefault();

                setTimeout(() => {
                  $target.trigger(tour.activeStep.onElement.event);
                }, 50);
                tour.bindNextStep();
              }
            },

            {
            element: '#edit-theme-settings .fieldset-legend',
            title: 'Включить/выключить отображение ',
            content: 'Управление отображением элементов страницы. Оставьте без изменений, если не уверены.',
            path: '/admin/appearance/settings/jflex/',
            isMenuStep: true,
            menuTitle: 'настройки оформления'
          },

          Custom steps for gathering in one tour

          {
        element: '.js__jtour-step1',
        title: 'step 1',
        tag: 'Функциональные опции интернет-магазина', //в турмастере в popup4 шаги по одной теме группируются вместе, с одним заголовком
        content: 'some bla-bla-bla',
        path: '/review/flex_admin_tour/test2.html'
      },
      {
        element: '.js__jtour-step2',
        title: 'step 2',
        tag: 'Функциональные опции интернет-магазина',
        content: 'some bla-bla-bla',
        path: '/review/flex_admin_tour/test2.html'
      },
*/
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
  var JTourMasterController = function () {
    function JTourMasterController(options) {
      _classCallCheck(this, JTourMasterController);

      this.tours = options.tours;
      this.steps = options.steps;
      this.jboxOptions = options.jboxOptions || {};
      this.defaultTourOptions = options.defaultTourOptions || {};
      this.gotoPopUpAttr = options.gotoPopUpAttr || 'data-show-popup';
      this.startTourByNameAttr = options.startTourByNameAttr || 'data-start-tour';
      this.closePopupBtn = options.closePopupBtn || '.js__jbox-close';
      this.customTemplateForm = '#custom-template-form';
      this.customTourOptions = options.customTourOptions || {};
      this.autostart = options.autostart || false;
      this.autostartPath = options.autostartPath || '';
      this.autostartCondition = options.autostartCondition || 'none'; // 'none', 'new'
      this.autostartConditionFunc = options.autostartConditionFunc || null;
      this.tour = null;
      this.listenedEl = options.listenedEl || document.body;
      this.layoutContainer = options.layoutContainer || document.body;
      this.events = {};
      this.activeTourKey = 'tour-master-active-tour';

      this.init();
    }

    _createClass(JTourMasterController, [{
      key: 'init',
      value: function init() {
        var hasAutostart = this.autostart && this.isSamePath(this.autostartPath);
        var hasCookiesStart = this.hasCookiesStart();

        this.defaultTourOptions = $.extend(true, {}, DefaultTourOptions, this.defaultTourOptions);
        this.customTourOptions = $.extend(true, {}, CustomTourOptions, this.customTourOptions);

        if (!hasAutostart && !hasCookiesStart) return;

        if (hasCookiesStart) {
          var start = this.onCookiesStart();

          if (start) return;
        }

        if (hasAutostart) {
          var _start = this.runAutostart();

          if (_start) return;
        }
      }
    }, {
      key: 'initLayout',
      value: function initLayout() {
        if (this.isLayout) return;

        if (this.isAttachedHandlers) {
          this.detachHandlers();
        }

        this.renderLayout();
        this.bindElements();
        this.bindHandlers();
        this.attachHandlers();

        this.isLayout = true;
      }
    }, {
      key: 'stop',
      value: function stop() {
        if (this.tour) {
          this.tour.stop();
        }

        this.hidePopUp();
        this.detachHandlers();
        this.destroyLayout();
        this.isLayout = false;
      }
    }, {
      key: 'start',
      value: function start() {
        this.startTourMaster();
      }
    }, {
      key: 'runAutostart',
      value: function runAutostart() {
        if (typeof this.autostartConditionFunc === 'function') {
          if (this.autostartConditionFunc(this)) {
            this.start();
            return true;
          }

          return false;
        }

        switch (this.autostartCondition) {
          case 'none':
            this.start();
            return true;
          case 'new':
            return this.firstTimeTourMasterStart();
          default:
            return false;
        }
      }
    }, {
      key: 'bindElements',
      value: function bindElements() {
        this.$gotoPopupBtn = $('[' + this.gotoPopUpAttr + ']');
        this.$closePopupBtn = $(this.closePopupBtn);
        this.$startTourByNameBtn = $('[' + this.startTourByNameAttr + ']');
        this.$customTemplateForm = $(this.customTemplateForm);
        this.$listenedEl = $(this.listenedEl);
      }
    }, {
      key: 'bindHandlers',
      value: function bindHandlers() {
        this._gotoPopUpHandler = this.gotoPopUpHandler.bind(this);
        this._hidePopUp = this.hidePopUp.bind(this);
        this._startTourByNameHandler = this.startTourByNameHandler.bind(this);
        this._startCustomTourHandler = this.startCustomTourHandler.bind(this);
        this._gotoNextPageHandler = this.gotoNextPageHandler.bind(this);
      }
    }, {
      key: 'attachHandlers',
      value: function attachHandlers() {
        this.$gotoPopupBtn.on('click', this._gotoPopUpHandler);
        this.$closePopupBtn.on('click', this._hidePopUp);
        this.$startTourByNameBtn.on('click', this._startTourByNameHandler);
        this.$customTemplateForm.on('submit', this._startCustomTourHandler);
        this.$listenedEl.on('jTour:tourGoNextPage', this._gotoNextPageHandler);

        this.isAttachedHandlers = true;
      }
    }, {
      key: 'detachHandlers',
      value: function detachHandlers() {
        this.$gotoPopupBtn.off('click', this._gotoPopUpHandler);
        this.$closePopupBtn.off('click', this._hidePopUp);
        this.$startTourByNameBtn.off('click', this._startTourByNameHandler);
        this.$customTemplateForm.off('submit', this._startCustomTourHandler);
        this.$listenedEl.off('jTour:tourGoNextPage', this._gotoNextPageHandler);

        this.isAttachedHandlers = false;
      }
    }, {
      key: 'showPopUp',
      value: function showPopUp(el) {
        $.jBox.open($.extend(true, {}, this.jboxOptions, { href: el }));
      }
    }, {
      key: 'hidePopUp',
      value: function hidePopUp() {
        $.jBox.close();
      }
    }, {
      key: 'startTourMaster',
      value: function startTourMaster() {
        if (!this.isLayout) {
          this.initLayout();
        }

        this.showPopUp(this.html.layout.$popupIntro);
      }
    }, {
      key: 'gotoPopUpHandler',
      value: function gotoPopUpHandler(e) {
        var el = e.target;
        var target = el.closest('[' + this.gotoPopUpAttr + ']');

        if (!target) return;
        e.preventDefault();

        this.showPopUp(target.getAttribute(this.gotoPopUpAttr));
      }
    }, {
      key: 'startTour',
      value: function startTour(options) {
        this.createTour(options);

        setTimeout(function () {
          this.tour.start();
        }.bind(this), 200);
      }
    }, {
      key: 'createTour',
      value: function createTour(options) {
        options = $.extend(true, this.defaultTourOptions, options);
        this.activeTourOptions = options;
        this.tour = $.jTour(options);

        return this.tour;
      }
    }, {
      key: 'gotoNextPageHandler',
      value: function gotoNextPageHandler(e, path, tour) {

        if (tour !== this.tour) return;

        this.putActiveTourCookies(path);
      }
    }, {
      key: 'startTourByNameHandler',
      value: function startTourByNameHandler(e) {
        var el = e.target;
        var target = el.closest('[' + this.startTourByNameAttr + ']');

        if (!target) return;
        e.preventDefault();

        this.hidePopUp();
        this.startTourByName(target.getAttribute(this.startTourByNameAttr));
      }
    }, {
      key: 'startTourByName',
      value: function startTourByName(tourName) {
        var tourOptions = this.getTourByName(tourName);

        if (!tourOptions) return;

        this.startTour(tourOptions);
      }
    }, {
      key: 'getTourByName',
      value: function getTourByName(tourName) {
        for (var i = 0; i < this.tours.length; i++) {
          if (this.tours[i].name !== tourName) continue;

          return this.tours[i];
        }

        return null;
      }
    }, {
      key: 'startCustomTourHandler',
      value: function startCustomTourHandler(e) {
        var el = e.target;
        var target = el.closest(this.customTemplateForm);

        if (!target) return;

        e.preventDefault();

        var options = this.getCustomTour(target);

        if (!options) return;

        this.hidePopUp();
        this.startTour(options);
      }
    }, {
      key: 'getCustomTour',
      value: function getCustomTour(form) {
        var formData = $(form).serializeArray();
        var tourOptions = $.extend(true, {}, this.customTourOptions);
        var currSteps = [];
        var customStepsIndex = this.customStepsIndex = [];

        for (var i = 0; i < formData.length; i++) {
          var stepIndex = +formData[i].value;

          currSteps.push(this.steps[stepIndex]);
          customStepsIndex.push(stepIndex);
        }

        tourOptions.steps = currSteps;

        return tourOptions;
      }
    }, {
      key: 'firstTimeTourMasterStart',
      value: function firstTimeTourMasterStart() {
        var name = 'tour-master';
        var data = {
          date: new Date()
        };
        var options = {
          domain: window.location.hostname
        };
        var tourMasterData = this.getCookies(name);

        if (tourMasterData) return false;

        this.putCookies(name, data, options);
        this.startTourMaster();
        return true;
      }
    }, {
      key: 'putActiveTourCookies',
      value: function putActiveTourCookies(path) {
        var options = {
          path: '/'
        };
        var tourOptions = this.parseTourOptions(this.activeTourOptions);
        var tourData = Object.assign({}, tourOptions, { path: path });

        this.putCookies(this.activeTourKey, tourData, options);
      }
    }, {
      key: 'hasCookiesStart',
      value: function hasCookiesStart() {
        return !!this.getActiveTourCookies();
      }
    }, {
      key: 'onCookiesStart',
      value: function onCookiesStart() {
        var tourData = this.getActiveTourCookies();
        var cookiesOptions = {
          path: '/'
        };

        if (!tourData) return false;

        this.initLayout();
        this.deleteCookies(this.activeTourKey, cookiesOptions);
        this.createTour(this.parseTourCookieData(tourData));

        return true;
      }
    }, {
      key: 'getActiveTourCookies',
      value: function getActiveTourCookies() {
        var tourData = this.getCookies(this.activeTourKey);

        if (!tourData || !this.isSamePath(tourData.path)) return null;

        return tourData;
      }
    }, {
      key: 'createTourFromCookies',
      value: function createTourFromCookies(tourData) {
        var tourOptions = this.parseTourCookieData(tourData);

        if (tourData.customStepsIndex) {
          this.customStepsIndex = tourData.customStepsIndex;
        }

        this.activeTourOptions = tourOptions;

        this.tour = $.jTour(tourOptions);
      }
    }, {
      key: 'parseTourOptions',
      value: function parseTourOptions(options) {
        var tourCookiesData = {
          name: options.name
        };

        if (options.name !== this.customTourOptions.name) return tourCookiesData;

        tourCookiesData.steps = this.customStepsIndex;
        return tourCookiesData;
      }
    }, {
      key: 'parseTourCookieData',
      value: function parseTourCookieData(tourData) {
        var tourOptions = void 0;

        if (tourData !== this.customTourOptions.name) {
          tourOptions = this.getTourByName(tourData.name);
        } else {
          tourOptions = $.extend(true, {}, this.customTourOptions);
          tourOptions.steps = [];
          this.customStepsIndex = tourData.customStepsIndex;

          for (var i = 0; i < tourData.customStepsIndex; i++) {
            tourOptions.steps.push(this.steps[tourData.customStepsIndex[i]]);
          }
        }

        return tourOptions;
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
      key: 'isSamePath',
      value: function isSamePath(path, isEmptyPath) {
        var lang = this.getLang();
        var reg = lang ? new RegExp('/' + lang + '/', 'g') : null;
        var currPath = path.replace(reg, '/');
        var localPath = window.location.pathname.replace(reg, '/');

        if (currPath === localPath || currPath === '' && isEmptyPath) {
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
      key: 'renderLayout',
      value: function renderLayout() {
        var $popupIntro = $(LayoutTpl.popup1);
        var $popupDivarication = $(LayoutTpl.popup2);
        var $popupTours = $(this.renderPopupTours(this.tours));
        var $popupSteps = $(this.renderPopupSteps(this.steps));
        var $container = $(this.layoutContainer);

        this.html = {
          layout: {
            $popupIntro: $popupIntro,
            $popupDivarication: $popupDivarication,
            $popupTours: $popupTours,
            $popupSteps: $popupSteps
          },
          $layoutContainer: $container
        };

        $container.append($popupIntro).append($popupDivarication).append($popupTours).append($popupSteps);
      }
    }, {
      key: 'renderPopupTours',
      value: function renderPopupTours(tours) {
        var source = LayoutTpl.popup3;
        var template = Handlebars.compile(source);
        var context = {
          tours: tours
        };

        return template(context);
      }
    }, {
      key: 'renderPopupSteps',
      value: function renderPopupSteps(steps) {
        var source = LayoutTpl.popup4;
        var template = Handlebars.compile(source);
        var context = {
          steps: steps,
          groupSteps: []
        };

        for (var i = 0; i < steps.length; i++) {
          var hasTitle = false;

          for (var j = 0; j < context.groupSteps.length; j++) {
            if (steps[i].tag !== context.groupSteps[j].title) continue;

            hasTitle = true;
            break;
          }

          if (hasTitle) continue;

          context.groupSteps.push({
            title: steps[i].tag
          });
        }

        return template(context);
      }
    }, {
      key: 'destroyLayout',
      value: function destroyLayout() {
        var layout = this.html.layout;

        for (var popup in layout) {
          layout[popup].remove();
        }

        this.html.layout = {};
      }
    }]);

    return JTourMasterController;
  }();

  var CustomTourOptions = {
    name: 'custom-tour',
    isMenu: true,
    steps: []
  };

  var DefaultTourOptions = {
    isMenu: true
  };

  var LayoutTpl = {
    popup1: '<div id="tour-master__popup-1" class="tour-master__popup-1 tour__popup center hide">\n                <div id="preloader" class="preloader fadeInDown">\n                  <div class="preloader__content">\n                    <div class="spinner box_1 spinner"></div>\n                    <div class="spinner box_2 delay_1"></div>\n                    <div class="spinner box_3 delay_2"></div>\n                    <div class="spinner box_4 delay_3"></div>\n                    <div class="box_5"></div>\n                  </div>\n                </div>\n                <h2 class="mv30 fadeInDown animation-delay_0_2">\u041C\u0430\u0441\u0442\u0435\u0440 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438</h2>\n                <div class="small lh20 fadeInDown animation-delay_0_4">\u041D\u0430\u0447\u043D\u0438\u0442\u0435 \u0441 \u043F\u0440\u043E\u0441\u0442\u043E\u0439 \u043F\u043E\u0448\u0430\u0433\u043E\u0432\u043E\u0439 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0441\u0438\u0441\u0442\u0435\u043C\u044B.</div>\n                <div class="mb80 small lh20 fadeInDown animation-delay_0_4">\u0421\u043B\u0435\u0434\u0443\u0439\u0442\u0435 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0430\u043C \u0438\u043D\u0442\u0435\u0440\u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u043C\u043E\u043C\u043E\u0449\u043D\u0438\u043A\u0430.</div>\n                <button class="btn_start btn small simple icon icon-triangle-right fadeInDown animation-delay_0_6" data-show-popup=".tour-master__popup-2">\u041D\u0430\u0447\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443</button>\n                <a href="#" class="btn_skip js__jbox-close fadeInDown animation-delay_0_8">\u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443</a>\n            </div>',
    popup2: '<div id="tour-master__popup-2" class="tour-master__popup-2 tour__popup hide">\n        <h2 class="mb30 fadeInDown">\u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 Flex</h2>\n        \n        <div class="marker blue mb50">\n          <div class="row sp-20">\n            <div class="col d6 m12">\n              <div class="settings__title big t_black fadeInDown animation-delay_0_2">\n                \u0428\u0430\u0431\u043B\u043E\u043D\u044B\n                <br>\n                \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432\n              </div>\n              <div class="mb40 smaller description lh20 fadeInDown animation-delay_0_4">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u0447\u0442\u043E \u0431\u044B \u0432\u044B\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u043D\u0430 \u043E\u0441\u043D\u043E\u0432\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432 \u044D\u0444\u0444\u0435\u043A\u0442\u0438\u0432\u043D\u044B\u0445 \u0441\u0442\u0430\u043D\u0434\u0430\u0440\u0442\u043E\u0432.</div>\n              <button class="btn small simple fadeInDown animation-delay_0_6" data-show-popup=".tour-master__popup-3">\u0432\u044B\u0431\u0440\u0430\u0442\u044C</button>\n            </div>\n \n            <div class="col d6 m12">\n              <div class="settings__title big t_black fadeInDown animation-delay_0_2">\n                \u0421\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0435\n                <br>\n                \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B\n              </div>\n              <div class="mb40 smaller description lh20 fadeInDown animation-delay_0_4">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435, \u0447\u0442\u043E \u0431\u044B \u043D\u0430\u0441\u0442\u0440\u043E\u0438\u0442\u044C \u0441\u0438\u0441\u0442\u0435\u043C\u0443 \u043F\u043E\u0434 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0435 \u0431\u0438\u0437\u043D\u0435\u0441-\u043F\u0440\u043E\u0446\u0435\u0441\u0441\u044B \u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u043E\u0440\u0433\u0430\u043D\u0438\u0437\u0430\u0446\u0438\u0438.</div>\n              <button class="btn small simple fadeInDown animation-delay_0_6" data-show-popup=".tour-master__popup-4">\u0432\u044B\u0431\u0440\u0430\u0442\u044C</button>\n            </div>\n          </div>\n          \n        </div>\n    \n        <a href="#" class="educational-center__link icon icon-uniE7D3 fadeInDown animation-delay_0_8">\u0423\u0447\u0435\u0431\u043D\u044B\u0439 \u0446\u0435\u043D\u0442\u0440</a>\n        <a href="#" class="btn_skip js__jbox-close fadeInDown animation-delay_1_0">\u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443</a>\n      </div>',
    popup3: '<div id="tour-master__popup-3" class="tour-master__popup-3 tour__popup  hide">\n        <button  class="btn_back btn small simple icon icon-uniE7DC fadeInDown"  data-show-popup=".tour-master__popup-2">\u043D\u0430\u0437\u0430\u0434</button>\n        <h2 class="mb30 fadeInDown animation-delay_0_2">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0448\u0430\u0431\u043B\u043E\u043D \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432</h2>\n    \n        <div class="marker blue mb50 fadeInDown animation-delay_0_4">\n          <div class="process-lenks mt20 mb70">\n            {{#each tours as |tour|}}\n                <a href="#" data-start-tour="{{tour.name}}">{{tour.title}}</a>\n            {{/each}}\n          </div>\n        </div>\n    \n        <a href="#" class="educational-center__link icon icon-uniE7D3 fadeInDown animation-delay_0_6">\u0423\u0447\u0435\u0431\u043D\u044B\u0439 \u0446\u0435\u043D\u0442\u0440</a>\n        <a href="#" class="btn_skip js__jbox-close fadeInDown animation-delay_0_8">\u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443</a>\n      </div>',
    popup4: '<div id="tour-master__popup-4" class="tour-master__popup-4 tour__popup  hide">\n        <button  class="btn_back btn small simple icon icon-uniE7DC"  data-show-popup=".tour-master__popup-2">\u043D\u0430\u0437\u0430\u0434</button>\n        <h2 class="mb30">\u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u043E\u043F\u0446\u0438\u0438 \u043F\u0440\u043E\u0446\u0435\u0441\u0441\u043E\u0432</h2>\n    \n        <div class="marker blue mb30">\n          <div class="custom-template-form__wrap mt20">\n            <form action="post" id="custom-template-form" class="custom-template-form">\n              {{#each groupSteps as |groupStep|}}\n                <div class="title">{{this.title}}</div>\n                <div class="form-item">\n                  {{#each ../steps as |step|}}\n                    {{#ifCond step.tag \'===\' groupStep.title}}\n                      <input id="template-checkbox-{{@index}}" type="checkbox" name="custom-template" value="{{@index}}">\n                      <label for="template-checkbox-{{@index}}">{{step.title}}</label>\n                    {{/ifCond}}\n                  {{/each}}\n                </div>\n              {{/each}}\n            \n              <button type="submit" class="btn_start btn small simple icon icon-triangle-right">\u041D\u0430\u0447\u0430\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443</button>\n            </form>\n          </div>\n        </div>\n    \n        <a href="#" class="educational-center__link icon icon-uniE7D3">\u0423\u0447\u0435\u0431\u043D\u044B\u0439 \u0446\u0435\u043D\u0442\u0440</a>\n        <a href="#" class="btn_skip js__jbox-close">\u043F\u0440\u043E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0443</a>\n      </div>'
  };

  $.jTourMaster = function (options) {
    if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) === 'object' && $.isArray(options.steps)) {
      return new JTourMasterController(options);
    } else {
      return null;
    }
  };
});
