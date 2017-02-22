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
        this.css("color", "green");
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
        this.css("color", "purple");
        return this;
};
$.fn.darkGrey = function(){
        this.css("color", "#777");
        return this;
    };
$.fn.lightShade = function(){
    this.css("color", "#e0e0e0");
    return this;
};
function makeRed(){
    $("th").darkGrey().css("cursor", "default");
    $('th').eq(1).text('Title I Have Read');
    $("th").eq(2).text('Year');
    $("th").eq(3).redify().text('Read');
    $("th").eq(4).redify();
    $('div#new-book.container').hide();
    $("#ToggleArrow").redify();
    $("#alphabet").redify();

}
function makeOrange(){
    $("th").darkGrey().css("cursor", "default");
    $('th').eq(1).text('Title On Order');
    $("th").eq(3).orangeify().text('Order');
    $('div#new-book.container').hide();
    $("th").eq(4).neutralize();
    $("#ToggleArrow").orangeify();
    $("#alphabet").orangeify();
}
function makeGreen() {
    $("th").darkGrey().css("cursor", "default");
    $('th').eq(1).text('Title I Want');
    $("th").eq(3).greenify().text('Want');
    $("th").eq(4).neutralize();
    $('div#new-book.container').show();
    $("#showTime").greenify();
    $("#ToggleArrow").greenify();
    $("#alphabet").greenify();

}
function makeBlue(){
    $("th").blueify().css("cursor", "default");
    $('th').first().text('Authors');
    $('th').eq(1).text('Available Books');
    $("th").eq(2).text('Year ');
    $("th").eq(3).text('Available');
    $("th").eq(4).neutralize();
   $('div#new-book.container').hide();
   $("#ToggleArrow").blueify();
   $("#alphabet").blueify();
}
function makePurple(){
    $("th").darkGrey().css("cursor", "default");
    $('th').eq(1).text('Favorite Titles');

    $("th").eq(3).purplefy().text("Favorites");
    $('div#new-book.container').hide();
    $("th").eq(4).neutralize();
    $("#ToggleArrow").purplefy();
    $("#alphabet").purplefy();

}
function makeAllGrey() {
    $("th").darkGrey().css("cursor", "default");
    $("h4").darkGrey().addClass("dark-Grey");
    $("h2").darkGrey();
    $("a").darkGrey().addClass("dark-Grey");
    $("li").darkGrey().addClass("dark-Grey");
    $("th").darkGrey();
    $('th').eq(0).text('Authors');
    $('th').eq(1).text('All Books');
    $("th").eq(2).text('Year');
    $("th").eq(3).text('All');
    $("#ToggleArrow").darkGrey();
    $("#alphabet").darkGrey();
}


$( "#ToggleArrow" ).click(
  function() {
    $('div#new-book.container').toggle();
  });
