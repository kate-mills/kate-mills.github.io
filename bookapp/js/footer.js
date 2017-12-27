
function friendlyFooter(){
    this.text = ' Happy '

    switch (new Date().getDay()) {

    case 0:
        this.text += "Sunday."
        break;
    case 1:
        this.text += "Monday."
        break;
    case 2:
        this.text += "Tuesday."
        break;
    case 3:
        this.text += "hump day";
        break;
    case 4:
        this.text += "Thursday";
        break;
    case 5:
        this.text += "Friday";
        break;
    case  6:
        this.text += "Saturday";
        break;
    }
}
var friendlyFooter = new friendlyFooter();

var napaLibrary = '<a class="inside_footer" title="Napa Library" id="napaLibrary" target="_blank" href="https://napa.polarislibrary.com/polaris/logon.aspx?ctx=3.1033.0.0.5&Header=1"><span class="glyphicon glyphicon-link"> </span> napa library</a>';

var countyOfNapa = '<a title="NAPA COUNTY CA" id="countyOfNapa" target="_blank" href="http://countyofnapa.org/library/"><span class="glyphicon glyphicon-link"> </span> county of napa</a>';

var worldCat = '<a title="World Cat" id="worldCat" target="_blank" href="http://www.worldcat.org/"><span class="glyphicon glyphicon-link"> </span> worldcat</a>';

var footerText = '&copy; km-2016  ' + friendlyFooter.text + napaLibrary + countyOfNapa + worldCat;
    $('#footer').html(footerText );
