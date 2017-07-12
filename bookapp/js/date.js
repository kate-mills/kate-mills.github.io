var time;
var d, h, m, s;
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}


function getDate(){
    var date = new Date();
    d = date.toDateString();
    h = addZero(date.getHours());
    m = addZero(date.getMinutes());
    s = addZero(date.getSeconds());
    time = " " + h + ":" + m + ":" + s;

    return d.concat(time);
}

var testYear = function(year){
    if(year === undefined || year  === "null") {
        year = null;
        return year;
    }
    else if ( year === typeof("String") ){
            console.log(year);
            return String(year);
        }

    else {

        year = Number(year);
        if( year ) {
            year = String(year);
            console.log(year);
            return year;
        }
        else {
            year = "null";
            console.log(year);
            return year;
        }
    }



};

 $('#getTime').toggle(function(){
   function getDate(){
    var timeClock;
    var date = new Date();
    d = date.toDateString();
    h = addZero(date.getHours());
    m = addZero(date.getMinutes());
    s = addZero(date.getSeconds());
    time = " " + h + ":" + m + ":" + s;
    return d.concat(time);
}
     getDate();
    if(h > 12){
    h = h - 12;
    timeClock = h + ":" + m + " pm";
    }
    else {timeClock = h  + ":" + m + " am";
}
$('#showTime').html(timeClock);
}, function(){
   $('#showTime').html('');
});
