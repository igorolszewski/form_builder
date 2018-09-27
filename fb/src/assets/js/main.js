$(document).ready(function(){
    
    //Product Slider
    $('.pro-slider').slick({
        slidesToShow: 3,
        slidesToScroll:1,
        arrows:false,
        dots:true,
        infinite: false,
        responsive: [
            {
              breakpoint: 801,
              settings: {
                slidesToShow: 2,
                slidesToScroll: 1
              }
            },
            {
              breakpoint: 480,
              settings: {
                slidesToShow: 1,
                slidesToScroll:1
              }
            }
        ]
    });
    
    
    //Testimonial Slider
    $('.sk-tm-init').slick({
        slidesToShow: 1,
        slidesToScroll:1,
        arrows:false,
        dots:true,
        infinite: true
    });
    
    
    //Date and Time Picker
    $('.datetimepicker').datetimepicker();
    
    
    //Input Multi Select 
    $('.multiSelect').multiselect();
    $('.multiSelectFilter').multiselect({
        enableFiltering: true
    });
    
    
    //Input Spin
    $(".sk-spin").TouchSpin({
        min: 1
    });
    
    
    //Credit Card Input
    $(".cc-input").keypress(function (e) {
        if (e.which != 8 && e.which != 0 && (e.which < 48 || e.which > 57)) {
            $(".errmsg").html("Digits Only").show().fadeOut("slow");
            return false;
        }
    });
    $(".cc-input").keyup(function () {
        if (this.value.length == this.maxLength) {
          $(this).next('.cc-input').focus();
        }
    });
    
    
    
    //quantity selector
    var quantitiy=0;
   $('.quantity-right-plus').click(function(e){
        e.preventDefault();
        var quantity = parseInt($(this).parents('.quantity-items').find(".input-number").val());

        $(this).parents('.quantity-items').find(".input-number").val(quantity + 1);
    });

     $('.quantity-left-minus').click(function(e){
        e.preventDefault();
        var quantity = parseInt($(this).parents('.quantity-items').find(".input-number").val());

        if(quantity>0){
            $(this).parents('.quantity-items').find(".input-number").val(quantity - 1);
        }
    });

    // slidToggle function

    $("#cookingIns").on('click' , function(){
        $('.txtarea').slideToggle();
    });

    $('.mat-datepicker-toggle').on("click", function(){
        $(this).parents(body).find('.cdk-overlay-container').toggleClass('activedp');
    });
    
});
