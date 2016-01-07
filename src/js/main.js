$(document).ready(function(){
    $('#hero__buttons a').each(function() {
        scrollToSection($(this), $(this).attr('href'));
    });

    $('.hidden').hide();

    $('#order-form input:radio').change(function(e) {
        var price = $(this).data('price');
        var item = $(this).data('itemname');
        var taxRate = 0.1;
        var tax = Math.round(price * taxRate);
        var total = price + tax;

        $('#order__summary__total').text('$' + total);
        $('#order__summary__tax').text('$' + tax + '.00');
        $('#order__summary__price').text('$' + price);
        $('#order__summary__item').text(item);
        $('#order-form .hidden').show();
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
