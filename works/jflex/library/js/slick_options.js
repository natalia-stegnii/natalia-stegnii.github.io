
jQuery(document).ready(function ($) {
	jQuery('.js__slick').on('afterChange', function(event, slick, currentSlide, nextSlide){
    if (jQuery('.js__slick .slide video').length > 0){

      jQuery('.js__slick .slide video')[0].play(); 
    }
  });


  /* functions-slider navigate*/
  (function () {
    var $link = $('.slick-pagination-target');

    $link.on('click', '', function (e) {
      e.preventDefault();
      $('.parent-slider.js__slick').slick('slickGoTo', $(this).data('slide'));
    });


    $('.js__slick').on('init reInit afterChange', function(event, slick, currentSlide, nextSlide){

      var $elSlide = $(slick.$slides[currentSlide]);
      var sliderObj = $elSlide.closest('.slick-slider');
      if (sliderObj.hasClass('inner-slider')) {
        return;
      }
      var pager = (currentSlide ? currentSlide : 0) ;
      $link.removeClass('active');
      $('.slick-pagination-target[data-slide='+pager+']').addClass('active');
    });
  })();
});
