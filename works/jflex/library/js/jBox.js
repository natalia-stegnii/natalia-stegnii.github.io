/*
 * jBox
 * v 1.4
 * */

/* jFlex library. Made by Jeto */
/* https://jflex.org */
/* https://jeto.org */

//TODO плавную смену окон
//TODO правильное позиционирование при смене окон
//TODO разобраться с sku функцией, с anchortarget понять есть ли жизнь на Марсе?
//TODO init или хотя-бы render по требованию
//TODO переработать showEl, что-бы можно было скармливать не только блок но и строку
//TODO сделать возможность сипользования галереи не только для картинок
//TODO вынести определение опций для каждого слайдера из showEl, передавать в showblock только опции


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
  var Gallery = function () {
    function Gallery(options) {
      _classCallCheck(this, Gallery);

      this.className = options.className;
      this.indexCurrent = 0;
      this.targetEl = options.targetEl;
      this.jboxObj = options.jbox;
      this.tpl = {
        controlTpl: '<div class="jbox-control"><span class="prev"></span><span class="next"></span></div>'
      };

      this.init();
    }

    _createClass(Gallery, [{
      key: 'init',
      value: function init() {
        var elements = $('a.jbox.' + this.className);
        var gallerySrc = this.gallerySrc = this.getGallerySrc(elements);

        if (!gallerySrc.length) return;

        var imgCurrent = this.imgCurrent = $('img', this.jboxObj.inner);
        var control = this.control = $(this.tpl.controlTpl);
        this.indexCurrent = parseInt(gallerySrc.indexOf(this.targetEl.attr('href')));
        this.indexSumm = gallerySrc.length - 1;

        imgCurrent.after(control);

        /*TODO необходимо сделать этот эффект при помощи css*/
        $('span', control).hover(function () {
          $(this).animate({ opacity: 1 }, 150);
        }, function () {
          $(this).animate({ opacity: 0 }, 50);
        });

        // control
        control.on('click', this.controlHandler.bind(this));
      }
    }, {
      key: 'controlHandler',
      value: function controlHandler(e) {
        var el = e.target;
        var prevBtn = $(el).closest('.prev');
        var nextBtn = $(el).closest('.next');

        if (prevBtn.length) {
          this.changeImg('prev');
          return;
        }

        if (nextBtn.length) {
          this.changeImg('next');
          return;
        }
      }
    }, {
      key: 'changeImg',
      value: function changeImg(direction) {
        var _this = this;

        switch (direction) {
          case 'prev':
            this.indexCurrent = this.indexCurrent > 0 ? --this.indexCurrent : this.indexSumm;
            break;
          case 'next':
            this.indexCurrent = this.indexCurrent >= this.indexSumm ? 0 : ++this.indexCurrent;
            break;
        }

        var imgUrl = this.gallerySrc[this.indexCurrent];
        var img = this.imgCurrent;

        // tmp img for validate downloads img
        var tmpimg = $('<img/>');
        var isLoadedImg = false;
        tmpimg.css({
          'display': 'none'
        }).appendTo($('body'));

        tmpimg.on('load', function () {
          isLoadedImg = true;
          tmpimg.remove();
        });

        tmpimg[0].src = imgUrl;

        img.fadeTo(300, 0.1, function () {
          if (isLoadedImg) {
            img.attr('src', imgUrl).fadeTo(250, 1);
            _this.jboxObj.jboxPosAbsolute.apply(_this.jboxObj, [true, true]);
          } else {
            tmpimg.on('load', function () {
              img.attr('src', imgUrl).fadeTo(250, 1);

              _this.jboxObj.jboxPosAbsolute.apply(_this.jboxObj, [true, true]);
            });
          }
        });
      }
    }, {
      key: 'getGallerySrc',
      value: function getGallerySrc($links) {
        var src = [];

        $links.each(function () {
          var $el = $(this);
          var currSrc = $el.attr('href');

          if (~src.indexOf(currSrc)) return;

          src.push(currSrc);
        });

        return src;
      }
    }]);

    return Gallery;
  }();

  var JBoxController = function () {
    function JBoxController(options) {
      _classCallCheck(this, JBoxController);

      this.gallerySelector = options.gallerySelector || '[class*="gallery-"]';
      this.targetSelectorsArr = options.targetSelectorsArr || ['.jbox', '#p-tbl-compact a:not(.anchor, .no-jbox)', '#p-tbl a:not(.anchor, [target="_blank"], .no-jbox)', 'a.buy'];
      this.jPageEventLive = options.jPageEventLive || true;
      this.jeventEvent = 'playScenario';
      this.jeventOpeningMethod = 'jBox';
      this.zoomEnabled = false;
      this.disableCloseBtnHandler = false;
      this.disableOverlayHandler = false;
      this.viewPortContentZoom = options.viewPortContentZoom || 'width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=5.0, user-scalable=yes';
      this.tpl = options.tpl;
      this._tplDefault = {
        holderTpl: '<div id="jbox-holder" class="jbox-holder hide loading"></div>',
        innerWrapTpl: '<div class="inner-wrap"></div>',
        innerTpl: '<div class="inner"></div>',
        closeBtnTpl: '<div id="jbox-close" class="jbox-close"></div>',
        overlayTpl: '<div id="jbox-overlay" class="jbox-overlay hide" />',
        imgTpl: '<img class="jimage" src="#" />',
        captionTpl: '<div class="jbox-caption center"></div>',
        overImpTpl: '<div class="overimg"></div>'
      };
      this.classList = options.classList;
      this._classListDefault = {
        active: 'active',
        triggerFullscreen: 'jbox-anchor-fullscreen',
        triggerNopadding: 'jbox-anchor-nopadding',
        triggerNoBg: 'jbox-anchor-nobg',
        triggerWhiteBg: 'jbox-anchor-bg-white',
        fullScreen: 'jbox-fullscreen',
        nopadding: 'jbox-nopadding',
        noBg: 'jbox-bg-nobg',
        whiteBg: 'jbox-bg-white'
      };
      this.beforeOpenEvent = 'jBox:beforeOpen';
      this.afterOpenEvent = 'jBox:afterOpen';
      this.beforeCloseEvent = 'jBox:beforeClose';
      this.afterCloseEvent = 'jBox:afterClose';
      this.beforeCleanEvent = 'jBox:beforeClean';
      this.afterCleanEvent = 'jBox:afterClean';

      this.init();
    }

    _createClass(JBoxController, [{
      key: 'init',
      value: function init() {
        this.targetSelectors = this.targetSelectors || this.targetSelectorsArr.join(', ');
        this.tpl = $.extend(true, {}, this._tplDefault, this.tpl);
        this.classList = $.extend(true, {}, this._classListDefault, this.classList);

        this.renderJbox();

        if ($(this.gallerySelector).length) {
          this.prepareGalleryClasses();
        }

        $('body').on('click', this.showHandler.bind(this));

        this.overlay.add(this.closeBtn).on('click', this.closeHandler.bind(this));

        /*jPageEventLive support*/
        $('body').on(this.jeventEvent, this.jeventHandler.bind(this));

        /*open on url*/
        var selector = this.parseUrl();

        if (selector) {
          this.jboxhtml(selector);
        }

        /*viewport caching*/
        this.$viewPort = $('meta[name="viewport"]');
        this.viewPortContent = this.$viewPort.attr('content');
      }
    }, {
      key: 'renderJbox',
      value: function renderJbox() {
        var $parent = $('#page').length ? $('#page') : $('body');
        this.holder = $(this.tpl.holderTpl);
        this.overlay = $(this.tpl.overlayTpl);
        this.innerWrap = $(this.tpl.innerWrapTpl);
        this.inner = $(this.tpl.innerTpl);
        this.closeBtn = $(this.tpl.closeBtnTpl);

        $parent.append(this.overlay).append(this.holder);

        this.innerWrap.append(this.inner);
        this.holder.append(this.innerWrap).append(this.closeBtn);
      }
    }, {
      key: 'getGalleryClass',
      value: function getGalleryClass(el) {
        if (!el || !this.isElement(el[0])) return;

        var objClass = el.attr('class').split(/\s+/);
        var className = null;

        jQuery.each(objClass, function (index, item) {
          if (!~item.indexOf('gallery-')) return;

          className = item;
        });

        return className;
      }
    }, {
      key: 'prepareGalleryClasses',
      value: function prepareGalleryClasses() {
        var _this2 = this;

        var galleries = this.galleries = $(this.gallerySelector).not('a');

        galleries.each(function (index, item) {
          var gallery = jQuery(item);
          var className = _this2.getGalleryClass(gallery);

          if (!className) return;

          jQuery('a.jbox', gallery).each(function (index, item) {
            jQuery(item).addClass(className);
          });
        });
      }
    }, {
      key: 'renderGallery',
      value: function renderGallery(className) {
        var _ = this;
        var options = {
          className: className,
          indexCurrent: 0,
          targetEl: _.triggerBlock,
          jbox: _
        };

        this._onKeyDown = this.onKeyDown.bind(this);

        /*creating gallery object*/
        _.gallery = new Gallery(options);

        // Events when you press forward / backward.
        _.holder.hover(_.onMouseenter.bind(_), _.onMouseLeave.bind(_));

        //Enable swiping...
        _.holder.swipe({
          //Generic swipe handler for all directions
          swipe: _.onSwipe.bind(_)
        });
      }
    }, {
      key: 'showHandler',
      value: function showHandler(e) {
        var targetSelector = this.targetSelectorsArr.join(', ');
        var el = e.target;
        var target = $(el).closest(targetSelector);

        if (!target.length) return;
        e.preventDefault();

        this.showBlock(target);
      }
    }, {
      key: 'jeventHandler',
      value: function jeventHandler(e, scenario) {
        if (!scenario || scenario.openingMethod !== this.jeventOpeningMethod) return;

        var target = scenario.target;
        var caption = scenario.caption;
        var $target = $(target);

        if (!target) return;

        if ($target.is(this.targetSelectors)) {
          this.showBlock($target);
          return;
        }

        if (typeof target === 'string') {
          if (target.match(/\.(png|jpg|jpeg|gif)/g)) {
            this.clean();
            this.jboximg(target, caption);
            return;
          } else if ($('#sku-' + target).length) {
            this.clean();
            this.jboxsku(target);
            return;
          }
        }

        if ($target.is('img')) {
          this.clean();
          this.jboximg($target.attr('src'), $target.attr('title'));
        }

        if ($target.length) {
          this.clean();
          this.jboxhtml(target);
          return;
        }
      }
    }, {
      key: 'closeHandler',
      value: function closeHandler(e) {
        var $el = $(e.target);

        if ($el.is(this.closeBtn) && !this.disableCloseBtnHandler) {
          this.hideBlock();
          return;
        }

        if ($el.is(this.overlay) && !this.disableOverlayHandler) {
          this.hideBlock();
          return;
        }
      }
    }, {
      key: 'onMouseenter',
      value: function onMouseenter() {
        $(document).on('keydown', this._onKeyDown);
      }
    }, {
      key: 'onMouseLeave',
      value: function onMouseLeave() {
        $(document).off('keydown', this._onKeyDown);
      }
    }, {
      key: 'onKeyDown',
      value: function onKeyDown(e) {
        switch (e.keyCode ? e.keyCode : e.which) {
          case 37:
            // Left Arrow
            e.preventDefault();
            this.gallery.changeImg('prev');
            break;
          case 39:
            // Right Arrow
            e.preventDefault();
            this.gallery.changeImg('next');
            break;
        }
      }
    }, {
      key: 'onSwipe',
      value: function onSwipe(event, direction, distance, duration, fingerCount, fingerData) {
        switch (direction) {
          case 'left':
            this.gallery.changeImg('next');
            break;
          case 'right':
            this.gallery.changeImg('prev');
            break;
        }
      }
    }, {
      key: 'open',
      value: function open(options) {
        var _this3 = this;

        if ((typeof options === 'undefined' ? 'undefined' : _typeof(options)) !== 'object') return;

        var href = options.href;
        var $target = $(href);
        var content = options.content;
        var customHolderClass = options.customHolderClass || '';
        var customOverlayClass = options.customOverlayClass || '';

        if (!$target.length && !content) return;

        var openHandler = function openHandler() {
          _this3.disableCloseBtnHandler = options.disableCloseBtnHandler || false;
          _this3.disableOverlayHandler = options.disableOverlayHandler || false;

          _this3.clean();
          _this3.holder.addClass(customHolderClass);
          _this3.overlay.addClass(customOverlayClass);

          if (!href && content) {
            var $contentWrapper = $('<div></div>');

            $contentWrapper.append(content);
            _this3.inner.append($contentWrapper);
            _this3.jboxhtml($contentWrapper);
            return;
          } else if (typeof href === 'string' && !$target.length) {
            if (href.match(/\.(png|jpg|jpeg|gif)/g)) {
              _this3.jboximg(href, content);
              return;
            } else if ($('#sku-' + href).length) {
              _this3.jboxsku(href);
              return;
            }
          } else if ($target.length) {
            if ($target.is('img')) {
              _this3.jboximg($target.attr('src'), $target.attr('title'));
              return;
            } else {
              _this3.jboxhtml($target);
              return;
            }
          }
        };

        if (this.isClosing) {
          //this.holder.one(this.afterCloseEvent, function() { setTimeout(function() {openHandler();}, 100); });
          setTimeout(openHandler.bind(this), 300);
        } else {
          openHandler();
        }
      }
    }, {
      key: 'close',
      value: function close() {
        //
        this.hideBlock();
      }
    }, {
      key: 'showBlock',
      value: function showBlock(block) {
        //open based on triggered element
        this.clean();

        var triggerBlock = this.triggerBlock = jQuery(block);
        var urltype = triggerBlock.attr('href') || triggerBlock.attr('data-jbox-target');
        var objtype = triggerBlock.attr('src');
        var productsku = triggerBlock.attr('id');
        var classList = this.classList;

        this.holder.addClass(classList.active);

        if (triggerBlock.hasClass(classList.triggerFullscreen)) {
          this.holder.addClass(classList.fullScreen);
        } else if (triggerBlock.hasClass(classList.triggerNopadding)) {
          this.holder.addClass(classList.nopadding);
        } else if (triggerBlock.hasClass(classList.triggerNoBg)) {
          this.overlay.addClass(classList.noBg);
        } else if (triggerBlock.hasClass(classList.triggerWhiteBg)) {
          this.overlay.addClass(classList.whiteBg);
        }

        if (urltype) {
          if (urltype.match(/\.(png|jpg|jpeg|gif)/g)) {
            this.jboximg(urltype, triggerBlock.attr('title'));
          } else if ($(urltype).length) {
            this.jboxhtml(urltype);
          }
        }

        if (objtype && objtype.match(/\.(png|jpg|jpeg|gif)/g)) {
          this.jboximg(objtype, triggerBlock.attr('title'));
        }

        if (productsku) {
          this.jboxsku(productsku);
        }
      }

      /**
       * Проверка на сущ. gallery
       * Необходимо каждой фотке указать класс gallery-XXX для группировки фото в галлереи
       */

    }, {
      key: 'jboximg',
      value: function jboximg(src, captionText) {
        var _this4 = this;

        var imgUrl = src.replace('#', '');
        var tmpImg = $('<img/>');
        var $caption = captionText ? $(this.tpl.captionTpl).text(captionText) : '';

        //this.inner.html(''); //уже почистили
        this.holder.addClass('image');

        this.inner.append(this.tpl.imgTpl).append($caption).append(this.tpl.overImpTpl);

        this.img = jQuery('img', this.inner);
        this.img.hide().attr('src', imgUrl);

        tmpImg[0].src = imgUrl;
        $('body').append(tmpImg);

        tmpImg.on('load', function () {
          _this4.img.show();
          _this4.jboxPosAbsolute(false, true);
          tmpImg.remove();
        });

        //this.jboxPosAbsolute();

        // Определяем класс обвертки
        var className = this.getGalleryClass(this.triggerBlock);

        // Проверка на сущ. gallery
        if (className) {
          this.renderGallery(className);
        }
      }
    }, {
      key: 'jboxhtml',
      value: function jboxhtml(selector) {
        var $target = this.target = $(selector);
        var innerid = typeof selector === 'string' ? selector.replace('#', '') : '';

        if (!$target.length) return;

        this.parentElement = $target.parent();
        this.holder.removeClass('loading');

        if (innerid == 'advantages') {
          var targetClone = $target.clone(true, true);

          targetClone.removeClass('hide');
          this.inner.append(targetClone);
        } else {
          this.inner.append($target);
        }

        if ($target.is(':hidden')) {
          $target.attr('data-cashed-style', $target.attr('style'));
          $target.show();
          this.isHiddenTarget = true;
        }

        this.jboxPosAbsolute();
      }
    }, {
      key: 'jboxsku',
      value: function jboxsku(productsku) {
        var innerid = '#sku-' + productsku;

        if (!$(innerid).length) return;

        this.parentElement = $(innerid).parent();
        this.target = $('.p-reference ' + innerid); /// $('.p-reference ' + innerid);  чем отличается id и класс + id, с учетом того, что на странице уникальные id
        this.target.appendTo(this.inner);
        this.jboxPosAbsolute();
      }

      // размещаем по центру экрана

    }, {
      key: 'jboxPosAbsolute',
      value: function jboxPosAbsolute(noAnimate, img) {
        var _this5 = this;

        var holder = this.holder;
        var inner = this.inner;
        var innerImg = holder.find('img');
        var caption = holder.find('.jbox-caption');
        var isFullScreen = false;
        var _jboxPosAbsolute = this._jboxPosAbsolute;

        if (!holder || !holder.length || !$(this.inner).html()) return;

        var scrollWidth = this.getScrollBarWidth();

        if (typeof _jboxPosAbsolute === 'function') {
          $(window).off('resize', _jboxPosAbsolute);
        }

        _jboxPosAbsolute = this._jboxPosAbsolute = this.jboxPosAbsolute.bind(this, true, img);

        $(window).on('resize', _jboxPosAbsolute);

        holder.trigger(this.beforeOpenEvent);

        $('html, body').css({
          'overflow': 'hidden',
          'position': 'relative'
        });
        $('body').css({
          'padding-right': scrollWidth + 'px'
        });

        var wh = document.documentElement.clientHeight;
        var ww = document.documentElement.clientWidth;

        //сбрасываем положение
        holder.css({
          'position': 'fixed',
          'display': 'block',
          'top': '-10000px',
          'left': '-10000px',
          'visibility': 'hidden',
          'width': '',
          'height': '',
          'max-width': '',
          'max-height': '',
          'margin': '',
          'overflowY': ''
        }).removeClass('compact');
        inner.css({
          'top': ''
        });

        if (img) {
          innerImg.css({
            'width': '',
            'height': ''
          });

          if (caption.length) {
            caption.css({
              'max-width': ''
            });
          }
        }

        var holderH = holder.outerHeight();
        var resultH = holderH;

        // Для изображения делаем высоту не больше экрана
        if (img) {
          if (holderH >= wh) {
            var innerFreeSpace = inner.height();
            if (caption.length) {
              innerFreeSpace -= caption.height();
            }

            holder.css('height', wh + 'px');
            innerImg.css('height', wh - (holderH - innerFreeSpace) + 'px');
            holderH = wh;
            resultH = wh;

            if (innerImg.width() < caption.width()) {
              var maxCaptionWidth = wh > innerImg.width() * 4 ? innerImg.width() * 2 : innerImg.width();

              caption.css({
                'max-width': maxCaptionWidth + 'px'
              });
              innerFreeSpace = inner.height() - caption.height();
              innerImg.css({
                'height': wh - (holderH - innerFreeSpace) + 'px',
                'margin': 'auto',
                'display': 'block'
              });
            }
          }

          this.enableZoom();
        }

        if (!img && holderH >= wh) {
          holder.css({
            'height': wh + 'px',
            'max-width': '100%',
            'overflowY': 'auto'
          });

          resultH = wh;
          isFullScreen = true;
        }

        var holderW = holder.outerWidth();
        var resultW = holderW;

        if (holderW >= ww) {
          holder.addClass('compact').css({
            'height': wh + 'px',
            'max-width': '100%',
            'overflowY': 'auto'
          });
          if (img) {
            innerImg.css({
              'max-width': '100%',
              'width': 'auto',
              'margin': 'auto'
            });
          } /* else {
             inner.children().eq(0).css({
               'max-width': '100%',
               'width': 'auto'
             });
            }*/
          resultW = ww;
          isFullScreen = true;
        }

        var top = wh - holderH > 0 ? wh / 2 - resultH / 2 : 0;
        var left = ww - holderW > 0 ? ww / 2 - resultW / 2 : 0;

        if (isFullScreen) {
          top = 0;

          var innerH = inner.outerHeight();
          var innerWrapH = holder.find('.inner-wrap').height();

          /*center inner in holder*/
          if (innerH < innerWrapH) {
            inner.css({
              'top': innerWrapH / 2 - innerH / 2 + 'px'
            });
          }
        }

        holder.css({
          'top': top + 'px',
          'left': left + 'px',
          'visibility': 'visible',
          'display': 'none',
          'position': 'fixed'
        });

        if (!noAnimate) {
          if (this.disableCloseBtnHandler) {
            this.closeBtn.hide();
          }

          this.overlay.fadeIn(200);
          holder.delay(250).fadeIn(200, function () {
            _this5.refreshSlider();
            holder.trigger(_this5.afterOpenEvent);
          }).removeClass('loading');
        } else {
          holder.show();
          this.refreshSlider();
          holder.trigger(this.afterOpenEvent);
        }
      }
    }, {
      key: 'clean',
      value: function clean() {
        this.holder.trigger(this.beforeCleanEvent);

        //jQuery(this).parent('.anchortarget').hide();
        if (this.isHiddenTarget) {
          var cashedStyles = this.target.attr('data-cashed-style') || '';
          this.target.attr('style', cashedStyles);
          this.target.removeAttr('data-cashed-style');
          this.isHiddenTarget = false;
        }

        if (this.parentElement && this.parentElement.length) {
          this.parentElement.append(this.target);
        }
        this.inner.empty();
        this.parentElement = null;
        this.target = null;
        this.triggerBlock = null;

        //$('body').removeClass('m-view');
        $('html, body').css({
          'padding-right': '',
          'overflow': '',
          'position': '',
          'height': ''
        });

        this.holder.css({
          'position': 'absolute',
          'display': 'block',
          'top': '-10000px',
          'left': '-10000px',
          'visibility': 'hidden',
          'width': 'auto',
          'height': 'auto',
          'max-width': 'none',
          'margin': '0',
          'overflowY': ''
        });

        this.inner.css({
          'top': ''
        });

        this.holder[0].className = 'jbox-holder hide loading';
        this.overlay[0].className = 'jbox-overlay hide';

        this.holder.trigger(this.afterCleanEvent);

        $(window).off('resize', this._jboxPosAbsolute);

        this.disableZoom();
      }
    }, {
      key: 'hideBlock',
      value: function hideBlock() {
        var _this6 = this;

        this.holder.trigger(this.beforeCloseEvent);
        this.isClosing = true;

        this.holder.add(this.overlay).fadeOut(200, function () {
          _this6.clean();
          _this6.disableOverlayHandler = false;
          _this6.disableCloseBtnHandler = false;
          _this6.closeBtn.show();
          _this6.isClosing = false;
          _this6.holder.trigger(_this6.afterCloseEvent);
        });

        $(window).off('resize', this._jboxPosAbsolute);
      }
    }, {
      key: 'isElement',
      value: function isElement(o) {
        return (typeof HTMLElement === 'undefined' ? 'undefined' : _typeof(HTMLElement)) === "object" ? o instanceof HTMLElement : //DOM2
        o && (typeof o === 'undefined' ? 'undefined' : _typeof(o)) === "object" && o !== null && o.nodeType === 1 && typeof o.nodeName === "string";
      }
    }, {
      key: 'refreshSlider',
      value: function refreshSlider() {
        var $slider = this.inner.find('.js__slick');

        if (!$slider.length) return;

        $slider.each(function (i, el) {
          el.slick.refresh(true);
        });
      }
    }, {
      key: 'getScrollBarWidth',
      value: function getScrollBarWidth() {
        var div = document.createElement('div');
        var scrollBarWidth = 0;

        $(div).css({
          'width': '100px',
          'height': '100px',
          'overflowY': 'scroll',
          'visibility': 'hidden'
        });
        document.body.appendChild(div);

        scrollBarWidth = div.offsetWidth - div.clientWidth;

        document.body.removeChild(div);

        return scrollBarWidth;
      }
    }, {
      key: 'parseUrl',
      value: function parseUrl() {
        var str = window.location.hash;
        var pattern = 'jbox_id=';
        var index = str.indexOf(pattern);

        if (!~index) return null;

        var selectorStart = index + pattern.length;
        var selectorEnd = ~str.indexOf('%', selectorStart) ? str.indexOf('&', selectorStart) : undefined;
        var selector = str.slice(selectorStart, selectorEnd);

        if (!document.body.querySelector(selector)) {
          if (!document.body.querySelector('#' + selector)) return null;

          selector = '#' + selector;
        }

        return selector;
      }
    }, {
      key: 'enableZoom',
      value: function enableZoom() {
        if (this.zoomEnabled) return;

        this.$viewPort.attr('content', this.viewPortContentZoom);
        this.zoomEnabled = true;
      }
    }, {
      key: 'disableZoom',
      value: function disableZoom() {
        if (!this.zoomEnabled) return;

        this.$viewPort.attr('content', this.viewPortContent);
        this.$viewPort.attr('content', this.viewPortContent);
        this.zoomEnabled = false;
      }

      /*unused func*/

    }, {
      key: 'jboxCheckNofixed',
      value: function jboxCheckNofixed() {
        var jboxHolder = this.holder;

        jboxHolder.removeClass('nofixed');
        if (jboxHolder.height() > jQuery(window).height()) {
          jboxHolder.addClass('nofixed').css({
            'top': '0',
            'margin-top': '100px'
          });
        }
      }
    }, {
      key: 'getBlockSize',
      value: function getBlockSize(block) {
        //let block =
        var result = {};

        $img.attr('src', src).css({
          'position': 'absolute',
          'top': '-10000px',
          'left': '-10000px',
          'visibility': 'hidden',
          'width': 'auto',
          'height': 'auto',
          'margin': '0',
          'padding': '0'
        });

        $('body').append($img);

        result.height = $img[0].clientHeight;
        result.width = $img[0].clientWidth;

        $img.remove();

        return result;
      }
    }]);

    return JBoxController;
  }();

  $(document).ready(function () {
    $.jBox = new JBoxController({});
  });
});
