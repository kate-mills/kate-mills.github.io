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
    if(year === undefined || year === null) {
        // console.log("year: ", null);
        return year = "null";
    }
    else if ( typeof(year) === typeof("string") ){
        if(year === ''){
            return year = "null";
        }
        if(year === undefined) {
            return "null";
        }

        year = Number(year);
        // console.log('YEAR1', year);
        if( year ) {
            return year = Number( year);
        }
        else {
            year = "null";
            // console.log(year);
            return year = "null";
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
