$('.responsive').slick({
  dots: false,
  autoplay: false,
  infinite: true,
  speed: 300,
  slidesToShow: 5,
  slidesToScroll: 1,
  responsive: [
  {
      breakpoint: 1200,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 3,
        infinite: true,
        dots: true
    }
},
{
  breakpoint: 991,
  settings: {
    slidesToShow: 3,
    slidesToScroll: 2
}
},
{
  breakpoint: 767,
  settings: {
    slidesToShow: 1,
    slidesToScroll: 1
}
}
    ]
});

$('.slider').slick({
            dots: false,
            arrows: true,
            fade: true,
            autoplay: true,
            infinite: true,
            speed: 300,
            responsive: [{
                breakpoint: 768,
                settings: {
                    arrows: false
                }
            }]
        });