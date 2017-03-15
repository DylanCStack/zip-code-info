var Clock = require("./../js/clock.js").clockModule;

var targetSeconds = 61;
var snooze = false;

$(function() {
  var alarm = new Clock();

  alarm.getSevenDays().forEach(function(day){
    $("#day").append("<option value='"+day+"'>" + day + "</option>");
  });

  alarm.getHour().forEach(function(hour) {
    $('#hour').append("<option value='"+hour+"'>" + hour + "</option>");
  });

  alarm.getMin().forEach(function(min) {
    $('#min').append("<option value='"+min+"'>" + min + "</option>");
  });
  $("#new-reminder").click(function(){
    window.location.reload();
  });


  $('#alarm-input').submit(function(e) {
    e.preventDefault();
    var year = moment().format("YYYY");
    var target = $("#day").val() +", "+year+" "+ $("#hour").val() +":"+ $("#min").val() + " " + $("#ampm").val();
    $("#target").text(target);
    $("#alarm-input").children("button").toggle();

    $("#snooze").click(function(){
      $("body").css({"background-color":"#fff"})
      snooze = true;
      setTimeout(function(){
        snooze = false;
        $("body").css({"background-color":"#000"})
      },5000)

    });

    setInterval(function(){
      var clock = moment().format('LLLL');

      if(clock === target && snooze === false){
        $("body").css({"background-color":"#000"})
        $("#snooze").show();
      } else if(snooze === true){
        $("body").css({"background-color":"#fff"})
      }
      $('#current').text(clock);
    }, 500);
  });
});
