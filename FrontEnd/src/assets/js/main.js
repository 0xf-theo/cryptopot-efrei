(function ($) {
"use strict";



// meanmenu with sidebar

$('#mobile-menu').meanmenu({
	meanMenuContainer: '.mobile-menu',
	meanScreenWidth: "992"
});

$('.open-mobile-menu').on('click', function () {
	$('.side-info').addClass('info-open');
	$('.offcanvas-overlay').addClass('overlay-open');
})

$('.side-info-close,.offcanvas-overlay,.mobile_one_page li.menu-item a.nav-link').on('click', function () {
	$('.side-info').removeClass('info-open');
	$('.offcanvas-overlay').removeClass('overlay-open');
})

	/* Search
	-------------------------------------------------------*/
	var $searchWrap = $('.search-wrap');
	var $navSearch = $('.nav-search');
	var $searchClose = $('#search-close');

	$('.search-trigger').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).addClass("open");
	});

	$('.search-close').on('click', function (e) {
		e.preventDefault();
		$searchWrap.animate({ opacity: 'toggle' }, 500);
		$navSearch.add($searchClose).removeClass("open");
	});

	function closeSearch() {
		$searchWrap.fadeOut(200);
		$navSearch.add($searchClose).removeClass("open");
	}

	$(document.body).on('click', function (e) {
		closeSearch();
	});

	$(".search-trigger, .main-search-input").on('click', function (e) {
		e.stopPropagation();
	});






//header 3 menu 

$(".logo_absicon").on("click", function() {
	$(".menu_3").toggleClass("menu_block");
	$(this).toggleClass("icon_block");

})

$(".offcanvas-overlay, .side-info-close").on("click", function(){
	$(".logo_absicon").removeClass("icon_block");
});

//datepicker 
if (jQuery("#datepicker_event").length > 0) {
	$('#datepicker_event').datepicker({
		showOtherMonths: true
	});
}

// nice select
$('.support_select, .contact_select, .widget').niceSelect();


$(window).on('scroll', function () {
	var scroll = $(window).scrollTop();
	if (scroll < 245) {
		$(".header-sticky").removeClass("sticky");
	} else {
		$(".header-sticky").addClass("sticky");
	}
});

// Countdown

$('[data-countdown]').each(function() {
	var $this = $(this),
		finalDate = $(this).data('countdown');
	$this.countdown(finalDate, function(event) {
		$this.html(event.strftime('<div class="count_down">%D<span>Days</span></div><div class="count_down">%H<span>Hours</span></div><div class="count_down">%M<span>Minutes</span></div><div class="count_down">%S<span>Seconds</span></div>'));
	});
});


// data width
$("[data-width]").each(function(){
	$(this).css("width",$(this).attr("data-width"))
})

// data background color
$("[data-bg-color]").each(function(){
	$(this).css("background-color",$(this).attr("data-bg-color"))
})

/*------------------------------------
	Slider
--------------------------------------*/
if (jQuery(".slider-active").length > 0) {
	let sliderActive1 = '.slider-active';
	let sliderInit1 = new Swiper(sliderActive1, {
		// Optional parameters
		slidesPerView: 1,
		slidesPerColumn: 1,
		paginationClickable: true,
		loop: true,
		effect: 'fade',

		autoplay: {
			delay: 5000,
		},

		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
			type: 'fraction',
			// clickable: true,
		},

		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},

		a11y: false
	});

	function animated_swiper(selector, init) {
		let animated = function animated() {
			$(selector + ' [data-animation]').each(function () {
				let anim = $(this).data('animation');
				let delay = $(this).data('delay');
				let duration = $(this).data('duration');

				$(this).removeClass('anim' + anim)
					.addClass(anim + ' animated')
					.css({
						webkitAnimationDelay: delay,
						animationDelay: delay,
						webkitAnimationDuration: duration,
						animationDuration: duration
					})
					.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
						$(this).removeClass(anim + ' animated');
					});
			});
		};
		animated();
		// Make animated when slide change
		init.on('slideChange', function () {
			$(sliderActive1 + ' [data-animation]').removeClass('animated');
		});
		init.on('slideChange', animated);
	}

	animated_swiper(sliderActive1, sliderInit1);
}

// team 
const swiper_brand = new Swiper('.brand_active', {
	slidesPerView: 2,
	spaceBetween: 30,
	// direction: 'vertical',
	loop: true,
	
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	
	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	breakpoints: {
		350: {
			slidesPerView: 1,
			},
		550: {
			slidesPerView: 3,
			spaceBetween: 50,
		},
		768: {
			slidesPerView: 4,
		},
		1024: {
			slidesPerView: 6,
		},
		}

	});


		
// Feature Cause active
const feature_cause_active = new Swiper('.feature_cause_active', {
	slidesPerView: 1,
	spaceBetween: 30,
	observer: true,
	observeParents: true,
	loop: true,
	
	// If we need pagination
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
	
	// Navigation arrows
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	},
	
	// And if we need scrollbar
	scrollbar: {
		el: '.swiper-scrollbar',
	},
	breakpoints: {
		350: {
			slidesPerView: 1,
			},
		550: {
			slidesPerView: 1,
		},
		768: {
			slidesPerView: 1,
		},
		1024: {
			slidesPerView: 1,
		},
		}

	});
	  	  

/* magnificPopup img view */
$('.popup-image').magnificPopup({
	type: 'image',
	gallery: {
	  enabled: true
	}
});

/* magnificPopup video view */
$('.video_play, .play_btn, .video_icon').magnificPopup({
	type: 'iframe'
});


// isotop
$('.grid').imagesLoaded( function() {
	// init Isotope
	var $grid = $('.grid').isotope({
	  itemSelector: '.grid-item',
	  percentPosition: true,
	  masonry: {
		// use outer width of grid-sizer for columnWidth
		columnWidth: '.grid-item',
	  }
	});
});

// filter items on button click
$('.portfolio-menu').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});

//for menu active class
$('.portfolio-menu button').on('click', function(event) {
	$(this).siblings('.active').removeClass('active');
	$(this).addClass('active');
	event.preventDefault();
});



// Parallax 

if ($(".stuff").length) {
        var stuff = $('.stuff').get(0);
        var parallaxInstance = new Parallax(stuff);
    }
    if ($(".stuff2").length) {
        var stuff = $('.stuff2').get(0);
        var parallaxInstance = new Parallax(stuff);
    }
    if ($(".stuff3").length) {
        var stuff = $('.stuff3').get(0);
        var parallaxInstance = new Parallax(stuff);
    }
    if ($(".stuff4").length) {
        var stuff = $('.stuff4').get(0);
        var parallaxInstance = new Parallax(stuff);
    }

    $("a.clickup").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 500, function() {
                window.location.hash = hash;
            });
        }
    });




// scrollToTop
$.scrollUp({
	scrollName: 'scrollUp', // Element ID
	topDistance: '300', // Distance from top before showing element (px)
	topSpeed: 300, // Speed back to top (ms)
	animation: 'fade', // Fade, slide, none
	animationInSpeed: 200, // Animation in speed (ms)
	animationOutSpeed: 200, // Animation out speed (ms)
	scrollText: '<i class="icofont icofont-long-arrow-up"></i>', // Text for element
	activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
});

// WOW active
new WOW().init();


})(jQuery);