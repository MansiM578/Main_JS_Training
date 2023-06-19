// "use strict";
var t = 0;
function getTime() {
  var x = document.getElementById("frm1");
  hr = x.elements[0].value;
  min = x.elements[1].value;

  window.t = hr * 3600 + min * 60;
  window.per = window.t;
  startCountdown();
}
function startCountdown() {
  var temp = window.t;
  window.t = window.t - 1;
  var h = Math.floor(temp / 3600);
  var m = Math.floor((temp % 3600) / 60);
  var s = Math.floor(temp - h * 3600 - m * 60);
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById("countdown").innerHTML =
    h + "hr:" + m + "min:" + s + "sec";

  var t = setTimeout(timer, 1000);

  if (temp < 0) {
    clearInterval(t);
    document.getElementById("countdown").innerHTML = "Countdown time completed";
  }
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
