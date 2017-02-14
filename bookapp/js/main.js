$(document).ready(function(){

 $( "#getTime" ).toggle(function() {
    var timeClock;
    getDate();
    // day = day;
    time = time;
    h = h;
    m = m;
    s = s;

    if(h >= 12){
    h = h - 12;
    window.timeClock = h + ":" + m + " pm";
    }
    else {
        window.timeClock = h  + ":" + m + " am";
    }
  $('#showTime').html(window.timeClock);



},function(){
  $('#showTime').html('');
});

$('#getDate').toggle(function(){

    window.date = getDate();
    window.dateArr = date.split(' ');
    window.dateArr.pop();
    date = window.dateArr.join(' ');


    $('#showDate').html(date);

}, function(){
    $('#showDate').html('');

});
  
});
updateLengths();
