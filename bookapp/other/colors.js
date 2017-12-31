$.fn.neutralize = function(){
    this.css("color", "#fff");
    return this;
};
$.fn.greenify = function(){
    this.css("color", "#08d008");
    return this;
};
$.fn.orangeify = function(){
    this.css("color", "#ff8300");
    return this;
};
$.fn.redify = function(){
    this.css("color", "red");
    return this;
};
$.fn.blueify = function(){
    this.css("color", "#2196f3");
    return this;
};
$.fn.tealify = function(){
    this.css('color', '#009688');
    return this;
};
$.fn.lightGrey = function(){
    this.css('color', '#9e9e9e');
    return this;
};
function makeRed(){
    $('span.badge').removeClass('backGrey backGreen backFavorite backOrange backBlue').addClass('backRed');
    $("th").eq(4).redify();
    $("th").eq(5).redify();
    $("#ToggleArrow").redify();
    $('glyphicon glyphicon-bookmark').addClass('red');
}
function makeOrange(){
    $('span.badge').removeClass('backGrey backGreen backBlue backFavorite backRed').addClass('backOrange');
    $("th").eq(4).orangeify();
    $("th").eq(5).neutralize();
    $("#ToggleArrow").orangeify();
}
function makeGreen() {
    $('span.badge').removeClass('backGrey backFavorite backBlue backOrange backRed').addClass('backGreen');
    $("th").eq(4).greenify();
    $("th").eq(5).neutralize();
    $("#ToggleArrow").greenify();
}
function makeBlue(){
    $('span.badge').removeClass('backGrey backGreen backFavorite backOrange backRed').addClass('backBlue');
    $("th").eq(4).blueify();
    $("th").eq(5).neutralize();
    $("#ToggleArrow").blueify();
}
function makePurple(){
    $('span.badge').removeClass('backGrey backGreen  backRed backOrange backBlue').addClass('backFavorite');
    $("th").eq(4).tealify();
    $("th").eq(5).tealify();
    $('td.glyphicon.glyphicon-bookmark').tealify();
    $("#ToggleArrow").tealify();
}
function makeAllGrey() {
    $('span.badge').removeClass('backGreen backFavorite backBlue backOrange backRed').addClass('backGrey');
    $("th").eq(4).lightGrey();
    $("th").eq(5).lightGrey();
    $("#ToggleArrow").lightGrey();
}
$( "#ToggleArrow" ).click(
    function() {
        if ( $('div#new-book.container').is(":hidden") ){
            $('div#new-book.container').slideDown("fast");
        }
        else{
            $('div#new-book.container').slideUp("fast");
        }
    }
);
