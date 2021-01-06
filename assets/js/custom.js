'use strict';

window.onload = function(){
    // Isotope
    var $container = $('.portfolio__container');
    
    $container.isotope({
        itemSelector: '.grid-item',
        percentPosition: true,
        filter: '*',
        animationOptions: {
            duration: 750,
            easing: 'linear',
            queue: false
        }
    });
 
    $('.portfolio__filters a').click(function(){
        $('.portfolio__filters .current').removeClass('current');
        $(this).addClass('current');
 
        var selector = $(this).attr('data-filter');
        $container.isotope({
            filter: selector,
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
         });
         return false;
    }); 
};

$(document).ready(function() {
    
    // Animation on Scroll
    AOS.init({
        once: true
    });
    
    // Navbar slideline
    var nav = $('#navbars-default'),
        slideLine = $('#slideline'),
        activeItem = ($(nav).find('a.active').length > 0) ? $(nav).find('a.active') : $(nav).find('a:first-child');
    // Active item
    function slideActiveNav() {
        if (activeItem) {
            slideLine.css({
                'width': activeItem.width(),
                'left': activeItem.position().left
            });
        } else {
            slideLine.width(0);
        }
    }
    slideActiveNav();
    $('.navbar a.nav-link').on('mouseover', function(event) {
        slideLine.css({
          'width': $(this).width(),
          'left': $(this).position().left
        });
    });
    $(nav).on('mouseleave', function(event) {
        slideActiveNav();
    });
    $('.navbar a.nav-link').on('click', function(event) {
        $('.navbar').find('a.active').removeClass('active');
        activeItem = $(this).addClass('active');
        slideLine.css({
            'width': $(this).width(),
            'left': $(this).position().left
        });
    });

    // Hero scrollUI button
    $('#ui-scroll').on('click', function(event) {
        var smoothHash = '#' + $(this).closest('section').nextAll('section[id]').attr('id');
        smoothScroll(smoothHash);
        if ($('.addscrollspy').length > 0 ) {
            $('.navbar').find('a.active').removeClass('active');
            activeItem = $('.navbar').find($('a[href="' + smoothHash + '"]')).addClass('active');
            slideLine.css({
              'width': $(activeItem).width(),
              'left': $(activeItem).position().left
            });
        };
    });
    $('.post__comment-count').on('click', function(event) { 
        event.preventDefault();
        smoothScroll('#post-comments');
    });
    $('body').scrollspy({
        target: '.active-spy',
        offset: 120
    }); 
    
    // Smoothscroll function
    function smoothScroll(smoothHash) {
        var navbarHeight = $('#navbar').height(),
        navbarCollapse = $('.navbar-collapse').height(),
        navbarBrand = $('.navbar-brand').height(),
        scrollHash = $(smoothHash).offset().top,
        scrollTo = 0;
        if ($('.navbar-collapse.show').length > 0 ) {
            scrollTo = scrollHash  - navbarHeight + navbarCollapse + navbarBrand;
        } else {
            scrollTo = scrollHash - navbarHeight;
        }
        $('body').removeClass('active-spy');
        $('html, body').animate({
            scrollTop: scrollTo
        }, 800, function(){
            window.location.smoothHash = smoothHash;
            $('body').addClass('active-spy');
        });
    };
    
    // Navbar BS Scrollspy
    if ($('#index, #index-video, #index-parallax, #index-slider, #index-rtl, #index-dark').length > 0 ) {
        $('.navbar a').each(function() {
            var hash = this.hash;
            this.href = hash;
        });
        // Slideline on scroll
        $(window).on('activate.bs.scrollspy', function () {
            activeItem = $('.navbar').find('a.active');
            slideLine.css({
                'width': activeItem.width(),
                'left': activeItem.position().left
            });
        })

        // Navbar smoothscroll
        $('.navbar a.nav-link').on('click', function(event) {
            if (this.hash !== '') {
                event.preventDefault();
                var smoothHash = this.hash;
                smoothScroll(smoothHash);
            }
        });
    }
    // Link smoothscroll
    $('.smoothscroll').on('click', function(event) {
        if ($(this).attr("href") !== '') {
            event.preventDefault();
            var smoothHash = $(this).attr("href");
            smoothScroll(smoothHash);
            if ($('.addscrollspy').length > 0 ) {
                $('.navbar').find('a.active').removeClass('active');
                activeItem = $('.navbar').find($('a[href="' + smoothHash + '"]')).addClass('active');
                slideLine.css({
                  'width': $(activeItem).width(),
                  'left': $(activeItem).position().left
                });
            };
        }
    });
    
    // Navbar sticky
    if ($('#navbar').length > 0 ) {
        addSticky()
        document.onscroll = function() {
            addSticky();
        };
        function addSticky() {
            var navbar = document.getElementById('navbar'),
            sticky = navbar.offsetTop;
            if ( (window.pageYOffset != sticky) && $(window).scrollTop() >= 0 ) {
                navbar.classList.add('sticky')
            } else {
                navbar.classList.remove('sticky');
            }
        }
    }
    
    // Navbar Mobile
    $('button.navbar-toggler').on('click', function(event) {
        $('body').toggleClass('hide-overflow');
        $(".burger").toggleClass("active");
    });
    $('.nav-item a').on('click', function(event) {
        if ($('.navbar-collapse.show').length > 0 ) {
            $( 'button.navbar-toggler' ).trigger( 'click' );
        }
    });
    
    // Progress bar circle (Bootstrap adjustment)
    if ($('.bar--circle').length > 0 ) {
        $('.bar--circle').each(function() {
            var value = $(this).children().attr('data-value'),
            left = $(this).find('.progress-left .progress-bar'),
            right = $(this).find('.progress-right .progress-bar');
            if (value > 0) {
                if (value <= 50) {
                    right.css('transform', 'rotate(' + percentageToDegrees(value) + 'deg)')
                } else {
                    right.css('transform', 'rotate(180deg)')
                    left.css('transform', 'rotate(' + percentageToDegrees(value - 50) + 'deg)')
                }
            }
        });
        function percentageToDegrees(percentage) {
            return percentage / 100 * 360
        };
    };
    
    // Owl Testimonial Carousel
    $('.owl-testimonials').owlCarousel({
        responsive: {
            1400: {
                margin: 30,
                items: 3,
                stagePadding: 75,
                autoplay: true,
                rewind: true,
                autoplayTimeout: 10000,
                autoplaySpeed: 2000,
            },
            900:{
                margin: 30,
                items: 2,
                stagePadding: 75,
            },
            0: {
                margin: 20,
                items: 1,
                stagePadding: 20,
            }
        }
    });
    
    // Owl Hero Slider
    $('.owl-heroslider').owlCarousel({
        items: 1,
        autoplay: true,
        rewind: true,
        mouseDrag: false,
        autoplayTimeout: 7500,
        autoplaySpeed: 2000,
        animateIn: 'fadeIn',
        animateOut: 'fadeOut',
   });
   
});

// Site Preloader
$(window).on('load', function () {
    if ($('#preloader').length > 0 ) {
        setTimeout(function(){ $('#preloader').fadeOut() }, 500);
        $('body').removeClass('preload');
    }
});