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

    var napaLibrary = '<a class="inside_footer" title="Napa Library" id="napaLibrary" target="_blank" href="https://napa.polarislibrary.com/polaris/logon.aspx?ctx=3.1033.0.0.5&Header=1"><span class="glyphicon glyphicon-link"> </span> napa library</a>';

    var countyOfNapa = '<a title="NAPA COUNTY CA" id="countyOfNapa" target="_blank" href="http://countyofnapa.org/library/"><span class="glyphicon glyphicon-link"> </span> county of napa</a>';

    var worldCat = '<a title="World Cat" id="worldCat" target="_blank" href="http://www.worldcat.org/"><span class="glyphicon glyphicon-link"> </span> worldcat</a>';

    var footerText = '&copy; km-2016  ' + text + napaLibrary +  countyOfNapa + worldCat;
    $('#footer').html(footerText );


