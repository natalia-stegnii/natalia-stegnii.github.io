/* jFlex library. Made by Jeto */
/* https://jflex.org */
/* https://jeto.org */

'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* jflex readyshop jquery */
/*from ES6*/

jQuery(document).ready(function ($) {
  /* newsletter title search label control */
  (function () {
    $('#newsblock label[for="edit-mail"]').on('click', function () {
      $(this).fadeOut(200);
      $(this).parent().find('input.form-text').focus();
    });

    $('#newsblock input.form-text').on('focus', function () {
      $('#newsblock label[for="edit-mail"]').fadeOut(200);
    });

    $('#newsblock input.form-text').on('blur', function () {
      if ($(this).val() == "") {
        $('#newsblock label[for="edit-mail"]').fadeIn(200);
      }
    });
  })();

  /* block title search label control */
  (function () {
    $('.globalsearch .block-title').on('click', function () {
      $(this).fadeOut(200);
      $(this).parent().find('input.form-text').focus();
    });

    $('.globalsearch input.form-text').on('focus', function () {
      $('.globalsearch .block-title').fadeOut(200);
    });

    $('.globalsearch input.form-text').on('blur', function () {
      if ($(this).val() == "") {
        $('.globalsearch .block-title').fadeIn(200);
      }
    });
  })();

  /* checkout cart sticky */
  (function () {
    if (!$('body').hasClass('ismobiledevice')) return;

    var $stickycart_container = $('.cart-info.sticky').closest('#checkout');

    if (!$stickycart_container.length) return;

    var checkout_bottom_spacing = $(document).height() - ($stickycart_container.height() + $stickycart_container.offset().top);
    var checkout_margin_top = parseInt($('.cart-info.sticky').css('margin-top'));
    $('.cart-info.sticky').sticky({
      topSpacing: checkout_margin_top,
      bottomSpacing: checkout_bottom_spacing
    });
    $('.cart-info.sticky').on('sticky-start', function () {
      $(this).css('margin-top', 0);
    });
    $('.cart-info.sticky').on('sticky-end', function () {
      $(this).css('margin-top', checkout_margin_top);
    });
    $('.cart-info.sticky').sticky('update');
  })();

  /*cart toggler*/
  (function () {
    var $cartBtn = $('.js__et-cart-toggler');
    var $overlay = $('#jbox-overlay');
    var options = {
      animation: 'none',
      onBeforeOpen: function onBeforeOpen(controller) {

        var $parent = controller._$togglerBtn.closest('.btn_cart__wrap');
        $overlay.fadeIn(200).one('click', { controller: controller }, onOverlay);
        $parent.addClass('active');
      },
      onAfterOpen: function onAfterOpen() {
        $(window).trigger('scroll');
      },
      onBeforeClose: function onBeforeClose(controller) {
        var $parent = controller._$togglerBtn.closest('.btn_cart__wrap');

        $overlay.fadeOut(200).off('click', onOverlay);
        $parent.removeClass('active');
      },
      getTarget: function getTarget($btn) {
        return $btn.closest('.btn_cart__wrap').find('.cart__wrap');
      }
    };

    $cartBtn.jElementToggler(options);
    cartTogglerOnOff();
    $(window).on('resize', cartTogglerOnOff);

    function onOverlay(e) {
      var controller = e.data.controller;

      controller.hideEl();
    }

    function cartTogglerOnOff() {
      var wWidth = document.documentElement.clientWidth;

      if (wWidth >= 960) {
        $cartBtn.trigger('jElementToggler:start');
      } else {
        $cartBtn.trigger('jElementToggler:stop');
      }
    }
  })();

  /*show catr toggler*/
  (function () {
    var $cartBtn = $('.btn_cart');
    var $btnBox = $('.buttons__box');
    var isHiddenCartBtn = true;

    if (!$btnBox.children().length) return;

    toggleCartBtnVisibility();
    $(window).on('scroll', toggleCartBtnVisibility);

    function showCartBtn() {
      $btnBox.addClass('visible');
      isHiddenCartBtn = false;
    }

    function hideCartBtn() {
      $btnBox.removeClass('visible');
      isHiddenCartBtn = true;
    }

    function toggleCartBtnVisibility() {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      var wWidth = document.documentElement.clientWidth;

      if (wWidth < 960) {
        if (!isHiddenCartBtn) {
          hideCartBtn();
        }

        return;
      }

      if (scrollTop > 100 && isHiddenCartBtn) {
        showCartBtn();
      } else if (scrollTop <= 100 && !isHiddenCartBtn) {
        if ($cartBtn.hasClass('et-active')) return;
        hideCartBtn();
      }
    }
  })();

  /*capture toggler*/
  (function () {
    var $btn = $('.js__et-capture');

    if (!$btn.length) return;

    var $target = $('.capture__wrap');
    var lastUrl = document.referrer;
    var currHost = window.location.host;
    var isClosed = $.cookie('capture-closed');
    var isOuterCome = !~lastUrl.indexOf(currHost);
    var options = {
      animation: 'fade',
      onAfterClose: function onAfterClose() {
        $.cookie('capture-closed', true, { path: '/' });
      }
    };

    if (!isOuterCome && isClosed === 'true') return; //isOuterCome &&  непонятно зачем было это условие, уточнить

    $.removeCookie('capture-closed', { path: '/' });
    $(window).on('scroll', init);

    function init() {
      var ww = document.documentElement.clientWidth;

      if (ww < 960) return;

      setTimeout(function () {
        $target.fadeIn(function () {
          $btn.addClass('et-active'); //КОСТЫЛЬ надо добавить этот класс в шаблоне
          $btn.jElementToggler(options);
        });
      }, 4000);

      $(window).off('scroll', init);
    }
  })();

  /*search toggler*/
  (function () {
    var $searchToggler = $('.js__search-et-toggler');
    var options = {
      animationDuration: 200
    };
    var responsiveSwitcher = createResponsiveSwitch($searchToggler);

    $searchToggler.jElementToggler(options);
    responsiveSwitcher();
    $(window).on('resize', responsiveSwitcher);

    function createResponsiveSwitch($toggler) {
      return function () {
        var wWidth = document.documentElement.clientWidth;

        if (wWidth < 960) {
          $toggler.trigger('jElementToggler:start');
          $searchToggler.trigger('jElementToggler:close');
        } else {
          $toggler.trigger('jElementToggler:open');
          $toggler.trigger('jElementToggler:stop');
        }
      };
    }
  })();

  /*online support chat toggler*/
  /* (function () {
     const $togglerBtn = $('.js__et-support-chat');
     const $header = $('.js__et-support-chat-open');
     const $parent = $('.j_crm-chat');
     const options = {
       onBeforeOpen: () => $parent.addClass('opened'),
       onAfterOpen: () => $header.addClass('opened'),
       onAfterClose: () => $header.add($parent).removeClass('opened'),
       animation: 'slide'
     };
  
     $togglerBtn.jElementToggler(options);
  
     $header.on('click', e => {
       const $target = $(e.target);
  
       if ($target.closest($togglerBtn).length) return;
  
       $togglerBtn.trigger('jElementToggler:open');
     });
   })();*/

   /*block-flex-theme show toggler*/
   (function () {
    var $btn = $('.flex_theme_block_show');
    var options = {
      animation: 'fade'
    };

    $btn.jElementToggler(options);
  })();

  /*lazy loader fixes*/
  (function () {
    /*sticky tables scroll triggering*/
    (function () {
      var $stickyTable = $(document.querySelectorAll('.sticky-table'));

      $stickyTable.on('scroll', function () {
        $(window).trigger('scroll');
      });
    })();
  })();

  /*main menu change behaviour*/
  (function () {
    var $menu = $('#main-menu');
    var $list = $menu.find('li.group');
    var $anchor = $list.children('a');
    var options = {
      animation: 'slide',
      animationDuration: 100,
      outerClick: true,
      className: {
        active: 'active-menu'
      },
      getTarget: function getTarget($btn) {
        return $btn.children('.menu');
      }
    };

    $list.jElementToggler(options);
    $anchor.on('click', function (e) {
      e.preventDefault();
    }); //detach default behaviour link
    $list.off('hover'); //detach open on hover
  })();

  /*fast order DISABLED*/
  (function () {
    return;
    var fastorderBtn = document.querySelector('.btn__fastorder');

    if (!fastorderBtn) return;

    var qtyInput = document.getElementById('edit-qty');
    var form = document.querySelector('.form__fast-order');

    if (!form) return;

    var targetQtyInput = form.querySelector('input[name="submitted[qty]"]');

    fastorderBtn.addEventListener('click', function (e) {
      e.preventDefault();

      targetQtyInput.value = qtyInput.value;
      renderFormHead(form);

      //$.jBox.clean();
      //$.jBox.jboxhtml(form);
    });

    function renderFormHead(form) {
      var targetQtyInput = form.querySelector('input[name="submitted[qty]"]');
      var targetPriceEl = document.querySelector('.info-block .prices .current');
      var title = document.getElementById('page-title'); // form.querySelector('input[name="submitted[title]"]') || ;
      var content = form.querySelector('.content');
      var existedHead = form.querySelector('.form-head');

      var qty = parseInt(targetQtyInput.value);
      var price = parseFloat(targetPriceEl.textContent.replace(/\s/g, ""));
      var totalPrice = parsePrice(price * qty);

      var newHead = '<div class="form-head">' + '<div>' + '<span class="qty">' + qty + '</span>' + ' x ' + '<span class="title">' + title.textContent + '</span>' + '</div>' + '<div class="total-amount">' + 'Сумма: ' + '<span class="amount icon ic-rub">' + totalPrice + '</span>' + '</div>' + '</div>';

      if (existedHead) {
        $(existedHead).replaceWith(newHead);
      } else {
        $(content).prepend(newHead);
      }
    }

    function parsePrice(price) {
      var precisePrice = Math.round(price * 100) / 100;
      var priceStr = precisePrice + '';
      var beforeDot = Math.floor(precisePrice);
      var beforeDotStr = beforeDot + '';
      var afterDotStr = priceStr.indexOf('.') ? priceStr.slice(priceStr.indexOf('.')) : '';
      var resultArr = beforeDotStr.split('');
      var resultStr = '';

      for (var i = beforeDotStr.length - 1, j = 1; i >= 0; i--, j++) {
        var isThird = !(j % 3) && j;

        if (!isThird) continue;

        resultArr.splice(i, 0, ' ');
      }

      resultStr = resultArr.join('');

      if (price > beforeDot) {
        resultStr += afterDotStr;
      }

      return resultStr;
    }
  })();

  /*display mode patch*/
  (function () {
    var $dMode = $('body.displaymode');
    var isAttachedHandler = false;

    if (!$dMode.length) return;

    setDisplayMode();
    $(document).on('infiniteScrollComplete', setDisplayMode);

    /* SET MODE. Set view mode switcher. */
    function setDisplayMode() {
      var $dMode = $('body.displaymode');
      // Set mode after loaded page
      var hash = document.location.hash;

      if (hash) {
        hash = hash.replace('#', '');
        if (!$dMode.hasClass(hash)) {
          switch (hash) {
            case 'grid':
            setMode('grid');
            break;
            case 'linear':
            setMode('linear');
            break;
          }
        } else {
          hash == 'linear' ? setMode('linear', true) : '';
        }
      } else {
        $dMode.hasClass('linear') ? setMode('linear', true) : '';
      }

      // Event click on link MODE
      if (!isAttachedHandler) {
        $dMode.on('click', '#display-switch a', function () {
          setMode(jQuery(this).attr('href').replace('#', ''));
        });
        isAttachedHandler = true;
      }

      function setMode(mode, onlyLink) {
        $('#display-switch a.' + mode).addClass('active').siblings().removeClass('active');
        if (!onlyLink) {
          $dMode.removeClass('grid linear').addClass(mode);
          $.cookie('displaymode', mode, { expires: 30 });
        }
      }
    }
  })();

  /*range bar*/
  (function () {
    /*left bar*/
    (function () {
      var $parent = $(document.getElementById('edit-mfb-filter-price-sell-price-wrapper'));

      if (!$parent.length) return;

      var $min = $(document.getElementById('edit-mfb-filter-price-sell-price-min')).val(0);
      var $max = $(document.getElementById('edit-mfb-filter-price-sell-price-max')).val(200000);
      var $submit = $('.views-exposed-widget.views-submit-button', document.getElementById('views-exposed-form-taxonomy-term-page-category-mfb-filter-price'));
      var options = {
        min: $min,
        max: $max,
        ranges: [{
          pixelRange: '50%',
          unitRange: '10%'
        }, {
          pixelRange: '80%',
          unitRange: '30%'
        }]
      };

      $parent.jRangeBar(options);

      submitBtnLogic();

      function submitBtnLogic() {
        $submit.hide();

        $min.on('input jRangeBar:change', btFn);
        $max.on('input jRangeBar:change', btFn);
      }

      function btFn() {
        if ($max.val() > 0 || $min.val() > 0) {
          //modifySubmitUrl();
          $submit.removeClass('hidden').show();
        } else {
          $submit.hide();
        }
      }

      /*function modifySubmitUrl() {
       let url = renderUrl($min.val(), $max.val());
         $submit.attr('href', url);
       }*/

      /*function renderUrl(min, max) {
       return 'http://hamleys.ru/shop/catalog/konstruktory/konstruktory-lego?mefibs-form-filter-price-sell_price%5Bmin%5D=' +
       min +
       '&mefibs-form-filter-price-sell_price%5Bmax%5D=' +
       max +
       '&mefibs-form-filter-price-mefibs_block_id=filter_price';
     }*/
   })();

   /*refresh jRangeBar in jbox*/
   (function () {
    /*in jbox*/
    var holder = document.getElementById('jbox-holder');

    if (!holder) return;

    var $holder = $(holder);

    $holder.on('jBox:afterOpen', refreshRangeBar);

    function refreshRangeBar() {
      var $rangeBar = $(this).find('.jrangebar-wrapper');

      $rangeBar.trigger('jRangeBar:refresh');
    }
  })();

  /*hide jbox after rangebar submit*/
  (function () {
    var $submit = $('.views-exposed-widget.views-submit-button .form-submit', document.getElementById('views-exposed-form-taxonomy-term-page-category-mfb-filter-price'));

    if (!$submit.length) return;

    $submit.on('click', function (e) {
      var jboxHolder = this.closest('#jbox-holder');

      if (!jboxHolder) return;

      $.jBox.hideBlock();
    });
  })();
})();

/*hide jbox on click*/
(function () {
  var $closeBtn = $('.js__jbox-close');

  $closeBtn.on('click', function (e) {
    e.preventDefault();

    $.jBox.close();
  });
})();

/*cookies confirm button*/
(function () {
  var confirmName = 'cookiesConfirmed';
  var isConfirmed = $.cookie(confirmName);

  /*debugger*/
  window.deleteCookieConfirm = function () {
    var options = {
      expires: 365,
      path: '/'
    };

    $.removeCookie(confirmName, options);
  };

  if (isConfirmed) return;

    var $cookiesBlock = $(document.getElementById('cookie')); //renderCookiesConfirm();
    var $confirmBtn = $cookiesBlock.find('.btn_confirm');
    var $parentBlock = $('.fulldata');

    $parentBlock.prepend($cookiesBlock).css({
      marginTop: $cookiesBlock.outerHeight() + 'px'
    });

    $confirmBtn.on('click', confirmHandler);

    function renderCookiesConfirm() {
      var tpl = '<div id="cookie" class="cookie">' + '<div class="hold pad-h">' + '<div class="row sp-10">' + '<div class="col d7">' + '<div class="text">Для наилучшей работы сайта используются cookies. ' + '<a href="#">Подробнее о cookies.</a>' + '</div>' + '</div>' + '<div class="col d5">' + '<a href="#" class="btn_confirm btn small simple icon icon-uniE65A">Подтвердить использование cookies</a>' + '</div>' + '</div>' + '</div>' + '</div>';

      return $(tpl);
    }

    function confirmHandler(e) {
      e.preventDefault();

      var val = true;
      var options = {
        expires: 365,
        path: '/'
      };

      $parentBlock.animate({
        marginTop: 0
      }, 400);

      $cookiesBlock.slideUp(400, function () {
        $cookiesBlock.remove();
      });
      $.cookie(confirmName, val, options);
    }
  })();

  /*goods count mooving*/
  (function () {
    var totalRows = document.querySelector('.total-rows');

    if (!totalRows) return;

    var goodsCount = document.querySelector('.page-title .goods-count');

    if (!goodsCount) return;

    goodsCount.textContent = '(' + totalRows.textContent + ')';
  })();

  /*product reviews*/
  (function () {
    var $reviewsBtn = $('.product .reviews a');

    $reviewsBtn.on('click', function (e) {
      //e.preventDefault();

      var id = this.getAttribute('href').replace(/#/g, '');
      var $commentTab = $(document.getElementById(id));

      $commentTab.trigger('jElementToggler:open');
    });
  })();

  /*smooth scroll*/
  (function () {
    /*ScrollToAnchor class*/
    function ScrollToAnchor(options) {
      this._listenedBlock = options.listenedBlock || document.body;
      this._translationElementSelector = options.translation || false;
      this._animationSpeed = options.animationSpeed || 500;
    }

    ScrollToAnchor.prototype.init = function () {
      $(this._listenedBlock).on('click', this.anchorClickListener.bind(this));
    };
    ScrollToAnchor.prototype.anchorClickListener = function (e) {
      var elem = e.target;
      var anchor = elem.closest('a[href*="#"]:not([data-scroll="disable"]):not(.js__scroll-disable):not(.jbox):not(.presentation_link)');

      if (!anchor) return;

      var anchorWithHash = anchor.closest('a[href^="#"]');
      var windowPath = window.location.origin + window.location.pathname;
      var anchorPath = anchor.href.slice(0, anchor.href.indexOf('#'));

      if (windowPath === anchorPath) {
        anchorWithHash = anchor;
      }

      if (!anchorWithHash || anchorWithHash.hash.length < 2) return;

      e.preventDefault();

      var target = anchorWithHash.hash;
      var translation = this.getTranslation(anchorWithHash);

      if (!document.querySelector(target)) return;

      this.smoothScroll(target, translation);
    };
    ScrollToAnchor.prototype.getTranslation = function (anchor) {
      var translation = 0;

      if (anchor.hasAttribute('data-translation')) {
        translation = anchor.getAttribute('data-translation');
      } else if (this._translationElementSelector) {
        $(this._translationElementSelector).each(function () {
          translation += this.offsetHeight;
        });
        //translation = document.querySelector(this._translationElementSelector).offsetHeight;
      }

      return translation;
    };
    ScrollToAnchor.prototype.smoothScroll = function (selector, translation) {
      $("html, body").animate({
        scrollTop: $(selector).offset().top - (translation || 0)
      }, this._animationSpeed);
    };

    var pageScroll = new ScrollToAnchor({
      translation: '#main-menu'
    });
    pageScroll.init();
  })();

  /*submit source*/
  (function () {
    document.body.addEventListener('mousedown', setSourceFromAnchorHandler);
    document.body.addEventListener('touchstart', setSourceFromAnchorHandler);
    document.body.addEventListener('mousedown', setSourceFromFormHandler);
    document.body.addEventListener('touchstart', setSourceFromFormHandler);

    function setSourceFromAnchorHandler(e) {
      var target = e.target;
      var sourceBtn = target.closest('[data-submit-target]');

      if (!sourceBtn) return;

      var sourceData = sourceBtn.getAttribute('data-submit-source') || sourceBtn.textContent;
      var selector = sourceBtn.getAttribute('href') + ' ' + sourceBtn.getAttribute('data-submit-target');
      var sourceInput = document.querySelector(selector);

      if (!sourceInput) return;

      sourceInput.setAttribute('value', sourceData);
    }

    function setSourceFromFormHandler(e) {
      var target = e.target;
      var submitBtn = target.closest('input[type="submit"]');

      if (!submitBtn) return;

      var sourceDataEl = submitBtn.closest('[data-webform-source]');

      if (!sourceDataEl) return;

      var sourceData = sourceDataEl.getAttribute('data-webform-source');
      var sourceInput = submitBtn.closest('form').querySelector(sourceDataEl.getAttribute('data-webform-target'));

      if (!sourceInput || sourceInput.getAttribute('value')) return;

      sourceInput.setAttribute('value', sourceData);
    }
  })();

  /*show subscribe*/
  (function () {
    var $popUpSimpleNews = $(document.querySelector('.newsblock'));

    if (!$popUpSimpleNews.length) return;
    if (document.documentElement.clientWidth < 960) return;

    var $subscribe = $popUpSimpleNews.find('.simplenews-subscribe');
    var $subscribeDisable = $popUpSimpleNews.find('.subscribed');
    var showPopUpFunc = showPopUpDec();

    var userOpt = {
      status: 'anonim',
      date: new Date(),
      lastShown: new Date(),
      showEach: 3,
      isSubscribed: false,
      isUnsubscribed: false
    };
    var cookieOpt = {
      path: '/',
      expires: 365
    };
    var userName = 'userGlobalData';
    var userData = getCookie();
    var nowDate = new Date();
    var dateIndex = 24 * 60 * 60 * 1000; //24 * 60 * 60 * 1000;
    var mobileClass = 'ismobiledevice';

    var submitOkMess = {
      'title': 'Спасибо!',
      'mess': 'Мы отправили промо код на Ваш email.'
    };
    var submitFailMess = {
      'title': 'Ошибка!',
      'mess': 'На сервере произошла ошибка, попробуйте еще раз.'
    };

    /*debuggers*/
    window.cleanCookie = cleanCookie;
    window.getCookie = getCookie;

    init();

    function init() {
      if (isLogged()) {
        userOpt.status = 'user';
      }

      if (!userData) {
        setCookie();
        startShowing();
        return;
      }

      userOpt = userData;
      //console.log(userOpt);

      if (isLogged()) {
        userOpt.status = 'user';
      }

      if (userOpt.isSubscribed || userOpt.isUnsubscribed) {
        //setCookie();
        return;
      }

      var lastShown = Date.parse(userOpt.lastShown);

      if (nowDate - lastShown > userOpt.showEach * dateIndex) {
        setCookie();
        startShowing();
        return;
      }
    }

    function isLogged() {
      return !!$('body.logged-in').length;
    }

    function setCookie() {
      var cachedJsonOption = $.cookie.json;
      $.cookie.json = true;
      var cookie = $.cookie(userName, userOpt, cookieOpt);
      $.cookie.json = cachedJsonOption;

      return cookie;
    }

    function getCookie() {
      var cachedJsonOption = $.cookie.json;
      $.cookie.json = true;
      var cookie = $.cookie(userName);
      $.cookie.json = cachedJsonOption;

      return cookie;
    }

    function startShowing() {
      //if (!$popUpSimpleNews.length) return;

      if ($subscribe.length) {
        formControlInit();
        $subscribeDisable.on('click', function (e) {
          e.preventDefault();

          onUnsubscribe();
          hideJbox();
        });

        if ($('body').hasClass(mobileClass)) {
          setTimeout(function () {
            showPopUpFunc($popUpSimpleNews);
            userOpt.lastShown = new Date();
            setCookie();
          }, 30000);
        } else {
          $(document).on('mouseleave', onMouseLeaveBody);
        }
      }
    }

    function stopShowing() {
      $(document).off('mouseleave', onMouseLeaveBody);
    }

    function onMouseLeaveBody(e) {
      if (e.clientY < 0) {
        //показываем попап
        showPopUpFunc($popUpSimpleNews);
        stopShowing();

        //userOpt.isShown = true;
        userOpt.lastShown = new Date();
        setCookie();
      }
    }

    function showPopUpDec() {
      var isShown = false;

      return function (el) {
        if (isShown) return;

        showJbox(el);
        isShown = true;
      };
    }

    function showJbox(el) {
      $.jBox.clean();
      $('#jbox-holder').addClass('subscribe-bg');
      $.jBox.jboxhtml(el);
    }

    function hideJbox() {
      $.jBox.hideBlock();
    }

    function cleanCookie() {
      console.dir($.removeCookie(userName, cookieOpt));
    }

    function formControlInit() {
      var $formOk = $(renderMess(submitOkMess)).appendTo($('body'));
      var $formFail = $(renderMess(submitFailMess)).appendTo($('body'));

      var $email = $subscribe.find('input[name="mail"]');
      var $submit = $subscribe.find('input[type="submit"]');
      var $wrapper = $submit.parent();
      var $pending = $('<div class="pending-block center mb20 mt20 hide">Отправляем данные ...</div>');
      var $error = $('<div class="err-block center mb20 mt20 hide">Почта уже подписана</div>');

      $wrapper.append($pending).append($error);

      $popUpSimpleNews.formController({
        resolve: function resolve(form) {
          var $submit = $formOk.find('input[type="submit"]');
          var email = $(form).find('input[name="mail"]').val();
          //console.log(email);

          showJbox($formOk);
          onSubscribe();

          if (dataLayer && $.isArray(dataLayer)) {
            //console.log('data layer');
            //console.dir(dataLayer);
            //console.log('email = ' + email);
            dataLayer.push({ 'event': 'popupSubscription', 'popupSubscrEmail': email });
          }

          $submit.one('click', function (e) {
            e.preventDefault();

            hideJbox();
          });

          $('body').one('jBox:afterClose', function () {
            window.location.reload(true);
          });
        },
        reject: function reject() {
          var $submit = $formFail.find('input[type="submit"]');

          showJbox($formFail);

          $submit.one('click', function (e) {
            e.preventDefault();

            showJbox($popUpSimpleNews);
          });
        },
        afterValidate: function afterValidate(form) {
          var $error = $(form).find('.err-block');
          var $pending = $(form).find('.pending-block');
          var controller = this;

          if ($error.is(':visible')) {
            $error.fadeOut(200, function () {
              $pending.fadeIn(200);
            });
          } else {
            $pending.fadeIn(200);
          }

          //console.log($email.val());

          $.ajax({
            type: 'GET',
            url: '/simplenews/verify-subscribe/262/' + $email.val(),
            success: function success(response) {
              //console.dir(arguments);

              if (parseInt(response.subscribed) === 0) {
                controller.sendRequest.apply(controller, [form, controller._resolve, controller._reject, controller._beforeSend]);
              } else {
                $pending.fadeOut(200, function () {
                  $error.fadeIn(200);
                });
              }
            },
            error: function error(response) {
              //console.dir(arguments);
              //console.log(response);
              //throw new Error(response.statusText);
            }
          });
        }
      });
    }

    function onSubscribe() {
      userOpt.isSubscribed = true;
      setCookie();
    }

    function onUnsubscribe() {
      userOpt.isUnsubscribed = true;
      setCookie();
    }

    function renderMess(data) {
      var respondFormSource = '<div class="subscribe-form__box center hide">' + '<h2 class="mb20">' + data.title + '</h2>' + '<div class="mb30">' + data.mess + '</div>' + '<form>' + '<input class="form-submit" type="submit" value="Ok"/>' + '</form>' + '</div>';

      return respondFormSource;
    }
  })();

  /*mmenu tabs*/
  (function () {
    var mMenu = document.getElementById('mm-menu');
    var mMenuPanel = document.getElementById('m-panel');
    var $mMenuPanel = $(mMenuPanel);

    if (!mMenu || !mMenuPanel) return;

    var $tabName = $(mMenu.querySelectorAll('.tab-name'));

    $tabName.each(function () {
      var togglerController = this.jElementToggler;

      if (!togglerController) return;

      togglerController._onBeforeOpen = onBeforeOpen;
    });

    var $activeTab = $tabName.filter('.active');
    var activeToggler = $activeTab[0].jElementToggler;

    activeToggler._disallowedActions = [];
    activeToggler._onAfterOpen = function () {
      $activeTab.addClass('close');
    };
    activeToggler._onBeforeClose = onBeforeClose;
    activeToggler._onAfterClose = function () {
      $activeTab.removeClass('close');
    };
    $activeTab.trigger('jElementToggler:close');

    // Enable swiping...
    $mMenuPanel.swipe({
      //Generic swipe handler for all directions
      swipe: function swipe(event, direction, distance, duration, fingerCount, fingerData) {
        switch (direction) {
          case 'left':
          $activeTab.trigger('jElementToggler:close');
          break;
          case 'right':
          break;
        }
      },
      allowPageScroll: "vertical"
    });

    function onBeforeOpen() {
      document.body.classList.add('m-view');
      $mMenuPanel.animate({ left: '0' }, 300);
    }

    function onBeforeClose() {
      document.body.classList.remove('m-view');
      $mMenuPanel.animate({ left: '-100%' }, 150);
    }
  })();

  /*hide footer mess*/
  (function () {
    var $toggler = $('.js__et-af-s');
    var options = {
      animation: 'fade',
      onBeforeClose: setCookie
    };

    if (checkCookie() || document.documentElement.clientWidth < 960) return;

    $toggler.jElementToggler(options);

    function checkCookie() {
      return !!$.cookie('hide-footer-capture');
    }

    function setCookie() {
      $.cookie('hide-footer-capture', true, { expires: 365, path: '/' });
    }
  })();

  /*cart*/
  (function () {
    var $cartBtn = $('.mm-menu .icon-shopping-cart.jbox');
    var isFullPage = false;
    var $window = $(window);

    setFullPageJbox();
    $window.on('resize', setFullPageJbox);

    function setFullPageJbox() {
      var ww = document.documentElement.clientWidth;

      if (ww > 740 && isFullPage) {
        $cartBtn.removeClass('jbox-anchor-fullscreen');
        isFullPage = false;
      } else if (ww <= 740 && !isFullPage) {
        $cartBtn.addClass('jbox-anchor-fullscreen');
        isFullPage = true;
      }
    }
  })();

  /*Yandex map*/
  (function () {
    var $mapWrappers = $('.map-wrap');

    if (!$mapWrappers.length) return;

    var firstScript = document.querySelectorAll('script')[0];
    var script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?lang=ru_RU';
    script.async = true;
    firstScript.parentNode.insertBefore(script, firstScript);

    script.addEventListener('load', function () {
      ymaps.ready(function () {
        $('body').trigger('yamap:ready').addClass('yamap-ready');
      });
    });

    $mapWrappers.each(function (i) {
      var $mapWrapper = $(this);
      var $map = $('<div></div>');
      var mapOverlayInit = mapOverlayInitClosure(this);

      $map.attr('id', 'map-' + i).css({
        width: '100%',
        height: '400px'
      }).appendTo($mapWrapper);
      mapOverlayInit();

      var mapData = {
        id: $map.attr('id'),
        center: JSON.parse($mapWrapper.attr('data-center')),
        zoom: +$mapWrapper.attr('data-zoom') || 15,
        placemarkData: {
          coords: JSON.parse($mapWrapper.attr('data-placemark')),
          hintContent: $mapWrapper.attr('data-hint') || '',
          balloonContent: $mapWrapper.attr('data-balloon') || ""
        }
      };

      if ($('body').hasClass('yamap-ready')) {
        init(mapData);
      } else {
        $('body').on('yamap:ready', init.bind(null, mapData));
      }

      //counter++;
    });

    function mapOverlayInitClosure(mapWrapper) {
      var $mapWrapper = $(mapWrapper);
      var isActiveMap = false;

      return function () {
        $mapWrapper.on('mouseleave', function () {
          $mapWrapper.removeClass('active');
          isActiveMap = false;
        });
        $('body').on('click', function (e) {
          var target = e.target;

          if ($(target).closest($mapWrapper).length) {
            if (isActiveMap) return;

            $mapWrapper.addClass('active');
            isActiveMap = true;
          } else {
            if (!isActiveMap) return;

            $mapWrapper.removeClass('active');
            isActiveMap = false;
          }
        });
      };
    }

    function init(mapData) {
      var myMap = new ymaps.Map(mapData.id, {
        center: mapData.center,
        zoom: mapData.zoom
      }, {
        searchControlProvider: 'yandex#search'
      });

      //myMap.behaviors.disable('scrollZoom');

      var placemark = new ymaps.Placemark(mapData.placemarkData.coords, {
        hintContent: mapData.placemarkData.hintContent,
        balloonContent: mapData.placemarkData.balloonContent
      }, {
        preset: "islands#dotCircleIcon"
        /*iconLayout: 'default#image',
        iconImageHref: 'images/map-point.png',
        iconImageSize: [29, 39],
        iconImageOffset: [-14, -39]*/
      });

      myMap.geoObjects.add(placemark);
    }
  })();

  /*search autocomplete*/
  (function () {
    var $input = $('[name="mfb-shopsearch-populate"]');

    if (!$input.length) return;

    var _addOverlay = waiter(addOverlay, 1000);
    var $overlay = $('<div class="ajax-progress-overlay"></div>');

    $input.on({
      'input': _addOverlay,
      'autocompleteresponse': removeOverlay
    });

    function addOverlay() {
      //let input = this;
      var $input = $(this);
      var $parent = $input.closest('.container-inline');

      if (!$input.val()) return;

      //input.readOnly = true;
      $parent.append($overlay);

      setTimeout(function () {
        removeOverlay();
        //input.readOnly = false;
      }, 2000);
    }

    function removeOverlay() {
      $overlay = $overlay.remove();
    }

    function waiter(func, ms, bindedThis) {
      var timer = void 0;

      return function () {
        var args = arguments;

        if (bindedThis === undefined) {
          bindedThis = this;
        }

        clearTimeout(timer);
        timer = setTimeout(function () {
          func.apply(bindedThis, args);
        }, ms);
      };
    }
  })();

  /*preloader*/
  (function () {
    var $preloader = $(document.getElementById('preloader'));

    $preloader.fadeOut();
  })();

  /*tour master*/
  (function () {
    if (Drupal.settings.hasOwnProperty('flexMaster')
      && Drupal.settings.flexMaster.hasOwnProperty('tourStart')
      && Drupal.settings.flexMaster.tourStart)
    {
      var $startBtn = $('.tour-master-start');
      var $adminMenu = $('.menu_adminflex__wrap');
      var $fullPage = $('.fullpage');
      var cachedFullPagePaddingLeft = void 0;
      var steps = [{
        element: '.js__jtour-step1',
        title: 'step 1',
        tag: 'Функциональные опции интернет-магазина', //в турмастере в popup4 шаги по одной теме группируются вместе, с одним заголовком
        content: 'some bla-bla-bla',
        path: '/review/flex_admin_tour/test2.html'
      }, {
        element: '.js__jtour-step2',
        title: 'step 2',
        tag: 'Функциональные опции интернет-магазина',
        content: 'some bla-bla-bla',
        path: '/review/flex_admin_tour/test2.html'
      }, {
        element: '.js__jtour-step3',
        title: 'step 3',
        tag: 'Функциональные опции интернет-магазина',
        content: 'some bla-bla-bla',
        path: '/review/flex_admin_tour/test2.html'
      }, {
        element: '.js__jtour-step4',
        title: 'step 4',
        tag: 'Процессы для юридических лиц',
        content: 'some bla-bla-bla',
        animateType: 'highlight',
        path: '/review/flex_admin_tour/test2.html'
      }, {
        element: '.js__jtour-step5',
        title: 'step 5',
        tag: 'Процессы для юридических лиц',
        content: 'some bla-bla-bla',
        path: '/review/flex_admin_tour/test.html'
      }];
      var options = {
        tours: [],
        steps: steps,
        defaultTourOptions: {
          isMenu: true,
          addMenuMethod: function addMenuMethod($menu, container, controller) {
            $menu.find('.title').text(controller.title);
            cachedFullPagePaddingLeft = $fullPage.css('padding-left');

            $menu.css({ left: '-100%', zIndex: '9750' }).appendTo($(document.body)).animate({ left: '0' }, {
              duration: 400,
              queue: false
            });
            $adminMenu.animate({ left: '-100%' }, { duration: 400, queue: false });
            $(document.body).addClass('tour-menu-active');
          },
          removeMenuMethod: function removeMenuMethod($menu) {
            $menu.animate({ left: '-100%' }, {
              duration: 400,
              queue: false,
              complete: function complete() {
                $menu.remove();
              }
            });
            $adminMenu.animate({ left: '0' }, { duration: 400, queue: false });
            $(document.body).removeClass('tour-menu-active');
          }
        }
      };
      var tourMaster = null;

      getTours().then(function (tours) {
        options.tours = tours;
        tourMaster = $.jTourMaster(options);

        $startBtn.on('click', function (e) {
          e.preventDefault();

          tourMaster.start();
        });

        startMasterOnAdmin($.extend({}, options));
      }).catch(function (error) {
        console.dir(error);
      });

      function startMasterOnAdmin(options) {
        var isAdminPage = $adminMenu.length;
        var isNew = !$.cookie('admin-tour-first');
        var extraOptions = $.extend(true, {}, options, {
          jboxOptions: {
            customHolderClass: 'jbox__bg-full-white',
            customOverlayClass: 'jbox__bg-full-white',
            disableCloseBtnHandler: true,
            disableOverlayHandler: true
          }
        });

        if (!isAdminPage || !isNew) return;

        extraOptions.customHolderClass = 'jbox__bg-full-white';
        extraOptions.customOverlayClass = 'jbox__bg-full-white';

        var tourMaster = $.jTourMaster(extraOptions);
        tourMaster.start();
        $.cookie('admin-tour-first', 'true', { path: '/', expires: 365 });
      }

      function getTours() {
        return new Promise(function (resolve, reject) {
          // Skip admin theme.
          // if (!$('body.page-admin').length) return;

          $.getJSON('/admin/flex-master', function (response, status, xhr) {
            if (xhr.status === 200) {
              resolve(parseTours(response));
            } else {
              reject(response);
            }
          }).fail(function (response) {
            reject(response);
          });
        });
      }

      function parseTours(tours) {
        var newTours = [];

        tours.forEach(function (tour) {
          var newTour = {
            steps: []
          };
          var steps = tour.steps;

          for (var key in tour) {
            if (key === 'steps') {
              continue;
            }

            newTour[key] = tour[key];
          }

          steps.forEach(function (step) {
            newTour.steps.push(parseStep(step));
          });

          newTours.push(newTour);
        });

        return newTours;
      }

      function parseStep(step) {
        var stepMapper = {
          animatetype: 'animateType',
          ismenustep: 'isMenuStep',
          menutitle: 'menuTitle',
          onelement: 'onElement'
        };
        var handlerMapper = {
          'saveNGo': saveNGo
        };
        var newStep = {};

        for (var key in step) {
          if (stepMapper[key]) {
            if (key === 'onelement') {
              newStep[stepMapper[key]] = {
                event: step[key].event,
                handler: handlerMapper[step[key].handler]
              };
            } else {
              newStep[stepMapper[key]] = step[key];
            }
          } else if (key === 'path') {
            if (step.path && step.path !== '/') {
              newStep.path = '/' + step.path;
            } else if (step.path === '/') {
              newStep.path = step.path;
            } else {
              newStep.path = '';
            }
          } else {
            newStep[key] = step[key];
          }
        }

        return newStep;
      }

      function saveNGo(e) {
        var $target = $(e.target);
        var tour = e.data.tourController;

        e.preventDefault();

        setTimeout(function () {
          $target.trigger(tour.activeStep.onElement.event);
        }, 50);
        tour.bindNextStep();
      }

      /*debugger*/
      window.deleteCookieTour = function () {
        $.removeCookie('admin-tour-first', { path: '/', expires: 365 });
      };
    }
  })();

  /*admin menu extention*/
  (function () {
    var menu = document.querySelector('.menu_adminflex.operations .menu');

    if (!menu) return;

    var AdminMenu = function () {
      function AdminMenu(options) {
        _classCallCheck(this, AdminMenu);

        this.menu = options.menu;
        this.spinnerActivateArea = options.spinnerActivateArea;
        this.classHovered = options.classHovered || 'hover';
        this.classUnhovered = options.classUnhovered || 'unhover';
        this.preloaderSelector = options.preloaderSelector;
        this.liFullscreenSelector = options.liFullscreenSelector;
        this.liExpandedSelector = options.liExpandedSelector;
        this.closeBtnSelector = options.closeBtnSelector || '.menu_adminflex__close';
        this.closeBtnTpl = options.closeBtnTpl || '<li class="menu_adminflex__close"></li>';
        this.hoverDelay = options.hoverDelay || 300;
      }

      _createClass(AdminMenu, [{
        key: 'init',
        value: function init() {
          var $menu = this.$menu = $(this.menu);

          if (!$menu.length) return;

          this.$spinnerActivateArea = $(this.spinnerActivateArea);
          this.$liFullscreen = $menu.children(this.liFullscreenSelector);
          this.$liExpanded = $menu.children(this.liExpandedSelector);
          this.$preloader = $(this.preloaderSelector);
          this.$liHovered = null;

          /*close btn*/
          this._closeHandler = this.closeHandler.bind(this);
          this._renderCloseBtn = this.renderCloseBtn.bind(this);
          /*delayed menu opening*/
          //this._onMouseover = this.onMouseover.bind(this);
          //this._onMouseout = this.onMouseout.bind(this);
          this._onClick = this.onClick.bind(this);
          /*spinner*/
          this._spinnerActivate = this.spinnerActivate.bind(this);

          this.$liFullscreen.each(this._renderCloseBtn);

          $menu.on({
            'click touch': this._closeHandler,
            //'mouseover': this._onMouseover,
            //'mouseout': this._onMouseout,
            'click': this._onClick
          });
          this.$spinnerActivateArea.on({
            'click touch': this._spinnerActivate
          });
        }
      }, {
        key: 'stop',
        value: function stop() {
          this.$menu.off({
            'click touch': this._closeHandler,
            //'mouseover': this._onMouseover,
            //'mouseout': this._onMouseout,
            'click': this._onClick
          });
          this.$menu.off({
            'click touch': this._spinnerActivate
          });
          this.$liFullscreen.find(this.closeBtnSelector).remove();
        }
      }, {
        key: 'onMouseover',
        value: function onMouseover(e) {
          if (this.$liHovered) return;

          var $target = $(e.target);
          var $liCurrent = $target.closest(this.$liExpanded);

          if (!$liCurrent.length) return;

          this.$liHovered = $liCurrent;
          this.hoverDebounce($liCurrent);
        }
      }, {
        key: 'onMouseout',
        value: function onMouseout(e) {
          if (!this.$liHovered) return;

          var $relatedTarget = $(e.relatedTarget);
          var $liCurrent = $relatedTarget.closest(this.$liHovered);

          if ($liCurrent.length) return;

          this.$liHovered.removeClass(this.classHovered);
          this.$liHovered = null;
        }
      },{
        key: 'onClick',
        value: function onClick(e) {

            if ($(e.target).is('.fullscreen .menu') || $(e.target).is('.fullscreen .menu *') ){
               return; 
            }
          if (this.$liHovered) {
            if ($(e.target).parent().hasClass('hover')){
              this.$liHovered.removeClass(this.classHovered);
              this.$liHovered = null;
              return;
            } else{
              this.$liHovered.removeClass(this.classHovered);
              this.$liHovered = null;
            }
          };

          var $target = $(e.target);
          var $liCurrent = $target.closest(this.$liExpanded);

          if (!$liCurrent.length) return;

          this.$liHovered = $liCurrent;
          this.hoverDebounce($liCurrent);
        }
      }, {
        key: 'closeHandler',
        value: function closeHandler(e) {
          var $target = $(e.target);

          if (!$target.closest(this.closeBtnSelector + ', a').length) return;

          var $liHovered = this.$liHovered;

          if (!$liHovered) return;

          $liHovered.addClass(this.classUnhovered).removeClass(this.classHovered);

          setTimeout(function () {
            $liHovered.removeClass(this.classUnhovered);
            this.$liHovered = null; //на всякий случай обнуляем активный li
          }.bind(this), 50);
        }
      }, {
        key: 'hoverDebounce',
        value: function hoverDebounce($el) {
          setTimeout(function () {
            if (!this.$liHovered || !$el.is(this.$liHovered)) return;

            $el.addClass(this.classHovered);
          }.bind(this), this.hoverDelay);
        }
      }, {
        key: 'renderCloseBtn',
        value: function renderCloseBtn(i, el) {
          var $ul = $(el).children('.menu');

          $ul.append(this.closeBtnTpl);
        }
      }, {
        key: 'spinnerActivate',
        value: function spinnerActivate(e) {
          var target = e.target;

          if (!target.closest('a')) return;

          this.$preloader.addClass('active');
        }
      }]);

return AdminMenu;
}();

var adminMenu = new AdminMenu({
  menu: menu,
  spinnerActivateArea: '.menu_adminflex',
  preloaderSelector: '#logo-preloader',
  liFullscreenSelector: '.expanded',
  liExpandedSelector: '.expanded',
  hoverDelay: 300
});

adminMenu.init();
})();

/*serch menu*/
(function () {
  var menu = document.querySelector('.menu_adminflex.operations .menu');

  if (!menu) return;

  var Search = function () {
    function Search(options) {
      _classCallCheck(this, Search);

      this.menu = options.menu;
      this.className = {
        hidden: 'js__search-hidden'
      };

      this.init();
    }

    _createClass(Search, [{
      key: 'init',
      value: function init() {
        this.bindElements();
        this.bindHandlers();
        this.attachHandlers();
      }
    }, {
      key: 'searchHandler',
      value: function searchHandler(e) {
        var target = e.target;
        var type = e.type;

        switch (type) {
          case 'input':
          var search = target.value;

          this.filterFields(this.$searchItemns, search);

          if (search) {
            this.$searchReset.removeClass(this.className.hidden);
            this.$searchSubmit.addClass(this.className.hidden);
          } else {
            this.$searchReset.addClass(this.className.hidden);
            this.$searchSubmit.removeClass(this.className.hidden);
          }
          break;
          case 'submit':
          e.preventDefault();
          this.filterFields(this.$searchItemns, this.$searchInput.val());
          break;
          case 'click':
          if ($(target).closest(this.$searchReset).length) {
            this.$searchInput.val('');
            this.$searchReset.addClass(this.className.hidden);
            this.$searchSubmit.removeClass(this.className.hidden);
            this.filterFields(this.$searchItemns, null);
          }
          break;
        }
      }
    }, {
      key: 'renderSearch',
      value: function renderSearch() {
        var searchTpl = '<li class="search-field">\n            <form>\n                <label class="search-input"><input type="text" placeholder="' + Drupal.t('search in menu') + '" name="search"/></label>\n                <div class="search-reset ' + this.className.hidden + '"></div>\n                <label class="search-submit"><input type="submit"/></label>\n            </form>\n           </li>';
        var $searchBlock = $(searchTpl);
        this.$searchInput = $searchBlock.find('.search-input input');
        this.$searchReset = $searchBlock.find('.search-reset');
        this.$searchSubmit = $searchBlock.find('.search-submit');

          //this.$menu.append($searchBlock);

          return $searchBlock;
        }
      }, {
        key: 'bindElements',
        value: function bindElements() {
          this.$menu = $(this.menu);
          this.$searchItemns = this.$menu.children('li.expanded, li.leaf');
          this.$searchBlock = this.renderSearch();

          this.$menu.prepend(this.$searchBlock);
        }
      }, {
        key: 'bindHandlers',
        value: function bindHandlers() {
          this._searchHandler = this.searchHandler.bind(this);
        }
      }, {
        key: 'attachHandlers',
        value: function attachHandlers() {
          this.$searchBlock.on('input submit click', this._searchHandler);
        }
      }, {
        key: 'filterFields',
        value: function filterFields($searchItems, search) {
          var _ = this;

          if (!search) {
            $searchItems.removeClass(_.className.hidden).find('.' + _.className.hidden).removeClass(_.className.hidden);

            return;
          }

          $searchItems.each(function () {
            var $el = $(this);
            var text = this.textContent.toLowerCase();
            var loweredSearch = ('' + search).toLowerCase();

            if (!search) {
              $el.removeClass(_.className.hidden);
              return;
            }

            if (~text.indexOf(loweredSearch)) {
              var $submenu = $el.children('ul.menu');
              var $childrenNotMenu = $el.children().not('ul.menu');
              var submenuText = $submenu.text().toLowerCase();
              var childrenNotMenuText = $childrenNotMenu.text().toLowerCase();

              $el.removeClass(_.className.hidden);

              if ($submenu.length && ~submenuText.indexOf(loweredSearch) && !~childrenNotMenuText.indexOf(loweredSearch)) {
                _.filterFields($submenu.children('li'), loweredSearch);
              } else if ($submenu.length) {
                $submenu.find('.' + _.className.hidden).removeClass(_.className.hidden);
              }
            } else {
              $el.addClass(_.className.hidden);
            }
          });
        }
      }]);

return Search;
}();

var $menu = $(menu);
var $searchedMenus = $menu.find('> li.expanded > .menu');

$searchedMenus.each(function () {
  new Search({
    menu: this
  });
});
})();

/*open live chat*/
(function () {
  var $startBtn = $('.livechat-start');

  $startBtn.on('click', function (e) {
    var $rocketChat = $('.rocketchat-widget');

    e.preventDefault();

    if ($rocketChat.attr('data-state') !== 'opened') {
      $rocketChat.attr('data-state', 'opened');
    } else {
      $rocketChat.attr('data-state', 'closed');
    }
  });
})();

/*add current page url to input*/
(function () {
  var $targetInput = $('[name="submitted[source]"]');
  var pathname = window.location.href;

  $targetInput.val(pathname);
})();

/*textarea auto-resizer*/
  /* (function () {
     const $textarea = $('.support-chat__message textarea');
     const options = {
       limit: 120
     };
  
     $textarea.autoResize(options);
   })();*/
 });

/*Drupal behaviors*/
(function ($) {
  /*cupon update*/
  (function () {
    Drupal.behaviors.cuponUpdate = {
      attach: function attach(context) {
        var $promocodeWrap = $('.coupon-expand-block', context);
        var $error = $('.messages.error', context);

        if ($promocodeWrap.length) {
          $promocodeWrap.once(function () {
            var $el = $(this);

            $el.on('click', 'label[for="edit-coupons-skidka"]', function () {
              var $btnPromo = $el.find('.btn_promo');

              $el.removeClass('active');
              $btnPromo.show();
            });

            $el.on('click', '.btn_promo', function () {
              var $promocode = $el.find('.promo-code');
              var $btn = $(this);

              $btn.hide();
              $el.addClass('active');
              $promocode.show();
            });

            afterUpdateCupon($el);
          });
        } else if ($error.length) {
          $error.once(function () {
            var $el = $(this);
            var $promocodeWrap = $el.closest('.coupon-expand-block');
            var $btn = $promocodeWrap.siblings('.btn_promo');

            if (!$promocodeWrap.length) return;

            $btn.hide();
            $promocodeWrap.show();

            afterUpdateCupon($promocodeWrap);
          });
        }
      }
    };

    /**
     * Custom script after update cupon
     */

     function afterUpdateCupon($cuponHtml) {
      var cuponWasDeleted = ~$cuponHtml.text().indexOf('был удален из вашего заказа');
      var $cuponActive = $cuponHtml.find('#uc-coupon-active-coupons');
      var $error = $cuponHtml.find('.messages.error');
      var discount = parseInt($('.line-item-discount .amount').text());
      var $cuponInputWrapper = $cuponHtml.find('.code');
      // let $updateCartBtn = $('#edit-actions input[id^="edit-update-ajax"]');
      var $updateCartBtn = $('.form-actions input[id^="edit-update-ajax"]');

      if ($error.length) {
        $cuponInputWrapper.addClass('error-code');
      }

      if ($cuponActive.length && !discount || !$cuponActive.length && discount || cuponWasDeleted && discount) {
        $updateCartBtn.trigger('mousedown');
      }

      if (!$cuponActive.length && !$error.length) {
        renderButton($cuponHtml);
      }
    }

    /*render cupon*/
    function renderButton($cuponHtml) {
      var $renderedBtn = $cuponHtml.siblings('.btn_promo');
      var $newBtn = $('<div class="btn_promo btn small simple">У меня есть промо-код</div>');

      $cuponHtml.hide();

      if (!$renderedBtn.length) {
        $cuponHtml.before($newBtn);
        $newBtn.on('click', function () {
          $(this).hide();
          $cuponHtml.fadeIn(200);
        });
      } else {
        $renderedBtn.show();
      }
    }
  })();

  /*change currency letters to icon*/
  (function () {
    var options = {
      searchedEl: '.price, .prices, .subtotal, .sum, .total-sum, .shipping, .total, .uc-price, .amount, .icon-cashback',
      pattern: 'руб.',
      classes: 'icon ic-rub'
    };
    var textReplacer = $.jFlex.textReplacer(options);

    Drupal.behaviors.lettersToIcon = {
      attach: function attach(context) {
        textReplacer.run(context);
      }
    };
  })();

  /*cart toggler drupal behavior*/
  (function () {
    Drupal.behaviors.buttonsBox = {
      attach: function attach(context) {
        $(context).once(function () {
          var $el = $(this);

          if (!$el.hasClass('cart-qty-items-count')) return;

          togglerCartWorking($el);
        });

        $('.buttons__box .cart-qty-items-count', context).once(function () {
          togglerCartWorking($(this));
        });
      }
    };

    function togglerCartWorking($counter) {
      var $cartBtn = $('.js__et-cart-toggler');
      var qty = parseInt($counter.text());

      if (qty > 0) {
        $cartBtn.trigger('jElementToggler:start');
      } else if (qty === 0) {
        $cartBtn.trigger('jElementToggler:close').trigger('jElementToggler:stop');
      }
    }
  })();

  /*cart content-toggler checkout*/
  (function () {
    var isDisabled = false;

    Drupal.behaviors.contentTogglerCheckout = {
      attach: function attach(context) {
        $('.cart-info .content-toggler', context).once(function () {
          var $toggler = $(this);

          togglerEnabling($toggler);
          $(window).on('resize', togglerEnabling.bind(null, $toggler));
        });
      }
    };

    function togglerEnabling($toggler) {
      var wWidth = document.documentElement.clientWidth;

      if (wWidth > 640 && !isDisabled) {
        $toggler.trigger('jElementToggler:open', ['simple']).trigger('jElementToggler:stop');
        isDisabled = true;
      } else if (wWidth <= 640 && isDisabled) {
        $toggler.trigger('jElementToggler:start').trigger('jElementToggler:close', ['simple']);
        isDisabled = false;
      }
    }
  })();

  /*toggler live chat*/
  (function () {
    Drupal.behaviors.liveChatContentToggler = {
      attach: function attach(context) {
        var $togglerBtn = $('.js__et-support-chat', context);
        var $openBtn = $('.support-chat-open', context);

        // @TODO здесь не работает, не сворачивает блок, в консоле это работает!
        $('.j_crm-chat--content-type--comment').once(function () {
          $(this).find('.support-chat__top-wrap').slideUp(200);
          setHeightChatBody();
        });

        $togglerBtn.once(function () {
          var $btn = $(this);
          var $parent = $('.j_crm-chat--content-wrap');
          var options = {
            onBeforeOpen: function onBeforeOpen() {
              $parent.removeClass('j_crm-chat--collapsed');
              if ($btn.hasClass('j_crm-chat--button-circle')) {
                if (document.documentElement.clientWidth < 960) {
                  $btn.animate({ bottom: "-70px" }, 200);
                } else {
                  $btn.animate({ right: "-70px" }, 200);
                }
              } else {
                $btn.animate({ bottom: "-50px" }, 200);
              }
            },
            onAfterClose: function onAfterClose() {
              $parent.addClass('j_crm-chat--collapsed');
              if ($btn.hasClass('j_crm-chat--button-circle')) {
                if (document.documentElement.clientWidth < 960) {
                  $btn.animate({ bottom: "20px" }, 200);
                } else {
                  $btn.animate({ right: "15px" }, 200);
                }
              } else {
                $btn.animate({ bottom: "0" }, 200);
              }
            },
            animation: 'slide',
            openAnimationDuration: 200,
            closeAnimationDuration: 100
          };

          if (!$parent.hasClass('j_crm-chat--collapsed') && document.documentElement.clientWidth >= 960) {
            $btn.addClass('et-active');
          }

          $btn.jElementToggler(options);
        });

        $openBtn.once(function () {
          var $btn = $(this);

          $btn.on('click', function (e) {
            e.preventDefault();
            var $toggler = $('.js__et-support-chat');

            $toggler.trigger('jElementToggler:open');
          });
        });
      }
    };

    Drupal.behaviors.liveChatKeyMap = {
      attach: function attach(context) {
        var $message = $('.support-chat__message', context);

        $message.once(function () {
          var _this = this;

          /*send message*/
          (function () {
            var $textarea = $(_this).find('textarea');
            var $submit = $(_this).find('.message-submit input[type="submit"]');
            var options = {
              extraSpace: 0,
              limit: 120
            };

            $textarea.autoResize(options);
            $textarea.on('keydown', function (e) {
              if (e.keyCode !== 13) return;
              e.preventDefault();

              if (e.shiftKey) {
                e.target.value = e.target.value + '\n';
              } else {
                $submit.trigger('mousedown');
              }
            });
          })();

          /*upload attachment*/
          (function () {
            var $fileWidget = $(_this).find('.file-widget.form-managed-file');
            var $input = $fileWidget.find('input[type="file"]');
            var $submit = $fileWidget.find('input[type="submit"]');

            $input.on('change', function () {
              setTimeout(function () {
                if ($fileWidget.find('.file-upload-js-error').length || $input.prop('files') && !$input.prop('files').length) return;
                $submit.trigger('mousedown');
              }, 50);
            });
          })();

          /*input[type=file] open*/
          (function () {
            var $openFileBtn = $('.btn_file-open', $message);
            var $toggler = $('.file-widget.form-managed-file input[type=file]', $message);

            $openFileBtn.once(function () {
              var $btn = $(this);

              $btn.on('click', function (e) {
                e.preventDefault();

                if (!$toggler.parents($message).length) return;

                $toggler.trigger('click');
              });
            });
          })();
        });
      }
    };

    Drupal.behaviors.liveChatBodySetHeight = {
      attach: function attach(context) {
        var $chatElements = $('.file-widget', context);

        $chatElements.once(setHeightChatBody);
      }
    };

    Drupal.behaviors.liveChatBodySetHeightOnResize = {
      attach: function attach(context) {
        var $body = $('body', context);

        $body.once(function () {
          var $chat = $('.j_crm-chat');

          if (!$chat.length) return;
          $(window).on('resize', setHeightChatBody);
        });
      }
    };

    /*support chat body height set*/
    function setHeightChatBody() {
      var $contentWrap = $('.j_crm-chat--content-wrap');
      var $topBlock = $('.support-chat__top-block');
      var $message = $('.support-chat__message');
      var $chatBody = $('.support-chat__body');
      var $operatorList = $('.support-chat__operator_list');

      $contentWrap.show();

      var mainHeight = document.documentElement.clientHeight;
      var messageHeight = $message.outerHeight();

      var topBlockHeight = $topBlock.outerHeight();
      var chatBodyHeight = mainHeight - topBlockHeight - messageHeight + 'px';

      if (parseFloat(chatBodyHeight) < 300) {
        $operatorList.hide();
        topBlockHeight = $topBlock.outerHeight();
        chatBodyHeight = mainHeight - topBlockHeight - messageHeight + 'px';
      }

      if (parseFloat(chatBodyHeight) > 299 && document.documentElement.clientWidth >= 960) {
        $operatorList.show();
        topBlockHeight = $topBlock.outerHeight();
        chatBodyHeight = mainHeight - topBlockHeight - messageHeight + 'px';
      }

      if ($contentWrap.hasClass('j_crm-chat--collapsed')) {
        $contentWrap.hide();
      }

      $chatBody.css({
        height: chatBodyHeight
      });
    }
  })();

  /*userLogin on cart*/
  (function () {
    Drupal.behaviors.userLoginCart = {
      attach: function attach(context) {
        var $userLoginWrap = $('#user_login__wrap', context);

        $userLoginWrap.once(function () {
          var $wrap = $(this);
          var $btn = $wrap.find('#user_login_btn');
          var $userLogin = $wrap.find('.user_login');
          var $userLoginForm = $wrap.find('.user_login_form');

          $btn.on('click', function (e) {
            e.preventDefault();

            $userLogin.hide();
            $userLoginForm.removeClass('hidden').hide().slideDown(200);
          });
        });
      }
    };
  })();

  /*ajax overlay on*/
  // @TODO Эта функция делает проблему, добавляет контейнеры, но не удаляет их, и они накладывается в большом кол-ве, поэтому пока убрали, и не понятно зачем эта функция, если не нужна то удалить.
  // (function () {
  //   Drupal.behaviors.ajaxOverlayOnTrobber = {
  //     attach: function attach(context) {
  //       var $throbbers = $('.ajax-progress-throbber', context);
  //       var $ajaxOverlay = $('.ajax-progress-overlay.ajax-custom', context);
  //       var $throbberGlobal = $('.ajax-progress-throbber');
  //
  //       $ajaxOverlay.once(function () {
  //         var $currOverlay = $(this);
  //         var $throbber = $currOverlay.siblings('.ajax-progress-throbber');
  //         var $parent = $currOverlay.parent();
  //
  //         if ($throbber.length) return;
  //
  //         $currOverlay.remove();
  //         $parent.css({
  //           position: ''
  //         });
  //       });
  //
  //       $throbbers.once(function () {
  //         var $throbber = $(this);
  //         var $overlay = $('<div class="ajax-progress-overlay ajax-custom"></div>');
  //         var $parent = $throbber.parent();
  //
  //         $throbber.before($overlay);
  //         $parent.css({
  //           position: 'relative'
  //         });
  //       });
  //     }
  //   };
  // })();

  /*city block width*/
  (function () {
    Drupal.behaviors.cityBlock = {
      attach: function attach(context) {
        var $cities = $('.city-block .cities', context);

        $cities.once(function () {
          var $currCities = $(this);
          var $citiesGroup = $currCities.find('.cities-group');
          var citiesWidth = $currCities.outerWidth() - $currCities.width() + $currCities.width() * $citiesGroup.length;

          $currCities.width(citiesWidth);
        });
      }
    };
  })();

  /*development admin menu toggler*/
  (function () {
    Drupal.behaviors.adminMenuToggler = {
      attach: function attach(context) {
        var $adminMenu = $('.menu_adminflex__wrap', context);

        $adminMenu.once(function () {
          var $menu = $(this);
          var isMenuDisabled = $.cookie('adminMenuDisabled');

          if (isMenuDisabled) {
            $menu.hide();
            $('.fullpage').css('paddingLeft', '0');
          }
        });
      }
    };

    window.on = enableAdminMenu;
    window.off = disableAdminMenu;

    function disableAdminMenu() {
      $.cookie('adminMenuDisabled', true, { path: '/' });
    }

    function enableAdminMenu() {
      $.removeCookie('adminMenuDisabled', { path: '/' });
    }
  })();

  /* delegate submit click in ctools-modal-content*/
  (function () {
    /* replytemplate. Insert ready reply in ticket body */
    Drupal.behaviors.replyTemplate = {
      attach: function (context, settings) {
        // Delete cookie.
        $(context).once(function () {
          if (settings.FlexJSEvent !== undefined && settings.FlexJSEvent.hook == 'comment_insert' && $.cookie('reply-template')) {
            $.removeCookie('reply-template');
          }
        });

        $('.view-display-id-block_reply_template .views-row #reply-template-checkbox').once('click', function () {
          var $block = $(this).closest('.views-row');
          var id = $block.find('.node').attr('id');
          var nids = $.cookie('reply-template');
          nids = nids === undefined ? {} : JSON.parse(nids);
          /* Если есть выбранный в куках то выделяем шаблон выбранным. */
          if (id && nids[id] !== undefined) {
            $block.addClass('selected');

            /* Проверяем в textarea наличие этого шаблона, если нету то проставляем. */
            var $fieldBody = $('form.comment-form .field-name-comment-body iframe.cke_wysiwyg_frame').contents().find('body.cke_editable');
            if (!$fieldBody.find('#reply-template-wrap-' + id).length) {
              var replyTemplate = '<div id="reply-template-wrap-' + id + '">' + $block.find('.data').html() + '</div>';
              $fieldBody.append(replyTemplate);
            }
          }

          $(this).click(function () {
            var $block = $(this).closest('.views-row');
            var id = $block.find('.node').attr('id');
            var nids = $.cookie('reply-template');
            nids = nids === undefined ? {} : JSON.parse(nids);
            var $fieldBody = $('form.comment-form .field-name-comment-body iframe.cke_wysiwyg_frame').contents().find('body.cke_editable');

            /* Если выбран шаблон то удаляем. */
            if ($block.hasClass('selected')) {
              $block.removeClass('selected');
              if (nids[id] !== undefined) {
                delete nids[id];
                var nidsSave = JSON.stringify(nids);
                $.cookie('reply-template', nidsSave, {expires: 1});
              }
              if ($fieldBody.length) {
                $fieldBody.find('#reply-template-wrap-' + id).remove();
              }
            }
            /* Если невыбран шаблон то добавляем. */
            else {
              $block.addClass('selected');
              if (nids[id] === undefined) {
                nids[id] = '';
                var nidsSave = JSON.stringify(nids);
                $.cookie('reply-template', nidsSave, {expires: 1});
              }
              var replyTemplate = '<div id="reply-template-wrap-' + id + '">' + $block.find('.data').html() + '</div>';
              $fieldBody.append(replyTemplate);
            }
          });
        });
      }
    };
  })();




})(jQuery);