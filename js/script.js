var HeaderVideo = (function ($, document) {

    var settings = {
        container: $('.header-video'),
        teaserVideo: $('.teaser-video')
    };

    var init = function(options){
        settings = $.extend(settings, options);
        getVideoDetails();
        setFluidContainer();
        appendTeaserVideo();
    };

    var getVideoDetails = function() {
        //Get all the data attributes from the HTML container and return them as an object for easy data retrieval
        videoDetails = {
            teaser: settings.header.attr('data-teaser-source'),
            videoHeight: settings.header.attr('data-video-height'),
            videoWidth: settings.header.attr('data-video-width')
        };
        return videoDetails;
    };

    var setFluidContainer = function () {
        settings.container.data('aspectRatio', videoDetails.videoHeight / videoDetails.videoWidth);

        $(window).resize(function() {
            var winWidth = $(window).width(),
                winHeight = $(window).height();

            settings.container
                .width(Math.ceil(winWidth)) //Round up to the nearest pixel value to prevent breaking of layout
                .height(Math.ceil(winWidth * settings.container.data('aspectRatio'))); //Set the videos aspect ratio, see https://css-tricks.com/fluid-width-youtube-videos/

            if(winHeight < settings.container.height()) {
                settings.container
                    .width(Math.ceil(winWidth))
                    .height(Math.ceil(winHeight));
            }

        }).trigger('resize'); //Trigger resize to force it to run on page load as well

    };

    var appendTeaserVideo = function() {
        if(Modernizr.video && !isMobile()) {
            var source = videoDetails.teaser,
                html = '<video autoplay="true" loop="loop" muted id="teaser-video" class="teaser-video"><source src="'+source+'.mp4" type="video/mp4"><source src="'+source+'.ogv" type="video/ogg"></video>';
            settings.container.append(html);
        }
    };

    var isMobile = function () {
        //A super basic way of detecting mobile devices. Should be extended to a more
        //fool proof way in a production enviroment.
        return Modernizr.touch;
    }

    return {
        init: init
    };
    
})(jQuery, document);