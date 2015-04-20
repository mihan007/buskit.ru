/*
	@author Interactive agency "Central marketing" http://iacm.ru
	@copyright Copyright (c) 2015, Interactive agency "Central marketing"	
	
	Awesome JS script.
*/

;(function($, document, window, undefined) {
	
	$(document).ready(function() {
		
		/*
			Video background > front
		*/
	    
	    $('#cd-intro .video').vide({
		    mp4: 'video/front.mp4',
		    webm: 'video/front.webm',
		    //ogv: '../../video/front-page.ogv',
		    poster: 'images/background_title.jpg'
		},
		{
			volume: 0,
			playbackRate: 1,
			muted: true,
			loop: true,
			autoplay: true,
			position: '50% 50%',
			posterType: 'jpg',
			resizing: true
		});
		
		/*
			Menu scroll
		*/
		
	    window.remodalGlobals = {
	        namespace: "modal",
	        defaults: {
	            hashTracking: false
	        }
	    };
		
		/*
			Countdown
		*/

        if (!Date.now) {
            Date.now = function() { return new Date().getTime(); }
        }

        if ($('.countdown').length > 0) {
            $('.countdown').final_countdown({
                start: '1427220000',
                end: '1429898400',
                now: Math.floor(Date.now() / 1000),
                seconds: {
                    borderColor: '#FFF',
                    borderWidth: '3'
                },
                minutes: {
                    borderColor: '#FFF',
                    borderWidth: '3'
                },
                hours: {
                    borderColor: '#FFF',
                    borderWidth: '3'
                },
                days: {
                    borderColor: '#FFF',
                    borderWidth: '3'
                }
            });
        }
	});

    function checkForm() {
        var errors = 0;
        if ($('#name').val().length == 0) {
            errors++;
            $('.help-name').removeClass('hide');
        } else {
            $('.help-name').addClass('hide');
        }
        if ($('#email').val().length == 0) {
            errors++;
            $('.help-email').removeClass('hide');
        } else {
            $('.help-email').addClass('hide');
        }
        if ($('#number').val().length == 0) {
            errors++;
            $('.help-number').removeClass('hide');
        } else {
            $('.help-number').addClass('hide');
        }

        return errors;
    }

    $(document).on('change, keyup', 'input', function(){
        if ($('.help').is(':visible')) {
            checkForm();
        }
    });

    $(document).on('click', '#btnContactUs', function(e) {
        var $form = $(this).closest('form'),
            $btn = $(this),
            errors = 0;
        if ($btn.attr('doing') == 1) {
            return;
        }
        $('.emailOk').addClass('hide');
        $('.emailError').addClass('hide');
        e.preventDefault();
        errors = checkForm();
        if (errors > 0) {
            return;
        }
        $btn.text('Один момент. Бронирую...').attr('doing', '1');
        $.ajax( 'mail.php', {
            type: 'POST',
            data: $form.serialize(),
            success: function( resp ) {
                $btn.addClass('hide');
                $('.emailOk').removeClass('hide');
                $('.emailError').addClass('hide');
                $btn.attr('doing', '0');
            },
            error: function( req, status, err ) {
                $btn.removeClass('hide');
                $('.emailOk').addClass('hide');
                $('.emailError').removeClass('hide');
                $btn.text('Забронировать билет').attr('doing', '0');
            }
        });
        return false;
    });

    $(document).on('click', '.toggle-btn', function(e) {
        setTimeout(function(){$('#name').focus()}, 50);
    });
	
})(jQuery, document, window);