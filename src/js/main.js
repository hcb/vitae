$(document).ready(function(){
    $('#hero__buttons a').each(function() {
        scrollToSection($(this), $(this).attr('href'));
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
