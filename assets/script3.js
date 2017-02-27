$(document).ready(function(){

  var now = (new Date()).getTime()/1000;

  var name;
  var units;

  $('#button').on('click', function() {
    name = document.getElementById("city").value;
    units = $('.units:checked').val();
    $('#cityName').hide();
    locationSuccess(name, units);
  });


  // api call for forecast for next three days.
  function locationSuccess() {
    var api_url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + name + '&units=' + units + '&appid=a4e895ba42bbc0241aa3037092993c26';
    $.ajax({
      url : api_url,
      method : 'GET',
      success : function (data) {
        var tempr1 = data.list[6].main.temp;
        var temp1 = Math.round(tempr1);
        var cond1 = data.list[6].weather[0].main;
        var day = data.list[5].dt_txt;
        var dayWord = ($.format.date(day, "E"));
        var cond2 = data.list[12].weather[0].main;
        var tempr2 = data.list[14].main.temp;
        var temp2 = Math.round(tempr2);
        var day2 = data.list[11].dt_txt;
        var dayWord2 = ($.format.date(day2, "E"));
        var tempr3 = data.list[22].main.temp;
        var temp3 = Math.round(tempr3);
        var cond3 = data.list[20].weather[0].main;
        var day3 = data.list[19].dt_txt;
        var dayWord3 = ($.format.date(day3, "E"));
        $('#moreData').html("<p id='temp2'>" + dayWord + '<br>' + temp1 + '°' + '<br>' + cond1 + "</p>" + "<p id='temp2'>" + dayWord2 + '<br>' + temp2 + '°' + '<br>' + cond2 + "</p>" + "<p id='temp3'>" + dayWord3 + '<br>' + temp3 + '°' + '<br>' + cond3 + "</p>");
        $('.thumbnail').show();
        localStorage.temp1  = temp1;
        localStorage.dayWord = dayWord;
        localStorage.cond1 = cond1;
        localStorage.cond2 = cond2;
        localStorage.cond3 = cond3;
        localStorage.temp2  = temp2;
        localStorage.dayWord2 = dayWord2;
        localStorage.temp3  = temp3;
        localStorage.dayWord3 = dayWord3;
        localStorage.time = now;
      },
    });
  }

  if (!localStorage.cache) {
    $('.thumbnail').hide();
    $('#cityName').show();
  }
  else if (localStorage.cache && now - parseInt(localStorage.time) > 1*60*10) {
    $('#cityName').hide();
    name = localStorage.name;
    units = localStorage.units;
    locationSuccess(name, units);
  }
  else {
    $('#cityName').hide();
    $('#moreData').html("<p id='temp2'>" + localStorage.dayWord + '<br>' + localStorage.temp1 + '°' + '<br>' + localStorage.cond1 + "</p>" + "<p id='temp2'>" + localStorage.dayWord2 + '<br>' + localStorage.temp2 + '°' + '<br>' + localStorage.cond2 + "</p>" + "<p id='temp3'>" + localStorage.dayWord3 + '<br>' + localStorage.temp3 + '°' + '<br>' + localStorage.cond3 + "</p>");
  }

});