$(document).ready(function(){
    $('#hero__buttons a').each(function() {
        scrollToSection($(this), $(this).attr('href'));
    });

    var prevScrollTop = 0;

    $(window).scroll( function() {
        var scrollDistance = 1;
        var currentScrollTop = $(this).scrollTop();
        if (currentScrollTop > prevScrollTop){
           scrollDistance = -scrollDistance;
        }
        console.log(scrollDistance);
        position = parseInt($('.hero').css('background-position-y')) + scrollDistance + '%';
        console.log(position);
        $('.hero').css({
            'background-position-y': position
        });

        prevScrollTop = currentScrollTop;
    });
});


function scrollToSection(el, target) {
    el.click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $(target).offset().top
        }, 400);

    });
}
