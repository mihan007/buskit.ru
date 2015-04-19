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

        if ($('.countdown').length > 0) {
            $('.countdown').final_countdown({
                start: '1429315200',
                end: '1429833600',
                now: '1429315200',
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
	
})(jQuery, document, window);