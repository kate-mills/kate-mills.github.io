function makeGreen(){
    $('th').first().text('Favorite Author')
    // $('th').last().html('<th class="glyphicon">&#xe014;</th>');
    $.fn.greenify = function(){
        this.css("color", "green");
        return this;
    };
    $.fn.greenifyFooter = function(){
            this.css("color", "#8bc34a");
            return this;
    };
    $("h4").greenify().addClass("greenified");
    $("a").greenify().addClass("greenified");
    $("li").greenify().addClass("greenified");
    // $("th").greenify().addClass("greenified");
    $("#showDate").greenify().addClass("greenified");
    $("#showTime").greenify().addClass("greenified");
    $("p#footer").greenifyFooter().addClass("greenifiedLight");
}

function makePurple(){
    $('th').first().text('Favorite Authors').css('color', 'purple');
    $('th').eq(1).css('color', 'purple').text('Favorite Titles');
    $('th').eq(2).css('color', 'purple').text('Year')
    $('th').eq(3).css('color', '#d502f9');
    $('th').eq(9).css('color', '#d502f9');
}

function makeGrey(){
    $.fn.darkShade = function(){
        this.css("color", "#9e9e9e");
        return this;
    };
    $.fn.lightShade = function(){
        this.css("color", "#e0e0e0");
        return this;
    };
    $("h4").darkShade().addClass("dark-Grey");
    $("a").darkShade().addClass("dark-Grey");
    $("li").darkShade().addClass("dark-Grey");
    // $('th').darkShade().addClass("dark-Grey");
    $("#showDate").darkShade().addClass("dark-Grey");
    $("#showTime").darkShade().addClass("dark-Grey");
    $("p#footer").darkShade().addClass("light-Grey");
}
