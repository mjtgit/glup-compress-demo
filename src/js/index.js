 $( function() {

   var mySwiper = new Swiper('.swiper-container', {
        paginationClickable: true,
        loop: true,
        speed: 2200,
        autoplay: 1000,
        // autoplay: 2500,
        autoplayDisableOnInteraction: false,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        effect: 'fade',
        onInit: function(swiper) {
          console.log(1111);
          // swiper.stopAutoplay();
        }
    });

    var winW = $(window).width();
    var winH = window.innerHeight;
    var $header = $('#header')

    var controller = new ScrollMagic.Controller();
    new ScrollMagic.Scene({
        triggerElement: "#test1",
        triggerHook: "onLeave",
        offset: winH * .8
        // offset: scene1offset
    })
    .on('enter', function(event) {
        $header.addClass('active');
        console.log('向下滑离开test1-----');
    })
    .on('leave', function(event) {
        $header.removeClass('active');
        console.log('向上滑进入test1++++++');
    })
    // .addIndicators()
    .addTo(controller);



 })


