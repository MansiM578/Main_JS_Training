// "use strict";
var t = 0;
function myFunction() {
  var x = document.getElementById("myForm");
  hr = x.elements[0].value;
  min = x.elements[1].value;

  window.t = hr * 3600 + min * 60;
  window.per = window.t;
  timer();
}
function timer() {
  var temp = window.t;
  window.t = window.t - 1;
  var h = Math.floor(temp / 3600);
  var m = Math.floor((temp % 3600) / 60);
  var s = Math.floor(temp - h * 3600 - m * 60);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("countdown").innerHTML =
    h + " hr: " + m + " min: " + s + " sec ";
  document.getElementById("progress-bar").style.width =
    (temp * 100) / window.per + "%";

  var t = setTimeout(timer, 1000);

  if (temp < 0) {
    clearTimeout(t);
    document.getElementById("countdown").innerHTML = "Countdown Time Out";
    function playAlarm() {
      var alarm = document.getElementById("timeOutSound");
      alarm.play();
    }

    playAlarm();
  }
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
