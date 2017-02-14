var day;
var time;
getDate();
var h = h;
var m = m;
var time = time;


switch (new Date().getDay()) {
    case 0:
        day = "Sunday";
        text = ' It\'s not Sunday unless you are reading. ';
        break;
    case 1:
        day = "Monday";
        text = ' It\'s Monday. Let\'s Get this Party Started! ';
        break;
    case 2:
        day = "Tuesday";
        text = ' Happy Tuesday Book Lovers. ';
        break;
    case 3:
        day = "Wednesday";
        text = ' Happy Hump Day. ';
        break;
    case 4:
        day = "Thursday";
        text = ' Tomorrow is Friday. ';
        break;
    case 5:
        day = "Friday";
        text = ' It\'s Finally Friday!';
        break;
    case  6:
        day = "Saturday";
        text = ' Sweet Saturday. ';


}
    var footerText = '&copy; km-2016  ' + text;
    $('#footer').html(footerText);
    
