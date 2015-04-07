// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .

$(function(){
    var video = $('video')[0];
    var canvas = $('canvas')[0];

    var getCameraAccess = function(){
        //request camera acces
        navigator.webkitGetUserMedia(
          {video: true, audio : true}, // Options
            function(localMediaStream) { // Success
                // create an object URL and assign it to the source of our video element
                video.src = window.webkitURL.createObjectURL(localMediaStream);
            },
            function(err) { // Failure
                console.log('getUserMedia failed: Code ' + err.code);
            }
        );
    };

    var takeSnapshot = function(){
        canvas.height = video.videoHeight;
        canvas.width = video.videoWidth;
        //add the same filter to our canvas
        canvas.style.webkitFilter = filter;
        canvas.getContext('2d').drawImage(video, 0, 0);
    };

    var addFilter = function(){

        var filters = [
            'blur(5px)',
            'grayscale(1)',
            'sepia(1)',
            'saturate(1)',
            'brightness(5)',
            'contrast(5)',
            'hue-rotate(180deg)',
            'invert(0.5)'
        ];

        //randomly select a filter
        filter = filters[Math.floor(Math.random() * filters.length)]

        //add the filter to our video element
        video.style.webkitFilter = filter;
    };

    // EVENTS

    // when the start button is clicked, take a snapshot
    $('#snapshot').on('click', function(){
        takeSnapshot();
    });

    // when the start button is clicked, take a snapshot
    $('#filter').on('click', function(){
        addFilter();
    });

     getCameraAccess();
});