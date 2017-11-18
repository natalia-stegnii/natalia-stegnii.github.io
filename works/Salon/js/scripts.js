$(document).ready(function() {
	
	$("input[type='text'], input[type='tel'], input[type='email'], textarea").focus(function(){
		if($(this).hasClass('inp-error')) {
			$(this).removeClass('inp-error');
		}
	});

	// Слайдеры фотографий (мастера)
	$('#masters .master-item').each(function(index) {
		var item = $(this);
		var owl_fotos = item.find('.works *[data-slider]');
		var owl_fotos_amount = parseInt(owl_fotos.find('.item').length);
		var owl_fotos_loop = true;
		if(owl_fotos_amount <= 4) {
			owl_fotos_loop = false;
		}
		owl_fotos.owlCarousel({
			items: 4,
			nav: false,
			dots: true,
			loop: owl_fotos_loop,
			dotsContainer: item.find('.works .owl-dots'), 
			margin: 0,
			slideBy: 4, 
			smartSpeed: 350,
			mouseDrag: false,
			navText: ['','']
		});
		item.find('.works').on("click", ".slider-prev", function(e) {
			e.preventDefault();
			owl_fotos.trigger('prev.owl.carousel');
		});
		item.find('.works').on("click", ".slider-next", function(e) {
			e.preventDefault();
			owl_fotos.trigger('next.owl.carousel');
		});
	});
	
	// Слайдер (сертификаты)
	/*
	var owl_sert = $('#owl-sert');
	var owl_sert_amount = parseInt(owl_sert.find('.item').length);
	var owl_sert_loop = true;
	if(owl_sert_amount <= 3) {
		owl_sert_loop = false;
	}
	owl_sert.owlCarousel({
		items: 3,
		nav: false,
		dots: false,
		loop: owl_sert_loop,
		margin: 0,
		slideBy: 1, 
		smartSpeed: 350,
		mouseDrag: false,
		navText: ['',''],
		responsive:{
			0:{items:1, slideBy:1},
			500:{items:1, slideBy:1},
			768:{items:4, slideBy:1},
			1170:{items:3, slideBy:1}
		}
    });
	$("body").on("click", "#slider-sert-prev", function(e) {
		e.preventDefault();
		owl_sert.trigger('prev.owl.carousel');
	});
	$("body").on("click", "#slider-sert-next", function(e) {
		e.preventDefault();
		owl_sert.trigger('next.owl.carousel');
	});
	*/

	// Меню
	$("#promo .menu ul li a").menuscroll();
	
	// FAQ
	$("#faq .faq-item .q > span > span > span").click(function(e) {
		var item = $(this).parents('.faq-item');
		item.parents('#faq').find('.faq-item').removeClass('active');
		item.addClass('active');
	});
	
	// Дополнительные поля в формах
	$("#uslugi .uslugi-item .button-red[data-modal]").click(function(e) {
		var item = $(this).parents('.uslugi-item');
		var eskiz_name = item.find('.zag').text();
		$("#Modal-get-free-eskiz .white-form .zag span[data-eskiz]").text(eskiz_name);
		$("#Modal-get-free-eskiz").find('.eskiz-name').val(eskiz_name);
	});
	$("#masters .master-item .teacher .leftside .button-red[data-modal]").click(function(e) {
		if($(this).parents('.master-item').is('.master-item')) {
			var item = $(this).parents('.master-item');
			var master_name = item.find('.teacher .rightside .name').text();
			$("#Modal-master-consult .white-form .zag span[data-master]").text(master_name);
			$("#Modal-master-consult").find('.master-name').val(master_name);
		} else {
			$("#Modal-master-consult").find('.master-name').val('');
		}
	});
	
	// Фансибокс
	$(".fancybox").fancybox({
		'speedIn'   : 500,
		'speedOut'  : 400,
		'maxWidth'  : '100%',
		'maxHeight' : '100%',
		'padding'   : 0,
		'helpers' : {'overlay' : {'locked' : false}}
	});

	// Маски поля
	if(!isMobile.any()) {
		$(".phone_field").mask("+7 (999) 999-99-99", {
			completed: function(){ $(this).attr('data-valid', 'true'); }
		});
	}

	// Отправка форм заявок
	var errorText = 'Простите, но сервер не смог отправить вашу заявку. Попробуете ещё раз, пожалуйста.';
	$("form[toMail]").submit(function(e) {
		e.preventDefault();
		e.stopPropagation();
		var this_form = $(this);
		var error = 0;
		this_form.find(".inps").removeClass('inp-error');
		if(this_form.find("input").is(".name")) {
			var name = this_form.find(".name");
			if(name.hasClass('required')) {
				if(name.val().length<=2) {
					name.addClass('inp-error');
					error=1;
				}
			}
		}
		if(this_form.find("input").is(".phone")) {
			var phone = this_form.find(".phone");
			if(phone.hasClass('required')) {
				if(!isMobile.any()) {
					if(!phone.hasAttr('data-valid')) {
						phone.addClass('inp-error');
						error=1;
					}
				} else {
					if(phone.val().length<=2) {
						phone.addClass('inp-error');
						error=1;
					}	
				}
			}
		}
		if(this_form.find("input").is(".email")) {
			var email = this_form.find(".email");
			if(email.hasClass('required')) {
				if(!email.val().match(/^[-\w.]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$/)) {
					email.addClass('inp-error');
					error=1;
				}
			}
		}
		if(this_form.find("textarea").is(".question")) {
			var question = this_form.find(".question");
			if(question.hasClass('required')) {
				if(question.val().length<=5) {
					question.addClass('inp-error');
					error=1;
				}
			}
		}
		if(error==1) {
			return false;
		}
		var options = { 
			url: '/php/mail.php',
			clearForm: true,
			resetForm: true,
			success: function(data) {
				if(data=='ok') {
					window.open('thanks.html', '_self');
					this_form.find(".inps").removeClass('inp-error').val(''); 
					this_form.find("*[data-valid]").removeAttr('data-valid');
					$.arcticmodal('close'); 
				} else {
					alert(errorText);
				}
			},
			error: function() {}	
		};
		this_form.ajaxSubmit(options);
	});
	
    // Placeholder
    $('input, textarea').placeholder();

});