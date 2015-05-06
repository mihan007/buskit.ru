/*
 @author Interactive agency "Central marketing" http://iacm.ru
 @copyright Copyright (c) 2015, Interactive agency "Central marketing"

 Awesome JS script.
 */

;
(function ($, document, window, undefined) {

    $(document).ready(function () {

        // ACTIVITY INDICATOR
        var activityIndicatorOn = function () {
                $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
            },
            activityIndicatorOff = function () {
                $('#imagelightbox-loading').remove();
            },

            overlayOn = function () {
                $('<div id="imagelightbox-overlay"></div>').appendTo('body');
            },
            overlayOff = function () {
                $('#imagelightbox-overlay').remove();
            },

            closeButtonOn = function (instance) {
                $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () {
                    $(this).remove();
                    instance.quitImageLightbox();
                    return false;
                });
            },
            closeButtonOff = function () {
                $('#imagelightbox-close').remove();
            },

            navigationOn = function (instance, selector) {
                var images = $(selector);
                if (images.length) {
                    var nav = $('<div id="imagelightbox-nav"></div>');
                    for (var i = 0; i < images.length; i++)
                        nav.append('<button type="button"></button>');

                    nav.appendTo('body');
                    nav.on('click touchend', function () {
                        return false;
                    });

                    var navItems = nav.find('button');
                    navItems.on('click touchend', function () {
                        var $this = $(this);
                        if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
                            instance.switchImageLightbox($this.index());

                        navItems.removeClass('active');
                        navItems.eq($this.index()).addClass('active');

                        return false;
                    })
                        .on('touchend', function () {
                            return false;
                        });
                }
            },
            navigationUpdate = function (selector) {
                var items = $('#imagelightbox-nav button');
                items.removeClass('active');
                items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
            },
            navigationOff = function () {
                $('#imagelightbox-nav').remove();
            },


        // ARROWS

            arrowsOn = function (instance, selector) {
                var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

                $arrows.appendTo('body');

                $arrows.on('click touchend', function (e) {
                    e.preventDefault();

                    var $this = $(this),
                        $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
                        index = $target.index(selector);

                    if ($this.hasClass('imagelightbox-arrow-left')) {
                        index = index - 1;
                        if (!$(selector).eq(index).length)
                            index = $(selector).length;
                    }
                    else {
                        index = index + 1;
                        if (!$(selector).eq(index).length)
                            index = 0;
                    }

                    instance.switchImageLightbox(index);
                    return false;
                });
            },
            arrowsOff = function () {
                $('.imagelightbox-arrow').remove();
            };


        var selectorG = 'a[data-imagelightbox="g"]';
        var instanceG = $(selectorG).imageLightbox(
            {
                onStart: function () {
                    overlayOn();
                    arrowsOn(instanceG, selectorG);
                },
                onEnd: function () {
                    arrowsOff();
                    activityIndicatorOff();
                    overlayOff();
                },
                onLoadStart: function () {
                    activityIndicatorOn();
                },
                onLoadEnd: function () {
                    $('.imagelightbox-arrow').css('display', 'block');
                    activityIndicatorOff();
                },
                quitOnDocClick: true
            });

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
            Date.now = function () {
                return new Date().getTime();
            }
        }

        if ($('.countdown').length > 0) {
            $('.countdown').final_countdown({
                start: '1427220000',
                end: '1429880400',
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

    $(document).on('change, keyup', 'input', function () {
        if ($('.help').is(':visible')) {
            checkForm();
        }
    });

    $(document).on('click', '.log-btn', function (e) {
        ga('send', 'event', 'button', 'click', 'openOrderModal');
    });

    $(document).on('click', '.log-btn-end', function (e) {
        ga('send', 'event', 'button', 'click', 'sendOrderButtonClicked');
    });

    $(document).on('click', '.money-btn', function (e) {
        ga('send', 'event', 'button', 'click', 'moneyBtnClicked');
    });

    $(document).on('click', '#btnContactUs', function (e) {
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
        ga('send', 'event', 'button', 'click', 'orderSending');
        $.ajax('mail.php', {
            type: 'POST',
            data: $form.serialize(),
            success: function (resp) {
                $btn.addClass('hide');
                $('.emailOk').removeClass('hide');
                $('.emailError').addClass('hide');
                $btn.attr('doing', '0');
                ga('send', 'event', 'button', 'click', 'orderSentOk');
            },
            error: function (req, status, err) {
                $btn.removeClass('hide');
                $('.emailOk').addClass('hide');
                $('.emailError').removeClass('hide');
                $btn.text('Забронировать билет').attr('doing', '0');
                ga('send', 'event', 'button', 'click', 'orderSentError');
            }
        });
        return false;
    });

    $(document).on('click', '.toggle-btn', function (e) {
        setTimeout(function () {
            $('#name').focus()
        }, 50);
    });
})(jQuery, document, window);