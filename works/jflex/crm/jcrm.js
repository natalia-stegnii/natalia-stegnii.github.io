// (function ($, Drupal, window, document, undefined) {
//   // To understand behaviors, see https://drupal.org/node/756722#behaviors
//   Drupal.behaviors.jCrm = {
//     attach: function (context, settings) {
//       var elHide = '.feedbacks a, td.views-field-field-user-surname-editable>div, td.views-field-field-auto-editable>div, td.views-field-field-request-deposit-editable>div';
//       var elDisabled = 'input, select:not(.button-apply), textarea';
//       var tr = $('tbody>tr', $('#views-form-crm-crm-page', context));
//
//       // При первом отображении
//       if (tr.length) {
//         tr.each(function (key, val) {
//           var select = $('.views-field-field-request-manager-editable select.button-apply', val);
//           if (select.length) {
//             select.once('before').before('<a class="field-request-manager-botton" data-row-id="' + key + '">Принять</a>').hide();
//             $(elDisabled, val).prop("disabled", true);
//             $(elHide, val).hide();
//           }
//         });
//       }
//       // После ajax
//       else {
//         tr = $(context).closest('tr');
//         $(elDisabled, tr).once('prop').prop("disabled", false);
//         $(elHide, tr).once('show').show();
//       }
//
//       // Кнопка принятия заявки
//       $('.field-request-manager-botton').once('click').click(function (event) {
//         event.preventDefault();
//         //$(this).append('<div class="throbber">&nbsp;</div>');
//         var select = $('select', $(this).parent());
//         var val = $('option', select).eq(1).val();
//         $("option[value=" + val + "]", select).prop('selected', true).attr('selected', true).trigger('change');
//       });
//     }
//   }
// })(jQuery, Drupal, this, this.document);
