/* jFlex library. Made by Jeto */
/* https://jflex.org */
/* https://jeto.org */


/*
!!! переделать timer_date на timer !!!

УСТАНОВКА:
Подключаем скрипты
  cookie.js
  sprintf.js
  timer.js

Включаем модули
  date date-popup

Создаем:
  Обвертку
    Период события
  Поля:
    Таймер 1
      field_timer_date
      Pop-up calendar, от-до(обяз.)
      создать формат отображения даты timestamp (U)
      description: Даты запуска и отключения таймера.
    Таймер 2 (индивидуальное)
      field_timer_date_individ
      Целое число
      description: Укажите кол-во дней, в течении которых будет работать таймер.<br>Таймер запускается для пользователя только если он посетит данную страницу.<br><i>(заполнять, если не заполнен первый период!)</i>
    Размер скидки
      field_timer_discount
      текст
    Селектор старой цены
      field_timer_discount_oldprice
      текст
    Селектор процента скидки
      field_timer_discount_percent
      текст

Вставляем в TPL:
<!--timer-->
<div id="timer-box">
  <div class="settings hide">
    <?php if (!empty($content['field_timer_date'])): ?>
      <?php print render($content['field_timer_date']); ?>
    <?php endif; ?>
    <?php if (!empty($content['field_timer_date_individ'])): ?>
      <?php print render($content['field_timer_date_individ']); ?>
    <?php endif; ?>
      <?php if (!empty($content['field_timer_discount']) && !empty($content['field_timer_discount_oldprice'])): ?>
        <div class="discount">
          <div class="discount"><?php print $content['field_timer_discount']['#items'][0]['value']; ?></div>
          <div class="selector-oldprice"><?php print $content['field_timer_discount_oldprice']['#items'][0]['value']; ?></div>
          <?php if (!empty($content['field_timer_discount_percent'])): ?>
            <div class="selector-percent"><?php print $content['field_timer_discount_percent']['#items'][0]['value']; ?></div>
          <?php endif; ?>
        </div>
      <?php endif; ?>
  </div>
  <div class="timeout l" id="timeout">
    <span class="val days"><span>00</span><i> дн.</i></span>
    <span class="val hours"><span>00</span><i> ч.</i></span>
    <span class="val minutes"><span>00</span><i> м.</i></span>
    <span class="val seconds"><span>00</span><i> с.</i></span>
  </div>
</div>


КАК РАБОТАЕТ:
  таймер 1
    скриптом сравнивается дата от-до
  таймер 2
    создает куку "timer_date_individ" с объектом всех нод на которой уст. сч, и пишет значения при заходе на ноду


ЗАМЕТКА:
!!! Индивидуальный отчет работает только в нодах. в куку пишется NID

*/


// Start timer.
function startTimer(timerTimeEnd) {
  var date1_tmp = new Date();
  var date1 = Math.round(date1_tmp.getTime() / 1000);
  var delta = (timerTimeEnd * 1) - date1;
  //количество дней
  var days = Math.floor(delta / (60 * 60 * 24));
  //количество часов
  var hours = Math.floor((delta - (days * 60 * 60 * 24)) / (60 * 60));
  //колчичество минут
  var minut = Math.floor((delta - (days * 60 * 60 * 24) - (hours * 60 * 60)) / 60);
  //количество секунд
  var secund = delta - (days * 60 * 60 * 24) - (hours * 60 * 60) - (minut * 60);
  date_1 = '%02d%02d%02d%02d'.sprintf(days, hours, minut, secund);
  timeout = jQuery('#timeout');
  jQuery('.val.days>span', timeout).html(date_1[0] + date_1[1]);
  jQuery('.val.hours>span', timeout).html(date_1[2] + date_1[3]);
  jQuery('.val.minutes>span', timeout).html(date_1[4] + date_1[5]);
  jQuery('.val.seconds>span', timeout).html(date_1[6] + date_1[7]);

  setTimeout('startTimer(timerTimeEnd);', 999);
}

(function ($, Drupal, window, document, undefined) {

  // behaviors
  Drupal.behaviors.timerDate = {
    attach: function (context, settings) {
      var TB = $('#timer-box', context);
      if (!TB.length) {
        return;
      }
      var EvDSt = $('.field-timer-date .date-display-start', TB).text();
      var EvDEnd = $('.field-timer-date .date-display-end', TB).text();
      var EvDInd = $('.field-timer-date-individ .field-item', TB).text();
      var isStartTimer = false;

      // Получаем время
      var date = new Date();
      var timeCurrent = Math.round(date.getTime() / 1000);

      if (EvDSt && EvDEnd && EvDSt <= timeCurrent && timeCurrent < EvDEnd) {
        timerTimeEnd = EvDEnd;
        startTimer(parseInt(timerTimeEnd));
        isStartTimer = true;
      }
      else if (EvDInd) {
        EvDInd = parseInt(EvDInd);
        if (EvDInd) {
          EvDInd = parseInt(EvDInd) * 24 * 60 * 60;
          var node = $('body.page-node');
          var nid = node[0].className.match(/page-node-([\d]+) /);
          if (nid[1] !== undefined) {
            nid = parseInt(nid[1]);

            // Проверяем куку
            var setting = false;
            var cookEvDI = $.cookie('timer_date_individ');
            if (cookEvDI) {
              cookEvDI = JSON.parse(cookEvDI);
              if (typeof cookEvDI == 'object') {
                setting = true;
                if (cookEvDI[nid] === undefined) {
                  cookEvDI[nid] = timeCurrent;
                  var str = JSON.stringify(cookEvDI);
                  $.cookie('timer_date_individ', str, {expires: 365});
                }
              }
            }
            if (setting === false) {
              cookEvDI = {};
              cookEvDI[nid] = timeCurrent;
              var str = JSON.stringify(cookEvDI);
              $.cookie('timer_date_individ', str, {expires: 365});
            }

            // Проверяем остаток времени
            // Переводим период события в секунды, получаем остаток времени события
            var timerTimeLast = (cookEvDI[nid] + EvDInd) - timeCurrent;
            timerTimeEnd = cookEvDI[nid] + EvDInd;
            // сравниваем с текущим временем, отображаем счетчик
            if (timerTimeLast > 0) {
              startTimer(parseInt(timerTimeEnd));
              isStartTimer = true;
            }
          }
        }
      }

      // Discount.
      if (isStartTimer) {
        var discount = parseFloat($('.discount .discount', TB).text());
        var selectorOldprice = $('.discount .selector-oldprice', TB).text();
        var selectorPercent = $('.discount .selector-percent', TB).text();
        if (discount) {
          if (selectorOldprice && $(selectorOldprice).length) {
            var oldPrice = parseFloat($(selectorOldprice).text());
            var oldPriceNew = oldPrice + discount;
            $(selectorOldprice).text(oldPriceNew);

            if (selectorPercent && $(selectorPercent).length) {
              var percent = parseFloat($(selectorPercent).text());
              percent = percent / oldPrice * oldPriceNew;
              $(selectorPercent).text(percent.toFixed(2) + ' %');
            }
          }
        }
      }

    }
  }

})
(jQuery, Drupal, this, this.document);

