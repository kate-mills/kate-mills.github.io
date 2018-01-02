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
        this.text += "hump day!";
        break;
    case 4:
        this.text += "Thursday.";
        break;
    case 5:
        this.text += "Friday.";
        break;
    case  6:
        this.text += "Saturday.";
        break;
    }
}
var ff = new friendlyFooter();
$('#footer').prepend('<span>&copy; km-2016 '+ ff.text+'</span>');
