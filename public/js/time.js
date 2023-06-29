document.addEventListener("DOMContentLoaded", function () {
  setInterval(function () {
    var currentTime = new Date();

    var hours = currentTime.getHours();

    var minutes = currentTime.getMinutes();

    var seconds = currentTime.getSeconds();

    var period = "오전";

    if (hours >= 12) {
      period = "오후";
    }

    if (hours > 12) {
      hours = hours - 12;
    }

    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    if (minutes < 10) {
      minutes = "0" + minutes;
    }

    var clockTime = hours + ":" + minutes + ":" + seconds + " " + period;

    var clock = document.getElementById("time");

    clock.innerText = clockTime;
  }, 1000);

  var d = new Date();

  var getday = d.getDay();

  var weekday = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];

  var n = weekday[getday];

  var dd = d.getDate();

  var mm = d.getMonth() + 1;

  var yyyy = d.getFullYear();

  if (dd < 10) {
    dd = "0" + dd;
  }

  if (mm < 10) {
    mm = "0" + mm;
  }

  var today = yyyy + " / " + mm + " / " + dd;

  var displayWeekday = document.getElementById("day");

  var displayDate = document.getElementById("date");

  function whatDayIsIt() {
    displayWeekday.innerText = n;
  }

  function whatDateIsIt() {
    displayDate.innerText = today;
  }

  whatDayIsIt();

  whatDateIsIt();
});
