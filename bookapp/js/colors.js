$.fn.neutralize = function(){
        this.css("color", "#fbf5db");
         this.css("background-color", "#FBF5DA");
        return this;
    };
$.fn.greyify = function(){
        this.css("color", "#9e9e9e");
         this.css("background-color", "#FBF5DA");
        return this;
    };
$.fn.greenify = function(){
        this.css("color", "#08d008");
         this.css("background-color", "#FBF5DA");
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
        this.css("background-color", "#FBF5DA");
        return this;
};
$.fn.purplefy = function(){
        // this.css("color", "#d502f9");
        this.css({'color': '#009688'});
        return this;
};
$.fn.darkGrey = function(){
        this.css({"color": "#777"});
        return this;
    };
$.fn.lightGrey = function(){
    this.css('color', '#9e9e9e');
    return this;
};
function makeRed(){
    $('span.badge').removeClass('backGrey backGreen backFavorite backOrange backBlue').addClass('backRed');
    $("th").eq(4).redify().text('Read');
    $("th").eq(5).darkGrey().text('wdyt?');
    $("#ToggleArrow").redify();
    $('glyphicon glyphicon-bookmark').addClass('red');
}
function makeOrange(){
    $('span.badge').removeClass('backGrey backGreen backBlue backFavorite backRed').addClass('backOrange');
    $("th").eq(4).orangeify().text('Order');
    $("th").eq(5).neutralize();
    $("#ToggleArrow").orangeify();
    $("#alphabet").orangeify();
}
function makeGreen() {
    $('span.badge').removeClass('backGrey backFavorite backBlue backOrange backRed').addClass('backGreen');
    $("th").eq(4).greenify().text('Want');
    $("th").eq(5).neutralize();
    $("#ToggleArrow").greenify();

}
function makeBlue(){
    $('span.badge').removeClass('backGrey backGreen backFavorite backOrange backRed').addClass('backBlue');
    $("th").eq(4).blueify().text('Available');
    $("th").eq(5).neutralize();
    $("#ToggleArrow").blueify();
    $("#alphabet").blueify();
}
function makePurple(){
    $('span.badge').removeClass('backGrey backGreen  backRed backOrange backBlue').addClass('backFavorite');
    $("th").eq(4).purplefy().text("Favorite");
    $("th").eq(5).darkGrey().text('wdyt?');
    $('td.glyphicon.glyphicon-bookmark').purplefy();
    $("#ToggleArrow").purplefy();
}

function makeAllGrey() {
    $('span.badge').removeClass('backGreen backFavorite backBlue backOrange backRed').addClass('backGrey');
    $("th").eq(4).lightGrey().text('All');
    $("th").eq(5).darkGrey().text('wdyt?');
    $("#ToggleArrow").lightGrey();
}

$( "#ToggleArrow" ).click(
    function() {
        if ( $('div#new-book.container').is(":hidden") ){
            $('div#new-book.container').slideDown("slow");
        }
        else{
            $('div#new-book.container').slideUp("slow");
        }
});
