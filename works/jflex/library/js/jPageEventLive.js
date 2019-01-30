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
  var JPageEventLiveController = function () {
    function JPageEventLiveController(listenedBlock, scenario) {
      _classCallCheck(this, JPageEventLiveController);

      this._listenedBlock = listenedBlock;
      this._scenario = scenario;
    }

    _createClass(JPageEventLiveController, [{
      key: 'init',
      value: function init() {
        var _this = this;

        this._scenario = this.fliterScenario(this._scenario);

        if (!this._scenario) return;
        //console.log(this._scenario);

        this._events = this.getEvents(this._scenario);

        this._events.forEach(function (event) {
          //console.log(event);
          if (event === 'none') return;

          $(_this._listenedBlock).on(event, _this.eventHandler.bind(_this, event));
        });

        /*autoplay*/
        this._scenario.forEach(function (scenario) {
          _this.autoplayScenario(scenario);
        });
      }
    }, {
      key: 'fliterScenario',
      value: function fliterScenario(scenario) {
        var result = [];

        if (!scenario) return false;

        if ($.isArray(scenario)) {
          result = scenario.filter(function (item) {
            return $.isPlainObject(item) && item.target && item.event;
          });

          if (!result.length) return false;

          result = result.map(function (item) {
            return $.extend(true, {}, defaultScenario, item);
          });

          return result;
        }

        if ($.isPlainObject(scenario) && scenario.target && scenario.event) {
          result.push($.extend(true, {}, defaultScenario, scenario));

          return result;
        }

        return false;
      }
    }, {
      key: 'getEvents',
      value: function getEvents(scenarioArr) {
        var _this2 = this;

        var events = [];

        scenarioArr.forEach(function (item) {
          //console.log(item.event);
          var currEvents = _this2.stringToArray(item.event);
          //console.log(currEvents);

          for (var i = 0; i < currEvents.length; i++) {
            if (~$.inArray(currEvents[i], events)) continue;

            events.push(currEvents[i]);
          }
        });

        return events;
      }
    }, {
      key: 'getEligibleScenario',
      value: function getEligibleScenario(scenario) {
        var cashedScenario = this.getCookies(scenario);
        var result = false;
        var date = new Date();

        if (!cashedScenario) {
          this.putCookies(scenario);

          result = true;
        } else {
          var comparator = this.compareScenario(scenario, cashedScenario);

          switch (comparator) {
            case 1:
              this.deleteCookies(cashedScenario);
              this.putCookies(scenario);
              result = true;
              break;
            case 0:
              scenario = cashedScenario;
              result = true;
              break;
            case -1:
              result = false;
              break;
            default:
              result = false;
              break;
          }
        }

        if (!scenario.date) {
          scenario = $.extend(true, {}, scenario, { date: date });
        }

        /*check timing*/
        if (result && this.isEligibleDate(scenario)) {
          result = true;
        } else {
          result = false;
        }

        /*new/old user*/
        if (result && scenario.userStatus) {
          if (scenario.userStatus === 'new') {
            result = this.isNewUser(scenario);
          } else if (scenario.userStatus === 'old') {
            result = !this.isNewUser(scenario);
          }
        }

        return result ? scenario : false;
      }
    }, {
      key: 'getScenarioByEvent',
      value: function getScenarioByEvent(scenarioArr, event) {
        var _this3 = this;

        return scenarioArr.filter(function (item) {
          var currEvents = _this3.stringToArray(item.event);

          for (var i = 0; i < currEvents.length; i++) {
            if (currEvents[i] === event) return true;
          }

          return false;
        });
      }
    }, {
      key: 'compareScenario',
      value: function compareScenario(scenario1, scenario2) {
        var priorityCompare = null;

        if (scenario1.priority > scenario2.priority) {
          priorityCompare = 1;
        } else if (scenario1.priority === scenario2.priority) {
          priorityCompare = 0;
        } else {
          priorityCompare = -1;
        }

        return priorityCompare;
      }
    }, {
      key: 'isEligibleDate',
      value: function isEligibleDate(scenario) {
        var date = new Date() - Date.parse(scenario.date);
        //console.log(scenario.date);
        //console.log(Date.parse(scenario.date));

        if (+scenario.showAfter === 0 && scenario.sessionId === defaultScenario.sessionId) {
          return true;
        }

        if (typeof scenario.showAfter === 'string') {
          var timers = this.parseTimer(scenario.showAfter);

          for (var i = 0; i < timers.length; i++) {
            //console.log('now = ' + date);
            //console.log('timer from = ' + timers[i].from);
            //console.log('timer to = ' +timers[i].to);
            if (timers[i].from <= date && timers[i].to >= date) return true;
          }
        }

        return false;
      }
    }, {
      key: 'parseTimer',
      value: function parseTimer(timerStr) {
        var timersArr = this.stringToArray(timerStr);
        var parsedTimersArr = [];
        var minutes = 60 * 1000;

        for (var i = 0; i < timersArr.length; i++) {
          var fromTo = this.stringToArray(timersArr[i], '-');

          //fromTo[0] = parseInt(fromTo[0]) * minutes;
          //fromTo[1] = parseInt(fromTo[1]) * minutes;

          parsedTimersArr.push({
            from: parseInt(fromTo[0]) * minutes,
            to: parseInt(fromTo[1]) * minutes
          });
        }

        return parsedTimersArr;
      }
    }, {
      key: 'setupUserInfo',
      value: function setupUserInfo() {
        var userGlobal = $.cookie(defaultScenario.newUserGlobal);
        var userPage = $.cookie(defaultScenario.newUserPage);
        var cachedJsonOption = $.cookie.json;
        var userInfo = {
          date: new Date()
        };

        var mess = void 0;

        //console.log(userInfo);
        //console.log(userGlobal);
        //console.log(userPage);

        $.cookie.json = true;

        if (!userGlobal) {
          mess = $.cookie(defaultScenario.newUserGlobal, userInfo, { path: '/' }); //$.cookie(defaultScenario.newUserGlobal, userInfo, {path: '/'});
          //console.log(mess);
        }

        if (!userPage) {
          mess = $.cookie(defaultScenario.newUserPage, userInfo);
          //console.log(mess);
        }

        $.cookie.json = cachedJsonOption;
      }
    }, {
      key: 'isNewUser',
      value: function isNewUser(scenario) {
        var currDate = new Date();
        var timeIndex = 24 * 60 * 60 * 1000; //day in milliseconds
        var cachedJsonOption = $.cookie.json;
        var userName = void 0;
        var userInfo = void 0;

        $.cookie.json = true;

        if (scenario.newUserEntrance === 'page') {
          userName = scenario.newUserPage;
        } else {
          //if (scenario.newUserEntrance === 'site') возможно надо точное сравнение
          userName = scenario.newUserGlobal;
        }
        userInfo = $.cookie(userName);

        if (!userInfo || !userInfo.date) {
          var userData = this.setupUserInfo();
          //userInfo = userData[userName];

          userInfo = $.cookie(userName);
        }

        if (userInfo === undefined) {
          return true;
        }

        $.cookie.json = cachedJsonOption;

        return currDate - Date.parse(userInfo.date) < scenario.newUserStatus * timeIndex;
      }
    }, {
      key: 'eventHandler',
      value: function eventHandler(eName, e) {
        var scenarioArr = this.getScenarioByEvent(this._scenario, eName);

        for (var i = 0; i < scenarioArr.length; i++) {
          var scenario = this.getEligibleScenario(scenarioArr[i]);

          if (!scenario) continue;

          this.playScenario(scenario);
        }
      }
    }, {
      key: 'playScenario',
      value: function playScenario(scenario) {
        var _this4 = this;

        if (!scenario) return;

        var isOnShow = typeof scenario.onShow === 'function';

        if (scenario.delay) {
          setTimeout(function () {
            //console.log('playscenario');
            if (isOnShow) scenario.onShow(scenario, _this4);

            $(_this4._listenedBlock).trigger(scenario.triggeredEvent, [scenario]);
          }, scenario.delay * 1000);
        } else {
          //console.log('playscenario');
          if (isOnShow) scenario.onShow(scenario, this);

          $(this._listenedBlock).trigger(scenario.triggeredEvent, [scenario]);
        }
      }
    }, {
      key: 'autoplayScenario',
      value: function autoplayScenario(scenario) {
        var _this5 = this;

        if (!scenario.autoplay) return false;

        return setTimeout(function () {
          _this5.playScenario(_this5.getEligibleScenario(scenario));
        }, parseInt(scenario.autoplayDelay) * 1000);
      }
    }, {
      key: 'getCookies',
      value: function getCookies(scenario) {
        var cachedJsonOption = $.cookie.json;
        $.cookie.json = true;
        var cookie = $.cookie(scenario.target);
        $.cookie.json = cachedJsonOption;

        return cookie;
      }
    }, {
      key: 'putCookies',
      value: function putCookies(scenario) {
        if (!scenario.date) {
          scenario = $.extend(true, {}, scenario, { date: new Date() });
        }

        var cachedJsonOption = $.cookie.json;
        $.cookie.json = true;
        $.cookie(scenario.target, scenario);
        $.cookie.json = cachedJsonOption;
      }
    }, {
      key: 'deleteCookies',
      value: function deleteCookies(scenario) {
        return $.removeCookie(scenario.target);
      }
    }, {
      key: 'stringToArray',
      value: function stringToArray(str, comparator) {
        comparator = comparator || ', ';

        if (typeof str !== 'string') return false;

        return str.split(comparator).map(function (item) {
          return $.trim(item);
        });
      }
    }]);

    return JPageEventLiveController;
  }();

  var defaultScenario = {
    target: null, //string, jQuery Object: target block, using multiple selectors or objects only with simplebox
    event: null, /*string: native or custom events, multiple events allowed like 'click, hover, myCustomEvent',
                 'none' event for autoplay usage, if no need to trigger play scenario againe */
    triggeredEvent: 'jPageEventLive:playScenario', // string: 'playScenario' triggered event name
    openingMethod: 'jBox', // string: 'simplebox', 'jBox'
    showAfter: 0, // string: '0 - 10, 20 - 30', timer cycles in minutes
    priority: 1, // integrer
    autoplay: false, //boolean: enable autoplay
    autoplayDelay: 0, // seconds
    delay: 0, // event triggering delay
    sessionId: Math.random(), //integrer: unique current session id
    userStatus: false, //string: 'new', 'old', false
    newUserGlobal: 'userInfoGlobal', //string: global (current website) user cookies name
    newUserPage: 'userInfoPage', //string: local (current page) user cookies name
    newUserStatus: 7, // integrer: days user is new
    newUserEntrance: 'page', // 'page', 'site'
    onShow: null, //function: callback on show
    onClose: null //function not used
  };

  /*setup new user*/
  JPageEventLiveController.prototype.setupUserInfo.call(null);

  $.fn.jPageEventLive = function () {
    var options = _typeof(arguments[0]) === 'object' ? arguments[0] : {};

    $(this).each(function () {
      var controller = new JPageEventLiveController(this, options);
      //console.dir(controller);
      controller.init();
    });
  };
});

/*simple block opener*/
(function ($) {
  var SimpleBox = function () {
    function SimpleBox() {
      _classCallCheck(this, SimpleBox);

      this._isActive = false;
      this._activeCounter = 0;
      this._isOpening = null;
      this.listenedEvent = 'jPageEventLive:playScenario';
      this.closeBtn = '<span class="lightbox-close">x</span>';
      this.inner = '<div class="lightbox-inner"></div>';
      this.outer = '<div class="simple-box lightbox-outer"></div>';
      this.closeBtnSelector = '.lightbox-close';
      this.innerSelector = '.lightbox-inner';
      this.outerSelector = '.lightbox-outer';
      this.contentSelector = '.lightbox-content';
      this.lightboxSelector = '.simple-box';
    }

    _createClass(SimpleBox, [{
      key: 'init',
      value: function init() {
        //let _ = this;
        //let listenedEvent = _.listenedEvent;

        $('body').on(this.listenedEvent, this.eventHandler.bind(this)).on('click', this.outerClickChecker.bind(this)).on('click', this.closeBtnHandler.bind(this));
      }
    }, {
      key: 'showBlock',
      value: function showBlock(block) {
        var _this6 = this;

        var $block = this.setupBlock(block);

        if (this._isOpening) {
          this._isOpening = this._isOpening.add($block);
        } else {
          this._isOpening = $block;
        }

        $block.fadeIn(function () {
          _this6._isOpening = null;
        });
        /*this._isActive = true;
         this._activeCounter += $(block).length;*/
      }
    }, {
      key: 'hideBlock',
      value: function hideBlock(block) {
        var _this7 = this;

        var $block = $(block);

        /*this._activeCounter = (this._activeCounter - $block.length) >= 0 ?
         this._activeCounter - $block.length : 0;
          if(!this._activeCounter) this._isActive = false;*/

        $block.add($block.find(this.contentSelector)).fadeOut(function () {
          _this7.stripBlock($block);
        });
      }
    }, {
      key: 'setupBlock',
      value: function setupBlock(block) {
        var _this8 = this;

        /*return $(block)
         .addClass(this.contentSelector.slice(1))
         .show()
         .wrap(this.outer)
         .wrap(this.inner)
         .parent(this.outerSelector)
         .append(this.closeBtn)
         .hide();*/

        var $block = $(block);

        $block.each(function (index, item) {
          var $item = $(item);

          if ($item.closest(_this8.outerSelector).length) return;

          $(item).addClass(_this8.contentSelector.slice(1)).wrap(_this8.outer).wrap(_this8.inner).show().closest(_this8.outerSelector).append(_this8.closeBtn).hide();
        });

        var $lightbox = $block.closest(this.lightboxSelector);
        //console.log($block[0]);

        /*$block = $block
          .closest(this.outerSelector)
          .append(this.closeBtn)
          .hide();*/

        //console.log($block[0]);

        return $lightbox;
      }
    }, {
      key: 'stripBlock',
      value: function stripBlock(block) {
        var $outer = $(block).closest(this.outerSelector);
        var $block = $outer.find(this.contentSelector);

        //console.log($outer[0]);
        $outer.find(this.closeBtnSelector).remove();
        //console.log($outer[0]);
        $block.unwrap().unwrap().removeClass(this.contentSelector.slice(1));
      }
    }, {
      key: 'eventHandler',
      value: function eventHandler(e, scenario) {
        if (scenario.openingMethod !== 'simplebox') return;

        var target = scenario.target;

        this.showBlock(target);
      }
    }, {
      key: 'outerClickChecker',
      value: function outerClickChecker(e) {
        var el = e.target;
        var target = el.closest(this.lightboxSelector);

        if (target) return;
        if (!$(this.lightboxSelector).length) return;

        if (this._isOpening) {
          this.hideBlock($(this.lightboxSelector).not(this._isOpening));
          return;
        }

        this.hideBlock(this.lightboxSelector);
      }
    }, {
      key: 'closeBtnHandler',
      value: function closeBtnHandler(e) {
        var el = e.target;
        var closeBtn = el.closest(this.closeBtnSelector);

        if (!closeBtn) return;

        this.hideBlock(closeBtn.closest(this.lightboxSelector));
      }
    }]);

    return SimpleBox;
  }();

  /*block opener init*/


  var simpleLightbox = new SimpleBox();

  simpleLightbox.init();
})(jQuery);
