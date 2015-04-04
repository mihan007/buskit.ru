(function ($) {

    new WOW().init();

    jQuery(window).load(function () {
        jQuery("#preloader").delay(100).fadeOut("slow");
        jQuery("#load").delay(100).fadeOut("slow");
    });

    //jQuery to collapse the navbar on scroll
    $(window).scroll(function () {
        if ($(".navbar").offset().top > 50) {
            $(".navbar-fixed-top").addClass("top-nav-collapse");
        } else {
            $(".navbar-fixed-top").removeClass("top-nav-collapse");
        }
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    $(function () {
        $('.navbar-nav li a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
        $('.page-scroll a').bind('click', function (event) {
            var $anchor = $(this);
            $('html, body').stop().animate({
                scrollTop: $($anchor.attr('href')).offset().top
            }, 1500, 'easeInOutExpo');
            event.preventDefault();
        });
    });

    $(document).delegate('*[data-toggle="lightbox"]', 'click', function (event) {
        event.preventDefault();
        $(this).ekkoLightbox({
            'always_show_close': false
        });
    });

    $(document).on('click', '#btnContactUs', function(e) {
        var $form = $(this).closest('form'),
            $btn = $(this);
        e.preventDefault();
        $.ajax( 'mail.php', {
            type: 'POST',
            data: $form.serialize(),
            success: function( resp ) {
                $btn.addClass('hide');
                $('.emailOk').removeClass('hide');
                $('.emailError').addClass('hide');
            },
            error: function( req, status, err ) {
                $btn.removeClass('hide');
                $('.emailOk').addClass('hide');
                $('.emailError').removeClass('hide');
            }
        });
        return false;
    });

})(jQuery);
